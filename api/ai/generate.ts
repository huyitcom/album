import { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from '@vercel/postgres';
import { GoogleGenAI } from '@google/genai';

// Initialize Gemini with server-side key
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt, imageBase64, mimeType, clientKey, resolution } = req.body;

    if (!clientKey) {
      return res.status(401).json({ error: 'Client key is required' });
    }

    // 1. Check User in DB
    const { rows } = await sql`SELECT * FROM users WHERE client_api_key = ${clientKey} LIMIT 1`;
    
    if (rows.length === 0) {
      return res.status(403).json({ error: 'Invalid Client Key' });
    }

    const user = rows[0];

    // 2. Check and Reset Daily Limit
    const now = new Date();
    const today = now.toISOString().split('T')[0]; // YYYY-MM-DD
    const lastReset = user.last_reset_date ? new Date(user.last_reset_date).toISOString().split('T')[0] : null;

    let currentUsage = user.usage_count;

    if (lastReset !== today) {
      await sql`UPDATE users SET usage_count = 0, last_reset_date = ${today} WHERE id = ${user.id}`;
      currentUsage = 0;
    }

    // 3. Enforce Limit
    if (currentUsage >= user.daily_limit) {
      return res.status(429).json({ 
        error: `Daily limit of ${user.daily_limit} reached. Please wait until tomorrow.` 
      });
    }

    // 4. Call Gemini AI (No internal retry loop to avoid Vercel timeout)
    const model = 'gemini-3-pro-image-preview'; 
    let response;

    try {
        response = await ai.models.generateContent({
            model: model,
            contents: {
                parts: [
                    { inlineData: { data: imageBase64, mimeType: mimeType } },
                    { text: prompt },
                ],
            },
            config: {
                imageConfig: { imageSize: resolution || '4K' },
            },
        });
    } catch (e: any) {
        console.error("Gemini Generation Failed:", e.message);
        const isOverloaded = e.message?.includes('503') || e.message?.includes('overloaded') || e.message?.includes('UNAVAILABLE');
        
        if (isOverloaded) {
            return res.status(503).json({ error: "Server is currently overloaded (High Traffic). Please try again in a moment." });
        }
        throw e;
    }

    // 5. Extract Image
    let resultImage = null;
    let resultMime = null;

    if (response?.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                resultImage = part.inlineData.data;
                resultMime = part.inlineData.mimeType;
                break;
            }
        }
    }

    if (!resultImage) {
        throw new Error("Model completed but did not return an image.");
    }

    // 6. Increment Usage
    await sql`UPDATE users SET usage_count = usage_count + 1 WHERE id = ${user.id}`;

    return res.status(200).json({ 
      data: resultImage, 
      mimeType: resultMime,
      remaining: user.daily_limit - (currentUsage + 1)
    });

  } catch (error: any) {
    console.error("AI Gen Error:", error);
    
    let errorMessage = error.message || "Internal Server Error";
    try {
        if (errorMessage.startsWith('{')) {
            const parsed = JSON.parse(errorMessage);
            if (parsed.error && parsed.error.message) {
                errorMessage = parsed.error.message;
            }
        }
    } catch (e) {
        // ignore parse error
    }

    if (errorMessage.includes('503') || errorMessage.includes('overloaded')) {
        return res.status(503).json({ error: "Server is currently overloaded (High Traffic). Please try again in a moment." });
    }

    return res.status(500).json({ error: errorMessage });
  }
}
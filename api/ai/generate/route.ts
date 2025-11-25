
import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { GoogleGenAI } from '@google/genai';

// Initialize Gemini with the correct private environment variable
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { prompt, imageBase64, mimeType, clientKey, resolution } = await req.json();

    if (!clientKey) {
      return NextResponse.json({ error: 'Client key is required' }, { status: 401 });
    }

    // 1. Check User in DB
    const { rows } = await sql`SELECT * FROM users WHERE client_api_key = ${clientKey} LIMIT 1`;
    
    if (rows.length === 0) {
      return NextResponse.json({ error: 'Invalid Client Key' }, { status: 403 });
    }

    const user = rows[0];

    // 2. Check and Reset Daily Limit Logic (Lazy Reset)
    // We use user's local time conceptualization, but server time is UTC. 
    // Standardizing on UTC date strings for simplicity.
    const now = new Date();
    const today = now.toISOString().split('T')[0]; // YYYY-MM-DD
    
    // Check if last_reset_date is null or different from today
    const lastReset = user.last_reset_date ? new Date(user.last_reset_date).toISOString().split('T')[0] : null;

    let currentUsage = user.usage_count;

    if (lastReset !== today) {
      // It's a new day, reset usage
      await sql`UPDATE users SET usage_count = 0, last_reset_date = ${today} WHERE id = ${user.id}`;
      currentUsage = 0;
    }

    // 3. Check Limit
    if (currentUsage >= user.daily_limit) {
      return NextResponse.json({ 
        error: `Daily limit of ${user.daily_limit} reached. Please upgrade your plan or wait until tomorrow.` 
      }, { status: 429 });
    }

    // 4. Call Gemini AI (Server Side)
    // Map resolution to model/config
    const model = 'gemini-3-pro-image-preview'; // Nano Banana Pro
    
    // Perform generation
    const response = await ai.models.generateContent({
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

    // 5. Extract Image from Response
    let resultImage = null;
    let resultMime = null;

    if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                resultImage = part.inlineData.data;
                resultMime = part.inlineData.mimeType;
                break;
            }
        }
    }

    if (!resultImage) {
        throw new Error("Model did not return an image.");
    }

    // 6. Increment Usage
    await sql`UPDATE users SET usage_count = usage_count + 1 WHERE id = ${user.id}`;

    return NextResponse.json({ 
      data: resultImage, 
      mimeType: resultMime,
      remaining: user.daily_limit - (currentUsage + 1)
    });

  } catch (error: any) {
    console.error("AI Generation Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}

import { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from '@vercel/postgres';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { clientKey } = req.body;

    if (!clientKey) {
      return res.status(400).json({ valid: false, error: 'Key required' });
    }

    const { rows } = await sql`SELECT * FROM users WHERE client_api_key = ${clientKey} LIMIT 1`;

    if (rows.length === 0) {
      return res.status(403).json({ valid: false, error: 'Invalid Key' });
    }

    const user = rows[0];

    // Check for daily reset needed for accurate display
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const lastReset = user.last_reset_date ? new Date(user.last_reset_date).toISOString().split('T')[0] : null;
    
    let currentUsage = user.usage_count;
    if (lastReset !== today) {
        currentUsage = 0;
    }

    return res.status(200).json({
      valid: true,
      tier: user.tier,
      limit: user.daily_limit,
      usage: currentUsage,
      remaining: Math.max(0, user.daily_limit - currentUsage)
    });

  } catch (error: any) {
    return res.status(500).json({ valid: false, error: 'Server error: ' + error.message });
  }
}
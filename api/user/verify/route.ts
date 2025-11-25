
import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(req: NextRequest) {
  try {
    const { clientKey } = await req.json();

    if (!clientKey) {
      return NextResponse.json({ valid: false, error: 'Key required' }, { status: 400 });
    }

    const { rows } = await sql`SELECT * FROM users WHERE client_api_key = ${clientKey} LIMIT 1`;

    if (rows.length === 0) {
      return NextResponse.json({ valid: false, error: 'Invalid Key' }, { status: 403 });
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

    return NextResponse.json({
      valid: true,
      tier: user.tier,
      limit: user.daily_limit,
      usage: currentUsage,
      remaining: Math.max(0, user.daily_limit - currentUsage)
    });

  } catch (error) {
    return NextResponse.json({ valid: false, error: 'Server error' }, { status: 500 });
  }
}

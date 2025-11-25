
import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(req: NextRequest) {
  // Simple protection: only allow if a secret matches (or remove for first run)
  const authHeader = req.headers.get('x-admin-secret');
  if (authHeader !== process.env.ADMIN_SECRET_KEY) {
     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Create Users Table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        client_api_key TEXT UNIQUE NOT NULL,
        tier TEXT DEFAULT 'basic',
        daily_limit INT DEFAULT 20,
        usage_count INT DEFAULT 0,
        last_reset_date DATE DEFAULT CURRENT_DATE,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;

    return NextResponse.json({ message: 'Database schema initialized successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to setup DB' }, { status: 500 });
  }
}

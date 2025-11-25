import { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from '@vercel/postgres';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Simple protection: only allow if a secret matches
  const authHeader = req.headers['x-admin-secret'];
  
  if (authHeader !== process.env.ADMIN_SECRET_KEY) {
     return res.status(401).json({ error: 'Unauthorized' });
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

    return res.status(200).json({ message: 'Database schema initialized successfully' });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to setup DB: ' + error.message });
  }
}
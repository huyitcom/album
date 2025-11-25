import { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from '@vercel/postgres';

// Helper to check admin secret
const checkAdmin = (req: VercelRequest) => {
  const authHeader = req.headers['x-admin-secret'];
  return authHeader === process.env.ADMIN_SECRET_KEY;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!checkAdmin(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // 1. GET: List users
    if (req.method === 'GET') {
      const { rows } = await sql`SELECT * FROM users ORDER BY id DESC`;
      return res.status(200).json({ users: rows });
    }

    // 2. POST: Add user
    if (req.method === 'POST') {
      const { key, tier, limit } = req.body;
      await sql`
        INSERT INTO users (client_api_key, tier, daily_limit, usage_count)
        VALUES (${key}, ${tier}, ${limit}, 0)
      `;
      return res.status(200).json({ success: true });
    }

    // 3. PUT: Update user
    if (req.method === 'PUT') {
      const { id, tier, limit } = req.body;
      
      if (!id) {
          return res.status(400).json({ error: 'User ID is required' });
      }

      await sql`
        UPDATE users 
        SET tier = ${tier}, daily_limit = ${limit}
        WHERE id = ${id}
      `;
      return res.status(200).json({ success: true });
    }

    // 4. DELETE: Remove user
    if (req.method === 'DELETE') {
      const { id } = req.query;
      // Fix: Ensure id is a single string, VercelRequest query params can be string | string[]
      const userId = Array.isArray(id) ? id[0] : id;

      if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
      }
      
      await sql`DELETE FROM users WHERE id = ${userId}`;
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });

  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: 'Database error: ' + error.message });
  }
}
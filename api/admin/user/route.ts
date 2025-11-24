import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

// Hàm kiểm tra bảo mật: Phải có Admin Key mới được thực hiện
const checkAdmin = (req: NextRequest) => {
  const authHeader = req.headers.get('x-admin-secret');
  return authHeader === process.env.ADMIN_SECRET_KEY;
};

// 1. GET: Lấy danh sách tất cả khách hàng
export async function GET(req: NextRequest) {
  if (!checkAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { rows } = await sql`SELECT * FROM users ORDER BY id DESC`;
    return NextResponse.json({ users: rows });
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi lấy dữ liệu' }, { status: 500 });
  }
}

// 2. POST: Thêm khách hàng mới
export async function POST(req: NextRequest) {
  if (!checkAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { key, tier, limit } = await req.json();
    
    // Thêm vào DB
    await sql`
      INSERT INTO users (client_api_key, tier, daily_limit, usage_count)
      VALUES (${key}, ${tier}, ${limit}, 0)
    `;
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi thêm user (Key có thể bị trùng)' }, { status: 500 });
  }
}

// 3. DELETE: Xóa khách hàng
export async function DELETE(req: NextRequest) {
  if (!checkAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    await sql`DELETE FROM users WHERE id = ${id}`;
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi xóa user' }, { status: 500 });
  }
}
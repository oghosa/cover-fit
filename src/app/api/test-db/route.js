import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const result = await sql`SELECT NOW()`;
    return NextResponse.json({ message: 'Database connection successful', time: result.rows[0].now });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({ error: `Database connection failed: ${error.message}` }, { status: 500 });
  }
}
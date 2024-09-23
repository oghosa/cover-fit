import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const result = await sql`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'plans'
    `;
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching table info:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
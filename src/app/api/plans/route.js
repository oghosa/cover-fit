import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('Fetching plans...');
    const result = await sql`SELECT * FROM plans LIMIT 10`;
    console.log('Fetched plans:', result.rows);
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching plans:', error);
    return NextResponse.json({ error: `Failed to fetch plans: ${error.message}`, stack: error.stack }, { status: 500 });
  }
}

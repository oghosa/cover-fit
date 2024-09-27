import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const categoryResult = await sql`SELECT DISTINCT hmo_category FROM hmos ORDER BY hmo_category`;
    const nameResult = await sql`SELECT DISTINCT hmo_name FROM hmos ORDER BY hmo_name`;

    return NextResponse.json({
      hmo_categories: categoryResult.rows.map(row => row.hmo_category),
      hmo_names: nameResult.rows.map(row => row.hmo_name)
    });
  } catch (error) {
    console.error('Error fetching HMO filter options:', error);
    return NextResponse.json({ error: 'Failed to fetch HMO filter options' }, { status: 500 });
  }
}
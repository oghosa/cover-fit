import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const result = await sql`
      SELECT hmo_name, plan_type, plan_name, plan_annual_cost_naira, plan_link
      FROM plans
      WHERE is_coverfit_best = 'Yes'
      ORDER BY plan_annual_cost_naira DESC
      LIMIT 5
    `;

    return NextResponse.json({ plans: result.rows });
  } catch (error) {
    console.error('Error fetching top plans:', error);
    return NextResponse.json({ error: 'Failed to fetch top plans' }, { status: 500 });
  }
}
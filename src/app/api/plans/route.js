import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  const offset = (page - 1) * limit;

  // Extract filter parameters
  const hmo_name = searchParams.get('hmo_name')?.split(',') || [];
  const plan_price_range = searchParams.get('plan_price_range')?.split(',') || [];
  const plan_type = searchParams.get('plan_type')?.split(',') || [];
  const plan_name_full = searchParams.get('plan_name_full')?.split(',') || [];

  console.log('API - Received request with params:', JSON.stringify({ page, limit, hmo_name, plan_price_range, plan_type, plan_name_full }, null, 2));

  try {
    // Construct the WHERE clause based on filters
    let whereClause = [];
    let params = [];
    if (hmo_name.length > 0) {
      whereClause.push(`LOWER(hmo_name) IN (${hmo_name.map((_, i) => `LOWER($${params.length + i + 1})`).join(', ')})`);
      params.push(...hmo_name);
    }
    if (plan_price_range.length > 0) {
      whereClause.push(`plan_price_range IN (${plan_price_range.map((_, i) => `$${params.length + i + 1}`).join(', ')})`);
      params.push(...plan_price_range);
    }
    if (plan_type.length > 0) {
      whereClause.push(`plan_type IN (${plan_type.map((_, i) => `$${params.length + i + 1}`).join(', ')})`);
      params.push(...plan_type);
    }
    if (plan_name_full.length > 0) {
      whereClause.push(`plan_name_full IN (${plan_name_full.map((_, i) => `$${params.length + i + 1}`).join(', ')})`);
      params.push(...plan_name_full);
    }

    const whereClauseString = whereClause.length > 0 ? `WHERE ${whereClause.join(' AND ')}` : '';

    const query = `
      SELECT * FROM plans
      ${whereClauseString}
      ORDER BY Plan_id
      LIMIT $${params.length + 1} OFFSET $${params.length + 2}
    `;

    console.log('API - Executing query:', query);
    console.log('API - Query parameters:', params);

    const result = await sql.query(query, params);
    console.log('API - Query result:', JSON.stringify(result.rows, null, 2));

    const countQuery = `
      SELECT COUNT(*) FROM plans
      ${whereClauseString}
    `;
    const countResult = await sql.query(countQuery, params);
    const totalCount = parseInt(countResult.rows[0].count, 10);
    const totalPages = Math.ceil(totalCount / limit);

    console.log('API - Returning response:', JSON.stringify({ plans: result.rows, totalCount, totalPages }, null, 2));

    return NextResponse.json({ plans: result.rows, totalCount, totalPages });
  } catch (error) {
    console.error('API - Error fetching plans:', error);
    return NextResponse.json({ error: 'Failed to fetch plans' }, { status: 500 });
  }
}

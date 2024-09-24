import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  const offset = (page - 1) * limit;

  // Extract filter parameters
  const hmo_name = searchParams.get('hmo_name');
  const plan_price_range = searchParams.get('plan_price_range');
  const plan_type = searchParams.get('plan_type');
  const plan_name_full = searchParams.get('plan_name_full');

  console.log('API received filters:', { hmo_name, plan_price_range, plan_type, plan_name_full });

  try {
    // Construct the WHERE clause based on filters
    let whereClause = [];
    let params = [];
    if (hmo_name) {
      whereClause.push(`LOWER(hmo_name) = LOWER($${params.length + 1})`);
      params.push(hmo_name);
    }
    if (plan_price_range) {
      whereClause.push(`plan_price_range = $${params.length + 1}`);
      params.push(plan_price_range);
    }
    if (plan_type) {
      whereClause.push(`plan_type = $${params.length + 1}`);
      params.push(plan_type);
    }
    if (plan_name_full) {
      whereClause.push(`plan_name_full = $${params.length + 1}`);
      params.push(plan_name_full);
    }

    const whereClauseString = whereClause.length > 0 ? `WHERE ${whereClause.join(' AND ')}` : '';

    const query = `
      SELECT * FROM plans
      ${whereClauseString}
      ORDER BY Plan_id
      LIMIT $${params.length + 1} OFFSET $${params.length + 2}
    `;

    console.log('Constructed SQL query:', query);
    console.log('Query parameters:', params);

    const result = await sql.query(query, [...params, limit, offset]);
    
    console.log('Query result count:', result.rows.length);
    console.log('First result item:', result.rows[0]);

    const countQuery = `
      SELECT COUNT(*) FROM plans
      ${whereClauseString}
    `;
    const countResult = await sql.query(countQuery, params);
    const totalCount = parseInt(countResult.rows[0].count, 10);

    console.log('Total count:', totalCount);

    return NextResponse.json({
      plans: result.rows,
      totalCount: totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
      appliedFilters: { hmo_name, plan_price_range, plan_type, plan_name_full },
      constructedQuery: query,
      queryParams: params
    });
  } catch (error) {
    console.error('Error in GET /api/plans:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

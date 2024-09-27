import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request) {
  console.log('HMOs API route hit');
  const { searchParams } = new URL(request.url);
  console.log('Search params:', Object.fromEntries(searchParams));

  const page = parseInt(searchParams.get('page')) || 1;
  const limit = parseInt(searchParams.get('limit')) || 10;
  const offset = (page - 1) * limit;
  console.log(`Page: ${page}, Limit: ${limit}, Offset: ${offset}`);

  const hmo_categories = searchParams.get('hmo_category')?.split(',') || [];
  const hmo_names = searchParams.get('hmo_name')?.split(',') || [];
  console.log(`Filters - Categories: ${hmo_categories}, Names: ${hmo_names}`);

  try {
    console.log('Constructing base query');
    let queryString = `
      SELECT 
        hmo_name, hmo_category, hmo_website, hmo_email, 
        hmo_phone_number, hmo_address, hmo_providers_link, 
        hmo_provider_count_estimate, hmo_last_updated, 
        hmo_number_of_plans, hmo_min_plan_cost, hmo_average_plan_cost
      FROM hmos 
      WHERE 1=1
    `;
    let queryParams = [];

    if (hmo_categories.length > 0) {
      console.log('Adding category filter');
      queryString += ` AND hmo_category IN (${hmo_categories.map((_, i) => `$${queryParams.length + i + 1}`).join(', ')})`;
      queryParams.push(...hmo_categories);
    }

    if (hmo_names.length > 0) {
      console.log('Adding name filter');
      queryString += ` AND hmo_name IN (${hmo_names.map((_, i) => `$${queryParams.length + i + 1}`).join(', ')})`;
      queryParams.push(...hmo_names);
    }

    console.log('Adding order, limit and offset');
    queryString += ` ORDER BY hmo_name LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}`;
    queryParams.push(limit, offset);

    console.log('Final query:', queryString);
    console.log('Query parameters:', queryParams);

    console.log('Executing main query');
    const result = await sql.query(queryString, queryParams);
    console.log(`Main query returned ${result.rows.length} rows`);

    console.log('Executing count query');
    const countQueryString = `SELECT COUNT(*) FROM hmos WHERE 1=1${queryString.split('WHERE 1=1')[1].split('ORDER BY')[0]}`;
    const countResult = await sql.query(countQueryString, queryParams.slice(0, -2));
    const totalCount = parseInt(countResult.rows[0].count);
    const totalPages = Math.ceil(totalCount / limit);
    console.log(`Total count: ${totalCount}, Total pages: ${totalPages}`);

    console.log('Preparing response');
    return NextResponse.json({
      hmos: result.rows.map((row, index) => ({ hmo_id: offset + index + 1, ...row })),
      totalPages,
      totalCount
    });
  } catch (error) {
    console.error('Error in HMOs API:', error);
    console.error('Error stack:', error.stack);
    return NextResponse.json({ error: 'Failed to fetch HMOs', details: error.message }, { status: 500 });
  }
}
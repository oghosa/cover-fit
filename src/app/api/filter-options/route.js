import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('API: Fetching filter options...');
    
    const columns = ['hmo_name', 'plan_price_range', 'plan_type', 'plan_name'];
    const filterOptions = {
      hmos: [],
      priceRanges: [],
      planTypes: [],
      planNames: []
    };

    for (const column of columns) {
      try {
        console.log(`API: Fetching distinct values for ${column}...`);
        const query = `
          SELECT DISTINCT "${column}"
          FROM plans 
          WHERE "${column}" IS NOT NULL AND "${column}" != ''
          ORDER BY "${column}"
          LIMIT 100
        `;
        const result = await sql.query(query);
        console.log(`API: Result for ${column}:`, JSON.stringify(result.rows, null, 2));
        
        switch(column) {
          case 'hmo_name':
            filterOptions.hmos = result.rows.map(row => row[column]);
            break;
          case 'plan_price_range':
            filterOptions.priceRanges = result.rows.map(row => row[column]);
            break;
          case 'plan_type':
            filterOptions.planTypes = result.rows.map(row => row[column]);
            break;
          case 'plan_name':
            filterOptions.planNames = result.rows.map(row => row[column]);
            break;
        }
      } catch (columnError) {
        console.error(`API: Error fetching distinct values for ${column}:`, columnError);
      }
    }

    console.log('API: Final filter options:', JSON.stringify(filterOptions, null, 2));
    return NextResponse.json(filterOptions);
  } catch (error) {
    console.error('API: Error fetching filter options:', error);
    return NextResponse.json({ error: 'Failed to fetch filter options' }, { status: 500 });
  }
}



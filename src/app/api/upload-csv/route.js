import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { parse } from 'csv-parse/sync';  // Change this line

export async function POST(request) {
  try {
    console.log('Starting CSV upload process...');
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      console.log('No file uploaded');
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    console.log('File received, reading content...');
    const fileContent = await file.text();
    console.log('File content read, parsing CSV...');
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
    });

    console.log(`Parsed ${records.length} records from CSV`);

    for (const [index, record] of records.entries()) {
      try {
        await sql`
          INSERT INTO plans (
            Plan_id,
            HMO_id,
            HMO_Name,
            Plan_Category,
            Plan_Name,
            Plan_Details_Highlights,
            Plan_Cost_USD,
            Plan_Annual_Cost_Naira,
            Plan_Link,
            Plan_Detailed_Additional_Information,
            Plan_Last_Updated,
            Plan_Price_Range,
            Plan_Type,
            Plan_Name_Full
          ) VALUES (
            ${record.Plan_id || null},
            ${record.HMO_id || null},
            ${record.HMO_Name || ''},
            ${record.Plan_Category || ''},
            ${record.Plan_Name || ''},
            ${record.Plan_Details_Highlights || ''},
            ${record.Plan_Cost_USD || null},
            ${record.Plan_Annual_Cost_Naira || null},
            ${record.Plan_Link || ''},
            ${record.Plan_Detailed_Additional_Information || ''},
            ${record.Plan_Last_Updated || null},
            ${record.Plan_Price_Range || ''},
            ${record.Plan_Type || ''},
            ${record.Plan_Name_Full || ''}
          )
          ON CONFLICT (Plan_id)
          DO UPDATE SET
            HMO_id = EXCLUDED.HMO_id,
            HMO_Name = EXCLUDED.HMO_Name,
            Plan_Category = EXCLUDED.Plan_Category,
            Plan_Name = EXCLUDED.Plan_Name,
            Plan_Details_Highlights = EXCLUDED.Plan_Details_Highlights,
            Plan_Cost_USD = EXCLUDED.Plan_Cost_USD,
            Plan_Annual_Cost_Naira = EXCLUDED.Plan_Annual_Cost_Naira,
            Plan_Link = EXCLUDED.Plan_Link,
            Plan_Detailed_Additional_Information = EXCLUDED.Plan_Detailed_Additional_Information,
            Plan_Last_Updated = EXCLUDED.Plan_Last_Updated,
            Plan_Price_Range = EXCLUDED.Plan_Price_Range,
            Plan_Type = EXCLUDED.Plan_Type,
            Plan_Name_Full = EXCLUDED.Plan_Name_Full
        `;
        console.log(`Processed record ${index + 1}`);
      } catch (insertError) {
        console.error(`Error processing record ${index + 1}:`, insertError);
        throw insertError;
      }
    }

    console.log('CSV data uploaded and merged successfully');
    return NextResponse.json({ message: 'CSV data uploaded and merged successfully' });
  } catch (error) {
    console.error('Error uploading CSV:', error);
    return NextResponse.json({ error: `Failed to upload CSV: ${error.message}` }, { status: 500 });
  }
}

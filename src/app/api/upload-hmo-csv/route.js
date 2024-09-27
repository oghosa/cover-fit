import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { parse } from 'csv-parse/sync';

export async function POST(request) {
  try {
    console.log('Starting HMO CSV upload process...');
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
          INSERT INTO hmos (
            HMO_id,
            HMO_Name,
            HMO_Category,
            HMO_Website,
            HMO_Email,
            HMO_Phone_Number,
            HMO_Address,
            HMO_Providers_link,
            HMO_Provider_Count_Estimate,
            HMO_Last_Updated,
            HMO_Number_of_Plans,
            HMO_Min_Plan_Cost,
            HMO_Average_Plan_Cost
          ) VALUES (
            ${record.HMO_id || null},
            ${record.HMO_Name || ''},
            ${record.HMO_Category || ''},
            ${record.HMO_Website || ''},
            ${record.HMO_Email || ''},
            ${record.HMO_Phone_Number || ''},
            ${record.HMO_Address || ''},
            ${record.HMO_Providers_link || ''},
            ${record.HMO_Provider_Count_Estimate || ''},
            ${record.HMO_Last_Updated || null},
            ${record.HMO_Number_of_Plans || null},
            ${record.HMO_Min_Plan_Cost || null},
            ${record.HMO_Average_Plan_Cost || null}
          )
          ON CONFLICT (HMO_id)
          DO UPDATE SET
            HMO_Name = EXCLUDED.HMO_Name,
            HMO_Category = EXCLUDED.HMO_Category,
            HMO_Website = EXCLUDED.HMO_Website,
            HMO_Email = EXCLUDED.HMO_Email,
            HMO_Phone_Number = EXCLUDED.HMO_Phone_Number,
            HMO_Address = EXCLUDED.HMO_Address,
            HMO_Providers_link = EXCLUDED.HMO_Providers_link,
            HMO_Provider_Count_Estimate = EXCLUDED.HMO_Provider_Count_Estimate,
            HMO_Last_Updated = EXCLUDED.HMO_Last_Updated,
            HMO_Number_of_Plans = EXCLUDED.HMO_Number_of_Plans,
            HMO_Min_Plan_Cost = EXCLUDED.HMO_Min_Plan_Cost,
            HMO_Average_Plan_Cost = EXCLUDED.HMO_Average_Plan_Cost
        `;
        console.log(`Processed HMO record ${index + 1}`);
      } catch (insertError) {
        console.error(`Error processing HMO record ${index + 1}:`, insertError);
        throw insertError;
      }
    }

    return NextResponse.json({ message: 'HMO CSV uploaded and processed successfully' });
  } catch (error) {
    console.error('Error processing HMO CSV:', error);
    return NextResponse.json({ error: `Failed to process HMO CSV: ${error.message}` }, { status: 500 });
  }
}
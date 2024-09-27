import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

async function seedDatabase() {
  console.log('Starting database seeding process for HMOs...');

  try {
    // Test the database connection
    const testConnection = await sql`SELECT NOW()`;
    console.log('Database connection successful:', testConnection);

    // Drop the existing hmos table
    await sql`DROP TABLE IF EXISTS hmos`;
    console.log('Dropped existing hmos table');

    // Create the hmos table with updated column types
    await sql`
      CREATE TABLE hmos (
        HMO_id INTEGER PRIMARY KEY,
        HMO_Name VARCHAR(255),
        HMO_Category VARCHAR(255),
        HMO_Website TEXT,
        HMO_Email VARCHAR(255),
        HMO_Phone_Number VARCHAR(255),
        HMO_Address TEXT,
        HMO_Providers_link TEXT,
        HMO_Provider_Count_Estimate VARCHAR(255),
        HMO_Last_Updated DATE,
        HMO_Number_of_Plans INTEGER,
        HMO_Min_Plan_Cost VARCHAR(255),
        HMO_Average_Plan_Cost VARCHAR(255)
      )
    `;
    console.log('Created new hmos table');

    // Insert some sample data into the hmos table
    await sql`
      INSERT INTO hmos (HMO_id, HMO_Name, HMO_Category, HMO_Website, HMO_Email, HMO_Phone_Number, HMO_Min_Plan_Cost, HMO_Average_Plan_Cost)
      VALUES 
        (1, 'Sample HMO 1', 'Private', 'https://www.samplehmo1.com', 'info@samplehmo1.com', '+234 123 456 7890', '50000', '75000'),
        (2, 'Sample HMO 2', 'Public', 'https://www.samplehmo2.com', 'info@samplehmo2.com', '+234 098 765 4321', '40000', '60000'),
        (3, 'Sample HMO 3', 'Private', 'https://www.samplehmo3.com', 'info@samplehmo3.com', '+234 111 222 3333', '60000', '80000')
    `;
    console.log('Inserted sample data into hmos table');

    return { success: true, message: 'HMOs table seeded successfully' };
  } catch (error) {
    console.error('Error seeding HMOs database:', error);
    return { success: false, error: error.message };
  }
}

export async function POST(request) {
  const result = await seedDatabase();
  if (result.success) {
    return NextResponse.json({ message: result.message });
  } else {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }
}

export async function GET(request) {
  return NextResponse.json({ message: "Use POST method to seed the database" }, { status: 405 });
}

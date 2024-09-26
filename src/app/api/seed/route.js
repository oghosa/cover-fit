import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

async function seedDatabase() {
  console.log('Starting database seeding process...');

  try {
    // Test the database connection
    const testConnection = await sql`SELECT NOW()`;
    console.log('Database connection successful:', testConnection);

    // Drop the table if it exists
    await sql`DROP TABLE IF EXISTS plans`;
    console.log('Dropped existing plans table');

    // Create the plans table
    await sql`
      CREATE TABLE plans (
        Plan_id INTEGER PRIMARY KEY,
        HMO_id INTEGER,
        HMO_Name VARCHAR(255),
        Plan_Category VARCHAR(255),
        Plan_Name VARCHAR(255),
        Plan_Details_Highlights TEXT,
        Plan_Cost_USD VARCHAR(255),
        Plan_Annual_Cost_Naira VARCHAR(255),
        Plan_Link TEXT,
        Plan_Detailed_Additional_Information TEXT,
        Plan_Last_Updated DATE,
        Plan_Price_Range VARCHAR(255),
        Plan_Type VARCHAR(255),
        Plan_Name_Full VARCHAR(255),
        Is_CoverFit_Best VARCHAR(255)
      )
    `;
    console.log('Created new plans table');

    // Insert some sample data
    await sql`
      INSERT INTO plans (Plan_id, HMO_Name, Plan_Name, Plan_Type, Plan_Price_Range)
      VALUES 
        (1, 'Sample HMO 1', 'Basic Plan', 'Individual', 'Low'),
        (2, 'Sample HMO 2', 'Family Plan', 'Family', 'Medium'),
        (3, 'Sample HMO 3', 'Premium Plan', 'Individual', 'High')
    `;
    console.log('Inserted sample data');

    return { success: true, message: 'Database seeded successfully' };
  } catch (error) {
    console.error('Error seeding database:', error);
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

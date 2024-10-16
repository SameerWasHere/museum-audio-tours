// app/api/artworks/route.js
import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM artworks ORDER BY id DESC');
    client.release();
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching artworks:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}



// app/api/artworks/route.js
import { NextResponse } from 'next/server';
import { Client } from 'pg';

export async function GET() {
  const client = new Client({
    connectionString: process.env.POSTGRES_URL,
  });

  try {
    await client.connect();
    const result = await client.query('SELECT * FROM artworks');
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching artworks:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await client.end();
  }
}


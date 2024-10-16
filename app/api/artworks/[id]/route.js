// app/api/artworks/[id]/route.js
import { NextResponse } from 'next/server';
import { Client } from 'pg';

export async function GET(req, { params }) {
  const client = new Client({
    connectionString: process.env.POSTGRES_URL,
  });

  const { id } = params;

  try {
    await client.connect();
    const result = await client.query('SELECT * FROM artworks WHERE id = $1', [id]);
    if (result.rows.length > 0) {
      return NextResponse.json(result.rows[0]);
    } else {
      return NextResponse.json({ error: 'Artwork not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching artwork:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await client.end();
  }
}


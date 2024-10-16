// app/api/artworks/[id]/route.js
import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM artworks WHERE id = $1', [id]);
    client.release();

    if (result.rows.length > 0) {
      return NextResponse.json(result.rows[0]);
    } else {
      return NextResponse.json({ error: 'Artwork not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching artwork:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}



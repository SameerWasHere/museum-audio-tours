// app/sfmoma/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type Artwork = {
  id: number;
  artist_name: string;
  title: string;
  image_url: string;
  short_description: string;
  long_description: string;
};

export default function SFMOMA() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Artwork[]>([]);
  const [artworks, setArtworks] = useState<Artwork[]>([]);

  useEffect(() => {
    fetchArtworksData().then((data) => {
      setArtworks(data);
      setResults(data); // Display all artworks initially
    });
  }, []);

  useEffect(() => {
    if (query) {
      setResults(
        artworks.filter((art: Artwork) =>
          art.title.toLowerCase().includes(query.toLowerCase()) ||
          art.artist_name.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setResults(artworks); // Default to all artworks
    }
  }, [query, artworks]);

  async function fetchArtworksData(): Promise<Artwork[]> {
    try {
      const res = await fetch('/api/artworks');
      if (!res.ok) {
        throw new Error('Failed to fetch artworks');
      }
      return await res.json();
    } catch (error) {
      console.error('Error fetching artworks:', error);
      return [];
    }
  }

  function playDescription(text: string) {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">SFMOMA</h1>
      <input
        type="text"
        placeholder="Search artwork..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border border-gray-300 p-2 mb-4 w-full rounded"
      />
      <div className="results-section">
        {results.map((art: Artwork) => (
          <div key={art.id} className="flex items-center mb-4 p-4 border rounded bg-white shadow">
            <img
              src={art.image_url}
              alt={art.title}
              className="w-24 h-24 object-cover mr-4 rounded"
            />
            <div className="flex-1">
              <p className="font-semibold">
                {art.artist_name}, {art.title}
              </p>
              <div className="flex gap-2 mt-2">
                <Link href={`/sfmoma/${art.id}`}>
                  <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 transition">
                    Info
                  </button>
                </Link>
                <button
                  onClick={() => playDescription(art.short_description)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                >
                  Play Short Description
                </button>
                <button
                  onClick={() => playDescription(art.long_description)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-700 transition"
                >
                  Play Long Description
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

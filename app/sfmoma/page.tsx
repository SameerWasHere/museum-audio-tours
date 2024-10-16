// app/sfmoma/page.tsx
'use client';

import { useEffect, useState } from 'react';
import ArtworkTable from '../../components/ArtworkTable';

type Artwork = {
  id: number;
  artist_name: string;
  title: string;
  image_url: string;
  date_created: string;
  classification: string;
  medium: string;
  dimensions: string;
  date_acquired: string;
  credit: string;
  copyright: string;
  short_description: string;
  long_description: string;
};

export default function SFMOMAPage() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const res = await fetch('/api/artworks');
        if (!res.ok) {
          throw new Error('Failed to fetch artworks.');
        }
        const data: Artwork[] = await res.json();
        setArtworks(data);
      } catch (err) {
        setError('Failed to load artworks.');
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  if (loading) {
    return <p className="p-4 text-center">Loading artworks...</p>;
  }

  if (error) {
    return <p className="text-red-500 p-4 text-center">{error}</p>;
  }

  return (
    <div className="container mx-auto p-2 sm:p-4">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center">SFMOMA Artworks</h1>
      <ArtworkTable artworks={artworks} />
    </div>
  );
}



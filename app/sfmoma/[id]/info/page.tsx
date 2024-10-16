// app/sfmoma/[id]/info/page.tsx
'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

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

export default function ArtworkInfoPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('No artwork ID provided.');
      setLoading(false);
      return;
    }

    const fetchArtwork = async () => {
      try {
        const res = await fetch(`/api/artworks/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch artwork.');
        }
        const data: Artwork = await res.json();
        setArtwork(data);
      } catch {
        setError('Failed to load artwork.');
      } finally {
        setLoading(false);
      }
    };

    fetchArtwork();
  }, [id]);

  if (loading) {
    return <p className="p-4 text-center">Loading artwork info...</p>;
  }

  if (error || !artwork) {
    return <p className="text-red-500 p-4 text-center">{error || 'Artwork not found.'}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">{artwork.title}</h1>
      <p className="text-center mb-4">by {artwork.artist_name}</p>
      <div className="flex flex-col items-center">
        <Image
          src={artwork.image_url}
          alt={artwork.title}
          width={256}
          height={256}
          className="object-cover rounded mb-4 w-64 h-64 sm:w-96 sm:h-96"
        />
        <p className="mb-2"><strong>Date Created:</strong> {artwork.date_created}</p>
        <p className="mb-2"><strong>Classification:</strong> {artwork.classification}</p>
        <p className="mb-2"><strong>Medium:</strong> {artwork.medium}</p>
        <p className="mb-2"><strong>Dimensions:</strong> {artwork.dimensions}</p>
        <p className="mb-2"><strong>Date Acquired:</strong> {artwork.date_acquired}</p>
        <p className="mb-2"><strong>Credit:</strong> {artwork.credit}</p>
        <p className="mb-2"><strong>Copyright:</strong> {artwork.copyright}</p>
        <p className="mb-4"><strong>Short Description:</strong> {artwork.short_description}</p>
        <p className="mb-4"><strong>Long Description:</strong> {artwork.long_description}</p>
        <button
          onClick={() => router.back()}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}



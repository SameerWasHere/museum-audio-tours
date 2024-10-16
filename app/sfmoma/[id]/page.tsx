// app/sfmoma/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

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

export default function ArtworkInfo() {
  const { id } = useParams();
  const router = useRouter();
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Function to normalize the id to a string
    const normalizeId = (idParam: string | string[] | undefined): string | null => {
      if (typeof idParam === 'string') {
        return idParam;
      } else if (Array.isArray(idParam) && idParam.length > 0) {
        return idParam[0];
      }
      return null;
    };

    const normalizedId = normalizeId(id);

    if (normalizedId) {
      fetchArtworkData(normalizedId)
        .then((data) => {
          if (data) {
            setArtwork(data);
          } else {
            setError('Artwork not found.');
          }
        })
        .catch((err) => {
          console.error('Error fetching artwork:', err);
          setError('Failed to fetch artwork data.');
        });
    } else {
      setError('Invalid artwork ID.');
    }
  }, [id]);

  async function fetchArtworkData(id: string): Promise<Artwork | null> {
    try {
      const res = await fetch(`/api/artworks/${id}`);
      if (!res.ok) {
        if (res.status === 404) {
          return null;
        }
        throw new Error('Failed to fetch artwork');
      }
      return await res.json();
    } catch (error) {
      console.error('Error fetching artwork:', error);
      throw error;
    }
  }

  function playDescription(text: string) {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    } else {
      alert('Speech Synthesis not supported in your browser.');
    }
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => router.back()}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!artwork) {
    return <p className="p-4">Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <img
        src={artwork.image_url}
        alt={artwork.title}
        className="w-full max-w-2xl mb-4 rounded shadow"
      />
      <h2 className="text-3xl mb-2">
        {artwork.artist_name}, {artwork.title}
      </h2>
      <p><strong>Date Created:</strong> {artwork.date_created}</p>
      <p><strong>Classification:</strong> {artwork.classification}</p>
      <p><strong>Medium:</strong> {artwork.medium}</p>
      <p><strong>Dimensions:</strong> {artwork.dimensions}</p>
      <p><strong>Date Acquired:</strong> {artwork.date_acquired}</p>
      <p><strong>Credit:</strong> {artwork.credit}</p>
      <p><strong>Copyright:</strong> {artwork.copyright}</p>
      <div className="mt-4">
        <button
          onClick={() => playDescription(artwork.short_description)}
          className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-700 transition"
        >
          Play Short Description
        </button>
        <button
          onClick={() => playDescription(artwork.long_description)}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700 transition"
        >
          Play Long Description
        </button>
      </div>
    </div>
  );
}


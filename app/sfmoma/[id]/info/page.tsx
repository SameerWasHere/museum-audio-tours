// app/sfmoma/[id]/info/page.tsx
'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';

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

type ArtworkInfoPageProps = {
  params: {
    id: string;
  };
};

export default function ArtworkInfoPage({ params }: ArtworkInfoPageProps) {
  const router = useRouter();
  const { id } = params;

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

  const speakDescription = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop any ongoing speech
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Sorry, your browser does not support speech synthesis.');
    }
  }, []);

  if (loading) {
    return <p className="p-4 text-center">Loading artwork info...</p>;
  }

  if (error || !artwork) {
    return <p className="text-red-500 p-4 text-center">{error || 'Artwork not found.'}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2 text-center">{artwork.title}</h1>
      <p className="mb-6 text-center">by {artwork.artist_name}</p>
      <div className="flex justify-center mb-6">
        <Image
          src={artwork.image_url}
          alt={artwork.title}
          width={600}
          height={400}
          className="object-contain rounded max-w-full h-auto"
        />
      </div>
      <div className="mb-4">
        <strong>Date Created:</strong> {artwork.date_created}
      </div>
      <div className="mb-4">
        <strong>Classification:</strong> {artwork.classification}
      </div>
      <div className="mb-4">
        <strong>Medium:</strong> {artwork.medium}
      </div>
      <div className="mb-4">
        <strong>Dimensions:</strong> {artwork.dimensions}
      </div>
      <div className="mb-4">
        <strong>Date Acquired:</strong> {artwork.date_acquired}
      </div>
      <div className="mb-4">
        <strong>Credit:</strong> {artwork.credit}
      </div>
      <div className="mb-4">
        <strong>Copyright:</strong> {artwork.copyright}
      </div>
      {/* Play Short Description Button */}
      <div className="mb-2">
        <button
          onClick={() => speakDescription(artwork.short_description)}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          aria-label={`Play short description for ${artwork.title}`}
        >
          Play Short Description
        </button>
      </div>
      <div className="mb-6">
        <strong>Short Description:</strong> {artwork.short_description}
      </div>
      {/* Play Long Description Button */}
      <div className="mb-2">
        <button
          onClick={() => speakDescription(artwork.long_description)}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          aria-label={`Play long description for ${artwork.title}`}
        >
          Play Long Description
        </button>
      </div>
      <div className="mb-6">
        <strong>Long Description:</strong> {artwork.long_description}
      </div>
      <button
        onClick={() => router.back()}
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
      >
        Go Back
      </button>
    </div>
  );
}




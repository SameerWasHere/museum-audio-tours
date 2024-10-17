// app/sfmoma/[id]/info/page.tsx
'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
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

type ArtworkInfoPageProps = {
  params: {
    id: string;
  };
};

export default function ArtworkInfoPage({ params }: ArtworkInfoPageProps) {
  const router = useRouter();
  const { id } = params;

  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [loadingShort, setLoadingShort] = useState<boolean>(false);
  const [loadingLong, setLoadingLong] = useState<boolean>(false);
  const [audioInstance, setAudioInstance] = useState<HTMLAudioElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('No artwork ID provided.');
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
      }
    };

    fetchArtwork();
  }, [id]);

  const handleAudio = async (text: string, isShort: boolean) => {
    const setLoading = isShort ? setLoadingShort : setLoadingLong;
    const loadingState = isShort ? loadingShort : loadingLong;

    if (loadingState) {
      if (audioInstance) {
        audioInstance.pause();
        URL.revokeObjectURL(audioInstance.src);
        setAudioInstance(null);
      }
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/generate-audio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate audio.');
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);

      setAudioInstance(audio);
      audio.play();

      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
        setAudioInstance(null);
        setLoading(false);
      };
    } catch (error: unknown) {
      console.error('Error generating audio:', error);
      alert(error instanceof Error ? error.message : 'Failed to generate audio.');
      setLoading(false);
    }
  };

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
          onClick={() => handleAudio(artwork.short_description, true)}
          className={`w-24 px-2 py-1 rounded focus:outline-none focus:ring-2 text-sm text-center text-black ${
            loadingShort ? 'bg-red-500 hover:bg-red-700' : 'bg-purple-400 hover:bg-purple-700 focus:ring-purple-400'
          }`}
          aria-label={`Play short description for ${artwork.title}`}
        >
          {loadingShort ? 'Stop' : 'Play Short'}
        </button>
      </div>
      <div className="mb-6">
        <strong>Short Description:</strong> {artwork.short_description}
      </div>
      {/* Play Long Description Button */}
      <div className="mb-2">
        <button
          onClick={() => handleAudio(artwork.long_description, false)}
          className={`w-24 px-2 py-1 rounded focus:outline-none focus:ring-2 text-sm text-center text-black ${
            loadingLong ? 'bg-red-500 hover:bg-red-700' : 'bg-orange-400 hover:bg-orange-800 focus:ring-orange-400'
          }`}
          aria-label={`Play long description for ${artwork.title}`}
        >
          {loadingLong ? 'Stop' : 'Play Long'}
        </button>
      </div>
      <div className="mb-6">
        <strong>Long Description:</strong> {artwork.long_description}
      </div>
      <button
        onClick={() => router.back()}
        className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
      >
        Go Back
      </button>
    </div>
  );
}








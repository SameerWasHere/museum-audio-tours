// components/ArtworkRow.tsx

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

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

type ArtworkRowProps = {
  artwork: Artwork;
};

export default function ArtworkRow({ artwork }: ArtworkRowProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const generateAudio = async (text: string) => {
    setLoading(true);
    try {
      // Stop any ongoing audio
      if (audioUrl) {
        const existingAudio = new Audio(audioUrl);
        existingAudio.pause();
        URL.revokeObjectURL(audioUrl);
        setAudioUrl(null);
      }

      const response = await fetch('/api/generate-audio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'x-api-key': process.env.NEXT_PUBLIC_TTS_API_KEY, // Uncomment if using API key
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate audio.');
      }

      const audioBlob = await response.blob();
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);

      // Play the audio
      const audio = new Audio(url);
      audio.play();

      // Revoke the object URL after playback
      audio.onended = () => {
        URL.revokeObjectURL(url);
        setAudioUrl(null);
      };
    } catch (error: unknown) {
      console.error('Error generating audio:', error);
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('Failed to generate audio.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <tr className="border-b">
      {/* Thumbnail Column */}
      <td className="px-4 py-2">
        <Image
          src={artwork.image_url}
          alt={artwork.title}
          width={128}
          height={128}
          className="object-cover rounded w-32 h-32 sm:w-40 sm:h-40 max-w-full"
        />
      </td>

      {/* Artist & Artwork Column */}
      <td className="px-4 py-2 text-gray-700 dark:text-gray-200">
        <span className="font-semibold">{artwork.artist_name}</span>, {artwork.title}
      </td>

      {/* Actions Column */}
      <td className="px-4 py-2">
        <div className="flex flex-col gap-2">
          {/* Info Button */}
          <Link href={`/sfmoma/${artwork.id}/info`}>
            <a
              aria-label={`View info for ${artwork.title}`}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-sm sm:text-base text-center"
            >
              Info
            </a>
          </Link>

          {/* Play Short Description Button */}
          <button
            onClick={() => generateAudio(artwork.short_description)}
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 transition text-sm sm:text-base text-center"
            aria-label={`Play short description for ${artwork.title}`}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Play Short'}
          </button>

          {/* Play Long Description Button */}
          <button
            onClick={() => generateAudio(artwork.long_description)}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition text-sm sm:text-base text-center"
            aria-label={`Play long description for ${artwork.title}`}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Play Long'}
          </button>
        </div>
      </td>
    </tr>
  );
}



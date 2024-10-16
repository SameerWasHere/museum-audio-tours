// components/ArtworkRow.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback } from 'react';

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
  const speakDescription = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop any ongoing speech
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Sorry, your browser does not support speech synthesis.');
    }
  }, []);

  return (
    <tr className="border-b">
      {/* Thumbnail Column */}
      <td className="px-4 py-2">
        <Image
          src={artwork.image_url}
          alt={artwork.title}
          width={64}
          height={64}
          className="object-cover rounded w-16 h-16 sm:w-24 sm:h-24 max-w-full"
        />
      </td>

      {/* Artist & Artwork Column */}
      <td className="px-4 py-2 text-gray-700 dark:text-gray-200">
        <span className="font-semibold">{artwork.artist_name}</span>, {artwork.title}
      </td>

      {/* Actions Column */}
      <td className="px-4 py-2">
        <div className="flex flex-wrap gap-2">
          {/* Info Button */}
          <Link href={`/sfmoma/${artwork.id}/info`}>
            <a
              aria-label={`View info for ${artwork.title}`}
              className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-sm sm:px-3 sm:py-2 sm:text-base"
            >
              Info
            </a>
          </Link>

          {/* Play Short Description Button */}
          <button
            onClick={() => speakDescription(artwork.short_description)}
            className="bg-purple-500 text-white px-2 py-1 rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 transition text-sm sm:px-3 sm:py-2 sm:text-base"
            aria-label={`Play short description for ${artwork.title}`}
          >
            Play Short
          </button>

          {/* Play Long Description Button */}
          <button
            onClick={() => speakDescription(artwork.long_description)}
            className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition text-sm sm:px-3 sm:py-2 sm:text-base"
            aria-label={`Play long description for ${artwork.title}`}
          >
            Play Long
          </button>
        </div>
      </td>
    </tr>
  );
}


'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

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
  const [loadingShort, setLoadingShort] = useState(false);
  const [loadingLong, setLoadingLong] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioInstance, setAudioInstance] = useState<HTMLAudioElement | null>(null);

  const generateAudio = async (text: string, isShort: boolean) => {
    const setLoading = isShort ? setLoadingShort : setLoadingLong;
    setLoading(true);

    try {
      if (audioInstance) {
        audioInstance.pause();
        URL.revokeObjectURL(audioUrl!);
        setAudioUrl(null);
        setAudioInstance(null);
        setLoading(false);
        return;
      }

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
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);

      const audio = new Audio(url);
      setAudioInstance(audio);
      audio.play();

      audio.onended = () => {
        URL.revokeObjectURL(url);
        setAudioUrl(null);
        setAudioInstance(null);
        setLoading(false);
      };
    } catch (error: unknown) {
      console.error('Error generating audio:', error);
      alert(error instanceof Error ? error.message : 'Failed to generate audio.');
      setLoading(false);
    }
  };

  // Cleanup audio when the component unmounts
  useEffect(() => {
    return () => {
      if (audioInstance) {
        audioInstance.pause();
        URL.revokeObjectURL(audioInstance.src);
      }
    };
  }, [audioInstance]);

  return (
    <tr className="border-b">
      {/* Thumbnail Column */}
      <td className="px-4 py-2">
        <Image
          src={artwork.image_url}
          alt={artwork.title}
          width={100}
          height={100}
          className="object-cover rounded w-30 h-30 sm:w-40 sm:h-40 max-w-full"
        />
      </td>

      {/* Artist & Artwork Column */}
      <td className="px-3 py-2 text-gray-700 dark:text-gray-200">
        <span className="font-semibold">{artwork.artist_name}</span>, {artwork.title}
      </td>

      {/* Actions Column */}
      <td className="px-3 py-2">
        <div className="flex flex-col items-end gap-2">
          {/* Info Button */}
          <Link 
            href={`/sfmoma/${artwork.id}/info`} 
            aria-label={`View info for ${artwork.title}`}
            className="w-24 bg-blue-400 text-black px-2 py-1 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-sm text-center"
          >
            Info
          </Link>

          {/* Play Short Description Button */}
          <button
            onClick={() => generateAudio(artwork.short_description, true)}
            className={`w-24 px-2 py-1 rounded focus:outline-none focus:ring-2 text-sm text-center text-black ${
              loadingShort ? 'bg-red-500 hover:bg-red-700' : 'bg-purple-400 hover:bg-purple-700 focus:ring-purple-400'
            }`}
            aria-label={`Play short description for ${artwork.title}`}
          >
            {loadingShort ? 'Stop' : 'Play Short'}
          </button>

          {/* Play Long Description Button */}
          <button
            onClick={() => generateAudio(artwork.long_description, false)}
            className={`w-24 px-2 py-1 rounded focus:outline-none focus:ring-2 text-sm text-center text-black ${
              loadingLong ? 'bg-red-500 hover:bg-red-700' : 'bg-orange-400 hover:bg-orange-800 focus:ring-orange-400'
            }`}
            aria-label={`Play long description for ${artwork.title}`}
          >
            {loadingLong ? 'Stop' : 'Play Long'}
          </button>
        </div>
      </td>
    </tr>
  );
}



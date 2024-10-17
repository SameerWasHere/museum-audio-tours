// app/sfmoma/page.tsx
'use client';

import { useEffect, useState, useRef } from 'react';
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
  const [filteredArtworks, setFilteredArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const res = await fetch('/api/artworks');
        if (!res.ok) {
          throw new Error('Failed to fetch artworks.');
        }
        const data: Artwork[] = await res.json();
        setArtworks(data);
        setFilteredArtworks(data.slice(0, 10)); // Initially display only the first 10 artworks
      } catch {
        setError('Failed to load artworks.');
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      if (searchQuery.trim() === '') {
        setFilteredArtworks(artworks.slice(0, 10)); // Reset to first 10 artworks if no search query
      } else {
        const lowercasedQuery = searchQuery.toLowerCase();
        const filtered = artworks.filter(
          (artwork) =>
            artwork.artist_name.toLowerCase().includes(lowercasedQuery) ||
            artwork.title.toLowerCase().includes(lowercasedQuery)
        );
        setFilteredArtworks(filtered); // Update with filtered list based on query
      }
    }, 300); // 300ms debounce

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [searchQuery, artworks]);

  if (loading) {
    return <p className="p-4 text-center">Loading artworks...</p>;
  }

  if (error) {
    return <p className="text-red-500 p-4 text-center">{error}</p>;
  }

  return (
    <div className="container mx-auto p-2 sm:p-4">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center">SFMOMA Artworks</h1>
      
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by artist or artwork name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 
            bg-white text-black dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:placeholder-gray-400"
        />
      </div>
      
      <ArtworkTable artworks={filteredArtworks} />
    </div>
  );
}

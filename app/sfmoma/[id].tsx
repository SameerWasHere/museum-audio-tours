// app/sfmoma/[id].tsx
import { useRouter } from 'next/router';
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

async function fetchArtworkData(id: string): Promise<Artwork | null> {
  try {
    const res = await fetch(`/api/artworks/${id}`);
    if (!res.ok) {
      throw new Error('Failed to fetch artwork');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching artwork:', error);
    return null;
  }
}

export default function ArtworkInfo() {
  const router = useRouter();
  const { id } = router.query;
  const [artwork, setArtwork] = useState<Artwork | null>(null);

  useEffect(() => {
    if (typeof id === 'string') {
      fetchArtworkData(id).then(setArtwork);
    }
  }, [id]);

  if (!artwork) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <img src={artwork.image_url} alt={artwork.title} className="w-full max-w-md mb-4" />
      <h2 className="text-3xl mb-2">{artwork.artist_name}, {artwork.title}</h2>
      <p><strong>Date Created:</strong> {artwork.date_created}</p>
      <p><strong>Classification:</strong> {artwork.classification}</p>
      <p><strong>Medium:</strong> {artwork.medium}</p>
      <p><strong>Dimensions:</strong> {artwork.dimensions}</p>
      <p><strong>Credit:</strong> {artwork.credit}</p>
      <p><strong>Copyright:</strong> {artwork.copyright}</p>
      <div className="mt-4">
        <button
          onClick={() => playDescription(artwork.short_description)}
          className="bg-green-500 text-white px-3 py-1 rounded mr-2"
        >
          Play Short Description
        </button>
        <button
          onClick={() => playDescription(artwork.long_description)}
          className="bg-yellow-500 text-white px-3 py-1 rounded"
        >
          Play Long Description
        </button>
      </div>
    </div>
  );
}

function playDescription(text: string) {
  const utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
}

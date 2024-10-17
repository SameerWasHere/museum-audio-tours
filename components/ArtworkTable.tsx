// components/ArtworkTable.tsx
'use client';

import ArtworkRow from './ArtworkRow';

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

type ArtworkTableProps = {
  artworks: Artwork[];
};

export default function ArtworkTable({ artworks }: ArtworkTableProps) {
  if (artworks.length === 0) {
    return <p className="text-center">No artworks found.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-gray-100 dark:bg-gray-900">
        <colgroup>
          <col className="w-3/8" /> {/* Increased width for Thumbnail */}
          <col className="w-1/2" /> {/* Wider column for Artist & Artwork */}
          <col className="w-1/8" /> {/* Adjusted width for Actions */}
        </colgroup>
        <tbody>
          {artworks.map((artwork) => (
            <ArtworkRow key={artwork.id} artwork={artwork} />
          ))}
        </tbody>
      </table>
    </div>
  );
}



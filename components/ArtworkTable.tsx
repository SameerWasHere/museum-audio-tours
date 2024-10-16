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
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-gray-800">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left text-foreground dark:text-foreground">Title</th>
            <th className="px-4 py-2 text-left text-foreground dark:text-foreground">Thumbnail</th>
            <th className="px-4 py-2 text-left text-foreground dark:text-foreground">Actions</th>
          </tr>
        </thead>
        <tbody>
          {artworks.map((artwork) => (
            <ArtworkRow key={artwork.id} artwork={artwork} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

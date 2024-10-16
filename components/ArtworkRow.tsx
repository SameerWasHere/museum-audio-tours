// components/ArtworkRow.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  return (
    <tr className="border-b">
      <td className="px-4 py-2 text-gray-700 dark:text-gray-200">
        {artwork.title}
      </td>
      <td className="px-4 py-2">
        <Image
          src={artwork.image_url}
          alt={artwork.title}
          width={64}
          height={64}
          className="object-cover rounded w-16 h-16 sm:w-24 sm:h-24 max-w-full"
        />
      </td>
      <td className="px-4 py-2">
        <div className="flex flex-wrap gap-2">
          <Link href={`/sfmoma/${artwork.id}`}>
            <a className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-sm sm:px-3 sm:py-2 sm:text-base">
              View
            </a>
          </Link>
          <button
            onClick={() => router.push(`/sfmoma/${artwork.id}/edit`)} // Assuming an edit route exists
            className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition text-sm sm:px-3 sm:py-2 sm:text-base"
          >
            Edit
          </button>
        </div>
      </td>
    </tr>
  );
}

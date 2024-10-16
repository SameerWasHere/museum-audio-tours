// app/page.tsx
'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl mb-6">Museum Audio Tours</h1>
      <Link href="/sfmoma">
        <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
          SFMOMA
        </button>
      </Link>
    </div>
  );
}

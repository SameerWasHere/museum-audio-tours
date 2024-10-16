import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl mb-6">Museum Audio Tours</h1>
      <Link href="/sfmoma">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          SFMOMA
        </button>
      </Link>
    </div>
  );
}

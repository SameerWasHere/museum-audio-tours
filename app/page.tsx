// app/page.tsx
'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);

    return () => {
      window.removeEventListener('resize', setViewportHeight);
    };
  }, []);

  return (
    <>
      <div className="flex flex-col">
        {/* Header Section */}
        <section
          className="relative flex flex-col items-center justify-center bg-cover bg-center"
          style={{ height: 'calc(var(--vh, 1vh) * 100)', backgroundImage: "url('/mona.gif')" }}
        >
          {/* Logo at the top */}
          <div className="absolute top-8">
            <h1 className="text-lg text-white">Museum Audio Tour</h1>
          </div>

          {/* Centered Multi-line Big Text */}
          <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-4xl md:text-6xl text-center text-white">
              <span className="font-normal block mb-4">FREE</span>
              <span className="font-bold block mb-4">Museum Audio Tour</span>
              <span className="font-normal">at your fingertips</span>
            </h2>
          </div>

          {/* Scroll Down Text */}
          <div className="absolute bottom-8">
            <p className="text-lg text-white">scroll down</p>
          </div>
        </section>

        {/* Museums Section */}
        <section className="py-12 bg-white dark:bg-gray-900">
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-white">Museums</h2>
          <div className="flex justify-center">
            <Link href="/sfmoma">
              <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                SFMOMA
              </button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}


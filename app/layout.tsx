// app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Museum Audio Tour',
  description: 'Free museum audio tour at your fingertips.',
  openGraph: {
    title: 'Museum Audio Tour',
    description: 'Free museum audio tour at your fingertips.',
    url: 'https://museum-audio-tours.vercel.app/',
    type: 'website',
    images: [
      {
        url: 'https://museum-audio-tours.vercel.app/preview.png',
        width: 1200,
        height: 630,
        alt: 'Museum Audio Tour Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Museum Audio Tour',
    description: 'Free museum audio tour at your fingertips.',
    images: ['https://museum-audio-tours.vercel.app/preview.png'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`bg-background text-foreground ${inter.className}`}>
        {children}
      </body>
    </html>
  );
}


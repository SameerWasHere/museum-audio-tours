// app/layout.tsx
import './globals.css'; // Ensure this path is correct
import { Inter } from 'next/font/google'; // Optional: Customize fonts

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Museum Audio Tours',
  description: 'Explore artworks with audio descriptions.',
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


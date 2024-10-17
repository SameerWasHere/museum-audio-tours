// app/_document.tsx
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* General Meta Tags */}
          <meta name="description" content="Free museum audio tour at your fingertips." />
          <title>Museum Audio Tour</title>

          {/* Open Graph Meta Tags */}
          <meta property="og:title" content="Museum Audio Tour" />
          <meta property="og:description" content="Free museum audio tour at your fingertips." />
          <meta property="og:image" content="https://museum-audio-tours.vercel.app/preview.png" />
          <meta property="og:url" content="https://museum-audio-tours.vercel.app/" />
          <meta property="og:type" content="website" />

          {/* Twitter Meta Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Museum Audio Tour" />
          <meta name="twitter:description" content="Free museum audio tour at your fingertips." />
          <meta name="twitter:image" content="https://museum-audio-tours.vercel.app/preview.png" />

          {/* Favicon and Icons */}
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

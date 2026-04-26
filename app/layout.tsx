import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Safwan Nasar Ahmed',
  description: 'Software engineer specialized in Angular and C#/.NET',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body style={{ maxWidth: '860px', margin: '0 auto', padding: '36px clamp(16px, 5vw, 60px) 80px' }}>
        {children}
      </body>
    </html>
  );
}



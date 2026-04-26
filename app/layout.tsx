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
      <body style={{ marginLeft: 250, marginRight: 250 }}>{children}</body>
    </html>
  );
}



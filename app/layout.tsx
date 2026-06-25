import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://pingsafwan.vercel.app'),
  title: {
    default: 'Safwan Nasar Ahmed | Software Engineer | whatsapp',
    template: '%s | Safwan Nasar Ahmed',
  },
  description: 'whatsapp native chrome extension',
  keywords: ['Safwan Nasar Ahmed', 'Software Engineer', 'Angular', 'C#', '.NET', 'Next.js', 'Portfolio', 'Easytrack', 'whatspp', 'automation'],
  authors: [{ name: 'Safwan Nasar Ahmed' }],
  creator: 'Safwan Nasar Ahmed',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://pingsafwan.vercel.app',
    title: 'Safwan Nasar Ahmed | Software Engineer',
    description: 'Software engineer specialized in Angular, C#/.NET, and full-stack development.',
    siteName: 'Safwan Nasar Ahmed Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Safwan Nasar Ahmed | Software Engineer',
    description: 'Software engineer specialized in Angular, C#/.NET, and full-stack development.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
      <body style={{ maxWidth: '860px', margin: '0 auto' }}>
        {children}
      </body>
    </html>
  );
}



import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects | Safwan Nasar Ahmed | whatsapp chrome extension',
  description: 'Explore my portfolio of software engineering projects, web applications, and chrome extensions that made whatsapp use easy.',
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

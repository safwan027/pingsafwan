import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Safwan Nasar Ahmed',
  description: 'Read my latest thoughts, tutorials, and insights on software engineering and development.',
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

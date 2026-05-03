import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resume | Safwan Nasar Ahmed',
  description: 'View my professional experience, skills, and education as a Software Engineer.',
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

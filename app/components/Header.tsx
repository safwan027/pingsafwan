'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <header className="site-header">
      <Link href="/" className="site-name">
        safwan
      </Link>
      <nav className="site-nav">
        {/* <Link href="/" className={`nav-item ${isActive('/') ? 'active' : ''}`}>
              about
            </Link> */}
        <Link href="/blog" className={`nav-item ${isActive('/blog') ? 'active' : ''}`}>
          blog
        </Link>
        <Link href="/projects" className={`nav-item ${isActive('/projects') ? 'active' : ''}`}>
          work
        </Link>
        <Link href="/resume" className={`nav-item ${isActive('/resume') ? 'active' : ''}`}>
          resume
        </Link>
      </nav>
    </header>
  );
}

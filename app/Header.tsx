'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <header className="site-header">
      <Link href="/" className="site-name">
        safwan
      </Link>

      {/* Desktop nav — hidden on mobile */}
      <nav className="site-nav desktop-nav">
        <Link href="/blog" className={`nav-item ${isActive('/blog') ? 'active' : ''}`}>
          blog
        </Link>
        <Link href="/projects" className={`nav-item ${isActive('/projects') ? 'active' : ''}`}>
          projects
        </Link>
        <Link href="/resume" className={`nav-item ${isActive('/resume') ? 'active' : ''}`}>
          resume
        </Link>
      </nav>

      {/* Hamburger button — only visible on mobile */}
      <button
        className="hamburger-btn"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? '✕' : '☰'}
      </button>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <nav className="mobile-nav" onClick={() => setMenuOpen(false)}>
          <Link href="/blog" className={`nav-item ${isActive('/blog') ? 'active' : ''}`}>
            blog
          </Link>
          <Link href="/projects" className={`nav-item ${isActive('/projects') ? 'active' : ''}`}>
            projects
          </Link>
          <Link href="/resume" className={`nav-item ${isActive('/resume') ? 'active' : ''}`}>
            resume
          </Link>
        </nav>
      )}
    </header>
  );
}

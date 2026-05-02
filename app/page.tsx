//this is the about page

'use client';

import { useState, useEffect } from 'react';
import me from '@/app/assets/me.jpg';
import { fetchContent } from '@/lib/contentClient';
import Header from '@/app/components/Header';
import AdminTerminal from '@/app/components/AdminTerminal';
import { getAboutText } from '@/lib/db';

export default function AboutPage() {
  const [aboutText, setAboutText] = useState('');
  const [terminalOpen, setTerminalOpen] = useState(false);

  // 1. Keyboard Shortcut Listener (Fixed with functional update)
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.ctrlKey && event.key === '`') {
        setTerminalOpen((prev) => !prev); // Use functional update to avoid stale state
      }
    };
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  // 2. Load Content from Client
  useEffect(() => {
    const loadAbout = async () => {
      try {
        const content = await getAboutText();
        setAboutText(content);
      } catch (error) {
        console.error('Failed to load about:', error);
      }
    };
    loadAbout();
  }, []);

  // 3. Simple Scroll to Hash (Next.js Compatible)
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [aboutText]); // Re-run when content loads to ensure the target ID exists

  return (
    <>
      <Header />

      <main className="pane active">
        <div className="avatar-placeholder">
          <img
            src={me.src}
            alt="Safwan Nasar Ahmed"
            style={{
              width: '160px',
              height: '160px',
              borderRadius: '50%',
              objectFit: 'cover',
              display: 'block',
              margin: '0 auto'
            }}
          />
        </div>

        <div className="about-prose">
          {/* Your injected HTML content */}
          <div dangerouslySetInnerHTML={{ __html: aboutText }} />

          {/* <p className="mt-4">
            You can find me on{' '}
            <a href="https://github.com/safwan027" target="_blank" rel="noreferrer" className="underline">
              Github
            </a>
            ,{' '}
            <a href="https://www.linkedin.com/in/safwan-nasar" target="_blank" rel="noreferrer" className="underline">
              LinkedIn
            </a>{' '}
            or <a href="mailto:safwannasar0@gmail.com" className="underline">email me</a>.
          </p> */}
        </div>
      </main>

      {/* Admin Terminal Overlay */}
      <AdminTerminal
        open={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />
    </>
  );
}




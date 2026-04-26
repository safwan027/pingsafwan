"use client";

import { useState } from 'react';
import Header from '@/app/components/Header';
import AdminTerminal from '@/app/components/AdminTerminal';
import { BlogPost } from '@/lib/contentClient';

export default function BlogPostClient({ post }: { post: BlogPost | null }) {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [shareMessage, setShareMessage] = useState('');

  const handleShare = async () => {
    const url = window.location.href;

    try {
      await navigator.clipboard.writeText(url);
      setShareMessage('Link copied to clipboard!');
    } catch (error) {
      console.error('Share failed:', error);
      setShareMessage('Could not copy link.');
    }

    window.setTimeout(() => setShareMessage(''), 2500);
  };

  if (!post) {
    return (
      <>
        <Header />
        <div className="pane active">
          <p className="empty">Post not found.</p>
        </div>
        <AdminTerminal open={terminalOpen} onClose={() => setTerminalOpen(false)} />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="pane active">
        {/* <Link href="/blog" className="blog-back">← Back to blog</Link> */}
        <div className="blog-post">
          <h1>{post.title}</h1>
          <div className="blog-meta">
            <span className="blog-date-str">
  {post.date 
    ? new Date(post.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) 
    : 'TBD'}
</span>
            {post.tag && <span className="blog-tag">{post.tag}</span>}
          </div>
          <div className="blog-content" dangerouslySetInnerHTML={{ __html: post.content }} />
          {/* <div className="share-row"> */} <br/>
            <a  onClick={handleShare}>
             <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-clipboard" viewBox="0 0 16 16">
  <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
  <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/>
</svg>
            </a>
            {shareMessage && <span className="share-message">{shareMessage}</span>}
          {/* </div> */}
        </div>
      </div>

      {/* <footer className="site-footer">
        <button className="admin-btn" onClick={() => setTerminalOpen(!terminalOpen)}>
          admin
        </button>
      </footer> */}
      <AdminTerminal open={terminalOpen} onClose={() => setTerminalOpen(false)} />
    </>
  );
}
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/app/components/Header';
import AdminTerminal from '@/app/components/AdminTerminal';
import { fetchContent, BlogPost } from '@/./lib/contentClient';
import { fetchBlogPosts } from '@/lib/db';

interface BlogPostProps {
  id: string;
  title: string;
  content: string;
  tag?: string;
  date?: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [shareMessage, setShareMessage] = useState<string>('');

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const content = await fetchBlogPosts();
        setPosts(content);
      } catch (error) {
        console.error('Failed to load blog posts:', error);
      }
    };

    loadPosts();
  }, []);

  // const handleSharePage = async () => {
  //   const url = window.location.href;

  //   try {
  //     await navigator.clipboard.writeText(url);
  //     setShareMessage('Link copied to clipboard.');
  //     window.setTimeout(() => setShareMessage(''), 2500);
  //   } catch (error) {
  //     console.error('Failed to copy link:', error);
  //     setShareMessage('Unable to copy link.');
  //     window.setTimeout(() => setShareMessage(''), 2500);
  //   }
  // };

  return (
    <>
      <Header />
      <div className="pane active" style={{ maxWidth: '860px' }}>
        {/* <div className="blog-share-row">
          <button className="share-btn" onClick={handleSharePage}>
            Share this page
          </button>
          {shareMessage && <span className="share-message">{shareMessage}</span>}
        </div> */}
        <div id="blog-list-view">
          {posts.length === 0 ? (
            <p className="empty"></p>
          ) : (
            <div id="blog-grouped">
              {posts.map((post) => (
                <div key={post.id} className="blog-year-group">
                  {/* <div className="blog-year">{post.title}</div> */}
                  <div className="blog-ul">
                    <li>
                      <span className="blog-date-str">
                        {post.date
                          ? post.date.split('T')[0]
                          : 'TBD'}
                      </span>
                      <span className="blog-dash">–</span>
                      <Link href={`/blog/${post.id}`} className="blog-title-link">
                        {post.title}
                      </Link>
                    </li>
                  </div>
                </div>
              ))}
            </div>
          )}
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

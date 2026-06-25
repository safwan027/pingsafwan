'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Header from '@/app/components/Header';
import AdminTerminal from '@/app/components/AdminTerminal';
import { fetchContent, BlogPost } from '@/./lib/contentClient';
import blog from '@/data/content.json';
import BlogHeader from '@/app/components/copyhandle';


export default function BlogPostPage() {
  const params = useParams();
  const postId = params.id as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [terminalOpen, setTerminalOpen] = useState(false);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const content = await fetchContent();
        const found = content.blog.find((p) => p.id === postId) || null;
        setPost(found);
      } catch (error) {
        console.error('Failed to load blog post:', error);
      }
    };
    console.log(post);
    loadPost();
  }, [postId]);

  useEffect(() => {
    // Check if the URL has a hash (like #edu)
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          // Timeout ensures the DOM is fully ready
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
    };

    // Run on initial load
    handleHashScroll();

    // Also listen for hash changes (if user clicks the link multiple times)
    window.addEventListener('hashchange', handleHashScroll);
    return () => window.removeEventListener('hashchange', handleHashScroll);
  }, [post]);


  if (!post) {
    return (
      <>
        <Header />
        <div className="pane active" style={{ maxWidth: '860px' }}>
          <p className="empty">Post not found.</p>

        </div>

        <AdminTerminal open={terminalOpen} onClose={() => setTerminalOpen(false)} />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="pane active" style={{ maxWidth: '860px' }}>

        <div className="blog-post" id={post.id}>
          <h1>{post.title}</h1>
          <div className="blog-meta">
            <span className="blog-date">{post.date || 'TBD'}</span>
            {post.tag && <span className="blog-tag">{post.tag}</span>}
          </div>
          <div className="blog-content" dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>


      </div>

      {/* <button 
  className="admin-btn" 
  style={{ fontSize: '12px', padding: '2px 8px' }} 
  onClick={handleCopy}
>
  {copied ? 'copied' : 'copy link'}
</button> */}


      {/* <AdminTerminal open={terminalOpen} onClose={() => setTerminalOpen(false)} /> */}
    </>
  );
}

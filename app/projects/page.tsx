'use client';

import { useState, useEffect } from 'react';
import Header from '@/app/components/Header';
import AdminTerminal from '@/app/components/AdminTerminal';
import { BlogPost, fetchContent, Project } from '@/./lib/contentClient';
import { fetchProjects } from '@/lib/db';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const content = await fetchProjects();
        setProjects(content);
      } catch (error) {
        console.error('Failed to load projects:', error);
      }
    };

    loadProjects();
  }, []);

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
            
  // setTimeout(() => {
  //   element.style.backgroundColor = 'transparent';
  // }, 2000);       
          }, 100);
        }
      }
    };

    // Run on initial load
    handleHashScroll();

    // Also listen for hash changes (if user clicks the link multiple times)
    window.addEventListener('hashchange', handleHashScroll);
    return () => window.removeEventListener('hashchange', handleHashScroll);
  }, [[projects]]);

  return (
    <>
      <Header />
      <div className="pane active">
        <div id="projects-list">
          {projects.length === 0 ? (
            <p className="empty"></p>
          ) : (
            projects.map((proj) => (
              <div key={proj.id} className="project" id={proj.title}>
                {/* <div className="project-name">{proj.title}</div> */}
                <div dangerouslySetInnerHTML={{ __html: proj.description }} />
                {/* <div className="project-desc">{proj.description}</div> */}
                { proj.link !== 'null' && (
                <a href={proj.link} className="project-link" target="_blank" rel="noreferrer">
                  Visit {proj.title} 
                </a>
                )}
                  {/* <a href={`/blog/1777088451224`} className="underline text-blue-400">
                    Read more
                  </a> */}
                {/* {proj.id === '1777040885777' && (
  <a href={`/blog/1777088451224`} className="underline text-blue-400">
    Read more
  </a>
)}
 {proj.id === '1777105384929' && (
  <a href={`/blog/1777088346536`} className="underline text-blue-400">
    Read more
  </a>
)} */}
                {/* <a href={proj.link} className="project-link" target="_blank" rel="noreferrer">
                  Visit {proj.title} 
                </a> */}

              </div>
            ))
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

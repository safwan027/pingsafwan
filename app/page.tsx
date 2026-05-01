// // 'use client';

// // import { useState, useEffect } from 'react';
// // import Link from 'next/link';
// // import { usePathname } from 'next/navigation';
// // import AdminTerminal from '@/AdminTerminal';

// // type Page = 'about' | 'blog' | 'projects' | 'resume' | 'unitblog';


// // interface BlogPost {
// //   id: string;
// //   title: string;
// //   content: string;
// //   tag?: string;
// //   date?: string;
// // }

// // interface Project {
// //   id: string;
// //   title: string;
// //   desc: string;
// //   link: string;
// // }

// // export default function Home() {
// //   const [currentPage, setCurrentPage] = useState<Page>('about');
// //   const [posts, setPosts] = useState<BlogPost[]>([]);
// //   const [projects, setProjects] = useState<Project[]>([]);
// //   const [aboutText, setAboutText] = useState(
// //     'I am Safwan, a software engineer based in Kerala.<br><br>' +
// //       'I specialize in <a href="#">Angular</a> and <a href="#">C# / .NET</a>, building automated systems and exploring Agentic AI architectures.'
// //   );

// //   const [terminalOpen, setTerminalOpen] = useState(false);
// //   const [authed, setAuthed] = useState(false);
// //   const [terminalOutput, setTerminalOutput] = useState<string[]>(['enter password to continue']);
// //   const [terminalInput, setTerminalInput] = useState('');
// //   const terminalInputRef = useRef<HTMLInputElement>(null);   

// //   const [currentblog, setCurrentblog] = useState<id>(null);


// //   useEffect(() => {
// //     loadData();
// //   }, []);



// //   useEffect(() => {
// //     if (terminalOpen && terminalInputRef.current) {
// //       terminalInputRef.current.focus();
// //     }
// //   }, [terminalOpen]);

// //   const loadData = () => {
// //     const savedAbout = localStorage.getItem('safwan_about');
// //     if (savedAbout) setAboutText(savedAbout);

// //     const savedBlog = localStorage.getItem('safwan_blog');
// //     if (savedBlog) setPosts(JSON.parse(savedBlog));
// //     //console.log('loaded posts', savedBlog);

// //     const savedProjects = localStorage.getItem('safwan_projects');
// //     if (savedProjects) setProjects(JSON.parse(savedProjects));

// //     return savedBlog;
// //   };

// //   const addTerminalOutput = (msg: string, className = '') => {
// //     setTerminalOutput((prev) => [...prev, `<span class="${className}">${msg}</span>`]);
// //   };

// //   const handleTerminalSubmit = () => {
// //     const input = terminalInput.trim();
// //     setTerminalInput('');

// //     if (!authed) {
// //       if (input === 'safwan99') {
// //         setAuthed(true);
// //         addTerminalOutput('access granted', 't-ok');
// //         addTerminalOutput('commands: blog|title|date|content  ·  project|title|desc|link  · about|text  ·  clear', 't-dim');
// //       } else {
// //         addTerminalOutput('wrong password', 't-err');
// //       }
// //       return;
// //     }

// //     const [type, ...parts] = input.split('|').map((s) => s.trim());
// //     console.log(type, parts);

// //     switch (type.toLowerCase()) {
// //       case 'blog': {
// //         const [title, date, content] = parts;
// //         if (!title || !content) {
// //           addTerminalOutput('usage: blog|title|date|content', 't-err');
// //         } else {
// //           const newPost: BlogPost = {
// //             id: Date.now().toString(),
// //             title,
// //             content,
// //             date: date || new Date().toLocaleDateString(),
// //           };
// //           const updated = [...posts, newPost];
// //           setPosts(updated);
// //           localStorage.setItem('safwan_blog', JSON.stringify(updated));
// //           addTerminalOutput(`blog added: ${title}`, 't-ok');
// //         }
// //         break;
// //       }

// //       case 'project': {
// //         const [title, desc, link] = parts;
// //         if (!title || !desc || !link) {
// //           addTerminalOutput('usage: project|title|desc|link', 't-err');
// //         } else {
// //           const newProject: Project = {
// //             id: Date.now().toString(),
// //             title,
// //             desc,
// //             link,
// //           };
// //           const updated = [...projects, newProject];
// //           setProjects(updated);
// //           localStorage.setItem('safwan_projects', JSON.stringify(updated));
// //           addTerminalOutput(`project added: ${title}`, 't-ok');
// //         }
// //         break;
// //       }

// //       case 'about': {
// //         const text = parts.join('|');
// //         if (!text) {
// //           addTerminalOutput('usage: about|text', 't-err');
// //         } else {
// //           setAboutText(text);
// //           localStorage.setItem('safwan_about', text);
// //           addTerminalOutput('about updated', 't-ok');
// //         }
// //         break;
// //       }

// //       case 'clear': {
// //         setTerminalOutput(['enter password to continue']);
// //         setAuthed(false);
// //         break;
// //       }

// //       default:
// //         addTerminalOutput(`unknown command: ${type}`, 't-err');
// //     }
// //   };

// //   const handleNavClick = (page: Page) => {
// //     setCurrentPage(page);
// //   };

// //   const myData = loadData();
// //   console.log('myData', myData);

// //   type id = any;
// //   const handleBlogclick = (id: id) => {
// //     const post = posts.find((p) => p.id === id);
// //     setCurrentblog(id);
// //   };

// //   return (
// //     <>
// //       <header className="site-header">
// //         <span className="site-name" onClick={() => handleNavClick('about')}>
// //           safwan
// //         </span>
// //         <nav className="site-nav">

// //           {/* <span
// //             className={`nav-item ${currentPage === 'about' ? 'active' : ''}`}
// //             onClick={() => handleNavClick('about')}
// //           >
// //             about
// //           </span> */}

// //           <span
// //             className={`nav-item ${currentPage === 'blog' ? 'active' : ''}`}
// //             onClick={() => handleNavClick('blog')}
// //           >
// //             blog
// //           </span>
// //           <span
// //             className={`nav-item ${currentPage === 'projects' ? 'active' : ''}`}
// //             onClick={() => handleNavClick('projects')}
// //           >
// //             projects
// //           </span>
// //           <span
// //             className={`nav-item ${currentPage === 'resume' ? 'active' : ''}`}
// //             onClick={() => handleNavClick('resume')}
// //           >
// //             resume
// //           </span>
// //         </nav>
// //       </header>

// //        {/* ABOUT  */}
// //       {currentPage === 'about' && (
// //         <div className="pane active">
// //           <div className="avatar-placeholder">
// //             <span>S</span>
// //           </div>
// //           <div className="about-prose">
// //             <p dangerouslySetInnerHTML={{ __html: aboutText }} />
// //             <p>
// //               You can find me on{' '}
// //               <a href="https://github.com/safwan027" target="_blank" rel="noreferrer">
// //                 Github
// //               </a>
// //               ,{' '}
// //               <a href="https://www.linkedin.com/in/safwan-nasar" target="_blank" rel="noreferrer">
// //                 LinkedIn
// //               </a>{' '}
// //               or <a href="mailto:safwannasar0@gmail.com">email me</a>.
// //             </p>
// //           </div>
// //         </div>
// //       )}  

// //       {/* PROJECTS */}
// //       {currentPage === 'projects' && (
// //         <div className="pane active">
// //           <div id="projects-list">
// //             {projects.length === 0 ? (
// //               <p className="empty">No projects yet.</p>
// //             ) : (
// //               projects.map((proj) => (
// //                 <div key={proj.id} className="project">
// //                   <div className="project-name">{proj.title}</div>
// //                   <div className="project-desc">{proj.desc}</div>
// //                   <a href={proj.link} className="project-link" target="_blank" rel="noreferrer">
// //                     Visit →
// //                   </a>
// //                 </div>
// //               ))
// //             )}
// //           </div>
// //         </div>
// //       )}

// //       {/* BLOG */}
// //       {currentPage === 'blog' && (
// //         <div className="pane active">
// //           <div id="blog-list-view">
// //             {posts.length === 0 ? (
// //               <p className="empty">No posts yet.</p>
// //             ) : (
// //               <div id="blog-grouped">
// //                 {posts.map((post) => (
// //                   <div key={post.id} className="blog-year-group">
// //                     <div className="blog-year" >{post.title}</div>
// //                     <div className="blog-ul">
// //                       <li>
// //                         <span className="blog-date-str">{post.date || 'TBD'}</span>
// //                         <span className="blog-dash">–</span>
// //                         <span
// //                           className="blog-title-link"
// //                           onClick={() => handleBlogclick(post.id)}
// //                         >
// //                           {post.title}
// //                         </span>                      </li>
// //                     </div>
// //                   </div>
// //                 ))}
// //                 </div>
// //             )}
// //           </div>
// //         </div>
// //       )}

// //       {/* RESUME */}
// //       {currentPage === 'resume' && (
// //         <div className="pane active">
// //           <div className="resume-header">
// //             <div className="resume-name">Safwan Nasar Ahmed</div>
// //             <div className="resume-contact-line">
// //               <a href="mailto:safwannasar0@gmail.com">safwannasar0@gmail.com</a>
// //               <span className="dot">&middot;</span>
// //               <a href="https://www.linkedin.com/in/safwan-nasar" target="_blank" rel="noreferrer">
// //                 linkedin.com/in/safwan-nasar
// //               </a>
// //               <span className="dot">&middot;</span>
// //               <a href="https://github.com/safwan027" target="_blank" rel="noreferrer">
// //                 github.com/safwan027
// //               </a>
// //             </div>
// //           </div>

// //           <div className="r-section">
// //             <div className="r-label">Summary</div>
// //             <p className="r-prose">
// //               Software Engineer specialized in Angular and C#/.NET, with experience building
// //               enterprise web applications, automated systems, and exploring Agentic AI
// //               architectures.
// //             </p>
// //           </div>

// //           <div className="r-section">
// //             <div className="r-label">Experience</div>
// //             <p className="empty">No entries yet.</p>
// //           </div>

// //           <div className="r-section">
// //             <div className="r-label">Education</div>
// //             <p className="empty">No entries yet.</p>
// //           </div>

// //           <div className="r-section">
// //             <div className="r-label">Skills</div>
// //             <p className="empty">No entries yet.</p>
// //           </div>
// //         </div>
// //       )}


// //         {/* RESUME */}
// //       {currentblog === 'blog' && currentblog === posts.find((p) => p.id === currentblog)?.id && (
// //         <div className="pane active">
// //           <div className="resume-header">
// //             <div className="resume-name">Safwan Nasar Ahmed</div>
// //             <div className="resume-contact-line">
// //               <a href="mailto:safwannasar0@gmail.com">safwannasar0@gmail.com</a>
// //               <span className="dot">&middot;</span>
// //               <a href="https://www.linkedin.com/in/safwan-nasar" target="_blank" rel="noreferrer">
// //                 linkedin.com/in/safwan-nasar
// //               </a>
// //               <span className="dot">&middot;</span>
// //               <a href="https://github.com/safwan027" target="_blank" rel="noreferrer">
// //                 github.com/safwan027
// //               </a>
// //               <p>post date: {posts.find((p) => p.id === currentblog)?.date || 'TBD'}</p>
// //             </div>
// //           </div>

// //           <div className="r-section">
// //             <div className="r-label">Summary</div>
// //             <p className="r-prose">
// //               Software Engineer specialized in Angular and C#/.NET, with experience building
// //               enterprise web applications, automated systems, and exploring Agentic AI
// //               architectures.
// //             </p>
// //           </div>

// //           <div className="r-section">
// //             <div className="r-label">Experience</div>
// //             <p className="empty">No entries yet.</p>
// //           </div>

// //           <div className="r-section">
// //             <div className="r-label">Education</div>
// //             <p className="empty">No entries yet.</p>
// //           </div>

// //           <div className="r-section">
// //             <div className="r-label">Skills</div>
// //             <p className="empty">No entries yet.</p>
// //           </div>
// //         </div>
// //       )}

// //       <footer className="site-footer">
// //         <button className="admin-btn" onClick={() => setTerminalOpen(!terminalOpen)}>
// //           admin
// //         </button>
// //       </footer>

// //       {/* TERMINAL */}
// //       {terminalOpen && (
// //         <div id="terminal" style={{ display: 'block' }}>
// //           <div className="term-bar">
// //             <span className="term-title">admin shell</span>
// //             <span className="term-x" onClick={() => setTerminalOpen(false)}>
// //               ✕
// //             </span>
// //           </div>
// //           <div className="term-body">
// //             <div id="term-out">
// //               {terminalOutput.map((line, idx) => (
// //                 <div key={idx} dangerouslySetInnerHTML={{ __html: line + '<br>' }} />
// //               ))}
// //             </div>
// //             <div className="term-row">
// //               <span className="term-prompt">›</span>
// //               <input
// //                 ref={terminalInputRef}
// //                 type={authed ? 'text' : 'password'}
// //                 className="term-input"
// //                 value={terminalInput}
// //                 onChange={(e) => setTerminalInput(e.target.value)}
// //                 onKeyDown={(e) => {
// //                   if (e.key === 'Enter') handleTerminalSubmit();
// //                 }}
// //               />
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </>
// //   );
// // }



// 'use client';

// import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
// import me from '@/app/assets/me.jpg';
// import { ContentData, fetchContent } from '@/./lib/contentClient';
// import { useState, useEffect } from 'react';
// import Header from '@/app/components/Header';
// import AdminTerminal from '@/app/components/AdminTerminal';



// // 1. Put this helper function at the top of your file
// function ScrollToHash() {
//   const { hash } = useLocation();

//   useEffect(() => {
//     if (hash) {
//       const id = hash.replace('#', '');
//       const element = document.getElementById(id);
//       if (element) {
//         element.scrollIntoView({ behavior: 'smooth' });
//       }
//     }
//   }, [hash]);

//   return null;
// }

// // 2. Wrap your main App component
// // export default function App() {
// //   return (
// //     <BrowserRouter>
// //       <ScrollToHash /> {/* This stays here to watch for links */}
      
// //       <Routes>
// //         {/* Your current home page with the terminal and about text */}
// //         <Route path="/" element={<Home />} /> 
        
// //         {/* Your other pages */}
// //         <Route path="/blog" element={<Blog />} />
// //         <Route path="/projects" element={<Projects />} />
// //       </Routes>
// //     </BrowserRouter>
// //   );
// // }

// export default function AboutPage() {
//   const [aboutText, setAboutText] = useState('');
//   const [terminalOpen, setTerminalOpen] = useState(false);

//   useEffect(() => {
//     const handleKeyPress = (event) => {
//       if (event.ctrlKey && event.key === '`') {
//         setTerminalOpen(!terminalOpen);
//       }
//     };
//     document.addEventListener('keydown', handleKeyPress);
//     return () => {
//       document.removeEventListener('keydown', handleKeyPress);
//     };
//   }, []);


//     useEffect(() => {
//       const loadabout = async () => {
//         try {
//           const content = await fetchContent();
//           setAboutText(content.about);
//         } catch (error) {
//           console.error('Failed to load about:', error);
//         }
//       };
  
//       loadabout();
//     }, []);

//   return (
//     <>
//       <Header />
//       <div className="pane active">
//         <div className="avatar-placeholder">
//           {/* <img src={me.src} alt="Safwan Nasar Ahmed" /> */}
//           <img
//             src={me.src}
//             alt="Safwan Nasar Ahmed"
//             style={{
//               width: '160px',
//               height: '160px',
//               borderRadius: '50%',
//               objectFit: 'cover',
//               display: 'block',
//               margin: '0 auto'
//             }}
//           />
//         </div>
//         <div className="about-prose">
//           <p dangerouslySetInnerHTML={{ __html: aboutText }} />
//           <p>
//             You can find me on{' '}
//             <a href="https://github.com/safwan027" target="_blank" rel="noreferrer">
//               Github
//             </a>
//             ,{' '}
//             <a href="https://www.linkedin.com/in/safwan-nasar" target="_blank" rel="noreferrer">
//               LinkedIn
//             </a>{' '}
//             or <a href="mailto:safwannasar0@gmail.com">email me</a>.
//           </p>
//         </div>
//       </div>

//       {/* <footer className="site-footer">
//         <button className="admin-btn" onClick={() => setTerminalOpen(!terminalOpen)}>
//           admin
//         </button>
//       </footer> */}



//       <AdminTerminal open={terminalOpen} onClose={() => setTerminalOpen(false)} />
//     </>

//     <BrowserRouter>
//       <ScrollToHash /> {/* This stays here to watch for links */}
      
//       <Routes>
//         {/* Your current home page with the terminal and about text */}
//         <Route path="/" element={<Home />} /> 
        
//         {/* Your other pages */}
//         <Route path="/blog" element={<Blog />} />
//         <Route path="/projects" element={<Projects />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }


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
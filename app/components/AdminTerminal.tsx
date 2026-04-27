'use client';

import { useState, useEffect, useRef } from 'react';
import {
  fetchContent,
  saveBlogPost,
  saveProject,
  saveAbout,
  BlogPost,
  Project,
} from '@/./lib/contentClient';
import { verifyPassword } from '../actions';

interface AdminTerminalProps {
  open: boolean;
  onClose: () => void;
}

export default function AdminTerminal({ open, onClose }: AdminTerminalProps) {
  const [authed, setAuthed] = useState(false);
  const [output, setOutput] = useState<string[]>(['enter password to continue']);
  const [input, setInput] = useState('');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [aboutText, setAboutText] = useState('');
  const terminalInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && terminalInputRef.current) {
      terminalInputRef.current.focus();
    }

    const loadData = async () => {
      try {
        const content = await fetchContent();
        setAboutText(content.about || '');
        setPosts(content.blog || []);
        setProjects(content.projects || []);
      } catch (error) {
        console.error('Failed to load content:', error);
      }
    };

    loadData();
  }, [open]);

  const addOutput = (msg: string, className = '') => {
    setOutput((prev) => [...prev, `<span class="${className}">${msg}</span>`]);
  };

  const handleSubmit = async () => {
    const trimmedInput = input.trim();
    setInput('');

    if (!authed) {
      addOutput('checking credentials...', 'text-blue-400');
      const isValid = await verifyPassword(trimmedInput);
      if (isValid) {
        setAuthed(true);
        addOutput('access granted', 't-ok');
        addOutput(`
        Commands: <br/>
        blog|title|date|content   <br/>
        project|title|description|link   <br/>
        about|text  <br/>
        clear`
        );
      } else {
        addOutput('wrong password', 't-err');
      }
      return;
    }

    const [type, ...parts] = trimmedInput.split('|').map((s) => s.trim());

    try {
      switch (type.toLowerCase()) {
        case 'blog': {
          const [title, date, content] = parts;
          if (!title || !content) {
            addOutput('usage: blog|title|date|content', 't-err');
          } else {
            const newPost: BlogPost = {
              id: Date.now().toString(),
              title,
              content,
              date: date || new Date().toLocaleDateString(),
            };
            const updated = await saveBlogPost(newPost);
            setPosts(updated.blog);
            addOutput(`blog added: ${title}`, 't-ok');
          }
          break;
        }

        case 'project': {
          const [title, description, link] = parts;
          if (!title || !description ) {
            addOutput('usage: project|title|desc|link', 't-err');
          }  else if (!link) { const newProject: Project = {
              id: Date.now().toString(),
              title,
              description,
              link: link || null,
            };
            const updated = await saveProject(newProject);
            setProjects(updated.projects);
            addOutput(`project added: ${title}`, 't-ok');
          }  
                    else {
            const newProject: Project = {
              id: Date.now().toString(),
              title,
              description,
              link,
            };
            const updated = await saveProject(newProject);
            setProjects(updated.projects);
            addOutput(`project added: ${title}`, 't-ok');
          }
          break;
        }

        case 'about': {
          const text = parts.join('|');
          if (!text) {
            addOutput('usage: about|text', 't-err');
          } else {
            const updated = await saveAbout(text);
            setAboutText(updated.about);
            addOutput('about updated', 't-ok');
          }
          break;
        }

        case 'clear': {
          setOutput(['enter password to continue']);
          setAuthed(false);
          break;
        }

        default:
          addOutput(`unknown command: ${type}`, 't-err');
      }
    } catch (error) {
      console.error('Failed to save content:', error);
      addOutput('error saving content', 't-err');
    }
  };

  if (!open) return null;

  return (
  //   <div id="terminal" style={{ display: 'block' }}>
  //     <div className="term-bar">
  //       <span className="term-title">admin shell</span>
  //       <span className="term-x" onClick={onClose}>
  //         ✕
  //       </span>
  //     </div>
  //     <div className="term-body">
  //       <div id="term-out">
  //         {output.map((line, idx) => (
  //           <div key={idx} dangerouslySetInnerHTML={{ __html: line + '<br>' }} />
  //         ))}
  //       </div>
  //       <div className="term-row">
  //         <span className="term-prompt">›</span>
  //         <input
  //           ref={terminalInputRef}
  //           type={authed ? 'text' : 'password'}
  //           className="term-input"
  //           value={input}
  //           onChange={(e) => setInput(e.target.value)}
  //           onKeyDown={(e) => {
  //             if (e.key === 'Enter') handleSubmit();
  //           }}
  //         />
  //       </div>
  //     </div>
  //   </div>
  // );

  
  <div id="terminal" className="bg-[#121212] rounded-lg shadow-2xl w-[500px] overflow-hidden font-mono">
  <div className="term-bar bg-[#1a1a1a] px-4 py-3 flex justify-between items-center border-b border-[#222]">
    <span className="text-gray-500 text-sm">Admin Shell</span>
    <span className="term-x" onClick={onClose}>✕</span>
  </div>
  <div className="p-6 min-h-[300px]">
    <div id="term-out" className="text-gray-500 leading-relaxed text-sm">
      {output.map((line, idx) => (
        <div key={idx} dangerouslySetInnerHTML={{ __html: line + '<br>' }} />
      ))}
    </div>
    <div className="flex items-center mt-4">
      <span className="text-gray-500 mr-2"></span>
      {/* <input
        ref={terminalInputRef}
        type={authed ? 'text' : 'password'}
        className="bg-transparent border-none outline-none text-white w-full"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
      /> */}
      <input
  ref={terminalInputRef}
  type={authed ? 'text' : 'password'}
  className="term-input" // Make sure this class matches your CSS
  value={input}
  onChange={(e) => setInput(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'Escape') {
      onClose(); // Trigger your function here
    }
  }}
  autoFocus // Good for terminal UX
/>
    </div>
  </div>
</div>
  );
}

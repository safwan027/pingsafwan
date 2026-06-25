'use client';

import { useState, useEffect } from 'react';
import Header from '@/app/components/Header';
import AdminTerminal from '@/app/components/AdminTerminal';
//import { Link } from 'react-router-dom';

export default function ResumePage() {
  const [terminalOpen, setTerminalOpen] = useState(false);

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
  }, []);

  return (
    <>
      <Header />
      <div className="pane active" style={{ maxWidth: '860px' }}>
        {/* <div className="resume-header">
          <div className="resume-name">Safwan Nasar Ahmed</div>
          <div className="resume-contact-line">
            <a href="mailto:safwannasar0@gmail.com">safwannasar0@gmail.com</a>
            <span className="dot">&middot;</span>
            <a href="https://www.linkedin.com/in/safwan-nasar" target="_blank" rel="noreferrer">
              linkedin.com/in/safwan-nasar
            </a>
            <span className="dot">&middot;</span>
            <a href="https://github.com/safwan027" target="_blank" rel="noreferrer">
              github.com/safwan027
            </a>
          </div>
        </div> */}

        <div className="r-section">
          <div className="r-label"><b>Career Highlights</b></div>
          <p className="r-prose">
            Software engineer with 2+ years of experience in specializing in C#, ASP.NET, and Python. Proven track record of building scalable web applications and APIs, with a passion for learning new technologies and contributing to open source projects.
          </p> <br />
          <p className="r-prose">I built a chrome extension - Easytrack that solved a common productivity issue for Support engineers. <a href="projects/#easytrack" className="underline text-blue-400">Visit Project</a></p>
          {/* <p className="r-prose">I have experience  <a href="/projects/#test4" className="underline text-blue-400">Check out</a> .</p>
           <p className="r-prose">I have experience  <a href="/blog/1777088346536" className="underline text-blue-400">Check out</a> .</p> */}

        </div>

        <div className="r-section">
          <p className="r-prose">
            {/* <a href="#edu" className="underline text-blue-400">my education</a> */}
          </p>
          <p className="r-label"><b>Professional Experience</b></p>
          <p><b>Astenlabs</b></p>

          <div className="label">Associate Software Engineer - (Dec 2024 - Jan 2026)</div>
          <p className="empty">• Built the reservation module for a POS application in C# and ASP.NET, directly improving item management workflow for end users
          </p>
          <p className="empty">• Resolved critical application bugs across the POS system, reducing user-reported issues during a key release cycle
          </p>
          <p className="empty">• Contributed to 4+ feature areas including billing within an on-site agile team
          </p>
          <br /> <br />
          <p><b>Druv 360</b></p>
          <div className="label">Junior Python Developer - (Jun 2024 - Nov 2024)</div>
          <p className="empty">•Co-developed a beta multi-portal CRM with 3 distinct user roles (admin, agent, client) using Django
          </p>
          <p className="empty">•Owned backend API development and debugging for remote deployment on a 6-month contract
          </p>
        </div>

        <div className="r-section" id="edu">
          <div className="r-label"><b>Education</b></div>
          <div className="label">Bachelor of Computer Applications</div>
          <div className="label">Mar 2020 - Jun 2023</div>
        </div>

        <div className="r-section">
          <div className="r-label"><b>Skills</b></div>
          <div className="tag-container">
            <span className="tag">MsSql</span>
            <span className="tag">ASP.NET</span>
            <span className="tag">Angular</span>
            <span className="tag">Python</span>
            <span className="tag">FASTapi</span>
            <span className="tag">Django</span>
            <span className="tag">Open source</span>
          </div>
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

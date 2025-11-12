import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header(){
  const [dark, setDark] = useState(() => {
    try { return localStorage.getItem('intelliquiz:dark') === '1' } catch { return false }
  });

  useEffect(() => {
    const body = document && document.body;
    if(!body) return;
    if(dark) body.classList.add('dark-mode'); else body.classList.remove('dark-mode');
    try { localStorage.setItem('intelliquiz:dark', dark ? '1' : '0') } catch {}
  }, [dark]);

  return (
    <header className="site-header">
      <div className="container nav">
        <div className="brand">
          <Link to="/" style={{color:'inherit', textDecoration:'none'}}>🧠 IntelliQuiz</Link>
        </div>
        <div className="nav-actions">
          <button className="btn-ghost" aria-label="About">About</button>
          <button
            className="theme-toggle"
            onClick={() => setDark(d => !d)}
            aria-pressed={dark}
            title="Toggle dark theme"
          >
            {dark ? 'Dark' : 'Light'}
          </button>
        </div>
      </div>
    </header>
  )
}

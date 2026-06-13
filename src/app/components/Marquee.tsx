'use client';

import { useEffect, useRef, useState } from 'react';

const items = ['Design', 'Development', 'Research', 'Psychology', 'Sociology', 'Philosophy', 'Linguistics', 'Economics', 'Architecture', 'Mathematics'];

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check system theme preference
    const checkTheme = () => {
      const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(isDarkMode);
    };
    
    checkTheme();
    
    // Listen for theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (trackRef.current) {
      const set = trackRef.current.querySelector('.marquee-set');
      if (set) {
        const clone = set.cloneNode(true);
        trackRef.current.appendChild(clone);
      }
    }
  }, []);

  const styles = {
    container: {
      borderTop: `1px solid ${isDark ? '#1f1f1f' : '#e5e5e5'}`,
      borderBottom: `1px solid ${isDark ? '#1f1f1f' : '#e5e5e5'}`,
      overflow: 'hidden' as const,
      padding: '24px 0',
      background: isDark ? '#0a0a0a' : '#ffffff',
    },
    track: {
      display: 'flex',
      gap: '60px',
      width: 'max-content' as const,
      animation: 'marq 38s linear infinite',
    },
    item: {
      fontWeight: 600,
      fontSize: 'clamp(28px, 4vw, 52px)',
      lineHeight: 1,
      letterSpacing: '-0.025em',
      color: isDark ? '#ffffff' : '#171717',
      display: 'inline-flex' as const,
      alignItems: 'center',
      gap: '60px',
      whiteSpace: 'nowrap' as const,
    },
    itemEm: {
      fontStyle: 'italic' as const,
      fontWeight: 400,
      color: isDark ? '#999' : '#666',
    },
    separator: {
      width: '10px',
      height: '10px',
      borderRadius: '999px',
    },
  };

  return (
    <div style={styles.container}>
      <div ref={trackRef} style={styles.track}>
        <div className="marquee-set" style={{ display: 'flex', gap: '60px' }}>
          {items.map((item, idx) => (
            <span key={idx} style={styles.item}>
              {idx % 2 === 0 ? item : <em style={styles.itemEm}>{item}</em>}
              <span style={{ 
                ...styles.separator, 
                background: idx % 2 === 0 
                  ? (isDark ? '#5c2d91' : '#8b5cf6') 
                  : (isDark ? '#e63939' : '#ef4444')
              }} />
            </span>
          ))}
        </div>
      </div>
      <style>
        {`
          @keyframes marq {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          .marquee-set:hover {
            animation-play-state: paused;
          }
        `}
      </style>
    </div>
  );
}
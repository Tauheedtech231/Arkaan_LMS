'use client';

import { useEffect, useRef, useState } from 'react';

const items = ['Design', 'Development', 'Research', 'Psychology', 'Sociology', 'Philosophy', 'Linguistics', 'Economics', 'Architecture', 'Mathematics'];

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDark, setIsDark] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check system theme preference
  useEffect(() => {
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

  // Check mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
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
      width: '100%',
      maxWidth: '100%',
      overflow: 'hidden' as const,
      borderTop: `1px solid ${isDark ? '#1f1f1f' : '#e5e5e5'}`,
      borderBottom: `1px solid ${isDark ? '#1f1f1f' : '#e5e5e5'}`,
      padding: isMobile ? '16px 0' : '24px 0',
      background: isDark ? '#0a0a0a' : '#ffffff',
      position: 'relative' as const,
    },
    track: {
      display: 'flex',
      gap: isMobile ? '30px' : '60px',
      width: 'max-content' as const,
      animation: 'marq 38s linear infinite',
      willChange: 'transform',
    },
    item: {
      fontWeight: 600,
      fontSize: isMobile ? 'clamp(20px, 5vw, 32px)' : 'clamp(28px, 4vw, 52px)',
      lineHeight: 1,
      letterSpacing: '-0.025em',
      color: isDark ? '#ffffff' : '#171717',
      display: 'inline-flex' as const,
      alignItems: 'center',
      gap: isMobile ? '30px' : '60px',
      whiteSpace: 'nowrap' as const,
    },
    itemEm: {
      fontStyle: 'italic' as const,
      fontWeight: 400,
      color: isDark ? '#999' : '#666',
    },
    separator: {
      width: isMobile ? '6px' : '10px',
      height: isMobile ? '6px' : '10px',
      borderRadius: '999px',
    },
  };

  return (
    <div style={styles.container}>
      <div ref={trackRef} style={styles.track}>
        <div className="marquee-set" style={{ display: 'flex', gap: isMobile ? '30px' : '60px' }}>
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
          @media (max-width: 768px) {
            @keyframes marq {
              from { transform: translateX(0); }
              to { transform: translateX(-50%); }
            }
          }
        `}
      </style>
    </div>
  );
}
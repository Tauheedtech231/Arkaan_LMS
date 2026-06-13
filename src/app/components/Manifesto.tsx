'use client';

import { useEffect, useState, useRef } from 'react';

const statements = [
  { 
    title: "One idea,", 
    titleEm: "taught well.", 
    desc: "Every course at Arkaan is built around a single question, asked carefully. We don't bundle ten topics into a busy syllabus and call it a curriculum. We pick one thing worth your attention and follow it all the way through.",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=500&h=400&fit=crop",
    alt: "Open book with glasses"
  },
  { 
    title: "A small number of", 
    titleEm: "teachers.", 
    desc: "Our authors are people we'd want to learn from ourselves — writers, scientists, gardeners, makers. We commission slowly. Each course is written, recorded, and edited in close conversation with the author, not assembled from a brief.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&h=400&fit=crop",
    alt: "Teacher helping student"
  },
  { 
    title: "Time enough to", 
    titleEm: "think.", 
    desc: "The lessons are deliberately spaced. There are no daily streaks, no nudges, no 'you'll lose your progress.' Reading and listening at a human pace is the point. The library will still be here next week.",
    image: "https://images.unsplash.com/photo-1501139083538-0139583c060f?w=500&h=400&fit=crop",
    alt: "Clock showing time"
  }
];

export default function Manifesto() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [isDark, setIsDark] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check system theme
  useEffect(() => {
    const checkTheme = () => {
      const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(isDarkMode);
    };
    
    checkTheme();
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Check mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 960);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll progress
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const update = () => {
      const rect = section.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;
      const progressed = Math.min(1, Math.max(0, -rect.top / total));
      const idx = Math.min(statements.length - 1, Math.floor(progressed * statements.length));
      setActiveIndex(idx);
    };
    window.addEventListener('scroll', update);
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  const styles = {
    section: {
      position: 'relative' as const,
      height: '320vh',
    },
    sticky: {
      position: 'sticky' as const,
      top: 0,
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      padding: isMobile ? '0 24px' : '0 40px',
      overflow: 'hidden',
      background: isDark ? '#0a0a0a' : '#ffffff',
    },
    container: {
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: isMobile ? '48px' : '64px',
      alignItems: 'start',
    },
    // Left side styles
    leftSide: {
      position: 'relative' as const,
      width: '100%',
    },
    imageWrapper: {
      width: '85%',
      height: 'auto',
      marginBottom: '24px',
      borderRadius: '16px',
      overflow: 'hidden',
      maxHeight: '220px',
      boxShadow: isDark 
        ? '0 10px 30px rgba(0,0,0,0.3)' 
        : '0 10px 30px rgba(0,0,0,0.1)',
      transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover' as const,
    },
    manifestoLabel: {
      fontFamily: 'monospace',
      fontSize: '10px',
      letterSpacing: '0.16em',
      textTransform: 'uppercase' as const,
      color: isDark ? '#999' : '#666',
      marginBottom: '20px',
    },
    progressContainer: {
      position: isMobile ? ('relative' as const) : ('relative' as const),
      marginTop: '20px',
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '10px',
    },
    progressItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      fontFamily: 'monospace',
      fontSize: '10px',
      letterSpacing: '0.06em',
      transition: 'color 0.3s ease',
      cursor: 'pointer',
    },
    progressBar: {
      width: '32px',
      height: '1px',
      transition: 'background 0.3s ease',
    },
    // Right side styles
    rightSide: {
      position: 'relative' as const,
      width: '100%',
      minHeight: isMobile ? '340px' : '360px',
    },
    statement: {
      position: 'absolute' as const,
      inset: 0,
      opacity: 0,
      transform: 'translateY(20px)',
      transition: 'opacity 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      pointerEvents: 'none' as const,
    },
    statementActive: {
      opacity: 1,
      transform: 'translateY(0)',
      pointerEvents: 'auto' as const,
    },
    title: {
      fontSize: isMobile ? 'clamp(28px, 6vw, 44px)' : 'clamp(32px, 4vw, 52px)',
      lineHeight: 1.05,
      letterSpacing: '-0.025em',
      margin: '0 0 16px',
      color: isDark ? '#ffffff' : '#171717',
    },
    titleEm: {
      fontStyle: 'italic' as const,
      fontWeight: 400,
      color: isDark ? '#e63939' : '#dc2626',
    },
    description: {
      fontSize: isMobile ? '14px' : '15px',
      lineHeight: isMobile ? '24px' : '26px',
      maxWidth: '46ch',
      color: isDark ? '#e6e6e6' : '#4a4a4a',
    },
  };

  const handleProgressClick = (idx: number) => {
    setActiveIndex(idx);
  };

  return (
    <section ref={sectionRef} style={styles.section}>
      <div style={styles.sticky}>
        <div style={styles.container}>
          {/* Left Side */}
          <div style={styles.leftSide}>
            {/* Dynamic Image - Adjusted dimensions */}
            <div style={styles.imageWrapper}>
              <img 
                src={statements[activeIndex].image} 
                alt={statements[activeIndex].alt}
                style={styles.image}
              />
            </div>
            
            <div style={styles.manifestoLabel}>
              Manifesto · 01 — 03
            </div>
            
            <div style={styles.progressContainer}>
              {statements.map((_, idx) => (
                <div 
                  key={idx} 
                  onClick={() => handleProgressClick(idx)}
                  style={{
                    ...styles.progressItem,
                    color: activeIndex === idx 
                      ? (isDark ? '#fff' : '#171717') 
                      : (isDark ? '#999' : '#aaa'),
                  }}
                >
                  <span style={{
                    ...styles.progressBar,
                    background: activeIndex === idx 
                      ? (isDark ? '#fff' : '#171717') 
                      : (isDark ? '#2a2a2a' : '#e5e5e5'),
                  }} />
                  {idx === 0 && '01 · One idea, taught well'}
                  {idx === 1 && '02 · A small number of teachers'}
                  {idx === 2 && '03 · Time enough to think'}
                </div>
              ))}
            </div>
          </div>

          {/* Right Side */}
          <div style={styles.rightSide}>
            {statements.map((stmt, idx) => (
              <div 
                key={idx} 
                style={{
                  ...styles.statement,
                  ...(activeIndex === idx && styles.statementActive),
                }}
              >
                <h2 style={styles.title}>
                  {stmt.title} <em style={styles.titleEm}>{stmt.titleEm}</em>
                </h2>
                <p style={styles.description}>{stmt.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
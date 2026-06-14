'use client';

import { useEffect, useState, useRef } from 'react';

const statements = [
  { 
    title: "One idea,", 
    titleEm: "taught well.", 
    desc: "Every course at Arkaan is built around a single question, asked carefully. We don't bundle ten topics into a busy syllabus and call it a curriculum. We pick one thing worth your attention and follow it all the way through.",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=400&fit=crop",
    alt: "Open book with glasses"
  },
  { 
    title: "A small number of", 
    titleEm: "teachers.", 
    desc: "Our authors are people we'd want to learn from ourselves — writers, scientists, gardeners, makers. We commission slowly. Each course is written, recorded, and edited in close conversation with the author, not assembled from a brief.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop",
    alt: "Teacher helping student"
  },
  { 
    title: "Time enough to", 
    titleEm: "think.", 
    desc: "The lessons are deliberately spaced. There are no daily streaks, no nudges, no 'you'll lose your progress.' Reading and listening at a human pace is the point. The library will still be here next week.",
    image: "https://images.unsplash.com/photo-1501139083538-0139583c060f?w=600&h=400&fit=crop",
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

  const handleProgressClick = (idx: number) => {
    setActiveIndex(idx);
    if (sectionRef.current) {
      const yOffset = -80;
      const y = sectionRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const styles = {
    section: {
      position: 'relative' as const,
      height: isMobile ? '180vh' : '170vh',
    },
    sticky: {
      position: 'sticky' as const,
      top: 0,
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: isMobile ? '0 16px' : '0 40px',
      overflow: 'visible' as const,
      background: isDark ? '#0a0a0a' : '#ffffff',
    },
    container: {
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: isMobile ? '0' : '40px',
      alignItems: 'center',
      overflow: 'visible' as const,
    },
    // Mobile Card Styles
    mobileCard: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '20px',
      width: '100%',
      maxWidth: '100%',
      margin: '0 auto',
      overflow: 'visible' as const,
    },
    // Left side styles
    leftSide: {
      position: 'relative' as const,
      width: '100%',
      overflow: 'visible' as const,
    },
    imageWrapper: {
      width: isMobile ? '100%' : '80%', // ✅ Desktop width kam (80%)
      maxWidth: isMobile ? '100%' : '80%',
      height: 'auto',
      marginBottom: isMobile ? '0' : '16px',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: isMobile ? '0' : '16px',
      borderRadius: '20px',
      overflow: 'visible' as const,
      aspectRatio: isMobile ? '16/9' : '21/11', // ✅ Thoda shorter
      boxShadow: isDark 
        ? '0 15px 35px rgba(0,0,0,0.3)' 
        : '0 15px 35px rgba(0,0,0,0.1)',
      transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      paddingLeft: isMobile ? '16px' : '0',
      paddingRight: isMobile ? '16px' : '0',
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover' as const,
      display: 'block',
      borderRadius: '16px',
    },
    manifestoLabel: {
      fontFamily: 'monospace',
      fontSize: isMobile ? '9px' : '10px', // ✅ Same font size
      letterSpacing: '0.16em',
      textTransform: 'uppercase' as const,
      color: isDark ? '#999' : '#666',
      marginBottom: isMobile ? '12px' : '12px',
      marginTop: isMobile ? '12px' : '0',
      textAlign: (isMobile ? 'center' : 'left') as 'center' | 'left',
      paddingLeft: isMobile ? '16px' : '0',
      paddingRight: isMobile ? '16px' : '0',
    },
    progressContainer: {
      position: 'relative' as const,
      marginTop: isMobile ? '16px' : '12px',
      display: 'flex',
      flexDirection: 'column' as const,
      gap: isMobile ? '10px' : '6px',
      width: '100%',
      paddingLeft: isMobile ? '16px' : '0',
      paddingRight: isMobile ? '16px' : '0',
    },
    progressItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px', // ✅ Original gap
      fontFamily: 'monospace',
      fontSize: isMobile ? '10px' : '10px', // ✅ Original font size
      letterSpacing: '0.06em',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      padding: isMobile ? '6px 0' : '3px 0',
      width: '100%',
      justifyContent: isMobile ? 'flex-start' : 'flex-start',
    },
    progressBar: {
      width: '32px', // ✅ Original width
      height: '2px',
      transition: 'all 0.3s ease',
      borderRadius: '2px',
    },
    progressText: {
      flex: 1,
      textAlign: 'left' as const,
    },
    // Right side styles
    rightSide: {
      position: 'relative' as const,
      width: '100%',
      minHeight: isMobile ? 'auto' : '280px',
      paddingLeft: isMobile ? '16px' : '0',
      paddingRight: isMobile ? '16px' : '0',
    },
    statement: {
      position: isMobile ? ('relative' as const) : ('absolute' as const),
      inset: 0,
      opacity: isMobile ? 1 : 0,
      transform: isMobile ? 'translateY(0)' : 'translateY(20px)',
      transition: 'opacity 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      pointerEvents: isMobile ? ('auto' as const) : ('none' as const),
      display: isMobile ? 'block' : 'block',
    },
    statementActive: {
      opacity: 1,
      transform: 'translateY(0)',
      pointerEvents: 'auto' as const,
      position: isMobile ? ('relative' as const) : ('relative' as const),
    },
    title: {
      fontSize: isMobile ? 'clamp(24px, 5.5vw, 38px)' : 'clamp(32px, 4vw, 52px)', // ✅ Original font size
      lineHeight: 1.08,
      letterSpacing: '-0.025em',
      margin: isMobile ? '0 0 10px' : '0 0 16px', // ✅ Original margin
      color: isDark ? '#ffffff' : '#171717',
      textAlign: 'left' as const,
    },
    titleEm: {
      fontStyle: 'italic' as const,
      fontWeight: 400,
      color: isDark ? '#e63939' : '#dc2626',
    },
    description: {
      fontSize: isMobile ? '13px' : '15px', // ✅ Original font size
      lineHeight: isMobile ? '20px' : '26px', // ✅ Original line height
      maxWidth: isMobile ? '100%' : '46ch', // ✅ Original width
      color: isDark ? '#e6e6e6' : '#4a4a4a',
      margin: 0,
      textAlign: 'left' as const,
    },
  };

  return (
    <section ref={sectionRef} style={styles.section}>
      <div style={styles.sticky}>
        <div style={styles.container}>
          {isMobile ? (
            // Mobile View
            <div style={styles.mobileCard}>
              <div style={styles.imageWrapper}>
                <img 
                  src={statements[activeIndex].image} 
                  alt={statements[activeIndex].alt}
                  style={styles.image}
                />
              </div>
              
              <div>
                <div style={styles.manifestoLabel}>
                  Manifesto · 01 — 03
                </div>
                
                <div style={styles.rightSide}>
                  {statements.map((stmt, idx) => (
                    <div 
                      key={idx} 
                      style={{
                        ...styles.statement,
                        ...(activeIndex === idx && styles.statementActive),
                        display: activeIndex === idx ? 'block' : 'none',
                      }}
                    >
                      <h2 style={styles.title}>
                        {stmt.title} <em style={styles.titleEm}>{stmt.titleEm}</em>
                      </h2>
                      <p style={styles.description}>{stmt.desc}</p>
                    </div>
                  ))}
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
                        width: activeIndex === idx ? '56px' : '32px',
                      }} />
                      <span style={styles.progressText}>
                        {idx === 0 && '01 · One idea, taught well'}
                        {idx === 1 && '02 · A small number of teachers'}
                        {idx === 2 && '03 · Time enough to think'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            // Desktop View
            <>
              <div style={styles.leftSide}>
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
                        width: activeIndex === idx ? '56px' : '32px',
                      }} />
                      {idx === 0 && '01 · One idea, taught well'}
                      {idx === 1 && '02 · A small number of teachers'}
                      {idx === 2 && '03 · Time enough to think'}
                    </div>
                  ))}
                </div>
              </div>

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
            </>
          )}
        </div>
      </div>
    </section>
  );
}
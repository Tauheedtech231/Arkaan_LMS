'use client';

import { useEffect, useState } from 'react';

const pillars = [
  { 
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=400&fit=crop",
    alt: "Hand writing on paper",
    num: '01', 
    title: 'Written, not generated.', 
    desc: "Every word is written by the author. We don't ghostwrite courses and we don't paraphrase them out of other books. The voice you hear is the one that signs the syllabus." 
  },
  { 
    image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=400&h=400&fit=crop",
    alt: "Person reading peacefully",
    num: '02', 
    title: 'Paced for reading.', 
    desc: 'Lessons arrive on a schedule that respects the rest of your week. Eight lessons, four hours total, read at the pace of a slow weekend. No streak penalties. No reminders.' 
  },
  { 
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop",
    alt: "Plant growing",
    num: '03', 
    title: 'Worth keeping.', 
    desc: "You can download any lesson as a printable PDF, an audio file, or a small bound volume we mail to you at the end of the course. It's a library, not a feed." 
  }
];

export default function Pillars() {
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
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.pillar-reveal, .pillar-up, .pillar-stagger').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Theme based colors
  const themeStyles = {
    sectionBg: isDark ? '#0a0a0a' : '#f5f5f5',
    cardBg: isDark ? '#141414' : '#ffffff',
    textPrimary: isDark ? '#ffffff' : '#171717',
    textSecondary: isDark ? '#999' : '#666',
    borderColor: isDark ? '#1f1f1f' : '#e5e5e5',
    borderColorLight: isDark ? '#2a2a2a' : '#d4d4d4',
  };

  const styles = {
    section: { 
      background: themeStyles.sectionBg, 
      padding: isMobile ? '60px 24px' : '80px 40px', 
      borderRadius: '24px', 
      margin: isMobile ? '0 16px 40px' : '0 40px 80px' 
    },
    inner: { 
      maxWidth: '1200px', 
      margin: '0 auto' 
    },
    eyebrow: { 
      fontFamily: 'monospace', 
      fontSize: '10px', 
      letterSpacing: '0.16em', 
      textTransform: 'uppercase' as const, 
      color: themeStyles.textSecondary, 
      display: 'flex', 
      alignItems: 'center', 
      gap: '10px', 
      marginBottom: '16px' 
    },
    eyebrowLine: { 
      width: '24px', 
      height: '1px', 
      background: themeStyles.textSecondary 
    },
    title: { 
      fontSize: isMobile ? 'clamp(28px, 6vw, 44px)' : 'clamp(32px, 4vw, 52px)', 
      lineHeight: 1.05, 
      letterSpacing: '-0.025em', 
      fontWeight: 600, 
      margin: '0 0 12px', 
      color: themeStyles.textPrimary 
    },
    titleEm: { 
      fontStyle: 'italic', 
      fontWeight: 400 
    },
    lede: { 
      fontSize: isMobile ? '13px' : '14px', 
      lineHeight: isMobile ? '20px' : '22px', 
      maxWidth: '48ch', 
      color: themeStyles.textSecondary, 
      marginBottom: '40px' 
    },
    grid: { 
      display: 'grid', 
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', 
      gap: isMobile ? '32px' : '40px' 
    },
    imageWrapper: {
      width: '100%',
      height: isMobile ? '180px' : '200px',
      marginBottom: '20px',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: isDark 
        ? '0 4px 12px rgba(0,0,0,0.3)' 
        : '0 4px 12px rgba(0,0,0,0.08)',
      transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover' as const,
      transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    },
    num: { 
      fontFamily: 'monospace', 
      fontSize: '9px', 
      letterSpacing: '0.16em', 
      textTransform: 'uppercase' as const, 
      color: themeStyles.textSecondary, 
      marginBottom: '10px', 
      display: 'flex', 
      alignItems: 'center', 
      gap: '10px' 
    },
    numLine: { 
      width: '16px', 
      height: '1px', 
      background: themeStyles.borderColorLight 
    },
    h3: { 
      fontSize: isMobile ? '20px' : '22px', 
      lineHeight: isMobile ? '28px' : '30px', 
      letterSpacing: '-0.015em', 
      margin: '0 0 10px', 
      color: themeStyles.textPrimary 
    },
    p: { 
      fontSize: isMobile ? '13px' : '14px', 
      lineHeight: isMobile ? '20px' : '22px', 
      color: themeStyles.textSecondary, 
      maxWidth: '36ch', 
      margin: 0 
    },
  };

  return (
    <section style={styles.section}>
      <div style={styles.inner}>
        <div className="pillar-reveal" style={{ maxWidth: '64ch', marginBottom: isMobile ? '40px' : '48px' }}>
          <div style={styles.eyebrow}>
            <span style={styles.eyebrowLine} />
            Why Arkaan
          </div>
          <h2 className="pillar-up" style={styles.title}>
            A different kind of <em style={styles.titleEm}>library.</em>
          </h2>
          <p className="pillar-up" style={styles.lede}>
            We don&#39;t compete with the rest of the internet for your attention. We make a small thing, carefully, and ask you to spend a little time with it.
          </p>
        </div>

        <div style={styles.grid}>
          {pillars.map((pillar, idx) => (
            <div key={idx} className="pillar-stagger" style={{ position: 'relative' }}>
              <div style={styles.imageWrapper} className="pillar-image-wrapper">
                <img 
                  src={pillar.image} 
                  alt={pillar.alt}
                  style={styles.image}
                  className="pillar-image"
                />
              </div>
              
              <div style={styles.num}>
                <span style={styles.numLine} />
                {pillar.num}
              </div>
              <h3 style={styles.h3}>{pillar.title}</h3>
              <p style={styles.p}>{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .pillar-reveal, .pillar-up, .pillar-stagger {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .pillar-reveal.in, .pillar-up.in, .pillar-stagger.in {
          opacity: 1;
          transform: translateY(0);
        }
        .pillar-up {
          transform: translateY(30px);
        }
        .pillar-stagger.in:nth-child(1) { transition-delay: 0.05s; }
        .pillar-stagger.in:nth-child(2) { transition-delay: 0.1s; }
        .pillar-stagger.in:nth-child(3) { transition-delay: 0.15s; }
        
        .pillar-stagger:hover .pillar-image {
          transform: scale(1.03);
        }
        .pillar-stagger:hover .pillar-image-wrapper {
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  );
}
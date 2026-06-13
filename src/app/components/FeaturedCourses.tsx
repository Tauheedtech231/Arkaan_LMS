'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const courses = [
  { 
    color: '#e63939', 
    badge: 'Live now', 
    num: 'Course 04 · Cognitive sciences', 
    name: 'The architecture of attention', 
    author: 'Aïcha Bakr · 8 lessons · 4 hrs',
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=500&fit=crop",
    alt: "Brain and attention"
  },
  { 
    color: '#5c2d91', 
    badge: 'Spring 2026', 
    num: 'Course 11 · Mathematics', 
    name: 'An invitation to topology', 
    author: 'Jonas Mehler · 12 lessons · 6 hrs',
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=500&fit=crop",
    alt: "Mathematical shapes"
  },
  { 
    color: '#249152', 
    badge: 'New', 
    num: 'Course 07 · Ecology', 
    name: 'The grammar of plants', 
    author: 'Lena Fárez · 6 lessons · 3 hrs',
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=500&fit=crop",
    alt: "Plants and leaves"
  },
  { 
    color: '#cc8800', 
    badge: 'Returning', 
    num: 'Course 02 · Letters', 
    name: 'Reading slowly, on purpose', 
    author: 'Marc Lévi · 5 lessons · 2 hrs',
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=500&fit=crop",
    alt: "Open book reading"
  }
];

export default function FeaturedCourses() {
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

    document.querySelectorAll('.stagger-item').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Theme based colors
  const themeStyles = {
    sectionBg: isDark ? '#0a0a0a' : '#ffffff',
    textPrimary: isDark ? '#ffffff' : '#171717',
    textSecondary: isDark ? '#999' : '#666',
    borderColor: isDark ? '#2a2a2a' : '#e5e5e5',
    cardBg: isDark ? '#141414' : '#f5f5f5',
    cardHover: isDark ? '#1a1a1a' : '#eeeeee',
  };

  const styles = {
    section: { 
      padding: isMobile ? '120px 24px' : '160px 40px', 
      maxWidth: '1440px', 
      margin: '0 auto',
      background: themeStyles.sectionBg,
    },
    head: { 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'flex-end', 
      marginBottom: isMobile ? '40px' : '56px', 
      gap: isMobile ? '32px' : '48px', 
      flexWrap: 'wrap' as const 
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
      marginBottom: '24px' 
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
      maxWidth: '18ch', 
      margin: 0, 
      color: themeStyles.textPrimary 
    },
    titleEm: { 
      fontStyle: 'italic', 
      fontWeight: 400 
    },
    btnOutline: { 
      background: 'transparent', 
      padding: isMobile ? '8px 16px' : '8px 16px', 
      borderRadius: '9999px', 
      fontWeight: 500, 
      fontSize: '12px', 
      border: `1px solid ${themeStyles.borderColor}`, 
      textDecoration: 'none', 
      color: themeStyles.textPrimary, 
      display: 'inline-flex', 
      alignItems: 'center', 
      gap: '8px',
      transition: 'all 0.3s ease',
    },
    grid: { 
      display: 'grid', 
      gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', 
      gap: isMobile ? '16px' : '20px' 
    },
    card: {
      cursor: 'pointer',
      transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      background: themeStyles.cardBg,
      borderRadius: '16px',
      overflow: 'hidden',
    },
    cover: {
      aspectRatio: '4/5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative' as const,
      overflow: 'hidden',
    },
    badge: {
      position: 'absolute' as const,
      top: '14px',
      left: '14px',
      padding: '5px 9px',
      background: 'rgba(0,0,0,0.6)',
      backdropFilter: 'blur(8px)',
      color: '#fff',
      borderRadius: '999px',
      fontSize: '10px',
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase' as const,
      zIndex: 10,
    },
    overlay: {
      position: 'absolute' as const,
      inset: 0,
      background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.2) 0 1px, transparent 1px 6px)',
      mixBlendMode: 'overlay' as const,
      pointerEvents: 'none' as const,
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover' as const,
      transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    },
    meta: {
      padding: '20px 16px 20px 16px',
    },
    num: {
      fontFamily: 'monospace',
      fontSize: '10px',
      letterSpacing: '0.16em',
      textTransform: 'uppercase' as const,
      color: themeStyles.textSecondary,
      marginBottom: '8px',
    },
    name: {
      fontSize: isMobile ? '16px' : '19px',
      lineHeight: isMobile ? '22px' : '24px',
      color: themeStyles.textPrimary,
      fontWeight: 600,
      letterSpacing: '-0.005em',
      marginBottom: '6px',
    },
    author: {
      fontSize: '13px',
      color: themeStyles.textSecondary,
    },
  };

  return (
    <section style={styles.section} id="library">
      <div style={styles.head}>
        <div>
          <div style={styles.eyebrow}>
            <span style={styles.eyebrowLine} />
            Featured this season
          </div>
          <h2 style={styles.title}>
            What&#39;s on <em style={styles.titleEm}>now.</em>
          </h2>
        </div>
        <div>
          <Link href="/dashboard" style={styles.btnOutline}>
            See all 24 courses →
          </Link>
        </div>
      </div>

      <div style={styles.grid}>
        {courses.map((course, idx) => (
          <article 
            key={idx} 
            className="stagger-item" 
            style={styles.card}
          >
            <div style={{...styles.cover, background: `linear-gradient(180deg, rgba(0,0,0,0.4) 0%, ${course.color} 100%)`}}>
              <span style={styles.badge}>
                {course.badge}
              </span>
              <div style={styles.overlay} />
              <img 
                src={course.image} 
                alt={course.alt}
                style={styles.image}
                className="course-image"
              />
            </div>
            <div style={styles.meta}>
              <div style={styles.num}>{course.num}</div>
              <div style={styles.name}>{course.name}</div>
              <div style={styles.author}>{course.author}</div>
            </div>
          </article>
        ))}
      </div>

      <style>{`
        .stagger-item {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .stagger-item.in {
          opacity: 1;
          transform: translateY(0);
        }
        .stagger-item.in:nth-child(1) { transition-delay: 0.05s; }
        .stagger-item.in:nth-child(2) { transition-delay: 0.15s; }
        .stagger-item.in:nth-child(3) { transition-delay: 0.25s; }
        .stagger-item.in:nth-child(4) { transition-delay: 0.35s; }
        .stagger-item:hover {
          transform: translateY(-6px);
        }
        .stagger-item:hover .course-image {
          transform: scale(1.08);
        }
        .btn-outline:hover {
          background: ${isDark ? '#1a1a1a' : '#eeeeee'};
        }
      `}</style>
    </section>
  );
}
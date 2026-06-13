'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const authors = [
  { 
    name: 'Aïcha Bakr', 
    role: 'Cognitive sciences · Brussels', 
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop',
    alt: 'Aïcha Bakr portrait'
  },
  { 
    name: 'Jonas Mehler', 
    role: 'Mathematics · Berlin',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop',
    alt: 'Jonas Mehler portrait'
  },
  { 
    name: 'Lena Fárez', 
    role: 'Ecology · Mexico City',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop',
    alt: 'Lena Fárez portrait'
  },
  { 
    name: 'Marc Lévi', 
    role: 'Letters · Marseille',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
    alt: 'Marc Lévi portrait'
  }
];

export default function Authors() {
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

    document.querySelectorAll('.author-reveal, .author-up, .author-card-item').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Theme based colors
  const themeStyles = {
    textPrimary: isDark ? '#ffffff' : '#171717',
    textSecondary: isDark ? '#999' : '#666',
    borderColor: isDark ? '#2a2a2a' : '#e5e5e5',
    cardOverlay: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.2)',
    badgeBg: isDark ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.95)',
    badgeText: isDark ? '#171717' : '#171717',
  };

  const styles = {
    section: { 
      padding: isMobile ? '80px 24px' : '100px 40px', 
      maxWidth: '1440px', 
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
      margin: '0 0 48px', 
      color: themeStyles.textPrimary 
    },
    titleEm: { 
      fontStyle: 'italic', 
      fontWeight: 400 
    },
    grid: { 
      display: 'grid', 
      gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', 
      gap: isMobile ? '16px' : '20px' 
    },
    card: {
      position: 'relative' as const,
      aspectRatio: '3/4',
      borderRadius: '16px',
      overflow: 'hidden',
      cursor: 'pointer',
      transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover' as const,
      transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    },
    overlay: {
      position: 'absolute' as const,
      inset: 0,
      background: `linear-gradient(180deg, transparent 0%, ${themeStyles.cardOverlay} 100%)`,
      transition: 'opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    },
    hoverOverlay: {
      position: 'absolute' as const,
      inset: 0,
      background: isDark ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.4)',
      opacity: 0,
      transition: 'opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    },
    badge: {
      position: 'absolute' as const,
      top: '14px',
      left: '14px',
      fontFamily: 'monospace',
      fontSize: '9px',
      letterSpacing: '0.16em',
      textTransform: 'uppercase' as const,
      color: themeStyles.badgeText,
      background: themeStyles.badgeBg,
      backdropFilter: 'blur(8px)',
      padding: '4px 10px',
      borderRadius: '999px',
      zIndex: 10,
      fontWeight: 500,
    },
    info: {
      position: 'absolute' as const,
      bottom: '20px',
      left: '20px',
      right: '20px',
      zIndex: 10,
    },
    name: {
      fontSize: isMobile ? '16px' : '18px',
      fontWeight: 600,
      letterSpacing: '-0.005em',
      marginBottom: '4px',
      color: '#ffffff',
    },
    role: {
      fontSize: '12px',
      color: 'rgba(255,255,255,0.8)',
    },
  };

  return (
    <section style={styles.section} id="authors">
      <div className="author-reveal" style={styles.eyebrow}>
        <span style={styles.eyebrowLine} />
        Authors in residence
      </div>
      <h2 className="author-up" style={styles.title}>
        People we&rsquo;d want to <em style={styles.titleEm}>learn from.</em>
      </h2>

      <div style={styles.grid}>
        {authors.map((author, idx) => (
          <Link 
            key={idx} 
            href="#" 
            className="author-card-item" 
            style={{ textDecoration: 'none' }}
          >
            <div style={styles.card}>
              {/* High Quality Image */}
              <img 
                src={author.image} 
                alt={author.alt}
                style={styles.image}
                className="author-image"
              />
              
              {/* Gradients */}
              <div style={styles.overlay} />
              <div style={styles.hoverOverlay} className="hover-overlay" />
              
              {/* Badge */}
              <span style={styles.badge}>
                Author photo
              </span>
              
              {/* Info */}
              <div style={styles.info}>
                <div style={styles.name}>{author.name}</div>
                <div style={styles.role}>{author.role}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <style>{`
        .author-reveal, .author-up, .author-card-item {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .author-reveal.in, .author-up.in, .author-card-item.in {
          opacity: 1;
          transform: translateY(0);
        }
        .author-up {
          transform: translateY(48px);
        }
        .author-card-item.in:nth-child(1) { transition-delay: 0.05s; }
        .author-card-item.in:nth-child(2) { transition-delay: 0.15s; }
        .author-card-item.in:nth-child(3) { transition-delay: 0.25s; }
        .author-card-item.in:nth-child(4) { transition-delay: 0.35s; }
        
        /* Hover Effects */
        .author-card-item:hover {
          transform: translateY(-6px);
        }
        .author-card-item:hover .author-image {
          transform: scale(1.05);
        }
        .author-card-item:hover .hover-overlay {
          opacity: 1;
        }
      `}</style>
    </section>
  );
}
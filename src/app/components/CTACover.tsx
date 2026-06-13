'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CTACover() {
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
      { threshold: 0.2 }
    );

    document.querySelectorAll('.cta-item, .cta-up').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Theme based gradient (always warm for CTA)
  const gradientBg = 'linear-gradient(180deg, #270C0C 0%, #951818 100%)';
  
  const styles = {
    section: { 
      margin: isMobile ? '0 16px 40px' : '0 40px 40px', 
      borderRadius: '24px', 
      background: gradientBg, 
      color: '#fff', 
      position: 'relative' as const, 
      overflow: 'hidden', 
      minHeight: isMobile ? '500px' : '640px', 
      display: 'flex', 
      flexDirection: 'column' as const, 
      justifyContent: 'space-between', 
      padding: isMobile ? '80px 32px 60px' : '100px 80px 80px' 
    },
    overlay: { 
      position: 'absolute' as const, 
      inset: 0, 
      background: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 6px), radial-gradient(80% 60% at 100% 0%, rgba(255,255,255,0.16) 0%, transparent 60%)', 
      mixBlendMode: 'overlay' as const, 
      pointerEvents: 'none' as const 
    },
    floral: { 
      position: 'absolute' as const, 
      right: isMobile ? '-80px' : '-60px', 
      bottom: isMobile ? '-80px' : '-60px', 
      width: isMobile ? '240px' : '320px', 
      height: isMobile ? '240px' : '320px', 
      opacity: 0.15, 
      pointerEvents: 'none' as const, 
      fontSize: isMobile ? '150px' : '200px', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center' 
    },
    meta: { 
      fontFamily: 'monospace', 
      fontSize: '10px', 
      letterSpacing: '0.16em', 
      textTransform: 'uppercase' as const, 
      color: 'rgba(255,255,255,0.7)', 
      display: 'flex', 
      alignItems: 'center', 
      gap: '12px', 
      marginBottom: '24px' 
    },
    metaLine: { 
      width: '24px', 
      height: '1px', 
      background: 'rgba(255,255,255,0.5)' 
    },
    h2: { 
      fontSize: isMobile ? 'clamp(40px, 8vw, 80px)' : 'clamp(56px, 7vw, 110px)', 
      lineHeight: 0.95, 
      letterSpacing: '-0.035em', 
      fontWeight: 700, 
      color: '#fff', 
      margin: '0 0 24px', 
      maxWidth: isMobile ? '100%' : '14ch' 
    },
    h2Em: { 
      fontStyle: 'italic', 
      fontWeight: 400, 
      color: 'rgba(255,255,255,0.8)' 
    },
    bottom: { 
      display: 'flex', 
      flexDirection: isMobile ? ('column' as const) : ('row' as const), 
      justifyContent: 'space-between', 
      alignItems: isMobile ? 'flex-start' : 'flex-end', 
      gap: isMobile ? '32px' : '48px', 
      flexWrap: 'wrap' as const 
    },
    sub: { 
      fontSize: isMobile ? '14px' : '15px', 
      lineHeight: isMobile ? '22px' : '24px', 
      maxWidth: isMobile ? '100%' : '42ch', 
      color: 'rgba(255,255,255,0.85)' 
    },
    btnPrimary: { 
      background: '#fff', 
      color: '#171717', 
      padding: isMobile ? '10px 18px' : '10px 20px', 
      borderRadius: '9999px', 
      fontWeight: 500, 
      fontSize: isMobile ? '13px' : '14px', 
      textDecoration: 'none', 
      display: 'inline-flex', 
      alignItems: 'center', 
      gap: '8px',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
    },
    btnOutline: { 
      background: 'transparent', 
      color: '#fff', 
      padding: isMobile ? '10px 18px' : '10px 20px', 
      borderRadius: '9999px', 
      fontWeight: 500, 
      fontSize: isMobile ? '13px' : '14px', 
      border: '1px solid rgba(255,255,255,0.4)', 
      textDecoration: 'none', 
      transition: 'all 0.3s ease',
      cursor: 'pointer',
    },
    btnGroup: { 
      display: 'flex', 
      gap: '12px', 
      flexWrap: 'wrap' as const 
    },
  };

  return (
    <section style={styles.section}>
      <div style={styles.overlay} />
      <div style={styles.floral}>◈</div>

      <div>
        <div className="cta-item" style={styles.meta}>
          <span style={styles.metaLine} />
          An invitation
        </div>
        <h2 className="cta-up" style={styles.h2}>
          Begin a <em style={styles.h2Em}>course.</em>
        </h2>
      </div>

      <div style={styles.bottom}>
        <p className="cta-up" style={styles.sub}>
          Open a free account, read the first lesson of any course, and decide for yourself. No card on file, no countdown timer, no discount that expires at midnight.
        </p>
        <div className="cta-up" style={styles.btnGroup}>
          <Link href="/dashboard" style={styles.btnPrimary}>
            Begin a course <span style={{ marginLeft: '2px' }}>→</span>
          </Link>
          <Link href="#library" style={styles.btnOutline}>
            Browse the library
          </Link>
        </div>
      </div>

      <style>{`
        .cta-item, .cta-up {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .cta-item.in, .cta-up.in {
          opacity: 1;
          transform: translateY(0);
        }
        .cta-up {
          transform: translateY(48px);
        }
        .btn-primary:hover {
          background: #f0f0f0;
          transform: scale(0.98);
        }
        .btn-outline:hover {
          background: rgba(255,255,255,0.1);
          transform: scale(0.98);
        }
      `}</style>
    </section>
  );
}
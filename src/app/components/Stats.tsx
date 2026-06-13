'use client';

import { useEffect, useRef, useState } from 'react';

const stats = [
  { target: 24, label: 'Courses in the library', suffix: '' },
  { target: 18, label: 'Commissioned authors', suffix: '' },
  { target: 312, label: 'Individual lessons', suffix: '' },
  { target: 96, label: 'Hours of careful teaching', suffix: 'h' }
];

export default function Stats() {
  const countersRef = useRef<(HTMLSpanElement | null)[]>([]);
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

  // Counter animation
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const target = parseInt(el.dataset.target || '0', 10);
          const duration = 1400;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            el.textContent = Math.floor(target * eased).toString();
            if (t < 1) requestAnimationFrame(tick);
            else el.textContent = target.toString();
          };
          requestAnimationFrame(tick);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.6 });

    countersRef.current.forEach(el => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  // Theme based colors
  const themeStyles = {
    textPrimary: isDark ? '#ffffff' : '#171717',
    textSecondary: isDark ? '#999' : '#666',
    borderColor: isDark ? '#2a2a2a' : '#e5e5e5',
    accentColor: isDark ? '#e63939' : '#dc2626',
  };

  const styles = {
    container: { 
      padding: isMobile ? '80px 24px' : '100px 40px', 
      maxWidth: '1440px', 
      margin: '0 auto', 
      display: 'grid', 
      gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', 
      gap: isMobile ? '32px' : '40px', 
      borderTop: `1px solid ${themeStyles.borderColor}`,
    },
    statNumber: { 
      fontSize: isMobile ? 'clamp(48px, 10vw, 80px)' : 'clamp(56px, 6vw, 96px)', 
      lineHeight: 1, 
      letterSpacing: '-0.04em', 
      fontWeight: 600, 
      color: themeStyles.textPrimary, 
      marginBottom: '12px',
      fontVariantNumeric: 'tabular-nums' as const,
    },
    suffix: { 
      color: themeStyles.accentColor 
    },
    statLabel: { 
      fontFamily: 'monospace', 
      fontSize: '10px', 
      letterSpacing: '0.16em', 
      textTransform: 'uppercase' as const, 
      color: themeStyles.textSecondary 
    },
  };

  return (
    <div style={styles.container}>
      {stats.map((stat, idx) => (
        <div key={idx}>
          <div style={styles.statNumber}>
            <span ref={el => { countersRef.current[idx] = el; }} data-target={stat.target}>0</span>
            <span style={styles.suffix}>{stat.suffix}</span>
          </div>
          <div style={styles.statLabel}>{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
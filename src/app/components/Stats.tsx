/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { target: 24, label: 'Courses in the library', suffix: '' },
  { target: 18, label: 'Commissioned authors', suffix: '' },
  { target: 312, label: 'Individual lessons', suffix: '' },
  { target: 96, label: 'Hours of careful teaching', suffix: 'h' }
];

// Stat Card Component with Framer Motion
const StatCard = ({ stat, index, styles, themeStyles }: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const duration = 1400;
      const start = performance.now();
      const target = stat.target;
      
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setCount(Math.floor(target * eased));
        if (t < 1) requestAnimationFrame(tick);
        else setCount(target);
      };
      requestAnimationFrame(tick);
    }
  }, [isInView, stat.target]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={styles.statItem}
    >
      <div style={styles.statNumber}>
        {count}
        <span style={styles.suffix}>{stat.suffix}</span>
      </div>
      <div style={styles.statLabel}>{stat.label}</div>
    </motion.div>
  );
};

export default function Stats() {
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

  // Theme based colors
  const themeStyles = {
    textPrimary: isDark ? '#ffffff' : '#171717',
    textSecondary: isDark ? '#999' : '#666',
    borderColor: isDark ? '#2a2a2a' : '#e5e5e5',
    accentColor: isDark ? '#e63939' : '#dc2626',
    bg: isDark ? '#0a0a0a' : '#ffffff',
  };

  const styles = {
    container: { 
      padding: isMobile ? '60px 20px' : '80px 40px',
      maxWidth: '1200px', 
      margin: '0 auto',
      background: themeStyles.bg,
    },
    statItem: {
      textAlign: 'center' as const,
      padding: isMobile ? '20px 0' : '24px 0',
    },
    statNumber: { 
      fontSize: isMobile ? 'clamp(40px, 10vw, 64px)' : 'clamp(56px, 6vw, 80px)', 
      lineHeight: 1.1, 
      letterSpacing: '-0.04em', 
      fontWeight: 600, 
      color: themeStyles.textPrimary, 
      marginBottom: isMobile ? '8px' : '12px',
      fontVariantNumeric: 'tabular-nums' as const,
      display: 'inline-block',
    },
    suffix: { 
      color: themeStyles.accentColor,
      marginLeft: '4px',
    },
    statLabel: { 
      fontFamily: 'monospace', 
      fontSize: isMobile ? '9px' : '10px', 
      letterSpacing: '0.16em', 
      textTransform: 'uppercase' as const, 
      color: themeStyles.textSecondary,
      maxWidth: isMobile ? '140px' : '200px',
      margin: '0 auto',
      lineHeight: 1.4,
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
      gap: isMobile ? '16px' : '32px',
      borderTop: `1px solid ${themeStyles.borderColor}`,
      paddingTop: isMobile ? '40px' : '60px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.grid}>
        {stats.map((stat, idx) => (
          <StatCard 
            key={idx}
            stat={stat}
            index={idx}
            styles={styles}
            themeStyles={themeStyles}
          />
        ))}
      </div>
    </div>
  );
}
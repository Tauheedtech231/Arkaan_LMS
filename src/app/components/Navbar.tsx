'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);

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

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Theme based colors
  const themeStyles = {
    textPrimary: isDark ? '#ffffff' : '#171717',
    textSecondary: isDark ? '#e6e6e6' : '#4a4a4a',
    bgScrolled: isDark ? 'rgba(10, 10, 10, 0.78)' : 'rgba(255, 255, 255, 0.78)',
    borderColor: isDark ? '#1f1f1f' : '#e5e5e5',
    btnPrimaryBg: isDark ? '#ffffff' : '#171717',
    btnPrimaryText: isDark ? '#0a0a0a' : '#ffffff',
  };

  const navStyles = {
    nav: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      padding: '18px 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      borderBottom: '1px solid transparent',
      backgroundColor: scrolled ? themeStyles.bgScrolled : 'transparent',
      backdropFilter: scrolled ? 'blur(14px)' : 'none',
      borderBottomColor: scrolled ? themeStyles.borderColor : 'transparent',
    },
    brand: {
      fontSize: '20px',
      fontWeight: 'bold',
      letterSpacing: '-0.02em',
      color: themeStyles.textPrimary,
      textDecoration: 'none',
    },
    left: {
      display: 'flex',
      alignItems: 'center',
      gap: '32px',
    },
    links: {
      display: 'flex',
      gap: '28px',
    },
    link: {
      fontSize: '13px',
      fontWeight: 500,
      color: themeStyles.textSecondary,
      textDecoration: 'none',
      transition: 'color 0.15s ease',
    },
    right: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    btnGhost: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      fontWeight: 600,
      fontSize: '14px',
      padding: '11px 18px',
      border: '1px solid transparent',
      borderRadius: '9999px',
      background: 'transparent',
      color: themeStyles.textPrimary,
      textDecoration: 'none',
      transition: 'background 0.3s ease',
    },
    btnPrimary: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      fontWeight: 600,
      fontSize: '14px',
      padding: '11px 18px',
      borderRadius: '9999px',
      background: themeStyles.btnPrimaryBg,
      color: themeStyles.btnPrimaryText,
      textDecoration: 'none',
      transition: 'all 0.3s ease',
    },
  };

  return (
    <nav style={navStyles.nav}>
      <div style={navStyles.left}>
        <Link href="/" style={navStyles.brand}>
          ARKAAN
        </Link>
        <div style={navStyles.links}>
          <Link href="#library" style={navStyles.link}>Library</Link>
          <Link href="#authors" style={navStyles.link}>Authors</Link>
          <Link href="#manifesto" style={navStyles.link}>Why Arkaan</Link>
          <Link href="#" style={navStyles.link}>Journal</Link>
        </div>
      </div>
      <div style={navStyles.right}>
        {/* Sign in button - goes to welcome page */}
        <Link href="/welcome" style={navStyles.btnGhost}>Sign in</Link>
        <Link href="/dashboard" style={navStyles.btnPrimary}>
          Begin a course
          <span style={{ marginLeft: '4px' }}>→</span>
        </Link>
      </div>
    </nav>
  );
}
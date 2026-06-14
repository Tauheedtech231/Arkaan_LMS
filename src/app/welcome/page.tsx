'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function WelcomePage() {
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

  // Theme based colors
  const themeStyles = {
    bgPrimary: isDark ? '#0a0a0a' : '#ffffff',
    textPrimary: isDark ? '#ffffff' : '#171717',
    textSecondary: isDark ? '#999' : '#666',
    borderColor: isDark ? '#2a2a2a' : '#e5e5e5',
    accentColor: isDark ? '#e63939' : '#dc2626',
    cardBg: isDark ? '#141414' : '#f5f5f5',
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column' as const,
      background: themeStyles.bgPrimary,
    },
    main: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: isMobile ? '20px 16px' : '30px 32px', // ✅ Padding aur kam
    },
    card: {
      maxWidth: isMobile ? '340px' : '400px', // ✅ Width aur kam
      width: '100%',
      background: themeStyles.cardBg,
      borderRadius: isMobile ? '20px' : '24px',
      padding: isMobile ? '20px 16px' : '28px 32px', // ✅ Padding aur kam
      border: `1px solid ${themeStyles.borderColor}`,
    },
    logo: {
      textAlign: 'center' as const,
      marginBottom: isMobile ? '16px' : '24px', // ✅ Margin aur kam
    },
    logoText: {
      fontFamily: 'Georgia, serif',
      fontSize: isMobile ? '22px' : '32px', // ✅ Font aur chota
      fontWeight: 700,
      letterSpacing: '-0.03em',
      color: themeStyles.textPrimary,
      lineHeight: 1.2,
    },
    logoEm: {
      fontStyle: 'italic',
      fontWeight: 400,
      color: themeStyles.accentColor,
    },
    welcomeText: {
      textAlign: 'center' as const,
      marginBottom: isMobile ? '16px' : '24px', // ✅ Margin aur kam
    },
    welcomeLine1: {
      fontSize: isMobile ? '18px' : '24px', // ✅ Font aur chota
      fontWeight: 600,
      letterSpacing: '-0.02em',
      color: themeStyles.textPrimary,
      marginBottom: isMobile ? '4px' : '6px',
    },
    welcomeLine2: {
      fontSize: isMobile ? '11px' : '12px', // ✅ Font aur chota
      lineHeight: isMobile ? '16px' : '20px', // ✅ Line height kam
      color: themeStyles.textSecondary,
      maxWidth: isMobile ? '100%' : '320px',
      margin: '0 auto',
      padding: isMobile ? '0' : '0',
    },
    buttonGroup: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: isMobile ? '8px' : '10px',
      marginBottom: isMobile ? '16px' : '20px', // ✅ Margin aur kam
    },
    btnPrimary: {
      width: '100%',
      background: themeStyles.accentColor,
      color: '#fff',
      padding: isMobile ? '8px 14px' : '10px 18px', // ✅ Padding aur kam
      borderRadius: '999px',
      fontWeight: 600,
      fontSize: isMobile ? '12px' : '13px', // ✅ Font aur chota
      textAlign: 'center' as const,
      textDecoration: 'none',
      display: 'block',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      border: 'none',
    },
    btnOutline: {
      width: '100%',
      background: 'transparent',
      color: themeStyles.textPrimary,
      padding: isMobile ? '8px 14px' : '10px 18px', // ✅ Padding aur kam
      borderRadius: '999px',
      fontWeight: 600,
      fontSize: isMobile ? '12px' : '13px', // ✅ Font aur chota
      textAlign: 'center' as const,
      textDecoration: 'none',
      display: 'block',
      border: `1px solid ${themeStyles.borderColor}`,
      transition: 'all 0.3s ease',
      cursor: 'pointer',
    },
    btnGuest: {
      width: '100%',
      background: 'transparent',
      color: themeStyles.textSecondary,
      padding: isMobile ? '6px 14px' : '8px 18px', // ✅ Padding aur kam
      borderRadius: '999px',
      fontWeight: 500,
      fontSize: isMobile ? '11px' : '12px', // ✅ Font aur chota
      textAlign: 'center' as const,
      textDecoration: 'none',
      display: 'block',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
    },
    termsText: {
      textAlign: 'center' as const,
      fontSize: isMobile ? '9px' : '10px', // ✅ Font aur chota
      color: themeStyles.textSecondary,
      borderTop: `1px solid ${themeStyles.borderColor}`,
      paddingTop: isMobile ? '12px' : '16px', // ✅ Padding aur kam
      marginTop: isMobile ? '0' : '0',
      lineHeight: 1.3,
    },
    link: {
      color: themeStyles.accentColor,
      textDecoration: 'none',
    },
  };

  // Hover effects style
  const hoverStyles = `
    .btn-primary:hover {
      transform: translateY(-1px);
      box-shadow: 0 2px 8px ${isDark ? 'rgba(230,57,57,0.3)' : 'rgba(220,38,38,0.2)'};
    }
    .btn-outline:hover {
      transform: translateY(-1px);
      background: ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'};
    }
    .btn-guest:hover {
      color: ${themeStyles.accentColor};
    }
    .btn-primary:active, .btn-outline:active, .btn-guest:active {
      transform: translateY(0);
    }
    @media (max-width: 768px) {
      .btn-primary:hover, .btn-outline:hover, .btn-guest:hover {
        transform: translateY(0);
      }
    }
  `;

  return (
    <div style={styles.container}>
      <main style={styles.main}>
        <div style={styles.card}>
          {/* Logo */}
          <div style={styles.logo}>
            <div style={styles.logoText}>
              w<em style={styles.logoEm}>elcome to</em>
            </div>
            <div style={styles.logoText}>
              Ark<em style={styles.logoEm}>aan</em>
            </div>
          </div>

          {/* Welcome Text */}
          <div style={styles.welcomeText}>
            <div style={styles.welcomeLine1}>
              A library of courses
            </div>
            <div style={styles.welcomeLine2}>
              for the things worth taking time over — your wealth, your relationships, your health.
            </div>
          </div>

          {/* Buttons */}
          <div style={styles.buttonGroup}>
            <Link href="/browse" style={styles.btnGuest} className="btn-guest">
              Browse as a guest
            </Link>
            <Link href="/login" style={styles.btnOutline} className="btn-outline">
              I have an account
            </Link>
            <Link href="/signup" style={styles.btnPrimary} className="btn-primary">
              Create an account
            </Link>
          </div>

          {/* Terms */}
          <div style={styles.termsText}>
            By continuing you agree to our{' '}
            <Link href="/terms" style={styles.link}>
              terms
            </Link>
            {' '}and{' '}
            <Link href="/privacy" style={styles.link}>
              privacy
            </Link>
            .
          </div>
        </div>
      </main>
      <style>{hoverStyles}</style>
    </div>
  );
}
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
    inputBg: isDark ? '#1a1a1a' : '#ffffff',
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
      padding: isMobile ? '40px 20px' : '60px 40px',
    },
    card: {
      maxWidth: '480px',
      width: '100%',
      background: themeStyles.cardBg,
      borderRadius: '24px',
      padding: isMobile ? '40px 24px' : '48px 40px',
      border: `1px solid ${themeStyles.borderColor}`,
    },
    logo: {
      textAlign: 'center' as const,
      marginBottom: '48px',
    },
    logoText: {
      fontFamily: 'Georgia, serif',
      fontSize: isMobile ? '36px' : '42px',
      fontWeight: 700,
      letterSpacing: '-0.03em',
      color: themeStyles.textPrimary,
    },
    logoEm: {
      fontStyle: 'italic',
      fontWeight: 400,
      color: themeStyles.accentColor,
    },
    welcomeText: {
      textAlign: 'center' as const,
      marginBottom: '40px',
    },
    welcomeLine1: {
      fontSize: isMobile ? '28px' : '36px',
      fontWeight: 600,
      letterSpacing: '-0.02em',
      color: themeStyles.textPrimary,
      marginBottom: '8px',
    },
    welcomeLine2: {
      fontSize: isMobile ? '14px' : '15px',
      lineHeight: '24px',
      color: themeStyles.textSecondary,
      maxWidth: '380px',
      margin: '0 auto',
    },
    buttonGroup: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '12px',
      marginBottom: '32px',
    },
    btnPrimary: {
      width: '100%',
      background: themeStyles.accentColor,
      color: '#fff',
      padding: '14px 20px',
      borderRadius: '999px',
      fontWeight: 600,
      fontSize: '15px',
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
      padding: '14px 20px',
      borderRadius: '999px',
      fontWeight: 600,
      fontSize: '15px',
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
      padding: '14px 20px',
      borderRadius: '999px',
      fontWeight: 500,
      fontSize: '14px',
      textAlign: 'center' as const,
      textDecoration: 'none',
      display: 'block',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
    },
    termsText: {
      textAlign: 'center' as const,
      fontSize: '12px',
      color: themeStyles.textSecondary,
      borderTop: `1px solid ${themeStyles.borderColor}`,
      paddingTop: '24px',
      marginTop: '8px',
    },
    link: {
      color: themeStyles.accentColor,
      textDecoration: 'none',
    },
  };

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
            <Link href="/browse" style={styles.btnGuest}>
              Browse as a guest
            </Link>
            <Link href="/login" style={styles.btnOutline}>
              I have an account
            </Link>
            <Link href="/signup" style={styles.btnPrimary}>
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
    </div>
  );
}
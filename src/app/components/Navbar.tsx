'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  // Check mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll effect
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleClickOutside = () => setMobileMenuOpen(false);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [mobileMenuOpen]);

  // Theme based colors
  const themeStyles = {
    textPrimary: isDark ? '#ffffff' : '#171717',
    textSecondary: isDark ? '#e6e6e6' : '#4a4a4a',
    bgScrolled: isDark ? 'rgba(10, 10, 10, 0.78)' : 'rgba(255, 255, 255, 0.78)',
    borderColor: isDark ? '#1f1f1f' : '#e5e5e5',
    btnPrimaryBg: isDark ? '#ffffff' : '#171717',
    btnPrimaryText: isDark ? '#0a0a0a' : '#ffffff',
    mobileMenuBg: isDark ? '#141414' : '#ffffff',
  };

  const styles = {
    nav: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      padding: isMobile ? '16px 20px' : '18px 40px',
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
      zIndex: 1001,
    },
    desktopLinks: {
      display: isMobile ? 'none' : 'flex',
      gap: '28px',
    },
    desktopLink: {
      fontSize: '13px',
      fontWeight: 500,
      color: themeStyles.textSecondary,
      textDecoration: 'none',
      transition: 'color 0.15s ease',
    },
    rightSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      zIndex: 1001,
    },
    menuBtn: {
      display: isMobile ? 'flex' : 'none',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      padding: '8px',
      borderRadius: '8px',
      color: themeStyles.textPrimary,
    },
    btnGhost: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      fontWeight: 600,
      fontSize: '14px',
      padding: '10px 16px',
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
      padding: '10px 16px',
      borderRadius: '9999px',
      background: themeStyles.btnPrimaryBg,
      color: themeStyles.btnPrimaryText,
      textDecoration: 'none',
      transition: 'all 0.3s ease',
    },
    // Mobile Menu Overlay
    mobileOverlay: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      zIndex: 998,
      opacity: mobileMenuOpen ? 1 : 0,
      visibility: (mobileMenuOpen ? 'visible' : 'hidden') as 'visible' | 'hidden',
      transition: 'all 0.3s ease',
    },
    mobileMenu: {
      position: 'fixed' as const,
      top: 0,
      right: 0,
      bottom: 0,
      width: '280px',
      background: themeStyles.mobileMenuBg,
      borderLeft: `1px solid ${themeStyles.borderColor}`,
      zIndex: 999,
      transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
      transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      padding: '80px 24px 24px 24px',
      display: 'flex',
      flexDirection: 'column' as const,
    },
    mobileLink: {
      display: 'block',
      padding: '14px 0',
      fontSize: '16px',
      fontWeight: 500,
      color: themeStyles.textPrimary,
      textDecoration: 'none',
      borderBottom: `1px solid ${themeStyles.borderColor}`,
    },
    mobileBtnGroup: {
      marginTop: '24px',
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '12px',
    },
    mobileBtnGhost: {
      display: 'block',
      textAlign: 'center' as const,
      padding: '12px 20px',
      borderRadius: '40px',
      fontWeight: 600,
      fontSize: '14px',
      background: 'transparent',
      color: themeStyles.textPrimary,
      border: `1px solid ${themeStyles.borderColor}`,
      textDecoration: 'none',
    },
    mobileBtnPrimary: {
      display: 'block',
      textAlign: 'center' as const,
      padding: '12px 20px',
      borderRadius: '40px',
      fontWeight: 600,
      fontSize: '14px',
      background: themeStyles.btnPrimaryBg,
      color: themeStyles.btnPrimaryText,
      textDecoration: 'none',
    },
    closeBtn: {
      position: 'absolute' as const,
      top: '20px',
      right: '20px',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      padding: '8px',
      borderRadius: '8px',
      color: themeStyles.textPrimary,
    },
  };

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <nav style={styles.nav}>
        <Link href="/" style={styles.brand}>
          ARKAAN
        </Link>

        {/* Desktop Navigation */}
        <div style={styles.desktopLinks}>
          <Link href="#library" style={styles.desktopLink}>Library</Link>
          <Link href="#authors" style={styles.desktopLink}>Authors</Link>
          <Link href="#manifesto" style={styles.desktopLink}>Why Arkaan</Link>
          <Link href="#" style={styles.desktopLink}>Journal</Link>
        </div>

        <div style={styles.rightSection}>
          <Link href="/welcome" style={styles.btnGhost}>Sign in</Link>
          <Link href="/dashboard" style={styles.btnPrimary}>
            Begin a course <span style={{ marginLeft: '4px' }}>→</span>
          </Link>
          <button 
            style={styles.menuBtn} 
            onClick={(e) => {
              e.stopPropagation();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div style={styles.mobileOverlay} onClick={closeMenu} />

      {/* Mobile Menu */}
      <div style={styles.mobileMenu}>
        <button style={styles.closeBtn} onClick={closeMenu}>
          <X size={24} />
        </button>
        
        <Link href="#library" style={styles.mobileLink} onClick={closeMenu}>Library</Link>
        <Link href="#authors" style={styles.mobileLink} onClick={closeMenu}>Authors</Link>
        <Link href="#manifesto" style={styles.mobileLink} onClick={closeMenu}>Why Arkaan</Link>
        <Link href="#" style={styles.mobileLink} onClick={closeMenu}>Journal</Link>
        
        <div style={styles.mobileBtnGroup}>
          <Link href="/welcome" style={styles.mobileBtnGhost} onClick={closeMenu}>Sign in</Link>
          <Link href="/dashboard" style={styles.mobileBtnPrimary} onClick={closeMenu}>
            Begin a course →
          </Link>
        </div>
      </div>

      <style>{`
        @media (hover: hover) {
          .desktop-link:hover {
            color: ${themeStyles.textPrimary};
          }
          .btn-ghost:hover {
            background: ${themeStyles.borderColor}40;
          }
          .btn-primary:hover {
            transform: scale(1.02);
          }
        }
        .mobile-link {
          transition: all 0.2s ease;
        }
        .mobile-link:active {
          opacity: 0.7;
        }
      `}</style>
    </>
  );
}
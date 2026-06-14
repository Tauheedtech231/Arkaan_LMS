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
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false);
      }
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

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Theme based colors
  const themeStyles = {
    textPrimary: isDark ? '#ffffff' : '#171717',
    textSecondary: isDark ? '#e6e6e6' : '#4a4a4a',
    bgScrolled: isDark ? 'rgba(10, 10, 10, 0.85)' : 'rgba(255, 255, 255, 0.85)',
    borderColor: isDark ? '#1f1f1f' : '#e5e5e5',
    btnPrimaryBg: isDark ? '#ffffff' : '#171717',
    btnPrimaryText: isDark ? '#0a0a0a' : '#ffffff',
    mobileMenuBg: isDark ? '#141414' : '#ffffff',
    overlayBg: 'rgba(0, 0, 0, 0.6)',
  };

  const styles = {
    nav: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      padding: isMobile ? '14px 20px' : '18px 40px',
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
      fontSize: isMobile ? '20px' : '22px',
      fontWeight: 'bold',
      letterSpacing: '-0.02em',
      color: themeStyles.textPrimary,
      textDecoration: 'none',
      zIndex: 1002,
    },
    desktopLinks: {
      display: isMobile ? 'none' : 'flex',
      gap: '32px',
    },
    desktopLink: {
      fontSize: '14px',
      fontWeight: 500,
      color: themeStyles.textSecondary,
      textDecoration: 'none',
      transition: 'color 0.15s ease',
    },
    rightSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      zIndex: 1002,
    },
    menuBtn: {
      display: isMobile ? 'flex' : 'none',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      padding: '8px',
      borderRadius: '8px',
      color: themeStyles.textPrimary,
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'opacity 0.2s ease',
      opacity: mobileMenuOpen ? 0 : 1,
      visibility: (mobileMenuOpen ? 'hidden' : 'visible') as 'visible' | 'hidden',
      pointerEvents: (mobileMenuOpen ? 'none' : 'auto') as 'none' | 'auto',
    },
    btnGhost: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      fontWeight: 600,
      fontSize: '14px',
      padding: '8px 18px',
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
      padding: '8px 18px',
      borderRadius: '9999px',
      background: themeStyles.btnPrimaryBg,
      color: themeStyles.btnPrimaryText,
      textDecoration: 'none',
      transition: 'all 0.3s ease',
    },
    mobileOverlay: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: themeStyles.overlayBg,
      backdropFilter: 'blur(4px)',
      zIndex: 1000,
      opacity: mobileMenuOpen ? 1 : 0,
      visibility: (mobileMenuOpen ? 'visible' : 'hidden') as 'visible' | 'hidden',
      transition: 'all 0.3s ease',
    },
    mobileMenu: {
      position: 'fixed' as const,
      top: 0,
      right: 0,
      bottom: 0,
      width: 'min(320px, 100vw)',
      maxWidth: '320px',
      background: themeStyles.mobileMenuBg,
      boxShadow: '-5px 0 25px rgba(0, 0, 0, 0.15)',
      zIndex: 1001,
      transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
      transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      padding: '70px 24px 30px 24px',
      display: 'flex',
      flexDirection: 'column' as const,
      overflowY: 'auto' as const,
      boxSizing: 'border-box' as const,
      left: 'auto',
    },
    mobileLink: {
      display: 'block',
      padding: '16px 0',
      fontSize: '18px',
      fontWeight: 500,
      color: themeStyles.textPrimary,
      textDecoration: 'none',
      borderBottom: `1px solid ${themeStyles.borderColor}`,
      transition: 'padding-left 0.2s ease',
    },
    mobileBtnGroup: {
      marginTop: '32px',
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '12px',
    },
    mobileBtnGhost: {
      display: 'block',
      textAlign: 'center' as const,
      padding: '14px 20px',
      borderRadius: '40px',
      fontWeight: 600,
      fontSize: '15px',
      background: 'transparent',
      color: themeStyles.textPrimary,
      border: `1px solid ${themeStyles.borderColor}`,
      textDecoration: 'none',
      transition: 'all 0.2s ease',
    },
    mobileBtnPrimary: {
      display: 'block',
      textAlign: 'center' as const,
      padding: '14px 20px',
      borderRadius: '40px',
      fontWeight: 600,
      fontSize: '15px',
      background: themeStyles.btnPrimaryBg,
      color: themeStyles.btnPrimaryText,
      textDecoration: 'none',
      transition: 'all 0.2s ease',
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
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1002,
      opacity: mobileMenuOpen ? 1 : 0,
      visibility: (mobileMenuOpen ? 'visible' : 'hidden') as 'visible' | 'hidden',
    },
  };

  const closeMenu = () => setMobileMenuOpen(false);
  const openMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMobileMenuOpen(true);
  };

  const desktopLinkHover = {
    onMouseEnter: (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.currentTarget.style.color = themeStyles.textPrimary;
    },
    onMouseLeave: (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.currentTarget.style.color = themeStyles.textSecondary;
    },
  };

  return (
    <>
      <nav style={styles.nav}>
        <Link href="/" style={styles.brand}>
          ARKAAN
        </Link>

        <div style={styles.desktopLinks}>
          <Link 
            href="#library" 
            style={styles.desktopLink}
            {...desktopLinkHover}
          >
            Library
          </Link>
          <Link 
            href="#authors" 
            style={styles.desktopLink}
            {...desktopLinkHover}
          >
            Authors
          </Link>
          <Link 
            href="#manifesto" 
            style={styles.desktopLink}
            {...desktopLinkHover}
          >
            Why Arkaan
          </Link>
          <Link 
            href="#" 
            style={styles.desktopLink}
            {...desktopLinkHover}
          >
            Journal
          </Link>
        </div>

        <div style={styles.rightSection}>
          {!isMobile && (
            <>
              <Link href="/welcome" style={styles.btnGhost}>Sign in</Link>
              <Link href="/dashboard" style={styles.btnPrimary}>
                Begin a course <span style={{ marginLeft: '4px' }}>→</span>
              </Link>
            </>
          )}
          
          {isMobile && (
            <button 
              style={styles.menuBtn} 
              onClick={openMenu}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          )}
        </div>
      </nav>

      <div style={styles.mobileOverlay} onClick={closeMenu} />

      <div style={styles.mobileMenu}>
        <button 
          style={styles.closeBtn} 
          onClick={closeMenu} 
          aria-label="Close menu"
        >
          <X size={24} />
        </button>
        
        <Link 
          href="#library" 
          style={styles.mobileLink} 
          onClick={closeMenu}
          onMouseEnter={(e) => e.currentTarget.style.paddingLeft = '8px'}
          onMouseLeave={(e) => e.currentTarget.style.paddingLeft = '0px'}
        >
          Library
        </Link>
        <Link 
          href="#authors" 
          style={styles.mobileLink} 
          onClick={closeMenu}
          onMouseEnter={(e) => e.currentTarget.style.paddingLeft = '8px'}
          onMouseLeave={(e) => e.currentTarget.style.paddingLeft = '0px'}
        >
          Authors
        </Link>
        <Link 
          href="#manifesto" 
          style={styles.mobileLink} 
          onClick={closeMenu}
          onMouseEnter={(e) => e.currentTarget.style.paddingLeft = '8px'}
          onMouseLeave={(e) => e.currentTarget.style.paddingLeft = '0px'}
        >
          Why Arkaan
        </Link>
        <Link 
          href="#" 
          style={styles.mobileLink} 
          onClick={closeMenu}
          onMouseEnter={(e) => e.currentTarget.style.paddingLeft = '8px'}
          onMouseLeave={(e) => e.currentTarget.style.paddingLeft = '0px'}
        >
          Journal
        </Link>
        
        <div style={styles.mobileBtnGroup}>
          <Link 
            href="/welcome" 
            style={styles.mobileBtnGhost} 
            onClick={closeMenu}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            Sign in
          </Link>
          <Link 
            href="/dashboard" 
            style={styles.mobileBtnPrimary} 
            onClick={closeMenu}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
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
        
        @media (max-width: 768px) {
          button, a {
            cursor: pointer;
            -webkit-tap-highlight-color: transparent;
          }
          
          button:active, a:active {
            opacity: 0.7;
            transform: scale(0.98);
            transition: all 0.05s ease;
          }
        }
        
        /* Mobile menu scrollbar styling */
        div[style*="mobileMenu"] {
          scrollbar-width: thin;
        }
        
        div[style*="mobileMenu"]::-webkit-scrollbar {
          width: 4px;
        }
        
        div[style*="mobileMenu"]::-webkit-scrollbar-track {
          background: ${themeStyles.borderColor};
        }
        
        div[style*="mobileMenu"]::-webkit-scrollbar-thumb {
          background: ${themeStyles.textSecondary};
          border-radius: 4px;
        }
        
        body.menu-open {
          overflow: hidden;
        }
      `}</style>
    </>
  );
}
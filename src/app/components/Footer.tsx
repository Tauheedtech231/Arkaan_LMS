'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Footer() {
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
    textPrimary: isDark ? '#ffffff' : '#171717',
    textSecondary: isDark ? '#999' : '#666',
    borderColor: isDark ? '#2a2a2a' : '#e5e5e5',
    accentColor: isDark ? '#e63939' : '#dc2626',
    linkHover: isDark ? '#ffffff' : '#171717',
    brandColor: isDark ? '#ffffff' : '#171717',
    bg: isDark ? '#0a0a0a' : '#ffffff',
  };

  const styles = {
    footer: { 
      padding: isMobile ? '32px 16px 20px' : '48px 40px 24px', 
      borderTop: `1px solid ${themeStyles.borderColor}`,
      background: themeStyles.bg,
    },
    ornament: { 
      overflow: 'hidden', 
      margin: '0 0 16px', 
      textAlign: 'center' as const 
    },
    ornamentWord: { 
      fontFamily: 'Georgia, serif', 
      fontSize: isMobile ? 'clamp(32px, 8vw, 56px)' : 'clamp(56px, 10vw, 120px)', 
      lineHeight: 0.9, 
      letterSpacing: '-0.045em', 
      fontWeight: 700, 
      color: themeStyles.textPrimary, 
      userSelect: 'none' as const 
    },
    ornamentEm: { 
      fontStyle: 'italic', 
      fontWeight: 400, 
      color: themeStyles.accentColor 
    },
    grid: { 
      display: 'grid', 
      gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : '1.2fr 1fr 1fr 1fr', 
      gap: isMobile ? '24px' : '32px', 
      marginBottom: isMobile ? '32px' : '40px', 
      maxWidth: '1200px', 
      marginLeft: 'auto', 
      marginRight: 'auto' 
    },
    brand: { 
      fontSize: isMobile ? '16px' : '22px', 
      fontWeight: 'bold', 
      letterSpacing: '-0.02em', 
      color: themeStyles.brandColor, 
      marginBottom: '8px' 
    },
    brandP: { 
      fontSize: '11px', 
      lineHeight: '16px',
      color: themeStyles.textSecondary, 
      marginTop: '8px', 
      maxWidth: isMobile ? '100%' : '24ch' 
    },
    colH5: { 
      fontFamily: 'monospace', 
      fontSize: '9px', 
      letterSpacing: '0.16em', 
      textTransform: 'uppercase' as const, 
      color: themeStyles.textSecondary, 
      margin: '0 0 12px', 
      fontWeight: 500 
    },
    colUl: { 
      listStyle: 'none', 
      margin: 0, 
      padding: 0, 
      display: 'flex', 
      flexDirection: 'column' as const, 
      gap: '8px' 
    },
    colLink: { 
      fontSize: '12px', 
      color: themeStyles.textSecondary, 
      textDecoration: 'none', 
      transition: 'all 0.2s ease',
      cursor: 'pointer',
      display: 'inline-block',
    },
    bottom: { 
      paddingTop: '16px', 
      borderTop: `1px solid ${themeStyles.borderColor}`, 
      display: 'flex', 
      flexDirection: isMobile ? ('column' as const) : ('row' as const),
      justifyContent: 'space-between', 
      alignItems: 'center', 
      gap: isMobile ? '8px' : '0',
      fontFamily: 'monospace', 
      fontSize: '8px', 
      letterSpacing: '0.06em', 
      color: themeStyles.textSecondary, 
      maxWidth: '1200px', 
      margin: '0 auto',
      textAlign: 'center' as const,
    },
  };

  return (
    <footer style={styles.footer}>
      {/* Logo Section */}
      <div style={styles.ornament}>
        <div style={styles.ornamentWord}>
          Ark<em style={styles.ornamentEm}>aan</em>
        </div>
      </div>

      {/* Grid Links */}
      <div style={styles.grid}>
        {/* Brand Column */}
        <div>
          <div style={styles.brand}>ARKAAN</div>
          <p style={styles.brandP}>A small library of courses, taught with care. Founded 2024.</p>
        </div>
        
        {/* Library Column */}
        <div>
          <h5 style={styles.colH5}>Library</h5>
          <ul style={styles.colUl}>
            <li><Link href="#" style={styles.colLink} className="footer-link">All courses</Link></li>
            <li><Link href="#" style={styles.colLink} className="footer-link">Spring 2026</Link></li>
            <li><Link href="#" style={styles.colLink} className="footer-link">New & returning</Link></li>
            <li><Link href="#" style={styles.colLink} className="footer-link">Gift a course</Link></li>
          </ul>
        </div>
        
        {/* Studio Column */}
        <div>
          <h5 style={styles.colH5}>Studio</h5>
          <ul style={styles.colUl}>
            <li><Link href="#" style={styles.colLink} className="footer-link">Authors</Link></li>
            <li><Link href="#" style={styles.colLink} className="footer-link">Journal</Link></li>
            <li><Link href="#" style={styles.colLink} className="footer-link">Press</Link></li>
            <li><Link href="#" style={styles.colLink} className="footer-link">Imprint</Link></li>
          </ul>
        </div>
        
        {/* Account Column */}
        <div>
          <h5 style={styles.colH5}>Account</h5>
          <ul style={styles.colUl}>
            <li><Link href="/dashboard" style={styles.colLink} className="footer-link">Sign in</Link></li>
            <li><Link href="#" style={styles.colLink} className="footer-link">Begin a course</Link></li>
            <li><Link href="#" style={styles.colLink} className="footer-link">Support</Link></li>
            <li><Link href="#" style={styles.colLink} className="footer-link">Newsletter</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div style={styles.bottom}>
        <span>© Arkaan 2026</span>
        <span>Volume 04 · Spring 2026</span>
      </div>

      <style>{`
        .footer-link {
          transition: all 0.2s ease;
        }
        .footer-link:hover {
          color: ${themeStyles.linkHover};
          transform: translateX(2px);
        }
      `}</style>
    </footer>
  );
}
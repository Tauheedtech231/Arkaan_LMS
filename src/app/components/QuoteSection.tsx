'use client';

import { useEffect, useState } from 'react';

export default function QuoteSection() {
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

    document.querySelectorAll('.quote-item').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Theme based colors
  const themeStyles = {
    textPrimary: isDark ? '#ffffff' : '#171717',
    textSecondary: isDark ? '#999' : '#666',
    quoteColor: isDark ? '#e63939' : '#dc2626',
    avatarGradient: isDark 
      ? 'linear-gradient(135deg, #e63939, #5c2d91)' 
      : 'linear-gradient(135deg, #dc2626, #7c3aed)',
  };

  const styles = {
    section: { 
      padding: isMobile ? '80px 24px' : '100px 40px', 
      textAlign: 'center' as const, 
      maxWidth: '1200px', 
      margin: '0 auto' 
    },
    mark: { 
      fontFamily: 'Georgia, serif', 
      fontSize: isMobile ? '80px' : '100px', 
      lineHeight: 1, 
      color: themeStyles.quoteColor, 
      marginBottom: '20px', 
      fontWeight: 700 
    },
    quote: { 
      fontSize: isMobile ? 'clamp(24px, 5vw, 36px)' : 'clamp(28px, 3.5vw, 44px)', 
      lineHeight: 1.2, 
      letterSpacing: '-0.02em', 
      fontWeight: 500, 
      color: themeStyles.textPrimary, 
      maxWidth: '28ch', 
      margin: '0 auto 32px' 
    },
    quoteEm: { 
      fontStyle: 'italic', 
      fontWeight: 400 
    },
    author: { 
      display: 'inline-flex', 
      alignItems: 'center', 
      gap: '16px', 
      marginTop: '16px' 
    },
    avatar: { 
      width: '48px', 
      height: '48px', 
      borderRadius: '999px', 
      background: themeStyles.avatarGradient, 
      color: '#fff', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      fontWeight: 600, 
      fontSize: '16px' 
    },
    name: { 
      fontSize: '15px', 
      fontWeight: 600, 
      color: themeStyles.textPrimary 
    },
    role: { 
      fontSize: '13px', 
      color: themeStyles.textSecondary 
    },
  };

  return (
    <section style={styles.section}>
      <div className="quote-item" style={styles.mark}>“</div>
      <p className="quote-item" style={styles.quote}>
        What I love about Arkaan is that they teach you <em style={styles.quoteEm}>one</em> thing, and they don&rsquo;t apologise for it.
      </p>
      <div className="quote-item" style={styles.author}>
        <div style={styles.avatar}>RN</div>
        <div>
          <div style={styles.name}>Reema Nair</div>
          <div style={styles.role}>Editor · The Slow Review</div>
        </div>
      </div>

      <style>{`
        .quote-item {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .quote-item.in {
          opacity: 1;
          transform: translateY(0);
        }
        .quote-item:nth-child(1).in { transition-delay: 0s; }
        .quote-item:nth-child(2).in { transition-delay: 0.15s; }
        .quote-item:nth-child(3).in { transition-delay: 0.3s; }
      `}</style>
    </section>
  );
}
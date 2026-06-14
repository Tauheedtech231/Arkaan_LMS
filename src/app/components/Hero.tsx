'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

const words = ['care', 'ethics', 'focus', 'you'];
const wordTexts = ['care.', 'ethics.', 'focus.', 'you in mind.'];

const themes = {
  care: {
    background: 'radial-gradient(120% 80% at 70% 30%, rgba(255,255,255,0.18) 0%, transparent 50%), linear-gradient(160deg, #2C070C 0%, #74111F 45%, #DE213C 100%)',
    gradient: 'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.18) 40%, rgba(0,0,0,0.65) 100%)',
  },
  ethics: {
    background: 'radial-gradient(120% 80% at 20% 20%, rgba(255,255,255,0.18) 0%, transparent 50%), linear-gradient(160deg, #001833 0%, #003E85 45%, #0077FF 100%)',
    gradient: 'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.18) 40%, rgba(0,0,0,0.65) 100%)',
  },
  focus: {
    background: 'radial-gradient(120% 80% at 80% 80%, rgba(255,255,255,0.20) 0%, transparent 50%), linear-gradient(160deg, #332200 0%, #855800 45%, #FFA800 100%)',
    gradient: 'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.18) 40%, rgba(0,0,0,0.65) 100%)',
  },
  you: {
    background: 'radial-gradient(120% 80% at 30% 70%, rgba(255,255,255,0.18) 0%, transparent 50%), linear-gradient(160deg, #003320 0%, #008553 45%, #00C47A 100%)',
    gradient: 'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.18) 40%, rgba(0,0,0,0.65) 100%)',
  },
};

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rotWidth, setRotWidth] = useState(0);
  const activeWordRef = useRef<HTMLSpanElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 960);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
        setTimeout(() => setIsTransitioning(false), 200);
      }, 100);
    }, 3600);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (activeWordRef.current) {
      setRotWidth(activeWordRef.current.offsetWidth + 2);
    }
  }, [currentIndex]);

  const currentWord = words[currentIndex];
  const currentTheme = themes[currentWord as keyof typeof themes];

  const heroStyles = {
    header: {
      position: 'relative' as const,
      minHeight: isMobile ? '80vh' : '100vh',
      height: isMobile ? 'auto' : '100vh',
      padding: isMobile ? '80px 20px 50px' : '140px 40px 100px',
      overflow: 'hidden',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column' as const,
      justifyContent: 'center',
    },
    bgStage: {
      position: 'absolute' as const,
      inset: 0,
      zIndex: 0,
    },
    bg: {
      position: 'absolute' as const,
      inset: 0,
      background: currentTheme.background,
      opacity: 1,
      transition: 'opacity 1.3s cubic-bezier(0.645, 0.045, 0.355, 1), transform 8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      transform: 'scale(1)',
    },
    bgOverlay: {
      position: 'absolute' as const,
      inset: 0,
      background: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 6px)',
      mixBlendMode: 'overlay' as const,
      pointerEvents: 'none' as const,
    },
    glyph: {
      position: 'absolute' as const,
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: 0.09,
      pointerEvents: 'none' as const,
      fontSize: '60vmin',
      fontWeight: 'bold',
    },
    heroScrim: {
      position: 'absolute' as const,
      inset: 0,
      zIndex: 1,
      background: currentTheme.gradient,
      pointerEvents: 'none' as const,
    },
    eyebrow: {
      position: 'relative' as const,
      zIndex: 2,
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      fontFamily: 'monospace',
      fontSize: isMobile ? '9px' : '11px',
      letterSpacing: '0.16em',
      textTransform: 'uppercase' as const,
      color: 'rgba(255,255,255,0.72)',
      marginBottom: isMobile ? '30px' : '64px',
    },
    dot: {
      width: '6px',
      height: '6px',
      background: '#fff',
      borderRadius: '999px',
      animation: 'pulse 2.4s ease-in-out infinite',
    },
    h1: {
      position: 'relative' as const,
      zIndex: 2,
      fontSize: isMobile ? 'clamp(32px, 9vw, 50px)' : 'clamp(44px, 5.5vw, 88px)',
      lineHeight: 1.08,
      letterSpacing: '-0.035em',
      fontWeight: 600,
      margin: 0,
      color: '#fff',
      maxWidth: '100%',
      width: '100%',
    },
    heroBottom: {
      position: 'relative' as const,
      zIndex: 2,
      display: 'flex',
      flexDirection: isMobile ? ('column' as const) : ('row' as const),
      justifyContent: 'space-between',
      alignItems: isMobile ? 'center' : 'flex-end',
      gap: isMobile ? '16px' : '40px',
      marginTop: isMobile ? '30px' : '64px',
    },
    heroSub: {
      fontSize: isMobile ? '14px' : '16px',
      lineHeight: isMobile ? '22px' : '26px',
      color: 'rgba(255,255,255,0.86)',
      maxWidth: '100%',
      width: '100%',
      margin: 0,
      textAlign: (isMobile ? 'center' : 'left') as 'center' | 'left',
      wordWrap: 'break-word' as const,
      overflowWrap: 'break-word' as const,
    },
    heroCtas: {
      display: 'flex',
      gap: '10px',
      flexWrap: 'wrap' as const,
      justifyContent: 'center',
      width: '100%',
    },
    btnPrimary: {
      background: '#fff',
      color: '#171717',
      padding: isMobile ? '8px 16px' : '8px 18px',
      borderRadius: '9999px',
      fontWeight: 500,
      fontSize: isMobile ? '12px' : '12px',
      textDecoration: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      transition: 'background 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.2s ease',
      letterSpacing: '0.01em',
      cursor: 'pointer',
      whiteSpace: 'nowrap' as const,
    },
    btnOutline: {
      background: 'transparent',
      color: '#fff',
      padding: isMobile ? '8px 16px' : '8px 18px',
      borderRadius: '9999px',
      fontWeight: 500,
      fontSize: isMobile ? '12px' : '12px',
      border: '1px solid rgba(255,255,255,0.4)',
      textDecoration: 'none',
      transition: 'background 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.2s ease',
      letterSpacing: '0.01em',
      cursor: 'pointer',
      whiteSpace: 'nowrap' as const,
    },
    wordNav: {
      position: 'absolute' as const,
      right: isMobile ? '16px' : '40px',
      top: '50%',
      transform: 'translateY(-50%)',
      display: isMobile ? 'none' : 'flex',
      flexDirection: 'column' as const,
      gap: '14px',
      alignItems: 'flex-end',
      zIndex: 2,
    },
    navBtn: {
      background: 'none',
      border: 0,
      cursor: 'pointer',
      padding: '6px 0',
      color: 'rgba(255,255,255,0.6)',
      fontFamily: 'monospace',
      fontSize: '11px',
      letterSpacing: '0.16em',
      textTransform: 'uppercase' as const,
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      transition: 'color 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    },
    navBar: {
      width: '28px',
      height: '1px',
      background: 'rgba(255,255,255,0.35)',
      transition: 'width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), background 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    },
  };

  const handleNavClick = (idx: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(idx);
      setTimeout(() => setIsTransitioning(false), 200);
    }, 100);
  };

  return (
    <header style={heroStyles.header}>
      {/* Background Stage */}
      <div style={heroStyles.bgStage}>
        {words.map((word, idx) => (
          <div
            key={word}
            style={{
              position: 'absolute',
              inset: 0,
              background: themes[word as keyof typeof themes].background,
              opacity: currentIndex === idx ? 1 : 0,
              transform: currentIndex === idx ? 'scale(1)' : 'scale(1.06)',
              transition: 'opacity 1.3s cubic-bezier(0.645, 0.045, 0.355, 1), transform 8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          >
            <div style={heroStyles.bgOverlay} />
            <div style={heroStyles.glyph}>◈</div>
          </div>
        ))}
      </div>

      {/* Scrim */}
      <div style={heroStyles.heroScrim} />

      {/* Content */}
      <div>
        <div style={heroStyles.eyebrow}>
          <span style={heroStyles.dot} />
          A small library · Volume 04 · Spring 2026
        </div>

        <h1 style={heroStyles.h1}>
          <span style={{ display: 'block' }}>Learning,</span>
          <span style={{ display: 'block' }}>
            taught with{' '}
            <span 
              style={{ 
                display: 'inline-block', 
                position: 'relative', 
                overflow: 'hidden', 
                verticalAlign: 'baseline', 
                height: '1.05em', 
                width: rotWidth ? `${rotWidth}px` : 'auto' 
              }}
            >
              {wordTexts.map((text, idx) => (
                <span
                  key={idx}
                  ref={currentIndex === idx ? activeWordRef : null}
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    whiteSpace: 'nowrap',
                    fontStyle: 'italic',
                    fontWeight: 400,
                    color: '#fff',
                    opacity: currentIndex === idx ? 1 : 0,
                    transform: currentIndex === idx ? 'translateY(0)' : currentIndex > idx ? 'translateY(-110%)' : 'translateY(100%)',
                    transition: 'opacity 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  }}
                >
                  {text}
                </span>
              ))}
            </span>
          </span>
        </h1>

        {/* Word Navigation - Desktop only */}
        <div style={heroStyles.wordNav}>
          {words.map((word, idx) => (
            <button
              key={word}
              onClick={() => handleNavClick(idx)}
              style={{
                ...heroStyles.navBtn,
                color: currentIndex === idx ? '#fff' : 'rgba(255,255,255,0.6)',
              }}
            >
              <span style={{
                ...heroStyles.navBar,
                width: currentIndex === idx ? '56px' : '28px',
                background: currentIndex === idx ? '#fff' : 'rgba(255,255,255,0.35)',
              }} />
              {idx === 0 && '01 · Care'}
              {idx === 1 && '02 · Ethics'}
              {idx === 2 && '03 · Focus'}
              {idx === 3 && '04 · You in mind'}
            </button>
          ))}
        </div>

        {/* Bottom Section */}
        <div style={heroStyles.heroBottom}>
          <p style={heroStyles.heroSub}>
            A short library of courses on the things worth taking time over — attention, language, ecology, mathematics. One idea, taught well, by people we trust.
          </p>
          <div style={heroStyles.heroCtas}>
            <Link href="/dashboard" style={heroStyles.btnPrimary}>
              Browse the library 
              <span style={{ marginLeft: '4px' }}>→</span>
            </Link>
            <Link href="#manifesto" style={heroStyles.btnOutline}>
              Read the manifesto
            </Link>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: .5; transform: scale(1.4); }
          }
          
          .hero-btn-primary:hover {
            background: #f5f5f5;
            transform: scale(1.02);
          }
          
          .hero-btn-outline:hover {
            background: rgba(255,255,255,0.08);
            transform: scale(1.02);
          }
          
          /* Mobile touch optimizations */
          @media (max-width: 960px) {
            .hero-btn-primary:active {
              transform: scale(0.98);
            }
            .hero-btn-outline:active {
              transform: scale(0.98);
            }
          }
        `}
      </style>
    </header>
  );
}
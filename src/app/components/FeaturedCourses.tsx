/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const courses = [
  { 
    color: '#e63939', 
    badge: 'Live now', 
    num: 'Course 04 · Cognitive sciences', 
    name: 'The architecture of attention', 
    author: 'Aïcha Bakr · 8 lessons · 4 hrs',
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=500&fit=crop",
    alt: "Brain and attention"
  },
  { 
    color: '#5c2d91', 
    badge: 'Spring 2026', 
    num: 'Course 11 · Mathematics', 
    name: 'An invitation to topology', 
    author: 'Jonas Mehler · 12 lessons · 6 hrs',
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=500&fit=crop",
    alt: "Mathematical shapes"
  },
  { 
    color: '#249152', 
    badge: 'New', 
    num: 'Course 07 · Ecology', 
    name: 'The grammar of plants', 
    author: 'Lena Fárez · 6 lessons · 3 hrs',
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=500&fit=crop",
    alt: "Plants and leaves"
  },
  { 
    color: '#cc8800', 
    badge: 'Returning', 
    num: 'Course 02 · Letters', 
    name: 'Reading slowly, on purpose', 
    author: 'Marc Lévi · 5 lessons · 2 hrs',
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=500&fit=crop",
    alt: "Open book reading"
  },
  { 
    color: '#3b82f6', 
    badge: 'Coming soon', 
    num: 'Course 15 · Philosophy', 
    name: 'The art of questioning', 
    author: 'Sofia Khan · 10 lessons · 5 hrs',
    image: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=400&h=500&fit=crop",
    alt: "Philosophy thinking"
  },
  { 
    color: '#f59e0b', 
    badge: 'New', 
    num: 'Course 08 · Linguistics', 
    name: 'The poetry of grammar', 
    author: 'Elena Petrova · 7 lessons · 3.5 hrs',
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=500&fit=crop",
    alt: "Language and words"
  }
];

// Card Component with Framer Motion
const CourseCard = ({ course, index, isDark, themeStyles, styles }: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2, margin: "-50px" });

  return (
    <motion.article
      ref={ref}
      className="stagger-item"
      style={styles.card}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <div style={{...styles.cover, background: `linear-gradient(180deg, rgba(0,0,0,0.3) 0%, ${course.color} 100%)`}}>
        <span style={styles.badge}>
          {course.badge}
        </span>
        <div style={styles.overlay} />
        <motion.img 
          src={course.image} 
          alt={course.alt}
          style={styles.image}
          className="course-image"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        />
      </div>
      <div style={styles.meta}>
        <div style={styles.num}>{course.num}</div>
        <div style={styles.name}>{course.name}</div>
        <div style={styles.author}>{course.author}</div>
      </div>
    </motion.article>
  );
};

export default function FeaturedCourses() {
  const [isDark, setIsDark] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

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

  // Check screen size
  useEffect(() => {
    const checkScreen = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsTablet(width > 768 && width <= 1024);
    };
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  // Get grid columns based on screen size
  const getGridColumns = () => {
    if (isMobile) return '1fr';
    if (isTablet) return 'repeat(2, 1fr)';
    return 'repeat(3, 1fr)';
  };

  // Theme based colors
  const themeStyles = {
    sectionBg: isDark ? '#0a0a0a' : '#ffffff',
    textPrimary: isDark ? '#ffffff' : '#171717',
    textSecondary: isDark ? '#999' : '#666',
    borderColor: isDark ? '#2a2a2a' : '#e5e5e5',
    cardBg: isDark ? '#141414' : '#f5f5f5',
    cardHover: isDark ? '#1a1a1a' : '#eeeeee',
  };

  const styles = {
    section: { 
      padding: isMobile ? '40px 20px' : '60px 40px', // ✅ Height aur kam
      maxWidth: '1280px', 
      margin: '0 auto',
      background: themeStyles.sectionBg,
    },
    head: { 
      display: 'flex',
      flexDirection: 'column' as const, // ✅ Column for centering
      justifyContent: 'center',
      alignItems: 'center', // ✅ Center horizontally
      textAlign: 'center' as const, // ✅ Center text
      marginBottom: isMobile ? '32px' : '40px', // ✅ Kam margin
      gap: isMobile ? '20px' : '24px',
    },
    eyebrow: { 
      fontFamily: 'monospace', 
      fontSize: '10px', 
      letterSpacing: '0.16em', 
      textTransform: 'uppercase' as const, 
      color: themeStyles.textSecondary, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', // ✅ Center
      gap: '10px', 
      marginBottom: '0px' 
    },
    eyebrowLine: { 
      width: '24px', 
      height: '1px', 
      background: themeStyles.textSecondary 
    },
    title: { 
      fontSize: isMobile ? 'clamp(28px, 6vw, 44px)' : 'clamp(32px, 4vw, 52px)', 
      lineHeight: 1.05, 
      letterSpacing: '-0.025em', 
      fontWeight: 600, 
      maxWidth: '100%', 
      margin: 0, 
      color: themeStyles.textPrimary 
    },
    titleEm: { 
      fontStyle: 'italic', 
      fontWeight: 400 
    },
    btnWrapper: {
      marginTop: '0px',
    },
    btnOutline: { 
      background: 'transparent', 
      padding: isMobile ? '8px 20px' : '10px 24px', 
      borderRadius: '9999px', 
      fontWeight: 500, 
      fontSize: '13px', 
      border: `1px solid ${themeStyles.borderColor}`, 
      textDecoration: 'none', 
      color: themeStyles.textPrimary, 
      display: 'inline-flex', 
      alignItems: 'center', 
      gap: '8px',
      transition: 'all 0.3s ease',
    },
    grid: { 
      display: 'grid', 
      gridTemplateColumns: getGridColumns(),
      gap: isMobile ? '16px' : '20px',
      // ✅ Mobile ke liye left-right margin
      paddingLeft: isMobile ? '0px' : '0',
      paddingRight: isMobile ? '0px' : '0',
    },
    card: {
      cursor: 'pointer',
      transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      background: themeStyles.cardBg,
      borderRadius: '14px', // ✅ Kam radius
      overflow: 'hidden',
    },
    cover: {
      aspectRatio: '4/5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative' as const,
      overflow: 'hidden',
    },
    badge: {
      position: 'absolute' as const,
      top: '10px',
      left: '10px',
      padding: '3px 8px',
      background: 'rgba(0,0,0,0.7)',
      backdropFilter: 'blur(8px)',
      color: '#fff',
      borderRadius: '999px',
      fontSize: '8px', // ✅ Chota
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase' as const,
      zIndex: 10,
    },
    overlay: {
      position: 'absolute' as const,
      inset: 0,
      background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0 1px, transparent 1px 6px)',
      mixBlendMode: 'overlay' as const,
      pointerEvents: 'none' as const,
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover' as const,
      display: 'block',
    },
    meta: {
      padding: '10px 12px 12px 12px', // ✅ Aur kam padding
    },
    num: {
      fontFamily: 'monospace',
      fontSize: '8px', // ✅ Chota
      letterSpacing: '0.16em',
      textTransform: 'uppercase' as const,
      color: themeStyles.textSecondary,
      marginBottom: '4px',
    },
    name: {
      fontSize: isMobile ? '15px' : '16px', // ✅ Chota
      lineHeight: isMobile ? '20px' : '22px',
      color: themeStyles.textPrimary,
      fontWeight: 600,
      letterSpacing: '-0.005em',
      marginBottom: '3px',
    },
    author: {
      fontSize: '10px', // ✅ Chota
      color: themeStyles.textSecondary,
    },
  };

  return (
    <motion.section 
      style={styles.section} 
      id="library"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div style={styles.head}>
        <div>
          <div style={styles.eyebrow}>
            <span style={styles.eyebrowLine} />
            Featured this season
            <span style={styles.eyebrowLine} />
          </div>
          <h2 style={styles.title}>
            What&#39;s on <em style={styles.titleEm}>now.</em>
          </h2>
        </div>
        <div style={styles.btnWrapper}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link href="/dashboard" style={styles.btnOutline}>
              See all 24 courses →
            </Link>
          </motion.div>
        </div>
      </div>

      <div style={styles.grid}>
        {courses.map((course, idx) => (
          <CourseCard 
            key={idx}
            course={course}
            index={idx}
            isDark={isDark}
            themeStyles={themeStyles}
            styles={styles}
          />
        ))}
      </div>

      <style>{`
        .btn-outline:hover {
          background: ${isDark ? '#1a1a1a' : '#eeeeee'};
          transform: translateY(-2px);
        }
        
        @media (max-width: 768px) {
          .btn-outline:active {
            transform: scale(0.98);
          }
        }
      `}</style>
    </motion.section>
  );
}
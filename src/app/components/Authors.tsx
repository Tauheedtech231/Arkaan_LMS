/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { X, MapPin, BookOpen, Users, Star } from 'lucide-react';

const authorsData = [
  { 
    id: 1,
    name: 'Aïcha Bakr', 
    role: 'Cognitive Sciences',
    location: 'Brussels',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop',
    bio: 'Aïcha is a cognitive scientist and writer based in Brussels. Her work explores the intersection of attention, memory, and digital culture. She has taught at universities across Europe.',
    courses: 3,
    lessons: 24,
    rating: 4.9
  },
  { 
    id: 2,
    name: 'Jonas Mehler', 
    role: 'Mathematics',
    location: 'Berlin',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop',
    bio: 'Jonas is a mathematician and educator from Berlin. He believes that mathematics is a form of poetry, and his courses focus on making abstract concepts tangible.',
    courses: 4,
    lessons: 32,
    rating: 4.8
  },
  { 
    id: 3,
    name: 'Lena Fárez', 
    role: 'Ecology',
    location: 'Mexico City',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop',
    bio: 'Lena is an ecologist and botanical illustrator based in Mexico City. Her work focuses on the relationship between plants, people, and place.',
    courses: 2,
    lessons: 16,
    rating: 4.7
  },
  { 
    id: 4,
    name: 'Marc Lévi', 
    role: 'Letters',
    location: 'Marseille',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
    bio: 'Marc is a writer and literary critic from Marseille. He teaches the art of slow reading and deep attention to text.',
    courses: 3,
    lessons: 20,
    rating: 4.9
  },
  { 
    id: 5,
    name: 'Sofia Khan', 
    role: 'Philosophy',
    location: 'Istanbul',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop',
    bio: 'Sofia is a philosopher and meditation teacher based in Istanbul. Her courses explore the intersection of Eastern and Western philosophy.',
    courses: 2,
    lessons: 18,
    rating: 4.8
  },
  { 
    id: 6,
    name: 'Elena Petrova', 
    role: 'Linguistics',
    location: 'Moscow',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop',
    bio: 'Elena is a linguist and polyglot from Moscow. She studies how language shapes thought and culture.',
    courses: 3,
    lessons: 28,
    rating: 4.9
  }
];

export default function Authors() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedAuthor, setSelectedAuthor] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [duplicatedAuthors, setDuplicatedAuthors] = useState<any[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isDark, setIsDark] = useState(true);

  // System theme detection
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

  // Create seamless infinite loop
  useEffect(() => {
    const copies = [...authorsData, ...authorsData, ...authorsData, ...authorsData, ...authorsData];
    setDuplicatedAuthors(copies);
  }, []);

  // Scroll parallax for slider
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const sliderX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, -300, -600, -900]);

  const handleAuthorClick = (author: any) => {
    setSelectedAuthor(author);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAuthor(null);
  };

  // Theme based colors (adjusts with system theme)
  const themeStyles = {
    textPrimary: isDark ? '#ffffff' : '#171717',
    textSecondary: isDark ? '#999' : '#666',
    textMuted: isDark ? '#666' : '#999',
    borderColor: isDark ? '#2a2a2a' : '#e5e5e5',
    cardBg: isDark ? '#141414' : '#f5f5f5',
    modalBg: isDark ? '#141414' : '#ffffff',
    badgeBg: isDark ? '#1a1a1a' : '#eeeeee',
    sectionBg: isDark ? '#0a0a0a' : '#ffffff',
    accentColor: '#e63939',
  };

  // Modal escape key handler
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    if (isModalOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const styles = {
    section: {
      padding: isMobile ? '60px 20px' : '80px 40px',
      maxWidth: '1440px',
      margin: '0 auto',
      overflow: 'hidden',
      background: themeStyles.sectionBg,
    },
    eyebrow: {
      fontFamily: 'monospace',
      fontSize: '10px',
      letterSpacing: '0.16em',
      textTransform: 'uppercase' as const,
      color: themeStyles.textSecondary,
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '24px',
      justifyContent: 'center',
    },
    eyebrowLine: {
      width: '24px',
      height: '1px',
      background: themeStyles.textSecondary,
    },
    title: {
      fontSize: isMobile ? 'clamp(28px, 6vw, 44px)' : 'clamp(32px, 4vw, 52px)',
      lineHeight: 1.05,
      letterSpacing: '-0.025em',
      fontWeight: 600,
      margin: '0 0 48px',
      color: themeStyles.textPrimary,
      textAlign: 'center' as const,
    },
    titleEm: {
      fontStyle: 'italic',
      fontWeight: 400,
    },
    sliderContainer: {
      position: 'relative' as const,
      width: '100%',
      overflowX: 'clip' as const,
    },
    sliderTrack: {
      display: 'flex',
      gap: isMobile ? '24px' : '40px',
      width: 'max-content' as const,
    },
    authorCard: {
      flexShrink: 0,
      cursor: 'pointer',
      textAlign: 'center' as const,
      transition: 'transform 0.3s ease',
    },
    imageWrapper: {
      position: 'relative' as const,
      width: isMobile ? '80px' : '100px',
      height: isMobile ? '80px' : '100px',
      margin: '0 auto 12px',
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover' as const,
      borderRadius: '50%',
      border: `2px solid ${themeStyles.borderColor}`,
      transition: 'all 0.3s ease',
    },
    name: {
      fontSize: isMobile ? '14px' : '15px',
      fontWeight: 600,
      color: themeStyles.textPrimary,
      marginBottom: '4px',
      whiteSpace: 'nowrap' as const,
    },
    role: {
      fontSize: '11px',
      color: themeStyles.textSecondary,
      whiteSpace: 'nowrap' as const,
    },
    underline: {
      width: '0',
      height: '2px',
      background: themeStyles.accentColor,
      marginTop: '8px',
      transition: 'width 0.3s ease',
      borderRadius: '2px',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    // Modal Styles
    modalOverlay: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(8px)',
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    },
    modal: {
      maxWidth: '900px',
      width: '100%',
      maxHeight: '85vh',
      background: themeStyles.modalBg,
      borderRadius: '24px',
      overflow: 'hidden',
      position: 'relative' as const,
      boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
    },
    modalClose: {
      position: 'absolute' as const,
      top: '16px',
      right: '16px',
      background: 'rgba(0,0,0,0.5)',
      border: 'none',
      borderRadius: '999px',
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      color: '#fff',
      zIndex: 10,
      transition: 'all 0.2s ease',
    },
    modalContent: {
      display: 'flex',
      flexDirection: isMobile ? ('column' as const) : ('row' as const),
    },
    modalImageWrapper: {
      width: isMobile ? '100%' : '40%',
      height: isMobile ? '280px' : 'auto',
      position: 'relative' as const,
      overflow: 'hidden',
    },
    modalImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover' as const,
    },
    modalInfo: {
      padding: '32px',
      flex: 1,
    },
    modalName: {
      fontSize: '28px',
      fontWeight: 600,
      color: themeStyles.textPrimary,
      marginBottom: '8px',
    },
    modalRole: {
      fontSize: '14px',
      color: themeStyles.accentColor,
      fontFamily: 'monospace',
      marginBottom: '16px',
    },
    modalMeta: {
      display: 'flex',
      flexWrap: 'wrap' as const,
      gap: '16px',
      marginBottom: '20px',
    },
    modalMetaItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      fontSize: '13px',
      color: themeStyles.textSecondary,
    },
    modalBio: {
      fontSize: '15px',
      lineHeight: '1.6',
      color: themeStyles.textSecondary,
      marginBottom: '24px',
    },
    modalBadges: {
      display: 'flex',
      flexWrap: 'wrap' as const,
      gap: '10px',
      marginBottom: '24px',
    },
    modalBadge: {
      padding: '6px 14px',
      background: themeStyles.badgeBg,
      borderRadius: '999px',
      fontSize: '12px',
      fontWeight: 500,
      color: themeStyles.textPrimary,
      border: `1px solid ${themeStyles.borderColor}`,
    },
    modalButton: {
      width: '100%',
      padding: '12px',
      background: themeStyles.accentColor,
      color: '#fff',
      border: 'none',
      borderRadius: '999px',
      fontSize: '14px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
  };

  return (
    <section ref={sectionRef} style={styles.section} id="authors">
      {/* Header */}
      <div style={styles.eyebrow}>
        <span style={styles.eyebrowLine} />
        Authors in residence
        <span style={styles.eyebrowLine} />
      </div>
      <h2 style={styles.title}>
        People we&apos;d want to <em style={styles.titleEm}>learn from.</em>
      </h2>

      {/* Continuous Scroll Slider */}
      <div style={styles.sliderContainer}>
        <motion.div
          style={{ x: sliderX }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div style={styles.sliderTrack}>
            {duplicatedAuthors.map((author, index) => (
              <motion.div
                key={`${author.id}-${index}`}
                style={styles.authorCard}
                onClick={() => handleAuthorClick(author)}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div style={styles.imageWrapper}>
                  <img
                    src={author.image}
                    alt={author.name}
                    style={styles.image}
                    className="author-img"
                  />
                </div>
                <div style={styles.name}>{author.name}</div>
                <div style={styles.role}>{author.role} · {author.location}</div>
                <div style={styles.underline} className="author-underline" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedAuthor && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={styles.modalOverlay}
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            style={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <button style={styles.modalClose} onClick={closeModal}>
              <X size={20} />
            </button>
            
            <div style={styles.modalContent}>
              <div style={styles.modalImageWrapper}>
                <img src={selectedAuthor.image} alt={selectedAuthor.name} style={styles.modalImage} />
              </div>
              <div style={styles.modalInfo}>
                <h3 style={styles.modalName}>{selectedAuthor.name}</h3>
                <p style={styles.modalRole}>{selectedAuthor.role} · {selectedAuthor.location}</p>
                
                <div style={styles.modalMeta}>
                  <div style={styles.modalMetaItem}>
                    <BookOpen size={14} />
                    <span>{selectedAuthor.courses} Courses</span>
                  </div>
                  <div style={styles.modalMetaItem}>
                    <Users size={14} />
                    <span>{selectedAuthor.lessons} Lessons</span>
                  </div>
                  <div style={styles.modalMetaItem}>
                    <Star size={14} fill="#e63939" stroke="#e63939" />
                    <span>{selectedAuthor.rating} Rating</span>
                  </div>
                </div>
                
                <p style={styles.modalBio}>{selectedAuthor.bio}</p>
                
                <div style={styles.modalBadges}>
                  <span style={styles.modalBadge}>Featured Author</span>
                  <span style={styles.modalBadge}>Top Rated</span>
                </div>
                
                <button style={styles.modalButton} onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      <style>{`
        .author-img {
          transition: transform 0.3s ease, border-color 0.3s ease;
        }
        .author-card-item:hover .author-img {
          transform: scale(1.05);
          border-color: ${themeStyles.accentColor};
        }
        .author-card-item:hover .author-underline {
          width: 40px;
        }
        .modal-close-btn:hover {
          background: rgba(0,0,0,0.7);
          transform: scale(1.05);
        }
        .modal-button:hover {
          opacity: 0.9;
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  );
}
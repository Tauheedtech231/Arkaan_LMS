/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Star, CheckCircle, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

const allCourses = [
  { id: 1, title: 'UX Design Fundamentals', subtitle: 'Master user experience design', image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=240&fit=crop', instructor: 'Sarah Johnson', rating: 4.8, students: '3.2k', duration: '8 hours', level: 'Beginner', category: 'UX Design' },
  { id: 2, title: 'Product Design Mastery', subtitle: 'Create amazing products', image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400&h=240&fit=crop', instructor: 'David Chen', rating: 4.9, students: '2.8k', duration: '12 hours', level: 'Intermediate', category: 'Product Design' },
  { id: 3, title: 'UI Animation', subtitle: 'Bring interfaces to life', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=240&fit=crop', instructor: 'Maria Lopez', rating: 4.7, students: '1.9k', duration: '6 hours', level: 'Advanced', category: 'Animation' },
  { id: 4, title: 'Design Systems', subtitle: 'Build scalable design', image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=400&h=240&fit=crop', instructor: 'James Wilson', rating: 4.8, students: '2.1k', duration: '10 hours', level: 'Intermediate', category: 'UI Design' },
  { id: 5, title: 'Figma Masterclass', subtitle: 'Master Figma like a pro', image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=240&fit=crop', instructor: 'Emily Brown', rating: 4.9, students: '4.5k', duration: '15 hours', level: 'Beginner', category: 'UI Design' },
  { id: 6, title: 'User Research', subtitle: 'Understand your users', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=240&fit=crop', instructor: 'Michael Lee', rating: 4.6, students: '1.5k', duration: '7 hours', level: 'Beginner', category: 'Research' },
];

const categories = ['All', 'UX Design', 'UI Design', 'Product Design', 'Animation', 'Research'];

export default function LearnTab({ themeStyles, isMobile }: any) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredCourses = allCourses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || course.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCourseClick = (courseId: number) => {
    router.push(`/course/${courseId}`);
  };

  const handleGoPremium = () => {
    router.push('/premium');
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.4, ease: "easeOut" }
    })
  };

  const styles = {
    searchContainer: {
      position: 'relative' as const,
      marginBottom: '24px',
      width: '100%',
    },
    searchIcon: {
      position: 'absolute' as const,
      left: '16px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: themeStyles.textSecondary,
      pointerEvents: 'none' as const,
      zIndex: 1,
    },
    searchBar: {
      width: '100%',
      padding: isMobile ? '12px 16px 12px 44px' : '14px 20px 14px 48px',
      background: themeStyles.inputBg,
      border: `1px solid ${themeStyles.borderColor}`,
      borderRadius: '48px',
      fontSize: isMobile ? '14px' : '15px',
      color: themeStyles.textPrimary,
      outline: 'none',
    },
    categoriesContainer: {
      display: 'flex',
      gap: '10px',
      flexWrap: 'wrap' as const,
      marginBottom: '32px',
    },
    categoryBtn: {
      padding: isMobile ? '6px 16px' : '8px 20px',
      borderRadius: '40px',
      fontSize: isMobile ? '12px' : '13px',
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    },
    sectionTitle: {
      fontSize: isMobile ? '20px' : '24px',
      fontWeight: 600,
      color: themeStyles.textPrimary,
      marginBottom: '20px',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
      gap: '20px',
      marginBottom: '40px',
    },
    courseCard: {
      background: themeStyles.cardBg,
      borderRadius: '16px',
      border: `1px solid ${themeStyles.borderColor}`,
      cursor: 'pointer',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
    },
    courseImage: {
      width: '100%',
      height: isMobile ? '140px' : '160px',
      objectFit: 'cover' as const,
    },
    courseInfo: {
      padding: '16px',
    },
    courseTitle: {
      fontSize: isMobile ? '16px' : '18px',
      fontWeight: 600,
      color: themeStyles.textPrimary,
      marginBottom: '4px',
    },
    courseSubtitle: {
      fontSize: isMobile ? '12px' : '13px',
      color: themeStyles.textSecondary,
      marginBottom: '10px',
    },
    courseMeta: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '10px',
      flexWrap: 'wrap' as const,
    },
    rating: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      fontSize: '12px',
      color: themeStyles.textSecondary,
    },
    star: {
      color: '#ffc107',
      fill: '#ffc107',
    },
    premiumCard: {
      background: `linear-gradient(135deg, ${themeStyles.accentColor}20, ${themeStyles.accentColor}05)`,
      border: `1px solid ${themeStyles.accentColor}40`,
      borderRadius: '20px',
      padding: isMobile ? '24px' : '32px',
    },
    premiumTitle: {
      fontSize: isMobile ? '20px' : '24px',
      fontWeight: 600,
      color: themeStyles.textPrimary,
      marginBottom: '16px',
    },
    premiumFeature: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontSize: isMobile ? '13px' : '14px',
      color: themeStyles.textSecondary,
      marginBottom: '10px',
    },
    premiumBtn: {
      background: themeStyles.accentColor,
      color: '#fff',
      padding: isMobile ? '10px 20px' : '12px 28px',
      borderRadius: '48px',
      fontWeight: 600,
      fontSize: isMobile ? '13px' : '14px',
      border: 'none',
      cursor: 'pointer',
      marginTop: '20px',
      transition: 'all 0.2s ease',
    },
  };

  return (
    <div>
      <div style={styles.searchContainer}>
        <Search size={isMobile ? 18 : 20} style={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search for courses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchBar}
        />
      </div>

      <div style={styles.categoriesContainer}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              ...styles.categoryBtn,
              background: activeCategory === cat ? themeStyles.accentColor : 'transparent',
              color: activeCategory === cat ? '#fff' : themeStyles.textSecondary,
              border: `1px solid ${activeCategory === cat ? themeStyles.accentColor : themeStyles.borderColor}`,
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <h2 style={styles.sectionTitle}>Recommended for you</h2>
      
      <div style={styles.grid}>
        {filteredCourses.map((course, i) => (
          <motion.div
            key={course.id}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            style={styles.courseCard}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            onClick={() => handleCourseClick(course.id)}
          >
            <img src={course.image} alt={course.title} style={styles.courseImage} />
            <div style={styles.courseInfo}>
              <div style={styles.courseTitle}>{course.title}</div>
              <div style={styles.courseSubtitle}>{course.subtitle}</div>
              <div style={styles.courseMeta}>
                <div style={styles.rating}>
                  <Star size={12} style={styles.star} fill="#ffc107" />
                  <span>{course.rating}</span>
                </div>
                <span style={{ fontSize: '11px', color: themeStyles.textSecondary }}>{course.students} students</span>
              </div>
              <div style={{ fontSize: '11px', color: themeStyles.accentColor }}>by {course.instructor}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div style={styles.premiumCard}>
        <h3 style={styles.premiumTitle}>Go premium to access our full library</h3>
        <div style={styles.premiumFeature}>
          <CheckCircle size={16} style={{ color: themeStyles.accentColor }} />
          <span>Learn from industry experts</span>
        </div>
        <div style={styles.premiumFeature}>
          <CheckCircle size={16} style={{ color: themeStyles.accentColor }} />
          <span>Learning at your own pace</span>
        </div>
        <div style={styles.premiumFeature}>
          <CheckCircle size={16} style={{ color: themeStyles.accentColor }} />
          <span>24/7 help & support</span>
        </div>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGoPremium}
          style={styles.premiumBtn} 
          className="premium-btn"
        >
          GO Premium →
        </motion.button>
      </div>
    </div>
  );
}
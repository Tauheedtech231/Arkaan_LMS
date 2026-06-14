/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Trash2, Search, X, Filter, ChevronDown } from 'lucide-react';

const defaultSavedCourses = [
  { id: 1, title: 'UX Design Fundamentals', subtitle: 'Master user experience design', image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=240&fit=crop', instructor: 'Sarah Johnson', rating: 4.8, category: 'Design', date: '2024-01-15' },
  { id: 2, title: 'Product Design Mastery', subtitle: 'Create amazing products', image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400&h=240&fit=crop', instructor: 'David Chen', rating: 4.9, category: 'Design', date: '2024-02-20' },
  { id: 3, title: 'UI Animation', subtitle: 'Bring interfaces to life', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=240&fit=crop', instructor: 'Maria Lopez', rating: 4.7, category: 'Animation', date: '2024-01-10' },
  { id: 4, title: 'Design Systems', subtitle: 'Build scalable design', image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=400&h=240&fit=crop', instructor: 'James Wilson', rating: 4.8, category: 'Design', date: '2024-03-01' },
  { id: 5, title: 'Figma Masterclass', subtitle: 'Master Figma like a pro', image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=240&fit=crop', instructor: 'Emily Brown', rating: 4.9, category: 'Tools', date: '2024-01-25' },
  { id: 6, title: 'User Research', subtitle: 'Understand your users', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=240&fit=crop', instructor: 'Michael Lee', rating: 4.6, category: 'Research', date: '2024-02-05' },
];

const topSearches = ['UX Design', 'Figma', 'Animation', 'Research', 'Product Design'];

export default function MyListTab({ themeStyles, isMobile }: any) {
  const [savedCourses, setSavedCourses] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    const saved = localStorage.getItem('savedCourses');
    if (saved) setSavedCourses(JSON.parse(saved));
    else setSavedCourses(defaultSavedCourses);
  }, []);

  const removeFromList = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = savedCourses.filter(c => c.id !== id);
    setSavedCourses(updated);
    localStorage.setItem('savedCourses', JSON.stringify(updated));
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const handleTopSearch = (term: string) => {
    setSearchQuery(term);
  };

  // Get unique categories
  const categories = ['all', ...new Set(savedCourses.map(course => course.category))];

  // Filter and sort courses
  const filteredCourses = savedCourses
    .filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           course.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = filterCategory === 'all' || course.category === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.3 }
    })
  };

  const styles = {
    container: { padding: '20px 0' },
    title: { fontSize: isMobile ? '24px' : '28px', fontWeight: 600, color: themeStyles.textPrimary, marginBottom: '8px' },
    subtitle: { fontSize: '13px', color: themeStyles.textSecondary, marginBottom: '20px' },
    
    // Search Section
    searchSection: { marginBottom: '24px' },
    searchContainer: { 
      position: 'relative' as const,
      marginBottom: '16px',
    },
    searchIcon: {
      position: 'absolute' as const,
      left: '14px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: themeStyles.textSecondary,
    },
    searchInput: {
      width: '100%',
      padding: isMobile ? '12px 16px 12px 42px' : '12px 20px 12px 44px',
      background: themeStyles.inputBg,
      border: `1px solid ${themeStyles.borderColor}`,
      borderRadius: '40px',
      fontSize: isMobile ? '14px' : '15px',
      color: themeStyles.textPrimary,
      outline: 'none',
      transition: 'all 0.2s ease',
    },
    clearSearchBtn: {
      position: 'absolute' as const,
      right: '14px',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: themeStyles.textSecondary,
      display: 'flex',
      alignItems: 'center',
      padding: '4px',
    },
    
    // Top Searches
    topSearchesContainer: { 
      display: 'flex', 
      alignItems: 'center', 
      gap: '12px', 
      flexWrap: 'wrap' as const,
      marginBottom: '20px',
    },
    topSearchesLabel: { 
      fontSize: '12px', 
      color: themeStyles.textSecondary,
      fontFamily: 'monospace',
    },
    topSearchTag: { 
      padding: '6px 14px', 
      background: themeStyles.inputBg,
      border: `1px solid ${themeStyles.borderColor}`,
      borderRadius: '40px', 
      fontSize: '12px', 
      cursor: 'pointer',
      color: themeStyles.textSecondary,
      transition: 'all 0.2s ease',
    },
    
    // Filters Bar
    filtersBar: { 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      flexWrap: 'wrap' as const,
      gap: '12px',
      marginBottom: '24px',
      paddingBottom: '16px',
      borderBottom: `1px solid ${themeStyles.borderColor}`,
    },
    filterToggle: { 
      display: 'flex', 
      alignItems: 'center', 
      gap: '8px',
      cursor: 'pointer',
      color: themeStyles.textSecondary,
      fontSize: '13px',
    },
    filterChips: { 
      display: 'flex', 
      gap: '10px', 
      flexWrap: 'wrap' as const 
    },
    filterChip: { 
      padding: '6px 14px', 
      borderRadius: '40px', 
      fontSize: '12px', 
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    },
    sortSelect: { 
      padding: '6px 12px', 
      background: themeStyles.inputBg,
      border: `1px solid ${themeStyles.borderColor}`,
      borderRadius: '40px', 
      fontSize: '12px', 
      color: themeStyles.textPrimary,
      cursor: 'pointer',
      outline: 'none',
    },
    
    // Results Count
    resultsCount: { 
      fontSize: '12px', 
      color: themeStyles.textSecondary, 
      marginBottom: '20px',
      paddingBottom: '12px',
      borderBottom: `1px solid ${themeStyles.borderColor}`,
    },
    
    // Grid
    grid: { 
      display: 'grid', 
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', 
      gap: '20px' 
    },
    
    // Card - Simple, no card styling
    card: { 
      background: 'transparent',
      cursor: 'pointer', 
      transition: 'all 0.2s ease',
    },
    image: { 
      width: '100%', 
      height: isMobile ? '180px' : '200px', 
      objectFit: 'cover' as const,
      borderRadius: '12px',
      marginBottom: '12px',
    },
    info: { 
      padding: '0',
    },
    cardTitle: { 
      fontSize: isMobile ? '16px' : '18px', 
      fontWeight: 600, 
      color: themeStyles.textPrimary, 
      marginBottom: '4px' 
    },
    cardSubtitle: { 
      fontSize: '12px', 
      color: themeStyles.textSecondary, 
      marginBottom: '8px' 
    },
    cardMeta: { 
      display: 'flex', 
      alignItems: 'center', 
      gap: '10px', 
      marginBottom: '8px',
      fontSize: '11px',
      color: themeStyles.textSecondary,
    },
    removeBtn: { 
      color: themeStyles.accentColor, 
      fontSize: '12px', 
      cursor: 'pointer', 
      background: 'none', 
      border: 'none', 
      padding: 0, 
      marginTop: '8px', 
      display: 'flex', 
      alignItems: 'center', 
      gap: '6px',
      opacity: 0.7,
      transition: 'opacity 0.2s ease',
    },
    
    // Empty State
    emptyContainer: { textAlign: 'center' as const, padding: '60px 20px' },
    emptyIcon: { marginBottom: '16px', color: themeStyles.textSecondary },
    emptyTitle: { fontSize: '18px', fontWeight: 500, color: themeStyles.textPrimary, marginBottom: '8px' },
    emptyText: { fontSize: '13px', color: themeStyles.textSecondary, marginBottom: '20px' },
    clearFiltersBtn: { 
      background: themeStyles.accentColor,
      color: '#fff',
      border: 'none',
      borderRadius: '40px',
      padding: '10px 20px',
      fontSize: '13px',
      cursor: 'pointer',
    },
  };

  if (savedCourses.length === 0) {
    return (
      <div style={styles.emptyContainer}>
        <Heart size={48} style={styles.emptyIcon} />
        <h2 style={styles.emptyTitle}>My List is empty</h2>
        <p style={styles.emptyText}>Courses you save will appear here</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>My List</h1>
      <p style={styles.subtitle}>{savedCourses.length} course{savedCourses.length !== 1 ? 's' : ''} saved for later</p>
      
      {/* Search Bar */}
      <div style={styles.searchSection}>
        <div style={styles.searchContainer}>
          <Search size={18} style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search your saved courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
            onFocus={(e) => e.currentTarget.style.borderColor = themeStyles.accentColor}
            onBlur={(e) => e.currentTarget.style.borderColor = themeStyles.borderColor}
          />
          {searchQuery && (
            <button onClick={clearSearch} style={styles.clearSearchBtn}>
              <X size={16} />
            </button>
          )}
        </div>
        
        {/* Top Searches */}
        {!searchQuery && (
          <div style={styles.topSearchesContainer}>
            <span style={styles.topSearchesLabel}>Top searches:</span>
            {topSearches.map(term => (
              <motion.button
                key={term}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleTopSearch(term)}
                style={styles.topSearchTag}
              >
                {term}
              </motion.button>
            ))}
          </div>
        )}
      </div>
      
      {/* Filters Bar */}
      <div style={styles.filtersBar}>
        <div style={styles.filterToggle} onClick={() => setShowFilters(!showFilters)}>
          <Filter size={14} />
          <span>Filters</span>
          <ChevronDown size={12} style={{ transform: showFilters ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
        </div>
        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)} 
          style={styles.sortSelect}
        >
          <option value="date">Latest</option>
          <option value="title">A-Z</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>
      
      {/* Filter Chips */}
      {showFilters && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ ...styles.filterChips, marginBottom: '20px' }}
        >
          {categories.map(cat => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setFilterCategory(cat)}
              style={{
                ...styles.filterChip,
                background: filterCategory === cat ? themeStyles.accentColor : 'transparent',
                color: filterCategory === cat ? '#fff' : themeStyles.textSecondary,
                border: `1px solid ${filterCategory === cat ? themeStyles.accentColor : themeStyles.borderColor}`,
              }}
            >
              {cat === 'all' ? 'All' : cat}
            </motion.button>
          ))}
        </motion.div>
      )}
      
      {/* Results Count */}
      <div style={styles.resultsCount}>
        {filteredCourses.length} result{filteredCourses.length !== 1 ? 's' : ''}
        {searchQuery && ` for "${searchQuery}"`}
      </div>
      
      {/* Courses Grid */}
      <div style={styles.grid}>
        {filteredCourses.map((course, i) => (
          <motion.div
            key={course.id}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            style={styles.card}
            whileHover={{ y: -4 }}
          >
            <img src={course.image} alt={course.title} style={styles.image} />
            <div style={styles.info}>
              <div style={styles.cardTitle}>{course.title}</div>
              <div style={styles.cardSubtitle}>{course.subtitle}</div>
              <div style={styles.cardMeta}>
                <span>by {course.instructor}</span>
                <span>★ {course.rating}</span>
              </div>
              <motion.button 
                style={styles.removeBtn} 
                onClick={(e) => removeFromList(course.id, e)}
                whileHover={{ opacity: 1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Trash2 size={12} /> Remove
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* No Results */}
      {filteredCourses.length === 0 && (
        <div style={styles.emptyContainer}>
          <Search size={48} style={styles.emptyIcon} />
          <h3 style={styles.emptyTitle}>No matching courses</h3>
          <p style={styles.emptyText}>Try adjusting your search or filters</p>
          <button onClick={() => { setSearchQuery(''); setFilterCategory('all'); }} style={styles.clearFiltersBtn}>
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
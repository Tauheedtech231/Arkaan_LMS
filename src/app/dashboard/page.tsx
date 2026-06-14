/* eslint-disable react/no-unescaped-entities */
'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Menu } from 'lucide-react';
import Sidebar from '../components/dashboard/Sidebar';
import LearnTab from '../components/dashboard/LearnTab';
import MyListTab from '../components/dashboard/MyListTab';
import NotificationsTab from '../components/dashboard/NotificationsTab';
import SettingsTab from '../components/dashboard/SettingsTab';
import SubscriptionTab from '../components/dashboard/SubscriptionTab';

export default function Dashboard() {
  const [isDark, setIsDark] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState('learn');
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  // Check mobile and handle resize
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(false);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Theme styles
  const themeStyles = {
    bgPrimary: isDark ? '#0a0a0a' : '#f5f5f5',
    textPrimary: isDark ? '#ffffff' : '#171717',
    textSecondary: isDark ? '#999' : '#666',
    borderColor: isDark ? '#2a2a2a' : '#e5e5e5',
    accentColor: isDark ? '#e63939' : '#dc2626',
    cardBg: isDark ? '#141414' : '#ffffff',
    inputBg: isDark ? '#1a1a1a' : '#ffffff',
    sidebarBg: isDark ? '#0a0a0a' : '#ffffff',
    hoverBg: isDark ? '#1f1f1f' : '#f0f0f0',
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      background: themeStyles.bgPrimary,
      position: 'relative' as const,
    },
    main: {
      flex: 1,
      marginLeft: isMobile ? '0' : '280px',
      padding: isMobile ? '70px 16px 80px 16px' : '80px 32px 80px 32px',
      maxWidth: isMobile ? '100%' : 'calc(100% - 280px)',
    },
    menuBtn: {
      position: 'fixed' as const,
      top: '16px',
      left: '16px',
      zIndex: 100,
      background: themeStyles.cardBg,
      border: `1px solid ${themeStyles.borderColor}`,
      borderRadius: '12px',
      padding: '10px',
      cursor: 'pointer',
      display: isMobile ? 'flex' : 'none',
      alignItems: 'center',
      justifyContent: 'center',
      color: themeStyles.textPrimary,
      transition: 'all 0.2s ease',
    },
  };

  // Animation variants - Smooth without jhatka
  const pageVariants:Variants = {
    initial: { opacity: 0, y: 10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.2, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      y: -10,
      transition: { duration: 0.15, ease: "easeIn" }
    }
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'learn':
        return <LearnTab themeStyles={themeStyles} isMobile={isMobile} />;
      case 'mylist':
        return <MyListTab themeStyles={themeStyles} isMobile={isMobile} />;
      case 'notifications':
        return <NotificationsTab themeStyles={themeStyles} isMobile={isMobile} />;
      case 'settings':
        return <SettingsTab themeStyles={themeStyles} isDark={isDark} setIsDark={setIsDark} isMobile={isMobile} />;
      case 'subscription':
        return <SubscriptionTab themeStyles={themeStyles} isMobile={isMobile} />;
      default:
        return null;
    }
  };

  return (
    <div style={styles.container}>
      {/* Mobile Menu Button - Only shows when sidebar is closed on mobile */}
      {isMobile && !sidebarOpen && (
        <button 
          style={styles.menuBtn}
          onClick={() => setSidebarOpen(true)}
          className="menu-btn"
        >
          <Menu size={22} />
        </button>
      )}

      {/* Sidebar Component */}
      <Sidebar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDark={isDark}
        isMobile={isMobile}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        themeStyles={themeStyles}
      />

      {/* Main Content */}
      <motion.main 
        style={styles.main}
        key={activeTab}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
      >
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </motion.main>
    </div>
  );
}
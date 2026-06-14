/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Heart, Bell, Settings as SettingsIcon, Gem, X } from 'lucide-react';
import Link from 'next/link';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isDark: boolean;
  isMobile: boolean;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  themeStyles: any;
}

export default function Sidebar({ activeTab, setActiveTab, isDark, isMobile, sidebarOpen, setSidebarOpen, themeStyles }: SidebarProps) {
  
  const navItems = [
    { id: 'learn', label: 'Learn', icon: BookOpen },
    { id: 'mylist', label: 'My List', icon: Heart },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
    { id: 'subscription', label: 'Subscription', icon: Gem },
  ];

  const styles = {
    sidebar: {
      position: 'fixed' as const,
      left: 0,
      top: 0,
      bottom: 0,
      width: '280px',
      background: themeStyles.sidebarBg,
      borderRight: `1px solid ${themeStyles.borderColor}`,
      padding: '32px 20px',
      zIndex: 99,
      overflowY: 'auto' as const,
      transform: isMobile ? (sidebarOpen ? 'translateX(0)' : 'translateX(-100%)') : 'translateX(0)',
      transition: 'transform 0.25s ease-in-out',
    },
    logo: {
      fontSize: '28px',
      fontWeight: 'bold',
      letterSpacing: '-0.02em',
      color: themeStyles.textPrimary,
      marginBottom: '40px',
      padding: '0 12px',
      textDecoration: 'none',
      display: 'inline-block',
      cursor: 'pointer',
      transition: 'opacity 0.2s ease',
    },
    logoEm: {
      fontStyle: 'italic',
      color: themeStyles.accentColor,
    },
    navItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
      padding: '12px 16px',
      borderRadius: '12px',
      marginBottom: '6px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      color: themeStyles.textSecondary,
    },
    navItemActive: {
      background: themeStyles.accentColor,
      color: '#fff',
    },
  };

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const handleLogoClick = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Desktop Sidebar - Always visible */}
      {!isMobile && (
        <aside style={styles.sidebar}>
          <Link 
            href="/" 
            style={styles.logo}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            Ark<em style={styles.logoEm}>aan</em>
          </Link>

          {navItems.map((item) => (
            <div
              key={item.id}
              style={{
                ...styles.navItem,
                ...(activeTab === item.id && styles.navItemActive),
              }}
              onClick={() => handleNavClick(item.id)}
              onMouseEnter={(e) => {
                if (activeTab !== item.id) {
                  e.currentTarget.style.background = themeStyles.hoverBg;
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== item.id) {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </div>
          ))}
        </aside>
      )}

      {/* Mobile Sidebar - Slides from left */}
      {isMobile && (
        <>
          {/* Overlay */}
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.5)',
              zIndex: 98,
              display: sidebarOpen ? 'block' : 'none',
              transition: 'opacity 0.25s ease',
              opacity: sidebarOpen ? 1 : 0,
              pointerEvents: sidebarOpen ? 'auto' : 'none',
            }}
            onClick={() => setSidebarOpen(false)}
          />

          {/* Sidebar */}
          <aside
            style={{
              ...styles.sidebar,
              transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
              transition: 'transform 0.25s ease-in-out',
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setSidebarOpen(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: themeStyles.textSecondary,
                padding: '8px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <X size={22} />
            </button>

            <Link 
              href="/" 
              style={styles.logo}
              onClick={handleLogoClick}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              Ark<em style={styles.logoEm}>aan</em>
            </Link>

            {navItems.map((item) => (
              <div
                key={item.id}
                style={{
                  ...styles.navItem,
                  ...(activeTab === item.id && styles.navItemActive),
                }}
                onClick={() => handleNavClick(item.id)}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </div>
            ))}
          </aside>
        </>
      )}
    </>
  );
}
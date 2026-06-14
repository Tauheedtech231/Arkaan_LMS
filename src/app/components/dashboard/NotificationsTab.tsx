/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, CheckCheck, BookOpen, Trophy, MessageCircle, Users, Star, Clock, Gift, UserPlus, Heart, Award, X, Circle } from 'lucide-react';

const defaultNotifications = [
  // Course Related
  { id: 1, title: 'New Course Available', message: 'UX Design for beginners is now available', time: '2 hours ago', read: false, icon: BookOpen, type: 'course' },
  { id: 2, title: 'Course Updated', message: 'New lessons added to "Advanced UI Design"', time: '5 hours ago', read: false, icon: BookOpen, type: 'course' },
  
  // Progress Related
  { id: 3, title: 'Lesson Completed', message: 'You completed "The basics" lesson', time: 'Yesterday', read: false, icon: Trophy, type: 'progress' },
  { id: 4, title: 'Achievement Unlocked', message: 'You\'ve completed 5 lessons this week!', time: '3 days ago', read: true, icon: Award, type: 'progress' },
  
  // Social/Community
  { id: 5, title: 'New Follower', message: 'Sarah Johnson started following you', time: '2 days ago', read: false, icon: UserPlus, type: 'social' },
  { id: 6, title: 'Comment Reply', message: 'Michael replied to your comment on "Design Systems"', time: '3 days ago', read: false, icon: MessageCircle, type: 'social' },
  { id: 7, title: 'Review Liked', message: 'Emily liked your course review', time: '4 days ago', read: true, icon: Heart, type: 'social' },
  { id: 8, title: 'Friend Joined', message: 'Ahmed Khan joined Arkaan - say hello!', time: '5 days ago', read: true, icon: Users, type: 'social' },
  
  // Course Recommendation
  { id: 9, title: 'Recommended for You', message: 'Based on your interests, try "Advanced UI Design"', time: '1 week ago', read: true, icon: Star, type: 'recommendation' },
  
  // Reminders
  { id: 10, title: 'Learning Streak', message: 'You\'re on a 7-day streak! Keep it up', time: '1 week ago', read: true, icon: Clock, type: 'reminder' },
  { id: 11, title: 'Special Offer', message: 'Get 30% off on yearly subscription', time: '2 weeks ago', read: true, icon: Gift, type: 'promotion' },
];

export default function NotificationsTab({ themeStyles, isMobile }: any) {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const saved = localStorage.getItem('notifications');
    if (saved) setNotifications(JSON.parse(saved));
    else setNotifications(defaultNotifications);
  }, []);

  const markAsRead = (id: number) => {
    const updated = notifications.map(n => n.id === id ? { ...n, read: true } : n);
    setNotifications(updated);
    localStorage.setItem('notifications', JSON.stringify(updated));
  };

  const markAllRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    localStorage.setItem('notifications', JSON.stringify(updated));
  };

  const deleteNotification = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = notifications.filter(n => n.id !== id);
    setNotifications(updated);
    localStorage.setItem('notifications', JSON.stringify(updated));
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread') return !notif.read;
    if (filter === 'course') return notif.type === 'course';
    if (filter === 'social') return notif.type === 'social';
    if (filter === 'progress') return notif.type === 'progress';
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const filterOptions = [
    { id: 'all', label: 'All' },
    { id: 'unread', label: 'Unread' },
    { id: 'course', label: 'Courses' },
    { id: 'social', label: 'Social' },
    { id: 'progress', label: 'Progress' },
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.03, duration: 0.2 }
    })
  };

  const getIconColor = (type: string) => {
    switch(type) {
      case 'course': return themeStyles.accentColor;
      case 'social': return '#3b82f6';
      case 'progress': return '#22c55e';
      case 'recommendation': return '#f59e0b';
      case 'reminder': return '#8b5cf6';
      case 'promotion': return '#ec489a';
      default: return themeStyles.textSecondary;
    }
  };

  const styles = {
    container: { padding: '20px 0' },
    
    // Header
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap' as const, gap: '12px' },
    title: { fontSize: isMobile ? '24px' : '28px', fontWeight: 600, color: themeStyles.textPrimary },
    subtitle: { fontSize: '13px', color: themeStyles.textSecondary, marginTop: '4px' },
    markAllBtn: { 
      background: 'transparent', 
      border: `1px solid ${themeStyles.borderColor}`, 
      borderRadius: '40px', 
      padding: '8px 16px', 
      fontSize: '13px', 
      color: themeStyles.textSecondary, 
      cursor: 'pointer', 
      display: 'flex', 
      alignItems: 'center', 
      gap: '6px',
      transition: 'all 0.2s ease',
    },
    
    // Filters - Bullet style
    filtersContainer: { 
      display: 'flex', 
      gap: '20px', 
      marginBottom: '28px', 
      flexWrap: 'wrap' as const,
      borderBottom: `1px solid ${themeStyles.borderColor}`,
      paddingBottom: '12px',
    },
    filterBtn: { 
      background: 'transparent', 
      border: 'none', 
      cursor: 'pointer', 
      fontSize: isMobile ? '13px' : '14px', 
      fontWeight: 500,
      color: themeStyles.textSecondary,
      padding: '4px 0',
      position: 'relative' as const,
      transition: 'color 0.2s ease',
    },
    filterActive: {
      color: themeStyles.accentColor,
    },
    filterDot: {
      position: 'absolute' as const,
      bottom: '-13px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '4px',
      height: '4px',
      borderRadius: '50%',
      background: themeStyles.accentColor,
    },
    
    // Notifications List - Bullet style (no cards)
    notifList: { display: 'flex', flexDirection: 'column' as const },
    notifItem: { 
      display: 'flex', 
      gap: '14px', 
      padding: '14px 0',
      borderBottom: `1px solid ${themeStyles.borderColor}`,
      cursor: 'pointer', 
      transition: 'all 0.2s ease',
      position: 'relative' as const,
    },
    notifIconWrapper: { 
      width: '36px', 
      height: '36px', 
      borderRadius: '50%', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      flexShrink: 0,
    },
    notifIcon: { width: '16px', height: '16px' },
    notifContent: { flex: 1, minWidth: 0 },
    notifTitle: { 
      fontWeight: 500, 
      color: themeStyles.textPrimary, 
      marginBottom: '4px', 
      fontSize: isMobile ? '14px' : '15px' 
    },
    notifMessage: { 
      fontSize: '13px', 
      color: themeStyles.textSecondary, 
      marginBottom: '6px', 
      lineHeight: 1.4 
    },
    notifTime: { 
      fontSize: '11px', 
      color: themeStyles.textSecondary, 
      display: 'flex', 
      alignItems: 'center', 
      gap: '4px' 
    },
    
    // Bullet indicator for unread
    unreadBullet: { 
      width: '6px', 
      height: '6px', 
      background: themeStyles.accentColor, 
      borderRadius: '50%',
      position: 'absolute' as const,
      left: '-8px',
      top: '50%',
      transform: 'translateY(-50%)',
    },
    
    // Delete button
    deleteBtn: { 
      background: 'transparent', 
      border: 'none', 
      cursor: 'pointer', 
      color: themeStyles.textSecondary,
      padding: '6px',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: 0,
      transition: 'opacity 0.2s ease',
      flexShrink: 0,
    },
    
    // Empty State
    emptyContainer: { textAlign: 'center' as const, padding: '60px 20px' },
    emptyIcon: { marginBottom: '16px', color: themeStyles.textSecondary },
    emptyTitle: { fontSize: '16px', fontWeight: 500, color: themeStyles.textPrimary, marginBottom: '8px' },
    emptyText: { fontSize: '13px', color: themeStyles.textSecondary },
  };

  // Hover effects
  const notifHover = {
    onMouseEnter: (e: any) => {
      const deleteBtn = e.currentTarget.querySelector('.delete-btn');
      if (deleteBtn) deleteBtn.style.opacity = '1';
    },
    onMouseLeave: (e: any) => {
      const deleteBtn = e.currentTarget.querySelector('.delete-btn');
      if (deleteBtn) deleteBtn.style.opacity = '0';
    },
  };

  if (filteredNotifications.length === 0) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>Notifications</h1>
            <p style={styles.subtitle}>No notifications to show</p>
          </div>
        </div>
        <div style={styles.emptyContainer}>
          <Bell size={48} style={styles.emptyIcon} />
          <h3 style={styles.emptyTitle}>All caught up!</h3>
          <p style={styles.emptyText}>You have no notifications at the moment</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Notifications</h1>
          <p style={styles.subtitle}>{unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}</p>
        </div>
        {unreadCount > 0 && (
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={markAllRead} 
            style={styles.markAllBtn}
          >
            <CheckCheck size={16} /> Mark all read
          </motion.button>
        )}
      </div>

      {/* Filters - Bullet style */}
      <div style={styles.filtersContainer}>
        {filterOptions.map(opt => (
          <motion.button
            key={opt.id}
            whileHover={{ opacity: 0.7 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setFilter(opt.id)}
            style={{
              ...styles.filterBtn,
              ...(filter === opt.id && styles.filterActive),
            }}
          >
            {opt.label}
            {filter === opt.id && <span style={styles.filterDot} />}
          </motion.button>
        ))}
      </div>

      {/* Notifications List - Bullet style */}
      <div style={styles.notifList}>
        {filteredNotifications.map((notif, i) => {
          const IconComponent = notif.icon;
          const iconColor = getIconColor(notif.type);
          
          return (
            <motion.div
              key={notif.id}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={itemVariants}
              onClick={() => markAsRead(notif.id)}
              style={{...styles.notifItem, opacity: notif.read ? 0.6 : 1}}
              {...notifHover}
            >
              {/* Unread bullet indicator */}
              {!notif.read && <div style={styles.unreadBullet} />}
              
              {/* Icon - Circle background */}
              <div style={{...styles.notifIconWrapper, background: `${iconColor}10`}}>
                <IconComponent size={16} style={{...styles.notifIcon, color: iconColor}} />
              </div>
              
              {/* Content */}
              <div style={styles.notifContent}>
                <div style={styles.notifTitle}>{notif.title}</div>
                <div style={styles.notifMessage}>{notif.message}</div>
                <div style={styles.notifTime}>
                  <Clock size={10} />
                  <span>{notif.time}</span>
                </div>
              </div>
              
              {/* Delete Button */}
              <motion.button
                className="delete-btn"
                whileHover={{ scale: 1.05, color: '#e63939' }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => deleteNotification(notif.id, e)}
                style={styles.deleteBtn}
              >
                <X size={14} />
              </motion.button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
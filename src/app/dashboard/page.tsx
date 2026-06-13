/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  BookOpen, Heart, Bell, Settings as SettingsIcon, Gem, Search, 
  Star, CheckCircle, Moon, Sun, Mail, 
  BellRing, User, Award
} from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();
  const [isDark, setIsDark] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState('learn');
  const [searchQuery, setSearchQuery] = useState('');

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

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  const allCourses = [
    { id: 1, title: 'UX Design Fundamentals', subtitle: 'Master user experience design', image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=240&fit=crop', instructor: 'Sarah Johnson', rating: 4.8, students: '3.2k', duration: '8 hours', level: 'Beginner' },
    { id: 2, title: 'Product Design Mastery', subtitle: 'Create amazing products', image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400&h=240&fit=crop', instructor: 'David Chen', rating: 4.9, students: '2.8k', duration: '12 hours', level: 'Intermediate' },
    { id: 3, title: 'UI Animation', subtitle: 'Bring interfaces to life', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=240&fit=crop', instructor: 'Maria Lopez', rating: 4.7, students: '1.9k', duration: '6 hours', level: 'Advanced' },
    { id: 4, title: 'Design Systems', subtitle: 'Build scalable design', image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=400&h=240&fit=crop', instructor: 'James Wilson', rating: 4.8, students: '2.1k', duration: '10 hours', level: 'Intermediate' },
    { id: 5, title: 'Figma Masterclass', subtitle: 'Master Figma like a pro', image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=240&fit=crop', instructor: 'Emily Brown', rating: 4.9, students: '4.5k', duration: '15 hours', level: 'Beginner' },
    { id: 6, title: 'User Research', subtitle: 'Understand your users', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=240&fit=crop', instructor: 'Michael Lee', rating: 4.6, students: '1.5k', duration: '7 hours', level: 'Beginner' },
  ];

  const styles = {
    container: { minHeight: '100vh', display: 'flex', background: themeStyles.bgPrimary },
    sidebar: {
      width: isMobile ? '0' : '280px',
      position: 'fixed' as const,
      left: 0, top: 0, bottom: 0,
      background: themeStyles.sidebarBg,
      borderRight: `1px solid ${themeStyles.borderColor}`,
      padding: isMobile ? '0' : '32px 20px',
      transform: isMobile ? 'translateX(-100%)' : 'translateX(0)',
      transition: 'transform 0.3s ease',
      zIndex: 100,
      overflowY: 'auto' as const,
    },
    main: {
      flex: 1,
      marginLeft: isMobile ? '0' : '280px',
      padding: isMobile ? '80px 20px 80px 20px' : '80px 40px 80px 40px',
      maxWidth: isMobile ? '100%' : 'calc(100% - 280px)',
    },
    logo: { fontSize: '28px', fontWeight: 'bold', letterSpacing: '-0.02em', color: themeStyles.textPrimary, marginBottom: '40px', padding: '0 12px' },
    logoEm: { fontStyle: 'italic', color: themeStyles.accentColor },
    navItem: {
      display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 16px', borderRadius: '12px',
      marginBottom: '8px', cursor: 'pointer', transition: 'all 0.2s ease', color: themeStyles.textSecondary,
    },
    navItemActive: { background: themeStyles.accentColor, color: '#fff' },
    searchBar: {
      width: '100%', maxWidth: '450px', padding: '14px 20px', background: themeStyles.inputBg,
      border: `1px solid ${themeStyles.borderColor}`, borderRadius: '48px', fontSize: '15px',
      color: themeStyles.textPrimary, outline: 'none', marginBottom: '32px',
    },
    sectionTitle: { fontSize: isMobile ? '22px' : '26px', fontWeight: 600, color: themeStyles.textPrimary, marginBottom: '24px' },
    grid3Col: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '40px' },
    courseCard: {
      background: themeStyles.cardBg, borderRadius: '20px', border: `1px solid ${themeStyles.borderColor}`,
      cursor: 'pointer', transition: 'all 0.3s ease', overflow: 'hidden',
    },
    courseImage: { width: '100%', height: '160px', objectFit: 'cover' as const },
    courseInfo: { padding: '20px' },
    courseTitle: { fontSize: '18px', fontWeight: 600, color: themeStyles.textPrimary, marginBottom: '6px' },
    courseSubtitle: { fontSize: '14px', color: themeStyles.textSecondary, marginBottom: '12px' },
    courseMeta: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' as const },
    rating: { display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: themeStyles.textSecondary },
    star: { color: '#ffc107', width: '16px', height: '16px' },
    premiumCard: {
      background: `linear-gradient(135deg, ${themeStyles.accentColor}20, ${themeStyles.accentColor}05)`,
      border: `1px solid ${themeStyles.accentColor}40`, borderRadius: '24px', padding: '32px', marginTop: '40px',
    },
    premiumTitle: { fontSize: '24px', fontWeight: 600, color: themeStyles.textPrimary, marginBottom: '20px' },
    premiumFeature: { display: 'flex', alignItems: 'center', gap: '12px', fontSize: '15px', color: themeStyles.textSecondary, marginBottom: '12px' },
    premiumBtn: {
      background: themeStyles.accentColor, color: '#fff', padding: '14px 28px', borderRadius: '48px',
      fontWeight: 600, fontSize: '15px', border: 'none', cursor: 'pointer', marginTop: '24px', transition: 'all 0.2s ease',
    },
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'learn': return <LearnTab searchQuery={searchQuery} setSearchQuery={setSearchQuery} allCourses={allCourses} router={router} themeStyles={themeStyles} styles={styles} isMobile={isMobile} />;
      case 'mylist': return <MyListComponent isDark={isDark} router={router} themeStyles={themeStyles} />;
      case 'notifications': return <NotificationsComponent isDark={isDark} themeStyles={themeStyles} />;
      case 'settings': return <SettingsComponent isDark={isDark} setIsDark={setIsDark} themeStyles={themeStyles} />;
      case 'subscription': return <SubscriptionComponent isDark={isDark} router={router} themeStyles={themeStyles} />;
      default: return null;
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <div style={styles.logo}>ak<em style={styles.logoEm}>aan</em></div>
        {[
          { id: 'learn', label: 'Learn', icon: BookOpen },
          { id: 'mylist', label: 'My List', icon: Heart },
          { id: 'notifications', label: 'Notifications', icon: Bell },
          { id: 'settings', label: 'Settings', icon: SettingsIcon },
          { id: 'subscription', label: 'Subscription', icon: Gem },
        ].map(tab => (
          <div key={tab.id} style={{...styles.navItem, ...(activeTab === tab.id && styles.navItemActive)}} onClick={() => setActiveTab(tab.id)}>
            <tab.icon size={20} /> {tab.label}
          </div>
        ))}
      </div>
      <div style={styles.main}>{renderContent()}</div>
      <style>{`
        .course-card:hover { transform: translateY(-6px); box-shadow: 0 12px 32px rgba(0,0,0,0.15); }
        .premium-btn:hover { transform: scale(1.02); background: ${themeStyles.accentColor}dd; }
        .nav-item:hover { background: ${themeStyles.hoverBg}; }
      `}</style>
    </div>
  );
}

// Learn Tab Component
function LearnTab({ searchQuery, setSearchQuery, allCourses, router, themeStyles, styles, isMobile }: any) {
  const categories = ['All', 'UX Design', 'UI Design', 'Product Design', 'Animation', 'Research'];
  const [activeCategory, setActiveCategory] = useState('All');
  
  const filteredCourses = allCourses.filter((course: any) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || course.title.includes(activeCategory) || course.subtitle.includes(activeCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <input type="text" placeholder="Search for courses..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={styles.searchBar} />
      
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)} style={{ padding: '8px 20px', borderRadius: '40px', fontSize: '14px', fontWeight: 500, background: activeCategory === cat ? themeStyles.accentColor : 'transparent', color: activeCategory === cat ? '#fff' : themeStyles.textSecondary, border: `1px solid ${activeCategory === cat ? themeStyles.accentColor : themeStyles.borderColor}`, cursor: 'pointer' }}>{cat}</button>
        ))}
      </div>
      
      <h2 style={styles.sectionTitle}>Recommended for you</h2>
      <div style={styles.grid3Col}>
        {filteredCourses.slice(0, 6).map((course: any) => (
          <div key={course.id} style={styles.courseCard} onClick={() => router.push(`/course/${course.id}`)} className="course-card">
            <img src={course.image} alt={course.title} style={styles.courseImage} />
            <div style={styles.courseInfo}>
              <div style={styles.courseTitle}>{course.title}</div>
              <div style={styles.courseSubtitle}>{course.subtitle}</div>
              <div style={styles.courseMeta}>
                <div style={styles.rating}><Star size={14} style={styles.star} fill="#ffc107" /><span>{course.rating}</span></div>
                <span style={{ fontSize: '12px', color: themeStyles.textSecondary }}>{course.students} students</span>
              </div>
              <div style={{ fontSize: '12px', color: themeStyles.accentColor }}>by {course.instructor}</div>
            </div>
          </div>
        ))}
      </div>
      
      <div style={styles.premiumCard}>
        <h3 style={styles.premiumTitle}>Go premium to access our full library</h3>
        <div style={styles.premiumFeature}><CheckCircle size={18} /> Learn from industry experts</div>
        <div style={styles.premiumFeature}><CheckCircle size={18} /> Learning at your own pace</div>
        <div style={styles.premiumFeature}><CheckCircle size={18} /> 24/7 help & support</div>
        <button style={styles.premiumBtn} className="premium-btn">GO Premium →</button>
      </div>
    </>
  );
}

// My List Component
function MyListComponent({ router, themeStyles }: any) {
  const [savedCourses, setSavedCourses] = useState<any[]>([]);
  
  useEffect(() => {
    const defaultSaved = [
      { id: 1, title: 'UX Design Fundamentals', subtitle: 'Master user experience design', image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=240&fit=crop', instructor: 'Sarah Johnson', rating: 4.8 },
      { id: 3, title: 'UI Animation', subtitle: 'Bring interfaces to life', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=240&fit=crop', instructor: 'Maria Lopez', rating: 4.7 },
      { id: 5, title: 'Figma Masterclass', subtitle: 'Master Figma like a pro', image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=240&fit=crop', instructor: 'Emily Brown', rating: 4.9 },
    ];
    const saved = localStorage.getItem('savedCourses');
    if (saved) setSavedCourses(JSON.parse(saved));
    else setSavedCourses(defaultSaved);
  }, []);

  const removeFromList = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = savedCourses.filter(c => c.id !== id);
    setSavedCourses(updated);
    localStorage.setItem('savedCourses', JSON.stringify(updated));
  };

  const localStyles = {
    container: { padding: '20px 0' },
    title: { fontSize: '28px', fontWeight: 600, color: themeStyles.textPrimary, marginBottom: '8px' },
    subtitle: { fontSize: '14px', color: themeStyles.textSecondary, marginBottom: '32px' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' },
    card: { background: themeStyles.cardBg, borderRadius: '20px', border: `1px solid ${themeStyles.borderColor}`, overflow: 'hidden', cursor: 'pointer' },
    image: { width: '100%', height: '160px', objectFit: 'cover' as const },
    info: { padding: '20px' },
    cardTitle: { fontSize: '18px', fontWeight: 600, color: themeStyles.textPrimary, marginBottom: '6px' },
    cardSubtitle: { fontSize: '14px', color: themeStyles.textSecondary, marginBottom: '12px' },
    removeBtn: { color: themeStyles.accentColor, fontSize: '13px', cursor: 'pointer', background: 'none', border: 'none', padding: 0, marginTop: '12px' },
  };

  if (savedCourses.length === 0) {
    return <div style={localStyles.container}><h1 style={localStyles.title}>My List</h1><p style={localStyles.subtitle}>Courses you've saved for later</p><div style={{ textAlign: 'center', padding: '60px 20px', color: themeStyles.textSecondary }}><Heart size={48} style={{ marginBottom: '16px', opacity: 0.5 }} /><p>No saved courses yet. Browse courses and click "Save to My List" to see them here.</p></div></div>;
  }

  return (
    <div style={localStyles.container}>
      <h1 style={localStyles.title}>My List</h1>
      <p style={localStyles.subtitle}>{savedCourses.length} courses saved for later</p>
      <div style={localStyles.grid}>
        {savedCourses.map((course: any) => (
          <div key={course.id} style={localStyles.card} onClick={() => router.push(`/course/${course.id}`)}>
            <img src={course.image} alt={course.title} style={localStyles.image} />
            <div style={localStyles.info}>
              <div style={localStyles.cardTitle}>{course.title}</div>
              <div style={localStyles.cardSubtitle}>{course.subtitle}</div>
              <div style={{ fontSize: '13px', color: themeStyles.textSecondary }}>by {course.instructor}</div>
              <button style={localStyles.removeBtn} onClick={(e) => removeFromList(course.id, e)}>Remove from list</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Notifications Component
function NotificationsComponent({ themeStyles }: any) {
  const [notifications, setNotifications] = useState<any[]>([]);
  
  useEffect(() => {
    const defaultNotifs = [
      { id: 1, title: 'New course available!', message: 'UX Design for beginners is now available', time: '2 hours ago', read: false, icon: '🎓' },
      { id: 2, title: 'Your progress saved', message: 'You completed "The basics" lesson', time: 'Yesterday', read: false, icon: '✅' },
      { id: 3, title: 'Achievement unlocked', message: 'You\'ve completed 5 lessons this week!', time: '3 days ago', read: true, icon: '🏆' },
      { id: 4, title: 'New comment on your review', message: 'Sarah replied to your course review', time: '5 days ago', read: true, icon: '💬' },
      { id: 5, title: 'Course recommendation', message: 'Based on your interests, try "Advanced UI Design"', time: '1 week ago', read: true, icon: '📚' },
    ];
    const saved = localStorage.getItem('notifications');
    if (saved) setNotifications(JSON.parse(saved));
    else setNotifications(defaultNotifs);
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

  const unreadCount = notifications.filter(n => !n.read).length;

  const localStyles = {
    container: { padding: '20px 0' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap' as const, gap: '16px' },
    title: { fontSize: '28px', fontWeight: 600, color: themeStyles.textPrimary },
    subtitle: { fontSize: '14px', color: themeStyles.textSecondary },
    markAllBtn: { background: 'transparent', border: `1px solid ${themeStyles.borderColor}`, borderRadius: '40px', padding: '10px 20px', fontSize: '13px', color: themeStyles.textSecondary, cursor: 'pointer' },
    notifItem: { display: 'flex', gap: '16px', padding: '20px', background: themeStyles.cardBg, borderRadius: '16px', border: `1px solid ${themeStyles.borderColor}`, cursor: 'pointer', transition: 'opacity 0.2s' },
    notifIcon: { fontSize: '32px' },
    notifContent: { flex: 1 },
    notifTitle: { fontWeight: 600, color: themeStyles.textPrimary, marginBottom: '4px' },
    notifMessage: { fontSize: '14px', color: themeStyles.textSecondary, marginBottom: '8px' },
    notifTime: { fontSize: '12px', color: themeStyles.textSecondary },
    unreadDot: { width: '8px', height: '8px', background: themeStyles.accentColor, borderRadius: '8px' },
  };

  return (
    <div style={localStyles.container}>
      <div style={localStyles.header}>
        <div><h1 style={localStyles.title}>Notifications</h1><p style={localStyles.subtitle}>You have {unreadCount} unread notifications</p></div>
        {unreadCount > 0 && <button onClick={markAllRead} style={localStyles.markAllBtn}>Mark all as read</button>}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {notifications.map(notif => (
          <div key={notif.id} onClick={() => markAsRead(notif.id)} style={{...localStyles.notifItem, opacity: notif.read ? 0.7 : 1}}>
            <div style={localStyles.notifIcon}>{notif.icon}</div>
            <div style={localStyles.notifContent}>
              <div style={localStyles.notifTitle}>{notif.title}</div>
              <div style={localStyles.notifMessage}>{notif.message}</div>
              <div style={localStyles.notifTime}>{notif.time}</div>
            </div>
            {!notif.read && <div style={localStyles.unreadDot} />}
          </div>
        ))}
      </div>
    </div>
  );
}

// Settings Component (Renamed to avoid conflict with SettingsIcon)
function SettingsComponent({ isDark, setIsDark, themeStyles }: any) {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);

  useEffect(() => {
    const savedName = localStorage.getItem('userName');
    const savedEmail = localStorage.getItem('userEmail');
    const savedEmailNotif = localStorage.getItem('emailNotifications');
    const savedPushNotif = localStorage.getItem('pushNotifications');
    if (savedName) setUserName(savedName);
    if (savedEmail) setUserEmail(savedEmail);
    if (savedEmailNotif) setEmailNotifications(savedEmailNotif === 'true');
    if (savedPushNotif) setPushNotifications(savedPushNotif === 'true');
  }, []);

  const saveSettings = () => {
    localStorage.setItem('userName', userName);
    localStorage.setItem('userEmail', userEmail);
    localStorage.setItem('emailNotifications', String(emailNotifications));
    localStorage.setItem('pushNotifications', String(pushNotifications));
    alert('Settings saved successfully!');
  };

  const localStyles = {
    container: { padding: '20px 0', maxWidth: '600px' },
    title: { fontSize: '28px', fontWeight: 600, color: themeStyles.textPrimary, marginBottom: '8px' },
    subtitle: { fontSize: '14px', color: themeStyles.textSecondary, marginBottom: '32px' },
    section: { background: themeStyles.cardBg, borderRadius: '20px', border: `1px solid ${themeStyles.borderColor}`, padding: '24px', marginBottom: '24px' },
    sectionTitle: { fontSize: '18px', fontWeight: 600, color: themeStyles.textPrimary, marginBottom: '20px' },
    inputRow: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' },
    inputIcon: { color: themeStyles.textSecondary },
    input: { flex: 1, padding: '14px', background: themeStyles.inputBg, border: `1px solid ${themeStyles.borderColor}`, borderRadius: '12px', color: themeStyles.textPrimary },
    themeRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0' },
    themeLabel: { display: 'flex', alignItems: 'center', gap: '12px', color: themeStyles.textPrimary },
    toggleSwitch: { width: '52px', height: '28px', background: isDark ? themeStyles.accentColor : themeStyles.borderColor, borderRadius: '28px', border: 'none', cursor: 'pointer', position: 'relative' as const },
    toggleKnob: { width: '24px', height: '24px', background: '#fff', borderRadius: '24px', position: 'absolute' as const, top: '2px', left: isDark ? '26px' : '2px', transition: 'left 0.2s' },
    notifRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' },
    notifLabel: { display: 'flex', alignItems: 'center', gap: '12px', color: themeStyles.textPrimary },
    checkbox: { width: '20px', height: '20px', accentColor: themeStyles.accentColor },
    saveBtn: { background: themeStyles.accentColor, color: '#fff', padding: '14px 28px', borderRadius: '48px', fontWeight: 600, fontSize: '15px', border: 'none', cursor: 'pointer', width: '100%' },
  };

  return (
    <div style={localStyles.container}>
      <h1 style={localStyles.title}>Settings</h1>
      <p style={localStyles.subtitle}>Manage your account preferences</p>
      
      <div style={localStyles.section}>
        <h2 style={localStyles.sectionTitle}>Profile Information</h2>
        <div style={localStyles.inputRow}><User size={20} style={localStyles.inputIcon} /><input type="text" placeholder="Full Name" value={userName} onChange={(e) => setUserName(e.target.value)} style={localStyles.input} /></div>
        <div style={localStyles.inputRow}><Mail size={20} style={localStyles.inputIcon} /><input type="email" placeholder="Email Address" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} style={localStyles.input} /></div>
      </div>

      <div style={localStyles.section}>
        <h2 style={localStyles.sectionTitle}>Appearance</h2>
        <div style={localStyles.themeRow}>
          <div style={localStyles.themeLabel}>{isDark ? <Moon size={20} /> : <Sun size={20} />}<span>Dark Mode</span></div>
          <button onClick={() => setIsDark(!isDark)} style={localStyles.toggleSwitch}><div style={localStyles.toggleKnob} /></button>
        </div>
      </div>

      <div style={localStyles.section}>
        <h2 style={localStyles.sectionTitle}>Notifications</h2>
        <div style={localStyles.notifRow}><div style={localStyles.notifLabel}><Mail size={20} /><span>Email Notifications</span></div><input type="checkbox" checked={emailNotifications} onChange={(e) => setEmailNotifications(e.target.checked)} style={localStyles.checkbox} /></div>
        <div style={localStyles.notifRow}><div style={localStyles.notifLabel}><BellRing size={20} /><span>Push Notifications</span></div><input type="checkbox" checked={pushNotifications} onChange={(e) => setPushNotifications(e.target.checked)} style={localStyles.checkbox} /></div>
      </div>

      <button onClick={saveSettings} style={localStyles.saveBtn}>Save Changes</button>
    </div>
  );
}

// Subscription Component
function SubscriptionComponent({ router, themeStyles }: any) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');

  useEffect(() => {
    const subscribed = localStorage.getItem('isSubscribed');
    if (subscribed === 'true') setIsSubscribed(true);
  }, []);

  const handleSubscribe = () => {
    setIsSubscribed(true);
    localStorage.setItem('isSubscribed', 'true');
    alert('Successfully subscribed! You now have access to all premium content.');
  };

  const localStyles = {
    container: { padding: '20px 0' },
    title: { fontSize: '28px', fontWeight: 600, color: themeStyles.textPrimary, marginBottom: '8px' },
    subtitle: { fontSize: '14px', color: themeStyles.textSecondary, marginBottom: '32px' },
    planGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginBottom: '32px' },
    planCard: { background: themeStyles.cardBg, borderRadius: '20px', borderWidth: '2px', borderStyle: 'solid', padding: '28px', cursor: 'pointer', position: 'relative' as const },
    planTitle: { fontSize: '20px', fontWeight: 600, color: themeStyles.textPrimary, marginBottom: '12px' },
    planPrice: { fontSize: '36px', fontWeight: 700, color: themeStyles.textPrimary, marginBottom: '8px' },
    planPriceSub: { fontSize: '16px', fontWeight: 400, color: themeStyles.textSecondary },
    planDesc: { fontSize: '14px', color: themeStyles.textSecondary },
    saveBadge: { position: 'absolute' as const, top: '-12px', right: '20px', background: themeStyles.accentColor, color: '#fff', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 500 },
    benefitsCard: { background: themeStyles.cardBg, borderRadius: '20px', border: `1px solid ${themeStyles.borderColor}`, padding: '24px', marginBottom: '24px' },
    benefitsTitle: { fontSize: '16px', fontWeight: 600, color: themeStyles.textPrimary, marginBottom: '16px' },
    benefitItem: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', fontSize: '14px', color: themeStyles.textSecondary },
    subscribeBtn: { background: themeStyles.accentColor, color: '#fff', padding: '16px 32px', borderRadius: '48px', fontWeight: 600, fontSize: '16px', border: 'none', cursor: 'pointer', width: '100%' },
    premiumContainer: { padding: '20px 0', textAlign: 'center' as const },
    premiumIcon: { fontSize: '64px', marginBottom: '24px' },
    premiumTitle: { fontSize: '28px', fontWeight: 600, color: themeStyles.textPrimary, marginBottom: '12px' },
    premiumText: { fontSize: '15px', color: themeStyles.textSecondary, marginBottom: '32px' },
    browseBtn: { background: themeStyles.accentColor, color: '#fff', padding: '14px 28px', borderRadius: '48px', fontWeight: 600, fontSize: '15px', border: 'none', cursor: 'pointer' },
  };

  if (isSubscribed) {
    return (
      <div style={localStyles.premiumContainer}>
        <div style={localStyles.premiumIcon}>🎉</div>
        <h1 style={localStyles.premiumTitle}>You're a Premium Member!</h1>
        <p style={localStyles.premiumText}>Thank you for supporting akaan. You have full access to our entire library.</p>
        <button onClick={() => router.push('/dashboard')} style={localStyles.browseBtn}>Browse Courses →</button>
      </div>
    );
  }

  return (
    <div style={localStyles.container}>
      <h1 style={localStyles.title}>Subscription</h1>
      <p style={localStyles.subtitle}>Choose a plan that works for you</p>
      
      <div style={localStyles.planGrid}>
        <div onClick={() => setSelectedPlan('monthly')} style={{...localStyles.planCard, borderColor: selectedPlan === 'monthly' ? themeStyles.accentColor : themeStyles.borderColor}}>
          <h3 style={localStyles.planTitle}>Monthly</h3>
          <div style={localStyles.planPrice}>$12<span style={localStyles.planPriceSub}>/month</span></div>
          <p style={localStyles.planDesc}>Billed monthly. Cancel anytime.</p>
        </div>
        <div onClick={() => setSelectedPlan('yearly')} style={{...localStyles.planCard, borderColor: selectedPlan === 'yearly' ? themeStyles.accentColor : themeStyles.borderColor}}>
          <div style={localStyles.saveBadge}>Save 20%</div>
          <h3 style={localStyles.planTitle}>Yearly</h3>
          <div style={localStyles.planPrice}>$96<span style={localStyles.planPriceSub}>/year</span></div>
          <p style={localStyles.planDesc}>$8 per month. Billed annually.</p>
        </div>
      </div>

      <div style={localStyles.benefitsCard}>
        <h3 style={localStyles.benefitsTitle}>Premium Benefits:</h3>
        <div style={localStyles.benefitItem}><CheckCircle size={18} style={{ color: themeStyles.accentColor }} /> Access to 200+ premium courses</div>
        <div style={localStyles.benefitItem}><CheckCircle size={18} style={{ color: themeStyles.accentColor }} /> Download lessons for offline viewing</div>
        <div style={localStyles.benefitItem}><CheckCircle size={18} style={{ color: themeStyles.accentColor }} /> Priority support 24/7</div>
        <div style={localStyles.benefitItem}><CheckCircle size={18} style={{ color: themeStyles.accentColor }} /> Certificate of completion</div>
        <div style={localStyles.benefitItem}><CheckCircle size={18} style={{ color: themeStyles.accentColor }} /> Exclusive community access</div>
      </div>

      <button onClick={handleSubscribe} style={localStyles.subscribeBtn}>Subscribe Now →</button>
    </div>
  );
}
/* eslint-disable react/no-unescaped-entities */
'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  ChevronLeft, ChevronRight, Play, CheckCircle, Circle, 
  Clock, User, Star, Heart, Share2, Bookmark, 
  MessageCircle, Volume2, FileText, Award, 
  Zap, TrendingUp, Target, Layers, Menu, X,
  Maximize2, VolumeX, Volume1, Settings, Subtitles
} from 'lucide-react';

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id;
  
  const [isDark, setIsDark] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [activeLesson, setActiveLesson] = useState(3);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState('12:34');
  const [duration, setDuration] = useState('22:45');
  const [progress, setProgress] = useState(55);
  const [notes, setNotes] = useState([
    { id: 1, timestamp: '21:12', text: '"Switching concepts — try noticing"' },
    { id: 2, timestamp: '02:14', text: 'The point about the same small thing exactly me.' },
    { id: 3, timestamp: '03:48', text: 'Try: phone in. Just to feel the ...' },
    { id: 4, timestamp: '06:01', text: 'The residue accounts for most of the time you think you save.' },
  ]);
  const [newNote, setNewNote] = useState('');
  const [showQuiz, setShowQuiz] = useState(false);

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
      setIsMobile(window.innerWidth <= 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const themeStyles = {
    bgPrimary: isDark ? '#0a0a0a' : '#f8f9fa',
    textPrimary: isDark ? '#ffffff' : '#1a1a2e',
    textSecondary: isDark ? '#a0a0a0' : '#666666',
    borderColor: isDark ? '#2a2a2a' : '#e0e0e0',
    accentColor: isDark ? '#e63939' : '#dc2626',
    cardBg: isDark ? '#141414' : '#ffffff',
    inputBg: isDark ? '#1a1a1a' : '#ffffff',
    sidebarBg: isDark ? '#0d0d0d' : '#ffffff',
    hoverBg: isDark ? '#1f1f1f' : '#f5f5f5',
    successColor: '#10b981',
    warningColor: '#f59e0b',
    gradientStart: isDark ? '#e63939' : '#dc2626',
    gradientEnd: isDark ? '#c1121f' : '#b91c1c',
  };

  const lessons = [
    { id: 1, title: 'The basics', duration: '2 min', completed: true, type: 'video', description: 'Introduction to UX fundamentals', thumbnail: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=225&fit=crop' },
    { id: 2, title: 'Understanding a problem', duration: '2 min', completed: true, type: 'video', description: 'Problem identification techniques', thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=225&fit=crop' },
    { id: 3, title: 'Building simple user flows', duration: '22 min', completed: false, type: 'read', description: 'Create effective user journeys', thumbnail: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400&h=225&fit=crop' },
    { id: 4, title: 'Beyond screens', duration: '2 min', completed: false, type: 'video', description: 'UX beyond digital interfaces', thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=400&h=225&fit=crop' },
    { id: 5, title: 'Styling & more', duration: '2 min', completed: false, type: 'video', description: 'Visual design principles', thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=225&fit=crop' },
    { id: 6, title: 'Building UI screens', duration: '2 min', completed: false, type: 'video', description: 'Screen design patterns', thumbnail: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=225&fit=crop' },
    { id: 7, title: 'User flows advanced', duration: '2 min', completed: false, type: 'video', description: 'Complex flow mapping', thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=225&fit=crop' },
    { id: 8, title: 'Quiz: The basics', duration: '5 questions', completed: false, type: 'quiz', description: 'Test your knowledge', thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=225&fit=crop' },
  ];

  const completedCount = lessons.filter(l => l.completed).length;
  const totalCount = lessons.length;
  const courseProgress = (completedCount / totalCount) * 100;

  const currentLesson = lessons.find(l => l.id === activeLesson) || lessons[0];

  const addNote = () => {
    if (newNote.trim()) {
      setNotes([...notes, { id: Date.now(), timestamp: currentTime, text: newNote }]);
      setNewNote('');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Custom scrollbar styles
  const scrollbarStyles = `
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      background: ${themeStyles.borderColor};
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb {
      background: ${themeStyles.accentColor};
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: ${themeStyles.accentColor}cc;
    }
  `;

  const styles = {
    container: {
      minHeight: '100vh',
      background: themeStyles.bgPrimary,
      display: 'flex',
      position: 'relative' as const,
    },
    menuToggle: {
      position: 'fixed' as const,
      top: '20px',
      left: '20px',
      zIndex: 200,
      display: isMobile ? 'flex' : 'none',
      background: themeStyles.cardBg,
      border: `1px solid ${themeStyles.borderColor}`,
      borderRadius: '12px',
      padding: '10px',
      cursor: 'pointer',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    },
    sidebar: {
      width: isMobile ? (sidebarOpen ? '100%' : '0') : '360px',
      position: 'fixed' as const,
      left: 0,
      top: 0,
      bottom: 0,
      background: themeStyles.sidebarBg,
      borderRight: `1px solid ${themeStyles.borderColor}`,
      transform: isMobile ? (sidebarOpen ? 'translateX(0)' : 'translateX(-100%)') : 'translateX(0)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      zIndex: 150,
      overflowY: 'auto' as const,
      boxShadow: isMobile && sidebarOpen ? '0 0 20px rgba(0,0,0,0.3)' : 'none',
    },
    sidebarHeader: {
      padding: '28px 24px',
      borderBottom: `1px solid ${themeStyles.borderColor}`,
      background: `linear-gradient(135deg, ${themeStyles.gradientStart}08, ${themeStyles.gradientEnd}04)`,
    },
    backBtn: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      color: themeStyles.textSecondary,
      cursor: 'pointer',
      fontSize: '13px',
      marginBottom: '24px',
      padding: '6px 12px',
      borderRadius: '20px',
      background: themeStyles.hoverBg,
      transition: 'all 0.2s ease',
    },
    courseTitle: {
      fontSize: '20px',
      fontWeight: 700,
      color: themeStyles.textPrimary,
      marginBottom: '12px',
      lineHeight: 1.3,
    },
    courseMeta: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      fontSize: '13px',
      color: themeStyles.textSecondary,
      marginBottom: '20px',
      flexWrap: 'wrap' as const,
    },
    progressContainer: {
      marginTop: '16px',
    },
    progressHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '8px',
      fontSize: '12px',
      color: themeStyles.textSecondary,
    },
    progressBar: {
      height: '6px',
      background: themeStyles.borderColor,
      borderRadius: '3px',
      overflow: 'hidden',
    },
    progressFill: {
      width: `${courseProgress}%`,
      height: '100%',
      background: `linear-gradient(90deg, ${themeStyles.gradientStart}, ${themeStyles.gradientEnd})`,
      borderRadius: '3px',
      transition: 'width 0.5s ease',
    },
    lessonsSection: {
      padding: '20px 16px',
    },
    sectionTitle: {
      fontSize: '12px',
      fontWeight: 600,
      color: themeStyles.textSecondary,
      marginBottom: '16px',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.08em',
      paddingLeft: '8px',
    },
    lessonItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '10px',
      borderRadius: '14px',
      cursor: 'pointer',
      marginBottom: '6px',
      transition: 'all 0.2s ease',
    },
    lessonActive: {
      background: `linear-gradient(135deg, ${themeStyles.accentColor}15, ${themeStyles.accentColor}08)`,
      borderLeft: `3px solid ${themeStyles.accentColor}`,
    },
    lessonLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      flex: 1,
    },
    lessonThumbnail: {
      width: '48px',
      height: '48px',
      borderRadius: '10px',
      objectFit: 'cover' as const,
      background: themeStyles.hoverBg,
    },
    lessonInfo: {
      flex: 1,
    },
    lessonTitle: {
      fontSize: '14px',
      fontWeight: 500,
      color: themeStyles.textPrimary,
      marginBottom: '4px',
    },
    lessonDesc: {
      fontSize: '11px',
      color: themeStyles.textSecondary,
    },
    lessonDuration: {
      fontSize: '11px',
      color: themeStyles.textSecondary,
      background: themeStyles.hoverBg,
      padding: '4px 8px',
      borderRadius: '12px',
    },
    quizBadge: {
      background: `linear-gradient(135deg, ${themeStyles.accentColor}20, ${themeStyles.accentColor}10)`,
      color: themeStyles.accentColor,
      padding: '4px 10px',
      borderRadius: '20px',
      fontSize: '10px',
      fontWeight: 600,
    },
    mainContent: {
      flex: 1,
      marginLeft: isMobile ? '0' : '360px',
      padding: isMobile ? '80px 20px 40px 20px' : '40px 48px 60px 48px',
      maxWidth: isMobile ? '100%' : 'calc(100% - 360px)',
    },
    videoContainer: {
      background: themeStyles.cardBg,
      borderRadius: '24px',
      border: `1px solid ${themeStyles.borderColor}`,
      overflow: 'hidden',
      marginBottom: '32px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    },
    videoWrapper: {
      position: 'relative' as const,
      background: '#000',
      aspectRatio: '16/9',
    },
    videoThumbnail: {
      width: '100%',
      height: '100%',
      objectFit: 'cover' as const,
    },
    videoOverlay: {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, rgba(0,0,0,0.4), rgba(0,0,0,0.2))',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    playButton: {
      width: '80px',
      height: '80px',
      background: `linear-gradient(135deg, ${themeStyles.gradientStart}, ${themeStyles.gradientEnd})`,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
    },
    videoControls: {
      position: 'absolute' as const,
      bottom: 0,
      left: 0,
      right: 0,
      background: 'linear-gradient(0deg, rgba(0,0,0,0.8), transparent)',
      padding: '16px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      flexWrap: 'wrap' as const,
    },
    progressSlider: {
      flex: 1,
      height: '4px',
      background: 'rgba(255,255,255,0.3)',
      borderRadius: '2px',
      cursor: 'pointer',
      position: 'relative' as const,
    },
    progressSliderFill: {
      width: `${progress}%`,
      height: '100%',
      background: themeStyles.accentColor,
      borderRadius: '2px',
    },
    timeText: {
      fontSize: '12px',
      color: '#fff',
    },
    controlBtn: {
      background: 'transparent',
      border: 'none',
      color: '#fff',
      cursor: 'pointer',
      padding: '4px',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
    },
    lessonHeader: {
      padding: '24px 28px',
      borderBottom: `1px solid ${themeStyles.borderColor}`,
    },
    lessonHeaderTitle: {
      fontSize: '24px',
      fontWeight: 700,
      color: themeStyles.textPrimary,
      marginBottom: '12px',
      letterSpacing: '-0.02em',
    },
    lessonHeaderMeta: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      fontSize: '13px',
      color: themeStyles.textSecondary,
      flexWrap: 'wrap' as const,
    },
    quoteCard: {
      background: `linear-gradient(135deg, ${themeStyles.accentColor}08, ${themeStyles.accentColor}04)`,
      borderRadius: '20px',
      padding: '28px 32px',
      border: `1px solid ${themeStyles.accentColor}20`,
      marginBottom: '32px',
    },
    quoteText: {
      fontSize: '20px',
      fontStyle: 'italic',
      color: themeStyles.textPrimary,
      lineHeight: 1.5,
      marginBottom: '16px',
      fontWeight: 500,
    },
    quoteAuthor: {
      fontSize: '14px',
      fontWeight: 600,
      color: themeStyles.accentColor,
    },
    transcriptCard: {
      background: themeStyles.cardBg,
      borderRadius: '20px',
      padding: '28px 32px',
      border: `1px solid ${themeStyles.borderColor}`,
      marginBottom: '32px',
    },
    transcriptTitle: {
      fontSize: '18px',
      fontWeight: 600,
      color: themeStyles.textPrimary,
      marginBottom: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    transcriptText: {
      fontSize: '15px',
      lineHeight: 1.7,
      color: themeStyles.textSecondary,
    },
    notesSection: {
      background: themeStyles.cardBg,
      borderRadius: '20px',
      border: `1px solid ${themeStyles.borderColor}`,
      overflow: 'hidden',
      marginBottom: '32px',
    },
    notesHeader: {
      padding: '18px 24px',
      borderBottom: `1px solid ${themeStyles.borderColor}`,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: themeStyles.hoverBg,
    },
    notesTitle: {
      fontSize: '16px',
      fontWeight: 600,
      color: themeStyles.textPrimary,
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    notesCount: {
      fontSize: '13px',
      color: themeStyles.textSecondary,
      background: themeStyles.cardBg,
      padding: '4px 12px',
      borderRadius: '20px',
    },
    notesList: {
      padding: '20px 24px',
      maxHeight: '320px',
      overflowY: 'auto' as const,
    },
    noteItem: {
      padding: '14px 16px',
      background: themeStyles.inputBg,
      borderRadius: '14px',
      marginBottom: '12px',
      border: `1px solid ${themeStyles.borderColor}`,
      transition: 'transform 0.2s ease',
    },
    noteTimestamp: {
      fontSize: '12px',
      color: themeStyles.accentColor,
      fontWeight: 600,
      marginBottom: '8px',
      cursor: 'pointer',
      display: 'inline-block',
      padding: '4px 12px',
      background: `${themeStyles.accentColor}15`,
      borderRadius: '20px',
    },
    noteText: {
      fontSize: '14px',
      color: themeStyles.textPrimary,
      lineHeight: 1.5,
    },
    noteInput: {
      display: 'flex',
      gap: '12px',
      padding: '18px 24px',
      borderTop: `1px solid ${themeStyles.borderColor}`,
    },
    noteInputField: {
      flex: 1,
      padding: '14px 18px',
      background: themeStyles.inputBg,
      border: `1px solid ${themeStyles.borderColor}`,
      borderRadius: '14px',
      color: themeStyles.textPrimary,
      fontSize: '14px',
      outline: 'none',
      transition: 'border-color 0.2s ease',
    },
    addNoteBtn: {
      padding: '14px 28px',
      background: `linear-gradient(135deg, ${themeStyles.gradientStart}, ${themeStyles.gradientEnd})`,
      color: '#fff',
      border: 'none',
      borderRadius: '14px',
      cursor: 'pointer',
      fontWeight: 600,
      transition: 'transform 0.2s ease',
    },
    navButtons: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '16px',
      flexWrap: 'wrap' as const,
    },
    navBtn: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 28px',
      background: themeStyles.cardBg,
      border: `1px solid ${themeStyles.borderColor}`,
      borderRadius: '40px',
      color: themeStyles.textPrimary,
      cursor: 'pointer',
      fontWeight: 500,
      transition: 'all 0.2s ease',
    },
    completeBtn: {
      padding: '12px 36px',
      background: `linear-gradient(135deg, ${themeStyles.gradientStart}, ${themeStyles.gradientEnd})`,
      color: '#fff',
      border: 'none',
      borderRadius: '40px',
      cursor: 'pointer',
      fontWeight: 600,
      transition: 'transform 0.2s ease',
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    },
  };

  const handleLessonClick = (lessonId: number) => {
    setActiveLesson(lessonId);
    if (isMobile) setSidebarOpen(false);
    if (lessons.find(l => l.id === lessonId)?.type === 'quiz') {
      setShowQuiz(true);
    } else {
      setShowQuiz(false);
    }
  };

  return (
    <div style={styles.container}>
      <style>{scrollbarStyles}</style>
      
      <div style={styles.menuToggle} onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </div>

      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <div style={styles.backBtn} onClick={() => router.push('/dashboard')}>
            <ChevronLeft size={16} /> Back to Dashboard
          </div>
          <div style={styles.courseTitle}>UX Design for dummies</div>
          <div style={styles.courseMeta}>
            <span><User size={14} /> Muhammad Ahmad</span>
            <span><Clock size={14} /> 4 hrs total</span>
          </div>
          <div style={styles.progressContainer}>
            <div style={styles.progressHeader}>
              <span>Course progress</span>
              <span>{Math.round(courseProgress)}% complete</span>
            </div>
            <div style={styles.progressBar}>
              <div style={styles.progressFill} />
            </div>
          </div>
        </div>

        <div style={styles.lessonsSection}>
          <div style={styles.sectionTitle}>📚 Laying the foundation</div>
          {lessons.map(lesson => (
            <div 
              key={lesson.id} 
              style={{
                ...styles.lessonItem,
                ...(activeLesson === lesson.id && styles.lessonActive),
              }}
              onClick={() => handleLessonClick(lesson.id)}
            >
              <div style={styles.lessonLeft}>
                <img src={lesson.thumbnail} alt={lesson.title} style={styles.lessonThumbnail} />
                <div style={styles.lessonInfo}>
                  <div style={styles.lessonTitle}>{lesson.title}</div>
                  <div style={styles.lessonDesc}>{lesson.description}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {lesson.completed && <CheckCircle size={14} color={themeStyles.successColor} />}
                <span style={styles.lessonDuration}>{lesson.duration}</span>
                {lesson.type === 'quiz' && <span style={styles.quizBadge}>Quiz</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.mainContent}>
        {!showQuiz ? (
          <>
            <div style={styles.videoContainer}>
              <div style={styles.videoWrapper}>
                <img 
                  src={currentLesson.thumbnail} 
                  alt={currentLesson.title}
                  style={styles.videoThumbnail}
                />
                <div style={styles.videoOverlay}>
                  <div 
                    style={styles.playButton}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <Play size={36} fill="white" />
                  </div>
                </div>
                <div style={styles.videoControls}>
                  <button style={styles.controlBtn} onClick={() => setIsMuted(!isMuted)}>
                    {isMuted ? <VolumeX size={18} /> : <Volume1 size={18} />}
                  </button>
                  <div style={styles.progressSlider}>
                    <div style={styles.progressSliderFill} />
                  </div>
                  <span style={styles.timeText}>{currentTime} / {duration}</span>
                  <button style={styles.controlBtn}>
                    <Subtitles size={18} />
                  </button>
                  <button style={styles.controlBtn}>
                    <Settings size={18} />
                  </button>
                  <button style={styles.controlBtn}>
                    <Maximize2 size={18} />
                  </button>
                </div>
              </div>
              <div style={styles.lessonHeader}>
                <div style={styles.lessonHeaderTitle}>{currentLesson.title}</div>
                <div style={styles.lessonHeaderMeta}>
                  <span><Zap size={14} /> Lesson {activeLesson} of {totalCount}</span>
                  <span><Clock size={14} /> {currentLesson.duration} watch</span>
                  <span><Target size={14} /> {currentLesson.type === 'read' ? 'Reading material' : 'Video lesson'}</span>
                </div>
              </div>
            </div>

            <div style={styles.quoteCard}>
              <div style={styles.quoteText}>
                "Switching takes time, and most of us pay the toll without noticing. The act of moving from one window to another is so light, so frictionless, that we count it as free. It isn't."
              </div>
              <div style={styles.quoteAuthor}>— Aïcha Bakr, Senior UX Designer at Google</div>
            </div>

            <div style={styles.transcriptCard}>
              <div style={styles.transcriptTitle}>
                <FileText size={18} />
                Transcript & Key Takeaways
              </div>
              <div style={styles.transcriptText}>
                If you measure carefully, the residue accounts for most of the time you think you save. 
                A morning that feels productive because you "did a lot of things" was, on closer inspection, 
                a series of shallow jumps between contexts. Each jump costs. The question isn't whether you 
                can do two things at once — you can. The question is what you stop being able to feel, notice, 
                or remember when you do. The average knowledge worker switches between apps and tools over 
                500 times per day. That's 500 small exits and entrances, each one leaving a trace of cognitive 
                residue that lingers. The cost isn't in the seconds — it's in the quality of attention you bring 
                to what comes next.
              </div>
            </div>

            <div style={styles.notesSection}>
              <div style={styles.notesHeader}>
                <div style={styles.notesTitle}>
                  <MessageCircle size={16} />
                  My Notes
                </div>
                <div style={styles.notesCount}>{notes.length} notes</div>
              </div>
              <div style={styles.notesList}>
                {notes.map(note => (
                  <div key={note.id} style={styles.noteItem}>
                    <div style={styles.noteTimestamp}>@{note.timestamp}</div>
                    <div style={styles.noteText}>{note.text}</div>
                  </div>
                ))}
              </div>
              <div style={styles.noteInput}>
                <input 
                  type="text" 
                  placeholder="Add a note at {currentTime}..." 
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addNote()}
                  style={styles.noteInputField}
                />
                <button onClick={addNote} style={styles.addNoteBtn}>Save note</button>
              </div>
            </div>
          </>
        ) : (
          <div style={styles.transcriptCard}>
            <div style={styles.transcriptTitle}>📝 Quiz: Test Your Knowledge</div>
            <div style={styles.transcriptText}>
              <div style={{ marginBottom: '28px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <span style={{ fontSize: '14px', color: themeStyles.textSecondary }}>Question 1 of 5</span>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: themeStyles.accentColor }}>0 points</span>
                </div>
                <p style={{ fontSize: '18px', fontWeight: 600, marginBottom: '24px', color: themeStyles.textPrimary }}>
                  What is the primary goal of UX design?
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    'To make things look beautiful',
                    'To create user-centered experiences',
                    'To add more features',
                    'To increase development speed'
                  ].map((opt, i) => (
                    <label key={i} style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '14px', 
                      padding: '14px 18px', 
                      background: themeStyles.inputBg, 
                      borderRadius: '14px', 
                      cursor: 'pointer',
                      border: `1px solid ${themeStyles.borderColor}`,
                      transition: 'all 0.2s ease'
                    }}>
                      <input type="radio" name="quiz" style={{ accentColor: themeStyles.accentColor, width: '18px', height: '18px' }} />
                      <span style={{ color: themeStyles.textPrimary }}>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
              <button style={styles.completeBtn}>Submit Answer</button>
            </div>
          </div>
        )}

        <div style={styles.navButtons}>
          <button 
            style={styles.navBtn} 
            onClick={() => activeLesson > 1 && setActiveLesson(activeLesson - 1)}
            onMouseEnter={(e) => e.currentTarget.style.background = themeStyles.hoverBg}
            onMouseLeave={(e) => e.currentTarget.style.background = themeStyles.cardBg}
          >
            <ChevronLeft size={16} /> Previous Lesson
          </button>
          {!currentLesson.completed && currentLesson.type !== 'quiz' && (
            <button 
              style={styles.completeBtn}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              ✓ Mark as Complete
            </button>
          )}
          {currentLesson.type === 'quiz' && !showQuiz && (
            <button 
              style={styles.completeBtn}
              onClick={() => setShowQuiz(true)}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              Start Quiz →
            </button>
          )}
          <button 
            style={styles.navBtn} 
            onClick={() => activeLesson < totalCount && setActiveLesson(activeLesson + 1)}
            onMouseEnter={(e) => e.currentTarget.style.background = themeStyles.hoverBg}
            onMouseLeave={(e) => e.currentTarget.style.background = themeStyles.cardBg}
          >
            Next Lesson <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
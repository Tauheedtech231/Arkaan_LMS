/* eslint-disable react/no-unescaped-entities */
'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ChevronLeft, ChevronRight, Play, CheckCircle, 
  Clock, User, Menu, X, FileText, MessageCircle, 
  Zap, Target, Volume1, VolumeX, Settings
} from 'lucide-react';

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id;
  
  const [isDark, setIsDark] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [activeLesson, setActiveLesson] = useState(3);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState('12:34');
  const [duration, setDuration] = useState('22:45');
  const [progress, setProgress] = useState(55);
  const [notes, setNotes] = useState([
    { id: 1, timestamp: '21:12', text: '"Switching concepts — try noticing"' },
    { id: 2, timestamp: '02:14', text: 'The point about the same small thing exactly me.' },
    { id: 3, timestamp: '03:48', text: 'Try: phone in. Just to feel the ...' },
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
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setSidebarOpen(false);
      }
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
    successColor: '#10b981',
  };

  const lessons = [
    { id: 1, title: 'The basics', duration: '2 min', completed: true, type: 'video', description: 'Introduction to UX fundamentals', thumbnail: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=225&fit=crop' },
    { id: 2, title: 'Understanding a problem', duration: '2 min', completed: true, type: 'video', description: 'Problem identification', thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=225&fit=crop' },
    { id: 3, title: 'Building simple user flows', duration: '22 min', completed: false, type: 'read', description: 'Create effective journeys', thumbnail: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400&h=225&fit=crop' },
    { id: 4, title: 'Beyond screens', duration: '2 min', completed: false, type: 'video', description: 'UX beyond digital', thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=400&h=225&fit=crop' },
    { id: 5, title: 'Styling & more', duration: '2 min', completed: false, type: 'video', description: 'Visual principles', thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=225&fit=crop' },
    { id: 6, title: 'Building UI screens', duration: '2 min', completed: false, type: 'video', description: 'Screen patterns', thumbnail: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=225&fit=crop' },
    { id: 7, title: 'User flows advanced', duration: '2 min', completed: false, type: 'video', description: 'Complex mapping', thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=225&fit=crop' },
    { id: 8, title: 'Quiz: The basics', duration: '5 questions', completed: false, type: 'quiz', description: 'Test knowledge', thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=225&fit=crop' },
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

  // Beautiful scrollbar styles
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
      transition: background 0.2s ease;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: ${themeStyles.accentColor}cc;
    }
    * {
      scrollbar-width: thin;
      scrollbar-color: ${themeStyles.accentColor} ${themeStyles.borderColor};
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
      top: '16px',
      left: '16px',
      zIndex: 200,
      display: isMobile ? 'flex' : 'none',
      background: themeStyles.cardBg,
      border: `1px solid ${themeStyles.borderColor}`,
      borderRadius: '12px',
      padding: '10px',
      cursor: 'pointer',
    },
    overlay: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      zIndex: 140,
      display: sidebarOpen && isMobile ? 'block' : 'none',
    },
    sidebar: {
      width: isMobile ? '300px' : '280px',
      position: 'fixed' as const,
      left: 0,
      top: 0,
      bottom: 0,
      background: themeStyles.sidebarBg,
      borderRight: `1px solid ${themeStyles.borderColor}`,
      transform: isMobile ? (sidebarOpen ? 'translateX(0)' : 'translateX(-100%)') : 'translateX(0)',
      transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      zIndex: 150,
      overflowY: 'auto' as const,
    },
    sidebarHeader: {
      padding: isMobile ? '20px 16px' : '28px 20px',
      borderBottom: `1px solid ${themeStyles.borderColor}`,
    },
    backBtn: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      color: themeStyles.textSecondary,
      cursor: 'pointer',
      fontSize: '12px',
      marginBottom: '20px',
      padding: '6px 12px',
      borderRadius: '20px',
      background: themeStyles.hoverBg,
      transition: 'all 0.2s ease',
    },
    courseTitle: {
      fontSize: '18px',
      fontWeight: 600,
      color: themeStyles.textPrimary,
      marginBottom: '8px',
      lineHeight: 1.3,
    },
    courseMeta: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      fontSize: '12px',
      color: themeStyles.textSecondary,
      marginBottom: '16px',
      flexWrap: 'wrap' as const,
    },
    progressContainer: {
      marginTop: '12px',
    },
    progressHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '6px',
      fontSize: '11px',
      color: themeStyles.textSecondary,
    },
    progressBar: {
      height: '4px',
      background: themeStyles.borderColor,
      borderRadius: '2px',
      overflow: 'hidden',
    },
    progressFill: {
      width: `${courseProgress}%`,
      height: '100%',
      background: `linear-gradient(90deg, ${themeStyles.accentColor}, ${themeStyles.accentColor}80)`,
      borderRadius: '2px',
      transition: 'width 0.5s ease',
    },
    lessonsSection: {
      padding: '16px 12px',
    },
    sectionTitle: {
      fontSize: '11px',
      fontWeight: 600,
      color: themeStyles.textSecondary,
      marginBottom: '12px',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.08em',
      paddingLeft: '8px',
    },
    lessonItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '8px',
      borderRadius: '10px',
      cursor: 'pointer',
      marginBottom: '4px',
      transition: 'all 0.2s ease',
    },
    lessonActive: {
      background: `${themeStyles.accentColor}12`,
      borderLeft: `3px solid ${themeStyles.accentColor}`,
    },
    lessonLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      flex: 1,
      minWidth: 0,
    },
    lessonThumbnail: {
      width: '36px',
      height: '36px',
      borderRadius: '8px',
      objectFit: 'cover' as const,
      flexShrink: 0,
    },
    lessonInfo: {
      flex: 1,
      minWidth: 0,
    },
    lessonTitle: {
      fontSize: '13px',
      fontWeight: 500,
      color: themeStyles.textPrimary,
      marginBottom: '2px',
      whiteSpace: 'nowrap' as const,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    lessonDesc: {
      fontSize: '10px',
      color: themeStyles.textSecondary,
      whiteSpace: 'nowrap' as const,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    lessonDuration: {
      fontSize: '10px',
      color: themeStyles.textSecondary,
      background: themeStyles.hoverBg,
      padding: '3px 8px',
      borderRadius: '10px',
      whiteSpace: 'nowrap' as const,
    },
    mainContent: {
      flex: 1,
      marginLeft: isMobile ? '0' : '280px',
      padding: isMobile ? '70px 16px 40px 16px' : '32px 32px 48px 32px',
      maxWidth: isMobile ? '100%' : 'calc(100% - 280px)',
    },
    videoContainer: {
      background: themeStyles.cardBg,
      borderRadius: '16px',
      border: `1px solid ${themeStyles.borderColor}`,
      overflow: 'hidden',
      marginBottom: '24px',
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
      width: '56px',
      height: '56px',
      background: themeStyles.accentColor,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'transform 0.2s ease',
    },
    videoControls: {
      position: 'absolute' as const,
      bottom: 0,
      left: 0,
      right: 0,
      background: 'linear-gradient(0deg, rgba(0,0,0,0.8), transparent)',
      padding: '12px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      flexWrap: 'wrap' as const,
    },
    progressSlider: {
      flex: 1,
      height: '3px',
      background: 'rgba(255,255,255,0.3)',
      borderRadius: '2px',
      cursor: 'pointer',
    },
    progressSliderFill: {
      width: `${progress}%`,
      height: '100%',
      background: themeStyles.accentColor,
      borderRadius: '2px',
    },
    timeText: {
      fontSize: '11px',
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
    },
    lessonHeader: {
      padding: isMobile ? '16px' : '20px 24px',
      borderBottom: `1px solid ${themeStyles.borderColor}`,
    },
    lessonHeaderTitle: {
      fontSize: '20px',
      fontWeight: 600,
      color: themeStyles.textPrimary,
      marginBottom: '8px',
    },
    lessonHeaderMeta: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      fontSize: '12px',
      color: themeStyles.textSecondary,
      flexWrap: 'wrap' as const,
    },
    quoteCard: {
      background: `${themeStyles.accentColor}08`,
      borderRadius: '16px',
      padding: isMobile ? '20px' : '24px',
      border: `1px solid ${themeStyles.accentColor}20`,
      marginBottom: '24px',
    },
    quoteText: {
      fontSize: isMobile ? '15px' : '17px',
      fontStyle: 'italic',
      color: themeStyles.textPrimary,
      lineHeight: 1.5,
      marginBottom: '12px',
    },
    quoteAuthor: {
      fontSize: '12px',
      fontWeight: 500,
      color: themeStyles.accentColor,
    },
    transcriptCard: {
      background: themeStyles.cardBg,
      borderRadius: '16px',
      padding: isMobile ? '20px' : '24px',
      border: `1px solid ${themeStyles.borderColor}`,
      marginBottom: '24px',
    },
    transcriptTitle: {
      fontSize: '15px',
      fontWeight: 600,
      color: themeStyles.textPrimary,
      marginBottom: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    transcriptText: {
      fontSize: '13px',
      lineHeight: 1.6,
      color: themeStyles.textSecondary,
    },
    notesSection: {
      background: themeStyles.cardBg,
      borderRadius: '16px',
      border: `1px solid ${themeStyles.borderColor}`,
      overflow: 'hidden',
      marginBottom: '24px',
    },
    notesHeader: {
      padding: '14px 20px',
      borderBottom: `1px solid ${themeStyles.borderColor}`,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    notesTitle: {
      fontSize: '14px',
      fontWeight: 600,
      color: themeStyles.textPrimary,
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    notesCount: {
      fontSize: '11px',
      color: themeStyles.textSecondary,
      background: themeStyles.hoverBg,
      padding: '3px 10px',
      borderRadius: '16px',
    },
    notesList: {
      padding: '16px 20px',
      maxHeight: '280px',
      overflowY: 'auto' as const,
    },
    noteItem: {
      padding: '12px 14px',
      background: themeStyles.inputBg,
      borderRadius: '12px',
      marginBottom: '10px',
      border: `1px solid ${themeStyles.borderColor}`,
    },
    noteTimestamp: {
      fontSize: '10px',
      color: themeStyles.accentColor,
      fontWeight: 600,
      marginBottom: '6px',
      display: 'inline-block',
      padding: '2px 10px',
      background: `${themeStyles.accentColor}15`,
      borderRadius: '16px',
    },
    noteText: {
      fontSize: '13px',
      color: themeStyles.textPrimary,
      lineHeight: 1.5,
    },
    noteInput: {
      display: 'flex',
      gap: '10px',
      padding: '14px 20px',
      borderTop: `1px solid ${themeStyles.borderColor}`,
      flexWrap: 'wrap' as const,
    },
    noteInputField: {
      flex: 1,
      padding: '10px 14px',
      background: themeStyles.inputBg,
      border: `1px solid ${themeStyles.borderColor}`,
      borderRadius: '12px',
      color: themeStyles.textPrimary,
      fontSize: '13px',
      outline: 'none',
    },
    addNoteBtn: {
      padding: '10px 20px',
      background: themeStyles.accentColor,
      color: '#fff',
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      fontWeight: 500,
      fontSize: '12px',
    },
    navButtons: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '12px',
      flexWrap: 'wrap' as const,
    },
    navBtn: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      padding: '10px 20px',
      background: themeStyles.cardBg,
      border: `1px solid ${themeStyles.borderColor}`,
      borderRadius: '40px',
      color: themeStyles.textPrimary,
      cursor: 'pointer',
      fontSize: '12px',
      fontWeight: 500,
      transition: 'all 0.2s ease',
    },
    completeBtn: {
      padding: '10px 28px',
      background: themeStyles.accentColor,
      color: '#fff',
      border: 'none',
      borderRadius: '40px',
      cursor: 'pointer',
      fontWeight: 600,
      fontSize: '13px',
      transition: 'all 0.2s ease',
    },
  };

  const handleLessonClick = (lessonId: number) => {
    setActiveLesson(lessonId);
    if (isMobile) setSidebarOpen(false);
    setShowQuiz(lessons.find(l => l.id === lessonId)?.type === 'quiz');
  };

  return (
    <div style={styles.container}>
      <style>{scrollbarStyles}</style>
      
      <div style={styles.menuToggle} onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
      </div>

      <div style={styles.overlay} onClick={() => setSidebarOpen(false)} />

      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <div style={styles.backBtn} onClick={() => router.push('/dashboard')}>
            <ChevronLeft size={14} /> Back
          </div>
          <div style={styles.courseTitle}>UX Design for dummies</div>
          <div style={styles.courseMeta}>
            <span><User size={12} /> Muhammad</span>
            <span><Clock size={12} /> 4 hrs total</span>
          </div>
          <div style={styles.progressContainer}>
            <div style={styles.progressHeader}>
              <span>Course progress</span>
              <span>{Math.round(courseProgress)}%</span>
            </div>
            <div style={styles.progressBar}>
              <div style={styles.progressFill} />
            </div>
          </div>
        </div>

        <div style={styles.lessonsSection}>
          <div style={styles.sectionTitle}>Course content</div>
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {lesson.completed && <CheckCircle size={12} color={themeStyles.successColor} />}
                <span style={styles.lessonDuration}>{lesson.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.mainContent}>
        <div style={styles.videoContainer}>
          <div style={styles.videoWrapper}>
            <img src={currentLesson.thumbnail} alt={currentLesson.title} style={styles.videoThumbnail} />
            <div style={styles.videoOverlay}>
              <div style={styles.playButton}>
                <Play size={24} fill="white" />
              </div>
            </div>
            <div style={styles.videoControls}>
              <button style={styles.controlBtn} onClick={() => setIsMuted(!isMuted)}>
                {isMuted ? <VolumeX size={14} /> : <Volume1 size={14} />}
              </button>
              <div style={styles.progressSlider}>
                <div style={styles.progressSliderFill} />
              </div>
              <span style={styles.timeText}>{currentTime} / {duration}</span>
              <button style={styles.controlBtn}>
                <Settings size={14} />
              </button>
            </div>
          </div>
          <div style={styles.lessonHeader}>
            <div style={styles.lessonHeaderTitle}>{currentLesson.title}</div>
            <div style={styles.lessonHeaderMeta}>
              <span><Zap size={12} /> Lesson {activeLesson} of {totalCount}</span>
              <span><Clock size={12} /> {currentLesson.duration}</span>
              <span><Target size={12} /> {currentLesson.type === 'read' ? 'Reading' : 'Video'}</span>
            </div>
          </div>
        </div>

        <div style={styles.quoteCard}>
          <div style={styles.quoteText}>
            "Switching takes time, and most of us pay the toll without noticing. The act of moving from one window to another is so light, so frictionless, that we count it as free. It isn't."
          </div>
          <div style={styles.quoteAuthor}>— Aïcha Bakr</div>
        </div>

        <div style={styles.transcriptCard}>
          <div style={styles.transcriptTitle}>
            <FileText size={14} /> Key Takeaways
          </div>
          <div style={styles.transcriptText}>
            The average knowledge worker switches between apps over 500 times per day. 
            Each switch leaves a trace of cognitive residue. The cost isn't in seconds — 
            it's in the quality of attention you bring to what comes next.
          </div>
        </div>

        <div style={styles.notesSection}>
          <div style={styles.notesHeader}>
            <div style={styles.notesTitle}>
              <MessageCircle size={14} /> My Notes
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
              placeholder="Add a note..." 
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addNote()}
              style={styles.noteInputField}
            />
            <button onClick={addNote} style={styles.addNoteBtn}>Save note</button>
          </div>
        </div>

        <div style={styles.navButtons}>
          <button 
            style={styles.navBtn} 
            onClick={() => activeLesson > 1 && setActiveLesson(activeLesson - 1)}
          >
            <ChevronLeft size={14} /> Previous
          </button>
          <button style={styles.completeBtn}>✓ Mark Complete</button>
          <button 
            style={styles.navBtn} 
            onClick={() => activeLesson < totalCount && setActiveLesson(activeLesson + 1)}
          >
            Next <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoginAndResetFlow() {
  const router = useRouter();
  const [isDark, setIsDark] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [page, setPage] = useState('login');
  const [selectedMethod, setSelectedMethod] = useState('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [resetContact, setResetContact] = useState('');
  const [resendTimer, setResendTimer] = useState(28);
  const [canResend, setCanResend] = useState(false);

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

  // Check mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Resend timer
  useEffect(() => {
    if (resendTimer > 0 && page === 'check-inbox') {
      const interval = setInterval(() => {
        setResendTimer(prev => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [resendTimer, page]);

  const handleResend = () => {
    if (canResend) {
      setResendTimer(28);
      setCanResend(false);
    }
  };

  const handleLogin = () => {
    if ((email || phone) && password) {
      router.push('/dashboard');
    }
  };

  const handleSendResetCode = () => {
    if (resetContact) {
      setPage('check-inbox');
    }
  };

  // Theme based colors
  const themeStyles = {
    bgPrimary: isDark ? '#0a0a0a' : '#ffffff',
    textPrimary: isDark ? '#ffffff' : '#171717',
    textSecondary: isDark ? '#999' : '#666',
    borderColor: isDark ? '#2a2a2a' : '#e5e5e5',
    accentColor: isDark ? '#e63939' : '#dc2626',
    cardBg: isDark ? '#141414' : '#f5f5f5',
    inputBg: isDark ? '#1a1a1a' : '#ffffff',
    inputBorder: isDark ? '#333' : '#e0e0e0',
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column' as const,
      background: themeStyles.bgPrimary,
    },
    main: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: isMobile ? '16px 16px' : '20px 32px',
    },
    card: {
      maxWidth: isMobile ? '360px' : '400px',
      width: '100%',
      background: themeStyles.cardBg,
      borderRadius: isMobile ? '20px' : '24px',
      padding: isMobile ? '20px 16px' : '24px 24px',
      border: `1px solid ${themeStyles.borderColor}`,
    },
    title: {
      fontSize: isMobile ? '22px' : '26px',
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      fontWeight: 600,
      color: themeStyles.textPrimary,
      marginBottom: '6px',
    },
    description: {
      fontSize: isMobile ? '11px' : '12px',
      lineHeight: isMobile ? '16px' : '18px',
      color: themeStyles.textSecondary,
      marginBottom: isMobile ? '16px' : '20px',
    },
    toggleGroup: {
      display: 'flex',
      gap: '6px',
      marginBottom: isMobile ? '14px' : '16px',
      background: themeStyles.inputBg,
      padding: '3px',
      borderRadius: '10px',
      border: `1px solid ${themeStyles.borderColor}`,
    },
    toggleBtn: {
      flex: 1,
      padding: isMobile ? '6px 10px' : '8px 14px',
      borderRadius: '8px',
      fontSize: isMobile ? '11px' : '12px',
      fontWeight: 500,
      textAlign: 'center' as const,
      cursor: 'pointer',
      background: 'transparent',
      border: 'none',
      color: themeStyles.textSecondary,
    },
    toggleBtnActive: {
      background: themeStyles.accentColor,
      color: '#fff',
    },
    input: {
      width: '100%',
      padding: isMobile ? '8px 12px' : '10px 14px',
      fontSize: isMobile ? '12px' : '13px',
      background: themeStyles.inputBg,
      border: `1px solid ${themeStyles.inputBorder}`,
      borderRadius: '10px',
      color: themeStyles.textPrimary,
      outline: 'none',
      marginBottom: isMobile ? '12px' : '14px',
    },
    infoText: {
      fontSize: isMobile ? '10px' : '11px',
      color: themeStyles.textSecondary,
      marginBottom: isMobile ? '12px' : '14px',
    },
    checkboxGroup: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: isMobile ? '16px' : '20px',
      cursor: 'pointer',
    },
    checkbox: {
      width: '14px',
      height: '14px',
      cursor: 'pointer',
      accentColor: themeStyles.accentColor,
    },
    btnPrimary: {
      width: '100%',
      background: themeStyles.accentColor,
      color: '#fff',
      padding: isMobile ? '8px 14px' : '10px 18px',
      borderRadius: '999px',
      fontWeight: 600,
      fontSize: isMobile ? '12px' : '13px',
      textAlign: 'center' as const,
      cursor: 'pointer',
      border: 'none',
      marginBottom: isMobile ? '12px' : '14px',
    },
    btnSecondary: {
      width: '100%',
      background: 'transparent',
      color: themeStyles.textSecondary,
      padding: isMobile ? '8px 14px' : '10px 18px',
      borderRadius: '999px',
      fontWeight: 500,
      fontSize: isMobile ? '12px' : '13px',
      textAlign: 'center' as const,
      cursor: 'pointer',
      border: `1px solid ${themeStyles.borderColor}`,
      marginBottom: isMobile ? '12px' : '14px',
    },
    linkRow: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '6px',
      marginBottom: isMobile ? '20px' : '24px',
      flexWrap: 'wrap' as const,
    },
    linkText: {
      fontSize: isMobile ? '11px' : '12px',
      color: themeStyles.textSecondary,
    },
    link: {
      color: themeStyles.accentColor,
      textDecoration: 'none',
      fontWeight: 500,
      cursor: 'pointer',
    },
    divider: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: isMobile ? '16px' : '20px',
    },
    dividerLine: {
      flex: 1,
      height: '1px',
      background: themeStyles.borderColor,
    },
    dividerText: {
      fontSize: isMobile ? '9px' : '10px',
      color: themeStyles.textSecondary,
    },
    socialButtons: {
      display: 'flex',
      gap: '10px',
      justifyContent: 'center',
    },
    socialBtn: {
      flex: 1,
      padding: isMobile ? '8px' : '10px',
      background: themeStyles.inputBg,
      border: `1px solid ${themeStyles.borderColor}`,
      borderRadius: '10px',
      fontSize: isMobile ? '11px' : '12px',
      fontWeight: 500,
      textAlign: 'center' as const,
      color: themeStyles.textPrimary,
      textDecoration: 'none',
      cursor: 'pointer',
    },
    inboxIcon: {
      textAlign: 'center' as const,
      fontSize: isMobile ? '36px' : '42px',
      marginBottom: isMobile ? '12px' : '16px',
    },
    actionRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '12px',
      flexWrap: 'wrap' as const,
      marginTop: isMobile ? '12px' : '16px',
    },
  };

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  const pageTransition: any = {
    type: "tween",
    ease: "anticipate",
    duration: 0.3
  };

  return (
    <div style={styles.container}>
      <main style={styles.main}>
        <div style={styles.card}>
          <AnimatePresence mode="wait">
            {/* PAGE 1: LOGIN */}
            {page === 'login' && (
              <motion.div
                key="login"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <h1 style={styles.title}>Welcome back.</h1>
                <p style={styles.description}>Sign in to pick up where you left off.</p>

                <div style={styles.toggleGroup}>
                  <button 
                    style={{...styles.toggleBtn, ...(selectedMethod === 'phone' && styles.toggleBtnActive)}} 
                    onClick={() => setSelectedMethod('phone')}
                  >
                    Phone
                  </button>
                  <button 
                    style={{...styles.toggleBtn, ...(selectedMethod === 'email' && styles.toggleBtnActive)}} 
                    onClick={() => setSelectedMethod('email')}
                  >
                    Email
                  </button>
                </div>

                {selectedMethod === 'email' && (
                  <input 
                    type="email" 
                    placeholder="you@example.com" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    style={styles.input} 
                  />
                )}

                {selectedMethod === 'phone' && (
                  <input 
                    type="tel" 
                    placeholder="+1 (555) 000-0000" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    style={styles.input} 
                  />
                )}

                <input 
                  type="password" 
                  placeholder="Password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  style={styles.input} 
                />

                <div style={styles.checkboxGroup} onClick={() => setKeepSignedIn(!keepSignedIn)}>
                  <input type="checkbox" checked={keepSignedIn} onChange={() => setKeepSignedIn(!keepSignedIn)} style={styles.checkbox} />
                  <span style={{ fontSize: isMobile ? '11px' : '12px', color: themeStyles.textSecondary }}>Keep me signed in</span>
                </div>

                <button onClick={handleLogin} style={styles.btnPrimary}>Sign in</button>

                <div style={styles.linkRow}>
                  <span style={styles.linkText}>New here?</span>
                  <Link href="/signup" style={styles.link}>Create an account</Link>
                </div>

                <div style={styles.divider}>
                  <span style={styles.dividerLine} />
                  <span style={styles.dividerText}>OR LOGIN THROUGH</span>
                  <span style={styles.dividerLine} />
                </div>

                <div style={styles.socialButtons}>
                  <Link href="#" style={styles.socialBtn}>Google</Link>
                  <Link href="#" style={styles.socialBtn}>Apple</Link>
                </div>

                <div style={{ textAlign: 'center', marginTop: isMobile ? '12px' : '16px' }}>
                  <span onClick={() => setPage('reset')} style={styles.link}>Forgot password?</span>
                </div>
              </motion.div>
            )}

            {/* PAGE 2: RESET PASSWORD */}
            {page === 'reset' && (
              <motion.div
                key="reset"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <h1 style={styles.title}>Reset your password.</h1>
                <p style={styles.description}>Type the email or phone you signed up with.</p>

                <input 
                  type="text" 
                  placeholder="Email or phone" 
                  value={resetContact} 
                  onChange={(e) => setResetContact(e.target.value)} 
                  style={styles.input} 
                />

                <button onClick={handleSendResetCode} style={styles.btnPrimary}>Send reset code</button>

                <div style={styles.linkRow}>
                  <span onClick={() => setPage('login')} style={styles.link}>Back to login</span>
                </div>
              </motion.div>
            )}

            {/* PAGE 3: CHECK INBOX */}
            {page === 'check-inbox' && (
              <motion.div
                key="inbox"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <div style={styles.inboxIcon}>📧</div>
                <h1 style={styles.title}>Check your inbox.</h1>
                <p style={styles.description}>We sent a reset code to {resetContact}.</p>

                <div style={styles.actionRow}>
                  <span onClick={() => setPage('login')} style={styles.link}>Back to login</span>
                  {canResend ? (
                    <span onClick={handleResend} style={styles.link}>Resend code</span>
                  ) : (
                    <span style={{ fontSize: isMobile ? '10px' : '11px', color: themeStyles.textSecondary }}>Resend in {resendTimer}s</span>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
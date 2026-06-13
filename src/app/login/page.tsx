/* eslint-disable react/no-unescaped-entities */
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginAndResetFlow() {
  const router = useRouter();
  const [isDark, setIsDark] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [page, setPage] = useState('login'); // login, reset, check-inbox
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
      padding: isMobile ? '80px 20px' : '100px 40px',
    },
    card: {
      maxWidth: '480px',
      width: '100%',
      background: themeStyles.cardBg,
      borderRadius: '24px',
      padding: isMobile ? '32px 20px' : '40px 32px',
      border: `1px solid ${themeStyles.borderColor}`,
    },
    title: {
      fontSize: isMobile ? '28px' : '32px',
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      fontWeight: 600,
      color: themeStyles.textPrimary,
      marginBottom: '8px',
    },
    description: {
      fontSize: '14px',
      lineHeight: '22px',
      color: themeStyles.textSecondary,
      marginBottom: '32px',
    },
    toggleGroup: {
      display: 'flex',
      gap: '12px',
      marginBottom: '24px',
      background: themeStyles.inputBg,
      padding: '4px',
      borderRadius: '12px',
      border: `1px solid ${themeStyles.borderColor}`,
    },
    toggleBtn: {
      flex: 1,
      padding: '10px 16px',
      borderRadius: '10px',
      fontSize: '14px',
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
      padding: '14px 16px',
      fontSize: '15px',
      background: themeStyles.inputBg,
      border: `1px solid ${themeStyles.inputBorder}`,
      borderRadius: '12px',
      color: themeStyles.textPrimary,
      outline: 'none',
      marginBottom: '20px',
    },
    infoText: {
      fontSize: '13px',
      color: themeStyles.textSecondary,
      marginBottom: '20px',
    },
    checkboxGroup: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '32px',
      cursor: 'pointer',
    },
    checkbox: {
      width: '18px',
      height: '18px',
      cursor: 'pointer',
      accentColor: themeStyles.accentColor,
    },
    btnPrimary: {
      width: '100%',
      background: themeStyles.accentColor,
      color: '#fff',
      padding: '14px 20px',
      borderRadius: '999px',
      fontWeight: 600,
      fontSize: '14px',
      textAlign: 'center' as const,
      cursor: 'pointer',
      border: 'none',
      marginBottom: '20px',
    },
    btnSecondary: {
      width: '100%',
      background: 'transparent',
      color: themeStyles.textSecondary,
      padding: '14px 20px',
      borderRadius: '999px',
      fontWeight: 500,
      fontSize: '14px',
      textAlign: 'center' as const,
      cursor: 'pointer',
      border: `1px solid ${themeStyles.borderColor}`,
      marginBottom: '20px',
    },
    linkRow: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '32px',
      flexWrap: 'wrap' as const,
    },
    linkText: {
      fontSize: '14px',
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
      gap: '16px',
      marginBottom: '24px',
    },
    dividerLine: {
      flex: 1,
      height: '1px',
      background: themeStyles.borderColor,
    },
    dividerText: {
      fontSize: '12px',
      color: themeStyles.textSecondary,
    },
    socialButtons: {
      display: 'flex',
      gap: '16px',
      justifyContent: 'center',
    },
    socialBtn: {
      flex: 1,
      padding: '12px',
      background: themeStyles.inputBg,
      border: `1px solid ${themeStyles.borderColor}`,
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: 500,
      textAlign: 'center' as const,
      color: themeStyles.textPrimary,
      textDecoration: 'none',
      cursor: 'pointer',
    },
    inboxIcon: {
      textAlign: 'center' as const,
      fontSize: '48px',
      marginBottom: '20px',
    },
    actionRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '16px',
      flexWrap: 'wrap' as const,
      marginTop: '20px',
    },
  };

  return (
    <div style={styles.container}>
      <main style={styles.main}>
        <div style={styles.card}>
          
          {/* PAGE 1: LOGIN */}
          {page === 'login' && (
            <>
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
                <>
                  <input 
                    type="email" 
                    placeholder="you@example.com" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    style={styles.input} 
                  />
                  <p style={styles.infoText}>We'll send a 6-digit code to verify.</p>
                </>
              )}

              {selectedMethod === 'phone' && (
                <>
                  <input 
                    type="tel" 
                    placeholder="+1 (555) 000-0000" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    style={styles.input} 
                  />
                  <p style={styles.infoText}>We'll send a 6-digit code to verify.</p>
                </>
              )}

              <input 
                type="password" 
                placeholder="Choose a password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                style={styles.input} 
              />

              <div style={styles.checkboxGroup} onClick={() => setKeepSignedIn(!keepSignedIn)}>
                <input type="checkbox" checked={keepSignedIn} onChange={() => setKeepSignedIn(!keepSignedIn)} style={styles.checkbox} />
                <span style={{ fontSize: '14px', color: themeStyles.textSecondary }}>Keep me signed in</span>
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

              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <span onClick={() => setPage('reset')} style={styles.link}>Forgot password?</span>
              </div>
            </>
          )}

          {/* PAGE 2: RESET PASSWORD */}
          {page === 'reset' && (
            <>
              <h1 style={styles.title}>Reset your password.</h1>
              <p style={styles.description}>Type the email or phone you signed up with. We'll send a one-time code.</p>

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
            </>
          )}

          {/* PAGE 3: CHECK INBOX */}
          {page === 'check-inbox' && (
            <>
              <div style={styles.inboxIcon}>📧</div>
              <h1 style={styles.title}>Check your inbox.</h1>
              <p style={styles.description}>We sent a reset code to {resetContact}. The code expires in 10 minutes.</p>

              <div style={styles.actionRow}>
                <span onClick={() => setPage('login')} style={styles.link}>Back to login</span>
                {canResend ? (
                  <span onClick={handleResend} style={styles.link}>Resend code</span>
                ) : (
                  <span style={{ fontSize: '13px', color: themeStyles.textSecondary }}>Resend code in {resendTimer}s</span>
                )}
              </div>
            </>
          )}

        </div>
      </main>
    </div>
  );
}
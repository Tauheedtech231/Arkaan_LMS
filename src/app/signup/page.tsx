/* eslint-disable react/no-unescaped-entities */
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CompleteSignUpPage() {
  const [isDark, setIsDark] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [step, setStep] = useState(1);
  
  // Step 1: Account
  const [selectedMethod, setSelectedMethod] = useState('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [resendTimer, setResendTimer] = useState(28);
  const [canResend, setCanResend] = useState(false);
  
  // Step 3: Name
  const [name, setName] = useState('');
  
  // Step 4: Age & Gender
  const [age, setAge] = useState(25);
  const [gender, setGender] = useState('');
  
  // Step 5: Interests
  const [searchInterest, setSearchInterest] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedLibraries, setSelectedLibraries] = useState<string[]>([]);
  
  // Step 6: Learning Goal
  const [learningGoal, setLearningGoal] = useState('');
  const [selectedPractices, setSelectedPractices] = useState<string[]>([]);
  
  // Step 7: Referral
  const [referralCode, setReferralCode] = useState('');

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
    if (resendTimer > 0 && step === 2) {
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
  }, [resendTimer, step]);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (value && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleResend = () => {
    if (canResend) {
      setResendTimer(28);
      setCanResend(false);
      setCode(['', '', '', '', '', '']);
    }
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const toggleLibrary = (library: string) => {
    setSelectedLibraries(prev =>
      prev.includes(library) ? prev.filter(l => l !== library) : [...prev, library]
    );
  };

  const togglePractice = (practice: string) => {
    setSelectedPractices(prev =>
      prev.includes(practice) ? prev.filter(p => p !== practice) : [...prev, practice]
    );
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
    tagBg: isDark ? '#1a1a1a' : '#ffffff',
    tagBorder: isDark ? '#333' : '#e0e0e0',
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
      maxWidth: '560px',
      width: '100%',
      background: themeStyles.cardBg,
      borderRadius: '24px',
      padding: isMobile ? '32px 20px' : '40px 32px',
      border: `1px solid ${themeStyles.borderColor}`,
    },
    step: {
      fontFamily: 'monospace',
      fontSize: '10px',
      letterSpacing: '0.16em',
      textTransform: 'uppercase' as const,
      color: themeStyles.textSecondary,
      marginBottom: '16px',
    },
    title: {
      fontSize: isMobile ? '24px' : '28px',
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      fontWeight: 600,
      color: themeStyles.textPrimary,
      marginBottom: '12px',
    },
    description: {
      fontSize: '14px',
      lineHeight: '22px',
      color: themeStyles.textSecondary,
      marginBottom: '24px',
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
    textarea: {
      width: '100%',
      padding: '14px 16px',
      fontSize: '15px',
      background: themeStyles.inputBg,
      border: `1px solid ${themeStyles.inputBorder}`,
      borderRadius: '12px',
      color: themeStyles.textPrimary,
      outline: 'none',
      marginBottom: '12px',
      fontFamily: 'inherit',
      resize: 'vertical' as const,
    },
    charCount: {
      fontSize: '12px',
      color: themeStyles.textSecondary,
      textAlign: 'right' as const,
      marginBottom: '20px',
    },
    // Toggle Buttons
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
    // Age Slider
    ageContainer: {
      marginBottom: '24px',
    },
    ageLabel: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '12px',
    },
    ageText: {
      fontSize: '14px',
      fontWeight: 500,
      color: themeStyles.textSecondary,
    },
    ageValue: {
      fontSize: '24px',
      fontWeight: 600,
      color: themeStyles.accentColor,
    },
    ageSlider: {
      width: '100%',
      height: '4px',
      WebkitAppearance: 'none' as const,
      background: themeStyles.borderColor,
      borderRadius: '2px',
      outline: 'none',
      marginBottom: '20px',
    },
    ageMarks: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '24px',
    },
    ageMark: {
      fontSize: '12px',
      color: themeStyles.textSecondary,
    },
    // Gender
    genderGroup: {
      display: 'flex',
      gap: '12px',
      marginBottom: '24px',
      flexWrap: 'wrap' as const,
    },
    genderBtn: {
      padding: '10px 20px',
      borderRadius: '999px',
      fontSize: '14px',
      fontWeight: 500,
      cursor: 'pointer',
      background: 'transparent',
      border: `1px solid ${themeStyles.borderColor}`,
      color: themeStyles.textSecondary,
    },
    genderBtnActive: {
      background: themeStyles.accentColor,
      color: '#fff',
      borderColor: themeStyles.accentColor,
    },
    // Tags
    tagsContainer: {
      display: 'flex',
      flexWrap: 'wrap' as const,
      gap: '10px',
      marginBottom: '24px',
    },
    tag: {
      padding: '8px 16px',
      borderRadius: '999px',
      fontSize: '13px',
      fontWeight: 500,
      cursor: 'pointer',
      background: themeStyles.tagBg,
      border: `1px solid ${themeStyles.tagBorder}`,
      color: themeStyles.textSecondary,
    },
    tagActive: {
      background: themeStyles.accentColor,
      color: '#fff',
      borderColor: themeStyles.accentColor,
    },
    sectionTitle: {
      fontSize: '16px',
      fontWeight: 600,
      color: themeStyles.textPrimary,
      marginBottom: '16px',
      marginTop: '8px',
    },
    // Code input
    codeContainer: {
      display: 'flex',
      gap: '10px',
      justifyContent: 'center',
      marginBottom: '24px',
      flexWrap: 'wrap' as const,
    },
    codeInput: {
      width: isMobile ? '44px' : '52px',
      height: isMobile ? '52px' : '60px',
      textAlign: 'center' as const,
      fontSize: isMobile ? '20px' : '24px',
      fontWeight: 600,
      background: themeStyles.inputBg,
      border: `2px solid ${themeStyles.inputBorder}`,
      borderRadius: '12px',
      color: themeStyles.textPrimary,
      outline: 'none',
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
      marginBottom: '16px',
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
      marginBottom: '16px',
    },
    linkText: {
      textAlign: 'center' as const,
      fontSize: '14px',
      color: themeStyles.textSecondary,
    },
    link: {
      color: themeStyles.accentColor,
      textDecoration: 'none',
      fontWeight: 500,
      cursor: 'pointer',
    },
  };

  const handleNext = () => {
    setStep(step + 1);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const handleFinish = () => {
    window.location.href = '/dashboard';
  };

  return (
    <div style={styles.container}>
      <main style={styles.main}>
        <div style={styles.card}>
          {step === 1 && (
            <>
              <div style={styles.step}>STEP 1 - ACCOUNT</div>
              <h1 style={styles.title}>Create an account</h1>
              <p style={styles.description}>No credit card, no commitment. We send a one-time code to verify it's you.</p>

              <div style={styles.toggleGroup}>
                <button style={{...styles.toggleBtn, ...(selectedMethod === 'phone' && styles.toggleBtnActive)}} onClick={() => setSelectedMethod('phone')}>Phone</button>
                <button style={{...styles.toggleBtn, ...(selectedMethod === 'email' && styles.toggleBtnActive)}} onClick={() => setSelectedMethod('email')}>Email</button>
              </div>

              {selectedMethod === 'email' && (
                <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} />
              )}
              {selectedMethod === 'phone' && (
                <input type="tel" placeholder="+1 (555) 000-0000" value={phone} onChange={(e) => setPhone(e.target.value)} style={styles.input} />
              )}

              <p style={styles.description}>We'll send a 6-digit code to verify.</p>

              <input type="password" placeholder="Choose a password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} />

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
                <input type="checkbox" checked={keepSignedIn} onChange={() => setKeepSignedIn(!keepSignedIn)} style={{ width: '18px', height: '18px', accentColor: themeStyles.accentColor }} />
                <span style={{ fontSize: '14px', color: themeStyles.textSecondary }}>Keep me signed in</span>
              </div>

              <button onClick={handleNext} style={styles.btnPrimary}>Create an account</button>

              <div style={styles.linkText}>Already have an account? <Link href="/welcome" style={styles.link}>Sign in</Link></div>
            </>
          )}

          {step === 2 && (
            <>
              <div style={styles.step}>STEP 2 - VERIFY</div>
              <h1 style={styles.title}>Verify it's you.</h1>
              <div style={{ background: themeStyles.inputBg, padding: '14px 16px', borderRadius: '12px', marginBottom: '20px' }}>
                <div style={{ fontSize: '14px', color: themeStyles.textPrimary }}>We sent a 6-digit code to {selectedMethod === 'email' ? email : phone}</div>
              </div>

              <div style={styles.codeContainer}>
                {code.map((digit, idx) => (
                  <input key={idx} id={`code-${idx}`} type="text" maxLength={1} value={digit} onChange={(e) => handleCodeChange(idx, e.target.value)} style={styles.codeInput} />
                ))}
              </div>

              <div style={{ fontSize: '13px', color: themeStyles.textSecondary, textAlign: 'center', marginBottom: '32px' }}>
                Didn't get it? {canResend ? <span onClick={handleResend} style={styles.link}>Resend code</span> : <span>Resend in {resendTimer}s</span>}
              </div>

              <button onClick={handleNext} style={styles.btnPrimary}>Verify & continue</button>
              <button onClick={handleBack} style={styles.btnSecondary}>Back</button>
            </>
          )}

          {step === 3 && (
            <>
              <div style={styles.step}>A FEW QUESTIONS, WHILE THE KETTLE BOILS</div>
              <h1 style={styles.title}>What should we call you?</h1>
              <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} style={styles.input} />
              <button onClick={handleNext} style={styles.btnPrimary}>Next</button>
              <button onClick={() => setStep(5)} style={styles.btnSecondary}>I'll do this later</button>
            </>
          )}

          {step === 4 && (
            <>
              <div style={styles.step}>A LITTLE ABOUT YOU</div>
              <h1 style={styles.title}>Nice to meet you, {name || 'there'}.</h1>
              <p style={styles.description}>We ask so we can pace lessons appropriately. Your answers are private and never shown on your profile.</p>
              
              {/* Age Slider */}
              <div style={styles.ageContainer}>
                <div style={styles.ageLabel}>
                  <span style={styles.ageText}>Age</span>
                  <span style={styles.ageValue}>{age} years</span>
                </div>
                <input
                  type="range"
                  min="18"
                  max="90"
                  value={age}
                  onChange={(e) => setAge(parseInt(e.target.value))}
                  style={styles.ageSlider}
                />
                <div style={styles.ageMarks}>
                  <span style={styles.ageMark}>18</span>
                  <span style={styles.ageMark}>30</span>
                  <span style={styles.ageMark}>50</span>
                  <span style={styles.ageMark}>70</span>
                  <span style={styles.ageMark}>90</span>
                </div>
              </div>
              
              {/* Gender Selection */}
              <div style={styles.genderGroup}>
                {['Woman', 'Man', 'Non-binary', 'Prefer not to say'].map(g => (
                  <button 
                    key={g} 
                    style={{...styles.genderBtn, ...(gender === g && styles.genderBtnActive)}} 
                    onClick={() => setGender(g)}
                  >
                    {g}
                  </button>
                ))}
              </div>
              
              <button onClick={handleNext} style={styles.btnPrimary}>Next</button>
              <button onClick={() => setStep(6)} style={styles.btnSecondary}>I'll do this later</button>
              <button onClick={handleBack} style={styles.linkText}><span style={styles.link}>Back</span></button>
            </>
          )}

          {step === 5 && (
            <>
              <div style={styles.step}>What are you looking for help with?</div>
              <h1 style={styles.title}>Choose any that apply. These are our three main libraries</h1>
              <input type="text" placeholder="Search your interest here" value={searchInterest} onChange={(e) => setSearchInterest(e.target.value)} style={styles.input} />
              
              <div style={styles.tagsContainer}>
                {['Wealth', 'Relationships', 'Health'].map(tag => (
                  <button key={tag} style={{...styles.tag, ...(selectedLibraries.includes(tag) && styles.tagActive)}} onClick={() => toggleLibrary(tag)}>{tag}</button>
                ))}
              </div>
              
              <div style={styles.sectionTitle}>HONEY & HABITS</div>
              <div style={styles.tagsContainer}>
                {['Investing for beginners', 'Building savings habits', 'Mindful spending'].map(tag => (
                  <button key={tag} style={{...styles.tag, ...(selectedInterests.includes(tag) && styles.tagActive)}} onClick={() => toggleInterest(tag)}>{tag}</button>
                ))}
              </div>
              
              <div style={styles.sectionTitle}>WORK & CAREER</div>
              <div style={styles.tagsContainer}>
                {['Career growth', 'Leading a team', 'Switching industries', 'Freelancing & consulting'].map(tag => (
                  <button key={tag} style={{...styles.tag, ...(selectedInterests.includes(tag) && styles.tagActive)}} onClick={() => toggleInterest(tag)}>{tag}</button>
                ))}
              </div>
              
              <div style={styles.sectionTitle}>SKILLS THAT EARN</div>
              <div style={styles.tagsContainer}>
                {['Development & programming', 'Writing & copywriting', 'Marketing & growth', 'Sales', 'Public speaking', 'Photography & video', 'Data & analytics', 'Product management'].map(tag => (
                  <button key={tag} style={{...styles.tag, ...(selectedInterests.includes(tag) && styles.tagActive)}} onClick={() => toggleInterest(tag)}>{tag}</button>
                ))}
              </div>
              
              <button onClick={handleNext} style={styles.btnPrimary}>Next</button>
              <button onClick={() => setStep(6)} style={styles.btnSecondary}>I'll do this later</button>
              <button onClick={handleBack} style={styles.linkText}><span style={styles.link}>Back</span></button>
            </>
          )}

          {step === 6 && (
            <>
              <div style={styles.step}>What are you hoping to learn?</div>
              <textarea 
                placeholder="I'd like to get better at having honest conversations without it turning into an argument." 
                value={learningGoal} 
                onChange={(e) => setLearningGoal(e.target.value)} 
                maxLength={280} 
                rows={4} 
                style={styles.textarea} 
              />
              <div style={styles.charCount}>{learningGoal.length} / 280</div>
              
              <div style={styles.tagsContainer}>
                {['A small daily practice', 'A way to start a hard conversation', 'Something to read on Sunday', 'Discipline without burnout'].map(practice => (
                  <button key={practice} style={{...styles.tag, ...(selectedPractices.includes(practice) && styles.tagActive)}} onClick={() => togglePractice(practice)}>{practice}</button>
                ))}
              </div>
              
              <button onClick={handleNext} style={styles.btnPrimary}>Next</button>
              <button onClick={() => setStep(7)} style={styles.btnSecondary}>I'll do this later</button>
              <button onClick={handleBack} style={styles.linkText}><span style={styles.link}>Back</span></button>
            </>
          )}

          {step === 7 && (
            <>
              <div style={styles.step}>Were you sent here by someone?</div>
              <h1 style={styles.title}>Referral code (optional)</h1>
              <input type="text" placeholder="XXXXXX" value={referralCode} onChange={(e) => setReferralCode(e.target.value)} style={styles.input} />
              <p style={styles.description}>A short code like SUNDAY26 or a friend's name.</p>
              <p style={{ fontSize: '13px', color: themeStyles.textSecondary, marginBottom: '24px', padding: '12px', background: themeStyles.inputBg, borderRadius: '12px' }}>
                📞 Friends-of-the-library codes unlock the first paid lesson of any course, on us — no card required.
              </p>
              
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button onClick={handleFinish} style={{...styles.btnSecondary, flex: 1}}>I don't have a code</button>
                <button onClick={handleFinish} style={{...styles.btnPrimary, flex: 1}}>Finish & view courses</button>
              </div>
              <button onClick={handleBack} style={styles.linkText}><span style={styles.link}>Back</span></button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, Variants } from 'framer-motion';

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

  // Load data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('signup_data');
    if (savedData) {
      const data = JSON.parse(savedData);
      setSelectedMethod(data.selectedMethod || 'email');
      setEmail(data.email || '');
      setPhone(data.phone || '');
      setPassword(data.password || '');
      setKeepSignedIn(data.keepSignedIn || false);
      setName(data.name || '');
      setAge(data.age || 25);
      setGender(data.gender || '');
      setSelectedInterests(data.selectedInterests || []);
      setSelectedLibraries(data.selectedLibraries || []);
      setLearningGoal(data.learningGoal || '');
      setSelectedPractices(data.selectedPractices || []);
      setReferralCode(data.referralCode || '');
      setStep(data.step || 1);
    }
  }, []);

  // Save data to localStorage
  const saveToLocalStorage = () => {
    const data = {
      selectedMethod,
      email,
      phone,
      password,
      keepSignedIn,
      name,
      age,
      gender,
      selectedInterests,
      selectedLibraries,
      learningGoal,
      selectedPractices,
      referralCode,
      step,
    };
    localStorage.setItem('signup_data', JSON.stringify(data));
  };

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

  // Save on step change
  useEffect(() => {
    saveToLocalStorage();
  }, [step, selectedMethod, email, phone, password, keepSignedIn, name, age, gender, selectedInterests, selectedLibraries, learningGoal, selectedPractices, referralCode]);

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
      padding: isMobile ? '16px 16px' : '20px 32px',
    },
    card: {
      maxWidth: isMobile ? '380px' : '440px',
      width: '100%',
      background: themeStyles.cardBg,
      borderRadius: isMobile ? '20px' : '24px',
      padding: isMobile ? '20px 16px' : '24px 28px',
      border: `1px solid ${themeStyles.borderColor}`,
    },
    step: {
      fontFamily: 'monospace',
      fontSize: isMobile ? '8px' : '9px',
      letterSpacing: '0.16em',
      textTransform: 'uppercase' as const,
      color: themeStyles.textSecondary,
      marginBottom: isMobile ? '8px' : '10px',
    },
    title: {
      fontSize: isMobile ? '20px' : '24px',
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      fontWeight: 600,
      color: themeStyles.textPrimary,
      marginBottom: isMobile ? '6px' : '8px',
    },
    description: {
      fontSize: isMobile ? '11px' : '12px',
      lineHeight: isMobile ? '16px' : '18px',
      color: themeStyles.textSecondary,
      marginBottom: isMobile ? '12px' : '14px',
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
      marginBottom: isMobile ? '10px' : '12px',
    },
    textarea: {
      width: '100%',
      padding: isMobile ? '8px 12px' : '10px 14px',
      fontSize: isMobile ? '12px' : '13px',
      background: themeStyles.inputBg,
      border: `1px solid ${themeStyles.inputBorder}`,
      borderRadius: '10px',
      color: themeStyles.textPrimary,
      outline: 'none',
      marginBottom: isMobile ? '8px' : '10px',
      fontFamily: 'inherit',
      resize: 'vertical' as const,
    },
    charCount: {
      fontSize: isMobile ? '9px' : '10px',
      color: themeStyles.textSecondary,
      textAlign: 'right' as const,
      marginBottom: isMobile ? '10px' : '12px',
    },
    toggleGroup: {
      display: 'flex',
      gap: '8px',
      marginBottom: isMobile ? '12px' : '14px',
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
    ageContainer: {
      marginBottom: isMobile ? '12px' : '14px',
    },
    ageLabel: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '8px',
    },
    ageText: {
      fontSize: isMobile ? '11px' : '12px',
      fontWeight: 500,
      color: themeStyles.textSecondary,
    },
    ageValue: {
      fontSize: isMobile ? '18px' : '20px',
      fontWeight: 600,
      color: themeStyles.accentColor,
    },
    ageSlider: {
      width: '100%',
      height: '3px',
      WebkitAppearance: 'none' as const,
      background: themeStyles.borderColor,
      borderRadius: '2px',
      outline: 'none',
      marginBottom: '8px',
    },
    ageMarks: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: isMobile ? '12px' : '14px',
    },
    ageMark: {
      fontSize: isMobile ? '9px' : '10px',
      color: themeStyles.textSecondary,
    },
    genderGroup: {
      display: 'flex',
      gap: '8px',
      marginBottom: isMobile ? '12px' : '14px',
      flexWrap: 'wrap' as const,
    },
    genderBtn: {
      padding: isMobile ? '6px 14px' : '8px 18px',
      borderRadius: '999px',
      fontSize: isMobile ? '11px' : '12px',
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
    tagsContainer: {
      display: 'flex',
      flexWrap: 'wrap' as const,
      gap: '6px',
      marginBottom: isMobile ? '12px' : '14px',
    },
    tag: {
      padding: isMobile ? '5px 10px' : '6px 14px',
      borderRadius: '999px',
      fontSize: isMobile ? '10px' : '11px',
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
      fontSize: isMobile ? '13px' : '14px',
      fontWeight: 600,
      color: themeStyles.textPrimary,
      marginBottom: isMobile ? '8px' : '10px',
      marginTop: isMobile ? '2px' : '4px',
    },
    codeContainer: {
      display: 'flex',
      gap: '6px',
      justifyContent: 'center',
      marginBottom: isMobile ? '12px' : '14px',
      flexWrap: 'wrap' as const,
    },
    codeInput: {
      width: isMobile ? '36px' : '42px',
      height: isMobile ? '42px' : '48px',
      textAlign: 'center' as const,
      fontSize: isMobile ? '16px' : '18px',
      fontWeight: 600,
      background: themeStyles.inputBg,
      border: `2px solid ${themeStyles.inputBorder}`,
      borderRadius: '10px',
      color: themeStyles.textPrimary,
      outline: 'none',
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
      marginBottom: isMobile ? '10px' : '12px',
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
      marginBottom: isMobile ? '10px' : '12px',
    },
    linkText: {
      textAlign: 'center' as const,
      fontSize: isMobile ? '11px' : '12px',
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setStep(step - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinish = () => {
    localStorage.removeItem('signup_data');
    window.location.href = '/dashboard';
  };

  // Simple animation variants (jo pehle thi)
  const pageVariants:Variants = {
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
            {step === 1 && (
              <motion.div
                key="step1"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
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

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: isMobile ? '14px' : '16px' }}>
                  <input type="checkbox" checked={keepSignedIn} onChange={() => setKeepSignedIn(!keepSignedIn)} style={{ width: '14px', height: '14px', accentColor: themeStyles.accentColor }} />
                  <span style={{ fontSize: isMobile ? '11px' : '12px', color: themeStyles.textSecondary }}>Keep me signed in</span>
                </div>

                <button onClick={handleNext} style={styles.btnPrimary}>Create an account</button>

                <div style={styles.linkText}>Already have an account? <Link href="/welcome" style={styles.link}>Sign in</Link></div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <div style={styles.step}>STEP 2 - VERIFY</div>
                <h1 style={styles.title}>Verify it's you.</h1>
                <div style={{ background: themeStyles.inputBg, padding: isMobile ? '8px 12px' : '10px 14px', borderRadius: '10px', marginBottom: isMobile ? '12px' : '14px' }}>
                  <div style={{ fontSize: isMobile ? '11px' : '12px', color: themeStyles.textPrimary }}>We sent a 6-digit code to {selectedMethod === 'email' ? email : phone}</div>
                </div>

                <div style={styles.codeContainer}>
                  {code.map((digit, idx) => (
                    <input key={idx} id={`code-${idx}`} type="text" maxLength={1} value={digit} onChange={(e) => handleCodeChange(idx, e.target.value)} style={styles.codeInput} />
                  ))}
                </div>

                <div style={{ fontSize: '11px', color: themeStyles.textSecondary, textAlign: 'center', marginBottom: isMobile ? '14px' : '16px' }}>
                  Didn't get it? {canResend ? <span onClick={handleResend} style={styles.link}>Resend code</span> : <span>Resend in {resendTimer}s</span>}
                </div>

                <button onClick={handleNext} style={styles.btnPrimary}>Verify & continue</button>
                <button onClick={handleBack} style={styles.btnSecondary}>Back</button>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <div style={styles.step}>A FEW QUESTIONS, WHILE THE KETTLE BOILS</div>
                <h1 style={styles.title}>What should we call you?</h1>
                <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} style={styles.input} />
                <button onClick={handleNext} style={styles.btnPrimary}>Next</button>
                <button onClick={() => setStep(5)} style={styles.btnSecondary}>I'll do this later</button>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <div style={styles.step}>A LITTLE ABOUT YOU</div>
                <h1 style={styles.title}>Nice to meet you, {name || 'there'}.</h1>
                <p style={styles.description}>We ask so we can pace lessons appropriately. Your answers are private and never shown on your profile.</p>
                
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
                <div style={styles.linkText}><span onClick={handleBack} style={styles.link}>Back</span></div>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div
                key="step5"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
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
                <div style={styles.linkText}><span onClick={handleBack} style={styles.link}>Back</span></div>
              </motion.div>
            )}

            {step === 6 && (
              <motion.div
                key="step6"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <div style={styles.step}>What are you hoping to learn?</div>
                <textarea 
                  placeholder="I'd like to get better at having honest conversations without it turning into an argument." 
                  value={learningGoal} 
                  onChange={(e) => setLearningGoal(e.target.value)} 
                  maxLength={280} 
                  rows={3} 
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
                <div style={styles.linkText}><span onClick={handleBack} style={styles.link}>Back</span></div>
              </motion.div>
            )}

            {step === 7 && (
              <motion.div
                key="step7"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <div style={styles.step}>Were you sent here by someone?</div>
                <h1 style={styles.title}>Referral code (optional)</h1>
                <input type="text" placeholder="XXXXXX" value={referralCode} onChange={(e) => setReferralCode(e.target.value)} style={styles.input} />
                <p style={styles.description}>A short code like SUNDAY26 or a friend's name.</p>
                <p style={{ fontSize: isMobile ? '10px' : '11px', color: themeStyles.textSecondary, marginBottom: isMobile ? '12px' : '14px', padding: isMobile ? '8px' : '10px', background: themeStyles.inputBg, borderRadius: '10px' }}>
                  📞 Friends-of-the-library codes unlock the first paid lesson of any course, on us — no card required.
                </p>
                
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <button onClick={handleFinish} style={{...styles.btnSecondary, flex: 1}}>I don't have a code</button>
                  <button onClick={handleFinish} style={{...styles.btnPrimary, flex: 1}}>Finish & view courses</button>
                </div>
                <div style={{...styles.linkText, marginTop: isMobile ? '10px' : '12px'}}><span onClick={handleBack} style={styles.link}>Back</span></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
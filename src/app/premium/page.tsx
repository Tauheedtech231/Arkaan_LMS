/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/static-components */
'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Crown, CheckCircle, ArrowLeft, CreditCard, Lock, Calendar, User, Mail, MapPin, X, AlertCircle } from 'lucide-react';

export default function PremiumPage() {
  const router = useRouter();
  const [isDark, setIsDark] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');
  const [showCheckout, setShowCheckout] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  
  // Form data
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'US'
  });

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

  // Load user data from localStorage
  useEffect(() => {
    const savedName = localStorage.getItem('userName');
    const savedEmail = localStorage.getItem('userEmail');
    if (savedName) setFormData(prev => ({ ...prev, fullName: savedName }));
    if (savedEmail) setFormData(prev => ({ ...prev, email: savedEmail }));
  }, []);

  const themeStyles = {
    bgPrimary: isDark ? '#0a0a0a' : '#f5f5f5',
    textPrimary: isDark ? '#ffffff' : '#171717',
    textSecondary: isDark ? '#888' : '#666',
    textMuted: isDark ? '#666' : '#999',
    borderColor: isDark ? '#2a2a2a' : '#e5e5e5',
    accentColor: isDark ? '#e63939' : '#dc2626',
    cardBg: isDark ? '#141414' : '#ffffff',
    inputBg: isDark ? '#1a1a1a' : '#ffffff',
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + (v.length > 2 ? '/' + v.slice(2, 4) : '');
    }
    return v;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData({ ...formData, cardNumber: formatted });
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    setFormData({ ...formData, expiryDate: formatted });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      localStorage.setItem('isSubscribed', 'true');
      localStorage.setItem('subscriptionPlan', selectedPlan);
      
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    }, 2000);
  };

  const getPlanPrice = () => {
    return selectedPlan === 'monthly' ? '$12' : '$96';
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: themeStyles.bgPrimary,
      padding: isMobile ? '40px 16px' : '60px 32px',
    },
    backBtn: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      color: themeStyles.textSecondary,
      marginBottom: '24px',
      fontSize: '13px',
    },
    
    // Pricing Section
    pricingSection: {
      maxWidth: '1100px',
      margin: '0 auto',
      marginBottom: '48px',
    },
    header: {
      textAlign: 'center' as const,
      marginBottom: '32px',
    },
    crownIcon: {
      fontSize: '36px',
      marginBottom: '12px',
    },
    title: {
      fontSize: isMobile ? '24px' : '28px',
      fontWeight: 600,
      letterSpacing: '-0.02em',
      color: themeStyles.textPrimary,
      marginBottom: '8px',
    },
    subtitle: {
      fontSize: '13px',
      color: themeStyles.textSecondary,
    },
    
    // Plan Cards
    planGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
      gap: '16px',
      marginBottom: '32px',
    },
    planCard: {
      background: themeStyles.cardBg,
      borderRadius: '16px',
      border: `1px solid ${selectedPlan === 'monthly' ? themeStyles.accentColor : themeStyles.borderColor}`,
      padding: isMobile ? '20px' : '24px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    },
    planBadge: {
      display: 'inline-block',
      background: themeStyles.accentColor,
      color: '#fff',
      padding: '3px 10px',
      borderRadius: '16px',
      fontSize: '10px',
      fontWeight: 500,
      marginBottom: '12px',
    },
    planName: {
      fontSize: '18px',
      fontWeight: 600,
      color: themeStyles.textPrimary,
      marginBottom: '8px',
    },
    planPrice: {
      fontSize: '28px',
      fontWeight: 700,
      color: themeStyles.textPrimary,
      marginBottom: '4px',
    },
    planPriceSub: {
      fontSize: '13px',
      fontWeight: 400,
      color: themeStyles.textSecondary,
    },
    planDesc: {
      fontSize: '12px',
      color: themeStyles.textSecondary,
      marginBottom: '16px',
    },
    feature: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '8px',
      fontSize: '12px',
      color: themeStyles.textSecondary,
    },
    
    // Checkout Modal
    modalOverlay: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.8)',
      backdropFilter: 'blur(4px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
    },
    modal: {
      background: themeStyles.cardBg,
      borderRadius: '20px',
      width: '100%',
      maxWidth: '500px',
      maxHeight: '90vh',
      overflow: 'auto',
      padding: isMobile ? '20px' : '24px',
      position: 'relative' as const,
    },
    modalHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
      paddingBottom: '12px',
      borderBottom: `1px solid ${themeStyles.borderColor}`,
    },
    modalTitle: {
      fontSize: '18px',
      fontWeight: 600,
      color: themeStyles.textPrimary,
    },
    closeBtn: {
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      color: themeStyles.textSecondary,
    },
    orderSummary: {
      background: `${themeStyles.accentColor}10`,
      borderRadius: '12px',
      padding: '14px',
      marginBottom: '20px',
    },
    summaryRow: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '8px',
      fontSize: '13px',
    },
    summaryTotal: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingTop: '8px',
      marginTop: '8px',
      borderTop: `1px solid ${themeStyles.borderColor}`,
      fontWeight: 600,
      fontSize: '14px',
    },
    
    // Form Styles
    formGroup: {
      marginBottom: '14px',
    },
    label: {
      display: 'block',
      fontSize: '12px',
      fontWeight: 500,
      color: themeStyles.textPrimary,
      marginBottom: '6px',
    },
    input: {
      width: '100%',
      padding: '10px 12px',
      fontSize: '13px',
      background: themeStyles.inputBg,
      border: `1px solid ${themeStyles.borderColor}`,
      borderRadius: '10px',
      color: themeStyles.textPrimary,
      outline: 'none',
      transition: 'all 0.2s ease',
    },
    inputRow: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '12px',
    },
    submitBtn: {
      width: '100%',
      background: themeStyles.accentColor,
      color: '#fff',
      padding: '12px',
      borderRadius: '40px',
      fontWeight: 600,
      fontSize: '14px',
      border: 'none',
      cursor: 'pointer',
      marginTop: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
    },
    
    // Success State
    successContainer: {
      textAlign: 'center' as const,
      padding: '40px 20px',
    },
    successIcon: {
      fontSize: '48px',
      marginBottom: '16px',
    },
    successTitle: {
      fontSize: '20px',
      fontWeight: 600,
      color: themeStyles.textPrimary,
      marginBottom: '8px',
    },
    successText: {
      fontSize: '13px',
      color: themeStyles.textSecondary,
    },
  };

  // Checkout Modal Component
  const CheckoutModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={styles.modalOverlay}
      onClick={() => setShowCheckout(false)}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        style={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={styles.modalHeader}>
          <h3 style={styles.modalTitle}>Complete Payment</h3>
          <button onClick={() => setShowCheckout(false)} style={styles.closeBtn}>
            <X size={18} />
          </button>
        </div>

        <div style={styles.orderSummary}>
          <div style={styles.summaryRow}>
            <span>{selectedPlan === 'monthly' ? 'Monthly Plan' : 'Yearly Plan'}</span>
            <span>{getPlanPrice()}</span>
          </div>
          <div style={styles.summaryRow}>
            <span>Tax (0%)</span>
            <span>$0</span>
          </div>
          <div style={styles.summaryTotal}>
            <span>Total</span>
            <span style={{ color: themeStyles.accentColor }}>{getPlanPrice()}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Card Number</label>
            <input
              type="text"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={formData.cardNumber}
              onChange={handleCardNumberChange}
              maxLength={19}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputRow}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Expiry Date</label>
              <input
                type="text"
                name="expiryDate"
                placeholder="MM/YY"
                value={formData.expiryDate}
                onChange={handleExpiryChange}
                maxLength={5}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>CVV</label>
              <input
                type="password"
                name="cvv"
                placeholder="123"
                value={formData.cvv}
                onChange={handleInputChange}
                maxLength={4}
                required
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Billing Address</label>
            <input
              type="text"
              name="address"
              placeholder="Street address"
              value={formData.address}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputRow}>
            <div style={styles.formGroup}>
              <label style={styles.label}>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Zip Code</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                required
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Country</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              style={styles.input}
            >
              <option value="US">United States</option>
              <option value="UK">United Kingdom</option>
              <option value="CA">Canada</option>
              <option value="AU">Australia</option>
              <option value="PK">Pakistan</option>
              <option value="IN">India</option>
            </select>
          </div>

          <button type="submit" style={styles.submitBtn} disabled={isProcessing}>
            {isProcessing ? (
              <>Processing...</>
            ) : (
              <>
                <Lock size={14} /> Pay {getPlanPrice()}
              </>
            )}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );

  // Success Modal Component
  const SuccessModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={styles.modalOverlay}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        style={styles.successContainer}
      >
        <div style={styles.successIcon}>🎉</div>
        <h3 style={styles.successTitle}>Payment Successful!</h3>
        <p style={styles.successText}>
          Thank you for subscribing! Redirecting to dashboard...
        </p>
      </motion.div>
    </motion.div>
  );

  if (paymentSuccess) {
    return <SuccessModal />;
  }

  return (
    <div style={styles.container}>
      <button onClick={() => router.back()} style={styles.backBtn}>
        <ArrowLeft size={14} /> Back
      </button>

      <div style={styles.pricingSection}>
        <div style={styles.header}>
          <div style={styles.crownIcon}>👑</div>
          <h1 style={styles.title}>Upgrade to Premium</h1>
          <p style={styles.subtitle}>Get unlimited access to all courses</p>
        </div>

        <div style={styles.planGrid}>
          {/* Monthly Plan */}
          <motion.div
            whileHover={{ y: -4 }}
            style={styles.planCard}
            onClick={() => setSelectedPlan('monthly')}
          >
            {selectedPlan === 'monthly' && (
              <div style={styles.planBadge}>Selected</div>
            )}
            <h3 style={styles.planName}>Monthly</h3>
            <div>
              <span style={styles.planPrice}>$12</span>
              <span style={styles.planPriceSub}>/month</span>
            </div>
            <p style={styles.planDesc}>Billed monthly. Cancel anytime.</p>
            <div style={styles.feature}>
              <CheckCircle size={12} style={{ color: themeStyles.accentColor }} />
              <span>All courses access</span>
            </div>
            <div style={styles.feature}>
              <CheckCircle size={12} style={{ color: themeStyles.accentColor }} />
              <span>Download for offline</span>
            </div>
            <div style={styles.feature}>
              <CheckCircle size={12} style={{ color: themeStyles.accentColor }} />
              <span>Certificates included</span>
            </div>
          </motion.div>

          {/* Yearly Plan */}
          <motion.div
            whileHover={{ y: -4 }}
            style={styles.planCard}
            onClick={() => setSelectedPlan('yearly')}
          >
            {selectedPlan === 'yearly' && (
              <div style={styles.planBadge}>Selected</div>
            )}
            <div style={{ ...styles.planBadge, background: '#22c55e' }}>Save 50%</div>
            <h3 style={styles.planName}>Yearly</h3>
            <div>
              <span style={styles.planPrice}>$96</span>
              <span style={styles.planPriceSub}>/year</span>
            </div>
            <p style={styles.planDesc}>$8/month • Save $96</p>
            <div style={styles.feature}>
              <CheckCircle size={12} style={{ color: themeStyles.accentColor }} />
              <span>2 months free</span>
            </div>
            <div style={styles.feature}>
              <CheckCircle size={12} style={{ color: themeStyles.accentColor }} />
              <span>Priority support</span>
            </div>
            <div style={styles.feature}>
              <CheckCircle size={12} style={{ color: themeStyles.accentColor }} />
              <span>Early access</span>
            </div>
          </motion.div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowCheckout(true)}
          style={{
            ...styles.submitBtn,
            maxWidth: '300px',
            margin: '0 auto',
            display: 'flex',
          }}
        >
          Continue to Checkout →
        </motion.button>
      </div>

      <AnimatePresence>
        {showCheckout && <CheckoutModal />}
      </AnimatePresence>
    </div>
  );
}
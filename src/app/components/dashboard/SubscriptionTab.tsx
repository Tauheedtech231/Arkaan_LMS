/* eslint-disable react-hooks/immutability */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/static-components */
'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Crown, Calendar, FileText, Mic, Upload, ArrowLeft, Home, ChevronRight, X, Camera, DollarSign, MapPin, Briefcase, Clock, Heart, Edit, Check, AlertCircle, User, Mail, Phone } from 'lucide-react';

// Invoice data
const invoices = [
  { month: 'April 2026', date: '1ST APRIL, 2026', amount: '$2.99' },
  { month: 'Mar 2026', date: '1ST MARCH, 2026', amount: '$2.99' },
  { month: 'Feb 2026', date: '1ST FEBRUARY, 2026', amount: '$2.99' },
  { month: 'Jan 2026', date: '1ST JANUARY, 2026', amount: '$2.99' },
];

// Employment options
const employmentOptions = ['Student', 'Employed Full-time', 'Employed Part-time', 'Unemployed', 'Self-employed', 'Retired'];
const cities = ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Multan', 'Faisalabad', 'Other'];
const incomeOptions = ['Under 50k per month', 'Under 100k per month', '100k-200k per month', '200k-300k per month', '300k+ per month'];
const hoursOptions = ['1-2 hours a week', '3-5 hours a week', '6-10 hours a week', '10+ hours a week'];
const cancelReasons = [
  "I don't use it enough",
  "It's out of my price range",
  "I didn't find it valuable",
  "I only wanted to try it temporarily",
  "I've reached my goal!"
];

// Yearly Plan Modal
const YearlyPlanModal = ({ themeStyles, isMobile, onClose, onConfirm }: any) => (
  <div style={modalStyles(themeStyles).overlay} onClick={onClose}>
    <motion.div 
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={modalStyles(themeStyles).modal} 
      onClick={(e) => e.stopPropagation()}
    >
      <button onClick={onClose} style={modalStyles(themeStyles).closeBtn}>
        <X size={20} />
      </button>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
        <h3 style={modalStyles(themeStyles).title}>Switch to Yearly Plan?</h3>
        <p style={{ fontSize: '14px', color: themeStyles.textSecondary, marginBottom: '16px' }}>
          Save 50% and get uninterrupted access to all premium content
        </p>
        <div style={{ background: themeStyles.accentColor + '10', padding: '16px', borderRadius: '16px', marginBottom: '20px' }}>
          <div style={{ fontSize: '24px', fontWeight: 700, color: themeStyles.textPrimary }}>$96<span style={{ fontSize: '14px', fontWeight: 400 }}>/year</span></div>
          <div style={{ fontSize: '12px', color: themeStyles.textSecondary }}>Was $192/year • Save $96</div>
        </div>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onConfirm} 
          style={modalStyles(themeStyles).submitBtn}
        >
          Confirm Switch
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onClose} 
          style={{ ...modalStyles(themeStyles).submitBtn, background: 'transparent', color: themeStyles.textSecondary, marginTop: '12px' }}
        >
          Cancel
        </motion.button>
      </div>
    </motion.div>
  </div>
);

// Cancel Modal
const CancelModal = ({ themeStyles, isMobile, onClose, onConfirm }: any) => {
  const [cancelReason, setCancelReason] = useState('');

  return (
    <div style={modalStyles(themeStyles).overlay} onClick={onClose}>
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        style={modalStyles(themeStyles).modal} 
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} style={modalStyles(themeStyles).closeBtn}>
          <X size={20} />
        </button>
        <h3 style={modalStyles(themeStyles).title}>Why are you canceling your subscription?</h3>
        {cancelReasons.map(option => (
          <motion.div 
            key={option} 
            whileHover={{ x: 4 }}
            style={{ ...modalStyles(themeStyles).option, background: cancelReason === option ? themeStyles.accentColor + '20' : 'transparent' }} 
            onClick={() => setCancelReason(option)}
          >
            <input type="radio" checked={cancelReason === option} onChange={() => setCancelReason(option)} style={{ accentColor: themeStyles.accentColor }} />
            <span style={{ fontSize: '14px', color: themeStyles.textPrimary }}>{option}</span>
          </motion.div>
        ))}
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onConfirm(cancelReason)} 
          style={modalStyles(themeStyles).submitBtn}
        >
          Submit
        </motion.button>
      </motion.div>
    </div>
  );
};

// Scholarship Form Component
const ScholarshipForm = ({ themeStyles, isMobile, data, onChange, onNext }: any) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.25 }}
  >
    <h1 style={formStyles(themeStyles, isMobile).title}>Scholarship</h1>
    <p style={formStyles(themeStyles, isMobile).subtitle}>Filling out this form does not guarantee a scholarship. All forms are reviewed by our team to ensure we provide the needy students with support.</p>

    <div style={formStyles(themeStyles, isMobile).group}>
      <label style={formStyles(themeStyles, isMobile).label}>
        <Briefcase size={16} style={{ marginRight: '8px' }} />
        What is your current employment status?
      </label>
      <select style={formStyles(themeStyles, isMobile).select} value={data.employmentStatus} onChange={(e) => onChange('employmentStatus', e.target.value)}>
        <option value="">Select status</option>
        {employmentOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>

    <div style={formStyles(themeStyles, isMobile).group}>
      <label style={formStyles(themeStyles, isMobile).label}>
        <MapPin size={16} style={{ marginRight: '8px' }} />
        What city do you live in?
      </label>
      <select style={formStyles(themeStyles, isMobile).select} value={data.city} onChange={(e) => onChange('city', e.target.value)}>
        <option value="">Select city</option>
        {cities.map(city => <option key={city} value={city}>{city}</option>)}
      </select>
    </div>

    <div style={formStyles(themeStyles, isMobile).group}>
      <label style={formStyles(themeStyles, isMobile).label}>
        <DollarSign size={16} style={{ marginRight: '8px' }} />
        What is your monthly income?
      </label>
      <select style={formStyles(themeStyles, isMobile).select} value={data.monthlyIncome} onChange={(e) => onChange('monthlyIncome', e.target.value)}>
        <option value="">Select income</option>
        {incomeOptions.map(inc => <option key={inc} value={inc}>{inc}</option>)}
      </select>
    </div>

    <div style={formStyles(themeStyles, isMobile).group}>
      <label style={formStyles(themeStyles, isMobile).label}>
        <Heart size={16} style={{ marginRight: '8px' }} />
        What is your family's overall monthly income?
      </label>
      <select style={formStyles(themeStyles, isMobile).select} value={data.familyIncome} onChange={(e) => onChange('familyIncome', e.target.value)}>
        <option value="">Select income</option>
        {incomeOptions.map(inc => <option key={inc} value={inc}>{inc}</option>)}
      </select>
    </div>

    <div style={formStyles(themeStyles, isMobile).group}>
      <label style={formStyles(themeStyles, isMobile).label}>Are you currently receiving any scholarship or financial aid elsewhere?</label>
      <div style={formStyles(themeStyles, isMobile).radioGroup}>
        {['Yes', 'No'].map(opt => (
          <label key={opt} style={formStyles(themeStyles, isMobile).radioLabel}>
            <input type="radio" value={opt} checked={data.otherScholarship === opt} onChange={(e) => onChange('otherScholarship', e.target.value)} style={{ accentColor: themeStyles.accentColor }} />
            <span>{opt}</span>
          </label>
        ))}
      </div>
    </div>

    <div style={formStyles(themeStyles, isMobile).group}>
      <label style={formStyles(themeStyles, isMobile).label}>If this scholarship were not available, would you still be able to afford the subscription?</label>
      <div style={formStyles(themeStyles, isMobile).radioGroup}>
        {['Yes', 'Maybe', 'No'].map(opt => (
          <label key={opt} style={formStyles(themeStyles, isMobile).radioLabel}>
            <input type="radio" value={opt} checked={data.canAfford === opt} onChange={(e) => onChange('canAfford', e.target.value)} style={{ accentColor: themeStyles.accentColor }} />
            <span>{opt}</span>
          </label>
        ))}
      </div>
    </div>

    <div style={formStyles(themeStyles, isMobile).group}>
      <label style={formStyles(themeStyles, isMobile).label}>
        <Clock size={16} style={{ marginRight: '8px' }} />
        How many hours per week can you realistically dedicate to learning on Arkaan?
      </label>
      <select style={formStyles(themeStyles, isMobile).select} value={data.hoursPerWeek} onChange={(e) => onChange('hoursPerWeek', e.target.value)}>
        <option value="">Select hours</option>
        {hoursOptions.map(hours => <option key={hours} value={hours}>{hours}</option>)}
      </select>
    </div>

    <div style={formStyles(themeStyles, isMobile).group}>
      <label style={formStyles(themeStyles, isMobile).label}>Why do you want to get Arkaan's scholarship?</label>
      <textarea style={formStyles(themeStyles, isMobile).textarea} placeholder="Add a short note here..." value={data.reason} onChange={(e) => onChange('reason', e.target.value)} rows={4} />
    </div>

    <motion.button 
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onNext} 
      style={formStyles(themeStyles, isMobile).nextBtn}
    >
      Continue →
    </motion.button>
  </motion.div>
);

// Upload Component
const ScholarshipUpload = ({ themeStyles, isMobile, uploadedFile, onFileUpload, onNext, onBack }: any) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.25 }}
  >
    <button onClick={onBack} style={uploadStyles(themeStyles, isMobile).backBtn}>
      <ArrowLeft size={18} /> Back
    </button>
    
    <h1 style={uploadStyles(themeStyles, isMobile).title}>Scholarship</h1>
    <p style={uploadStyles(themeStyles, isMobile).subtitle}>FORMAT: JPEG, PNG, PDF | SIZE: 5 MB MAX</p>
    
    <motion.label 
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      style={uploadStyles(themeStyles, isMobile).uploadArea}
    >
      <input type="file" accept="image/*,application/pdf" onChange={onFileUpload} style={{ display: 'none' }} />
      <Camera size={40} style={{ color: themeStyles.textSecondary, marginBottom: '12px' }} />
      <p style={{ color: themeStyles.textSecondary, fontSize: '13px' }}>
        {uploadedFile ? uploadedFile.name : 'Upload your student ID / university card / job status proof'}
      </p>
    </motion.label>
    
    <motion.button 
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onNext} 
      style={uploadStyles(themeStyles, isMobile).nextBtn}
    >
      Continue →
    </motion.button>
  </motion.div>
);

// Voice Recording Component
const ScholarshipVoice = ({ themeStyles, isMobile, isRecording, onToggleRecording, onNext, onBack, recordedAudio }: any) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.25 }}
  >
    <button onClick={onBack} style={voiceStyles(themeStyles, isMobile).backBtn}>
      <ArrowLeft size={18} /> Back
    </button>
    
    <h1 style={voiceStyles(themeStyles, isMobile).title}>Scholarship</h1>
    <p style={voiceStyles(themeStyles, isMobile).subtitle}>Click here to start recording</p>
    <p style={voiceStyles(themeStyles, isMobile).note}>Record a 30-60 second voice note explaining why you deserve the scholarship.</p>
    
    {recordedAudio ? (
      <div style={voiceStyles(themeStyles, isMobile).audioPreview}>
        <Check size={20} style={{ color: '#22c55e' }} />
        <span>Voice note recorded successfully!</span>
      </div>
    ) : (
      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onToggleRecording} 
        style={{ ...voiceStyles(themeStyles, isMobile).recordBtn, background: isRecording ? themeStyles.accentColor + '80' : themeStyles.accentColor }}
      >
        <Mic size={20} style={{ display: 'inline', marginRight: '8px' }} />
        {isRecording ? 'Recording... Click to stop' : 'Start Recording'}
      </motion.button>
    )}
    
    <motion.button 
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onNext} 
      style={voiceStyles(themeStyles, isMobile).nextBtn}
      disabled={!recordedAudio}
    >
      Review Application →
    </motion.button>
  </motion.div>
);

// Review Component - Submit se pehle saari information review
const ScholarshipReview = ({ themeStyles, isMobile, data, uploadedFile, recordedAudio, onEdit, onSubmit, onBack }: any) => {
  const [editSection, setEditSection] = useState<string | null>(null);

  const sections = [
    { 
      id: 'personal', 
      title: 'Personal Information', 
      icon: User,
      fields: [
        { label: 'Employment Status', value: data.employmentStatus || 'Not specified' },
        { label: 'City', value: data.city || 'Not specified' },
      ]
    },
    { 
      id: 'financial', 
      title: 'Financial Information', 
      icon: DollarSign,
      fields: [
        { label: 'Monthly Income', value: data.monthlyIncome || 'Not specified' },
        { label: 'Family Income', value: data.familyIncome || 'Not specified' },
        { label: 'Other Scholarship', value: data.otherScholarship || 'Not specified' },
        { label: 'Can Afford Without Scholarship', value: data.canAfford || 'Not specified' },
      ]
    },
    { 
      id: 'learning', 
      title: 'Learning Information', 
      icon: Clock,
      fields: [
        { label: 'Hours per Week', value: data.hoursPerWeek || 'Not specified' },
        { label: 'Why Scholarship?', value: data.reason || 'Not specified' },
      ]
    },
    { 
      id: 'documents', 
      title: 'Documents', 
      icon: FileText,
      fields: [
        { label: 'Proof Document', value: uploadedFile ? uploadedFile.name : 'Not uploaded' },
        { label: 'Voice Note', value: recordedAudio ? 'Recorded ✓' : 'Not recorded' },
      ]
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.25 }}
    >
      <button onClick={onBack} style={reviewStyles(themeStyles, isMobile).backBtn}>
        <ArrowLeft size={18} /> Back
      </button>
      
      <h1 style={reviewStyles(themeStyles, isMobile).title}>Review Your Application</h1>
      <p style={reviewStyles(themeStyles, isMobile).subtitle}>Please review all information before submitting. You can edit any section.</p>

      {sections.map((section) => (
        <motion.div 
          key={section.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={reviewStyles(themeStyles, isMobile).section}
        >
          <div style={reviewStyles(themeStyles, isMobile).sectionHeader}>
            <div style={reviewStyles(themeStyles, isMobile).sectionTitle}>
              <section.icon size={18} />
              <span>{section.title}</span>
            </div>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setEditSection(section.id)}
              style={reviewStyles(themeStyles, isMobile).editBtn}
            >
              <Edit size={14} /> Edit
            </motion.button>
          </div>
          
          <div style={reviewStyles(themeStyles, isMobile).sectionContent}>
            {section.fields.map((field, idx) => (
              <div key={idx} style={reviewStyles(themeStyles, isMobile).fieldRow}>
                <span style={reviewStyles(themeStyles, isMobile).fieldLabel}>{field.label}</span>
                <span style={reviewStyles(themeStyles, isMobile).fieldValue}>{field.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      ))}

      {/* Edit Modal for each section */}
      <AnimatePresence>
        {editSection === 'personal' && (
          <EditModal
            themeStyles={themeStyles}
            isMobile={isMobile}
            title="Edit Personal Information"
            fields={[
              { label: 'Employment Status', value: data.employmentStatus, type: 'select', options: employmentOptions },
              { label: 'City', value: data.city, type: 'select', options: cities },
            ]}
            onSave={(values: any) => {
              data.employmentStatus = values['Employment Status'];
              data.city = values['City'];
              setEditSection(null);
            }}
            onClose={() => setEditSection(null)}
          />
        )}
        
        {editSection === 'financial' && (
          <EditModal
            themeStyles={themeStyles}
            isMobile={isMobile}
            title="Edit Financial Information"
            fields={[
              { label: 'Monthly Income', value: data.monthlyIncome, type: 'select', options: incomeOptions },
              { label: 'Family Income', value: data.familyIncome, type: 'select', options: incomeOptions },
              { label: 'Other Scholarship', value: data.otherScholarship, type: 'radio', options: ['Yes', 'No'] },
              { label: 'Can Afford Without Scholarship', value: data.canAfford, type: 'radio', options: ['Yes', 'Maybe', 'No'] },
            ]}
            onSave={(values: any) => {
              data.monthlyIncome = values['Monthly Income'];
              data.familyIncome = values['Family Income'];
              data.otherScholarship = values['Other Scholarship'];
              data.canAfford = values['Can Afford Without Scholarship'];
              setEditSection(null);
            }}
            onClose={() => setEditSection(null)}
          />
        )}
        
        {editSection === 'learning' && (
          <EditModal
            themeStyles={themeStyles}
            isMobile={isMobile}
            title="Edit Learning Information"
            fields={[
              { label: 'Hours per Week', value: data.hoursPerWeek, type: 'select', options: hoursOptions },
              { label: 'Why Scholarship?', value: data.reason, type: 'textarea' },
            ]}
            onSave={(values: any) => {
              data.hoursPerWeek = values['Hours per Week'];
              data.reason = values['Why Scholarship?'];
              setEditSection(null);
            }}
            onClose={() => setEditSection(null)}
          />
        )}
      </AnimatePresence>

      <div style={reviewStyles(themeStyles, isMobile).actions}>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onSubmit} 
          style={reviewStyles(themeStyles, isMobile).submitBtn}
        >
          <Check size={18} /> Submit Application
        </motion.button>
      </div>
    </motion.div>
  );
};

// Edit Modal Component
const EditModal = ({ themeStyles, isMobile, title, fields, onSave, onClose }: any) => {
  const [values, setValues] = useState<Record<string, any>>({});
  
  useEffect(() => {
    const initial: Record<string, any> = {};
    fields.forEach((field: any) => {
      initial[field.label] = field.value || '';
    });
    setValues(initial);
  }, [fields]);

  return (
    <div style={editModalStyles(themeStyles).overlay} onClick={onClose}>
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        style={editModalStyles(themeStyles).modal} 
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} style={editModalStyles(themeStyles).closeBtn}>
          <X size={20} />
        </button>
        <h3 style={editModalStyles(themeStyles).title}>{title}</h3>
        
        {fields.map((field: any, idx: number) => (
          <div key={idx} style={editModalStyles(themeStyles).fieldGroup}>
            <label style={editModalStyles(themeStyles).label}>{field.label}</label>
            {field.type === 'select' ? (
              <select 
                style={editModalStyles(themeStyles).select}
                value={values[field.label] || ''}
                onChange={(e) => setValues({ ...values, [field.label]: e.target.value })}
              >
                <option value="">Select {field.label}</option>
                {field.options.map((opt: string) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            ) : field.type === 'textarea' ? (
              <textarea 
                style={editModalStyles(themeStyles).textarea}
                value={values[field.label] || ''}
                onChange={(e) => setValues({ ...values, [field.label]: e.target.value })}
                rows={4}
              />
            ) : field.type === 'radio' ? (
              <div style={editModalStyles(themeStyles).radioGroup}>
                {field.options.map((opt: string) => (
                  <label key={opt} style={editModalStyles(themeStyles).radioLabel}>
                    <input 
                      type="radio" 
                      name={field.label}
                      value={opt}
                      checked={values[field.label] === opt}
                      onChange={(e) => setValues({ ...values, [field.label]: e.target.value })}
                      style={{ accentColor: themeStyles.accentColor }}
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            ) : (
              <input 
                type="text"
                style={editModalStyles(themeStyles).input}
                value={values[field.label] || ''}
                onChange={(e) => setValues({ ...values, [field.label]: e.target.value })}
              />
            )}
          </div>
        ))}
        
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSave(values)} 
          style={editModalStyles(themeStyles).saveBtn}
        >
          Save Changes
        </motion.button>
      </motion.div>
    </div>
  );
};

// Success/Done Component
const ScholarshipDone = ({ themeStyles, isMobile, onHome }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.25 }}
    style={doneStyles(themeStyles, isMobile).container}
  >
    <div style={doneStyles(themeStyles, isMobile).icon}>🎉</div>
    <h1 style={doneStyles(themeStyles, isMobile).title}>Application Submitted!</h1>
    <p style={doneStyles(themeStyles, isMobile).text}>
      We'll review your application in 8-10 business days and get back to you as soon as we can.
      <br /><br />
      Please do ensure you check your email for a confirmation in this time frame.
    </p>
    <motion.button 
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onHome} 
      style={doneStyles(themeStyles, isMobile).homeBtn}
    >
      <Home size={18} /> Back to Home
    </motion.button>
  </motion.div>
);

// Styles functions
const modalStyles = (themeStyles: any) => ({
  overlay: {
    position: 'fixed' as const,
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0,0,0,0.8)',
    backdropFilter: 'blur(4px)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  modal: {
    background: themeStyles.cardBg,
    borderRadius: '24px',
    maxWidth: '400px',
    width: '100%',
    padding: '28px',
    border: `1px solid ${themeStyles.borderColor}`,
    position: 'relative' as const,
  },
  closeBtn: {
    position: 'absolute' as const,
    top: '16px',
    right: '16px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: themeStyles.textSecondary,
  },
  title: { fontSize: '20px', fontWeight: 600, color: themeStyles.textPrimary, marginBottom: '20px' },
  option: { display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '12px', cursor: 'pointer', marginBottom: '8px' },
  submitBtn: { background: themeStyles.accentColor, color: '#fff', padding: '12px 20px', borderRadius: '40px', fontSize: '14px', fontWeight: 600, border: 'none', cursor: 'pointer', width: '100%', marginTop: '16px' },
});

const formStyles = (themeStyles: any, isMobile: boolean) => ({
  title: { fontSize: isMobile ? '24px' : '28px', fontWeight: 600, color: themeStyles.textPrimary, marginBottom: '8px' },
  subtitle: { fontSize: '13px', color: themeStyles.textSecondary, marginBottom: '24px', lineHeight: 1.4 },
  group: { marginBottom: '20px' },
  label: { fontSize: '14px', fontWeight: 500, color: themeStyles.textPrimary, marginBottom: '8px', display: 'flex', alignItems: 'center' },
  select: { width: '100%', padding: '12px 16px', background: themeStyles.inputBg, border: `1px solid ${themeStyles.borderColor}`, borderRadius: '12px', color: themeStyles.textPrimary, fontSize: '14px', cursor: 'pointer' },
  textarea: { width: '100%', padding: '12px 16px', background: themeStyles.inputBg, border: `1px solid ${themeStyles.borderColor}`, borderRadius: '12px', color: themeStyles.textPrimary, fontSize: '14px', resize: 'vertical' as const },
  radioGroup: { display: 'flex', gap: '20px', flexWrap: 'wrap' as const, marginTop: '8px' },
  radioLabel: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: themeStyles.textPrimary, cursor: 'pointer' },
  nextBtn: { background: themeStyles.accentColor, color: '#fff', padding: '14px 24px', borderRadius: '40px', fontSize: '14px', fontWeight: 600, border: 'none', cursor: 'pointer', width: '100%', marginTop: '16px' },
});

const uploadStyles = (themeStyles: any, isMobile: boolean) => ({
  backBtn: { display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: themeStyles.textSecondary, marginBottom: '20px', cursor: 'pointer' },
  title: { fontSize: isMobile ? '24px' : '28px', fontWeight: 600, color: themeStyles.textPrimary, marginBottom: '8px' },
  subtitle: { fontSize: '13px', color: themeStyles.textSecondary, marginBottom: '24px' },
  uploadArea: { border: `2px dashed ${themeStyles.borderColor}`, borderRadius: '20px', padding: '40px', textAlign: 'center' as const, cursor: 'pointer', marginBottom: '24px', display: 'block' },
  nextBtn: { background: themeStyles.accentColor, color: '#fff', padding: '14px 24px', borderRadius: '40px', fontSize: '14px', fontWeight: 600, border: 'none', cursor: 'pointer', width: '100%' },
});

const voiceStyles = (themeStyles: any, isMobile: boolean) => ({
  backBtn: { display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: themeStyles.textSecondary, marginBottom: '20px', cursor: 'pointer' },
  title: { fontSize: isMobile ? '24px' : '28px', fontWeight: 600, color: themeStyles.textPrimary, marginBottom: '8px' },
  subtitle: { fontSize: '16px', color: themeStyles.textSecondary, marginBottom: '12px' },
  note: { fontSize: '13px', color: themeStyles.textSecondary, marginBottom: '24px' },
  recordBtn: { color: '#fff', padding: '14px 28px', borderRadius: '48px', fontSize: '14px', fontWeight: 600, border: 'none', cursor: 'pointer', width: '100%', marginBottom: '16px' },
  nextBtn: { background: themeStyles.accentColor, color: '#fff', padding: '14px 24px', borderRadius: '40px', fontSize: '14px', fontWeight: 600, border: 'none', cursor: 'pointer', width: '100%', marginTop: '16px' },
  audioPreview: { background: themeStyles.accentColor + '10', padding: '16px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' },
});

const reviewStyles = (themeStyles: any, isMobile: boolean) => ({
  backBtn: { display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: themeStyles.textSecondary, marginBottom: '20px', cursor: 'pointer' },
  title: { fontSize: isMobile ? '24px' : '28px', fontWeight: 600, color: themeStyles.textPrimary, marginBottom: '8px' },
  subtitle: { fontSize: '13px', color: themeStyles.textSecondary, marginBottom: '24px' },
  section: { background: themeStyles.cardBg, borderRadius: '20px', border: `1px solid ${themeStyles.borderColor}`, marginBottom: '20px', overflow: 'hidden' },
  sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: `1px solid ${themeStyles.borderColor}` },
  sectionTitle: { display: 'flex', alignItems: 'center', gap: '10px', fontSize: '16px', fontWeight: 600, color: themeStyles.textPrimary },
  editBtn: { background: 'transparent', border: `1px solid ${themeStyles.borderColor}`, borderRadius: '30px', padding: '6px 14px', fontSize: '12px', color: themeStyles.textSecondary, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' },
  sectionContent: { padding: '16px 20px' },
  fieldRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap' as const, gap: '8px' },
  fieldLabel: { fontSize: '13px', color: themeStyles.textSecondary },
  fieldValue: { fontSize: '14px', fontWeight: 500, color: themeStyles.textPrimary, textAlign: 'right' as const },
  actions: { marginTop: '24px' },
  submitBtn: { background: themeStyles.accentColor, color: '#fff', padding: '14px 24px', borderRadius: '40px', fontSize: '15px', fontWeight: 600, border: 'none', cursor: 'pointer', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' },
});

const editModalStyles = (themeStyles: any) => ({
  overlay: {
    position: 'fixed' as const,
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0,0,0,0.8)',
    backdropFilter: 'blur(4px)',
    zIndex: 1001,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  modal: {
    background: themeStyles.cardBg,
    borderRadius: '24px',
    maxWidth: '500px',
    width: '100%',
    maxHeight: '80vh',
    overflowY: 'auto' as const,
    padding: '28px',
    border: `1px solid ${themeStyles.borderColor}`,
    position: 'relative' as const,
  },
  closeBtn: {
    position: 'absolute' as const,
    top: '16px',
    right: '16px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: themeStyles.textSecondary,
  },
  title: { fontSize: '20px', fontWeight: 600, color: themeStyles.textPrimary, marginBottom: '20px' },
  fieldGroup: { marginBottom: '20px' },
  label: { fontSize: '14px', fontWeight: 500, color: themeStyles.textPrimary, marginBottom: '8px', display: 'block' },
  select: { width: '100%', padding: '12px 16px', background: themeStyles.inputBg, border: `1px solid ${themeStyles.borderColor}`, borderRadius: '12px', color: themeStyles.textPrimary, fontSize: '14px', cursor: 'pointer' },
  textarea: { width: '100%', padding: '12px 16px', background: themeStyles.inputBg, border: `1px solid ${themeStyles.borderColor}`, borderRadius: '12px', color: themeStyles.textPrimary, fontSize: '14px', resize: 'vertical' as const },
  input: { width: '100%', padding: '12px 16px', background: themeStyles.inputBg, border: `1px solid ${themeStyles.borderColor}`, borderRadius: '12px', color: themeStyles.textPrimary, fontSize: '14px' },
  radioGroup: { display: 'flex', gap: '20px', flexWrap: 'wrap' as const, marginTop: '8px' },
  radioLabel: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: themeStyles.textPrimary, cursor: 'pointer' },
  saveBtn: { background: themeStyles.accentColor, color: '#fff', padding: '12px 20px', borderRadius: '40px', fontSize: '14px', fontWeight: 600, border: 'none', cursor: 'pointer', width: '100%', marginTop: '16px' },
});

const doneStyles = (themeStyles: any, isMobile: boolean) => ({
  container: { textAlign: 'center' as const, padding: isMobile ? '40px 20px' : '60px 20px' },
  icon: { fontSize: '64px', marginBottom: '20px' },
  title: { fontSize: isMobile ? '24px' : '28px', fontWeight: 600, color: themeStyles.textPrimary, marginBottom: '12px' },
  text: { fontSize: '14px', color: themeStyles.textSecondary, marginBottom: '24px', lineHeight: 1.5 },
  homeBtn: { background: themeStyles.accentColor, color: '#fff', padding: '12px 24px', borderRadius: '40px', fontSize: '14px', fontWeight: 600, border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' },
});

// Main Component
export default function SubscriptionTab({ themeStyles, isMobile }: any) {
  const [isSubscribed, setIsSubscribed] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');
  const [currentStep, setCurrentStep] = useState<'plans' | 'scholarship-form' | 'scholarship-upload' | 'scholarship-voice' | 'scholarship-review' | 'scholarship-done'>('plans');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showYearlyModal, setShowYearlyModal] = useState(false);
  
  const [scholarshipData, setScholarshipData] = useState({
    employmentStatus: '',
    city: '',
    monthlyIncome: '',
    familyIncome: '',
    otherScholarship: '',
    canAfford: '',
    hoursPerWeek: '',
    reason: '',
  });
  
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState<boolean>(false);

  useEffect(() => {
    const savedScholarship = localStorage.getItem('scholarshipData');
    if (savedScholarship) {
      const data = JSON.parse(savedScholarship);
      setScholarshipData(data);
    }
  }, []);

  const handleScholarshipChange = (field: string, value: string) => {
    const updated = { ...scholarshipData, [field]: value };
    setScholarshipData(updated);
    localStorage.setItem('scholarshipData', JSON.stringify(updated));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleToggleRecording = () => {
    if (!isRecording) {
      // Start recording logic
      setIsRecording(true);
      setTimeout(() => {
        setIsRecording(false);
        setRecordedAudio(true);
      }, 3000);
    } else {
      setIsRecording(false);
      setRecordedAudio(true);
    }
  };

  const handleSubmitScholarship = () => {
    localStorage.setItem('scholarshipSubmitted', 'true');
    localStorage.setItem('scholarshipData', JSON.stringify(scholarshipData));
    setCurrentStep('scholarship-done');
  };

  const handleYearlyConfirm = () => {
    setSelectedPlan('yearly');
    setShowYearlyModal(false);
    alert('Successfully switched to Yearly Plan! You saved $96.');
  };

  const handleCancelConfirm = (reason: string) => {
    localStorage.setItem('subscriptionCanceled', 'true');
    localStorage.setItem('cancelReason', reason);
    setIsSubscribed(false);
    setShowCancelModal(false);
  };

  const styles = {
    container: { padding: '20px 0' },
    title: { fontSize: isMobile ? '24px' : '28px', fontWeight: 600, color: themeStyles.textPrimary, marginBottom: '8px' },
    subtitle: { fontSize: '13px', color: themeStyles.textSecondary, marginBottom: '24px' },
    currentPlanCard: { background: themeStyles.cardBg, borderRadius: '20px', border: `1px solid ${themeStyles.borderColor}`, padding: isMobile ? '20px' : '24px', marginBottom: '24px' },
    planHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', flexWrap: 'wrap' as const, gap: '12px' },
    planName: { fontSize: '16px', fontWeight: 600, color: themeStyles.textPrimary },
    planBadge: { background: themeStyles.accentColor + '20', color: themeStyles.accentColor, padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 500 },
    planPrice: { fontSize: isMobile ? '28px' : '32px', fontWeight: 700, color: themeStyles.textPrimary },
    planPriceSub: { fontSize: '14px', fontWeight: 400, color: themeStyles.textSecondary },
    nextBill: { fontSize: '13px', color: themeStyles.textSecondary, marginTop: '8px' },
    manageBtn: { background: 'transparent', border: `1px solid ${themeStyles.borderColor}`, borderRadius: '40px', padding: '8px 20px', fontSize: '13px', color: themeStyles.textPrimary, cursor: 'pointer' },
    saveCard: { background: `linear-gradient(135deg, ${themeStyles.accentColor}15, ${themeStyles.accentColor}05)`, borderRadius: '20px', padding: isMobile ? '20px' : '24px', marginBottom: '24px', border: `1px solid ${themeStyles.accentColor}30` },
    saveTitle: { fontSize: '16px', fontWeight: 600, color: themeStyles.textPrimary, marginBottom: '8px' },
    saveDesc: { fontSize: '13px', color: themeStyles.textSecondary, marginBottom: '16px' },
    saveBtn: { background: themeStyles.accentColor, color: '#fff', padding: '12px 24px', borderRadius: '40px', fontSize: '14px', fontWeight: 600, border: 'none', cursor: 'pointer' },
    scholarshipCard: { background: themeStyles.cardBg, borderRadius: '20px', border: `1px solid ${themeStyles.borderColor}`, padding: isMobile ? '20px' : '24px', marginBottom: '24px' },
    scholarshipTitle: { fontSize: '16px', fontWeight: 600, color: themeStyles.textPrimary, marginBottom: '8px' },
    scholarshipDesc: { fontSize: '13px', color: themeStyles.textSecondary, marginBottom: '16px' },
    scholarshipBtn: { background: 'transparent', border: `1px solid ${themeStyles.accentColor}`, borderRadius: '40px', padding: '10px 24px', fontSize: '13px', color: themeStyles.accentColor, cursor: 'pointer' },
    cancelLink: { color: themeStyles.accentColor, background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', marginBottom: '24px', display: 'block' },
    invoicesTitle: { fontSize: '16px', fontWeight: 600, color: themeStyles.textPrimary, marginBottom: '16px', marginTop: '24px' },
    invoiceItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: `1px solid ${themeStyles.borderColor}`, cursor: 'pointer' },
    invoiceMonth: { fontSize: '14px', fontWeight: 500, color: themeStyles.textPrimary },
    invoiceDate: { fontSize: '11px', color: themeStyles.textSecondary, marginTop: '2px' },
    invoiceAmount: { fontSize: '14px', fontWeight: 600, color: themeStyles.textPrimary },
    sponsorCard: { background: themeStyles.cardBg, borderRadius: '20px', border: `1px solid ${themeStyles.borderColor}`, padding: isMobile ? '20px' : '24px', marginTop: '24px', textAlign: 'center' as const },
    sponsorTitle: { fontSize: '18px', fontWeight: 600, color: themeStyles.textPrimary, marginBottom: '8px' },
    sponsorDesc: { fontSize: '13px', color: themeStyles.textSecondary, marginBottom: '16px' },
    sponsorBtn: { background: 'transparent', border: `1px solid ${themeStyles.accentColor}`, borderRadius: '40px', padding: '10px 24px', fontSize: '13px', color: themeStyles.accentColor, cursor: 'pointer' },
  };

  // Subscription Plans View
  const SubscriptionPlans = () => (
    <>
      <div style={styles.currentPlanCard}>
        <div style={styles.planHeader}>
          <div>
            <div style={styles.planName}>Monthly plan</div>
            <div style={styles.planBadge}>Current plan</div>
          </div>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setShowCancelModal(true)} style={styles.manageBtn}>Manage</motion.button>
        </div>
        <div>
          <span style={styles.planPrice}>$2.99</span>
          <span style={styles.planPriceSub}> PER MONTH</span>
        </div>
        <div style={styles.nextBill}>Next bill due on 1st July 2026</div>
      </div>

      <div style={styles.saveCard}>
        <div style={styles.saveTitle}>Save up to 50% on your learning by paying yearly</div>
        <div style={styles.saveDesc}>Switch to yearly (save 50%)</div>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setShowYearlyModal(true)} style={styles.saveBtn}>Switch to yearly →</motion.button>
      </div>

      <div style={styles.scholarshipCard}>
        <div style={styles.scholarshipTitle}>Having trouble paying fee?</div>
        <div style={styles.scholarshipDesc}>You can also apply for our scholarship program</div>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setCurrentStep('scholarship-form')} style={styles.scholarshipBtn}>Apply for a scholarship →</motion.button>
      </div>

      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setShowCancelModal(true)} style={styles.cancelLink}>Cancel membership</motion.button>

      <div style={styles.invoicesTitle}>Previous invoices</div>
      {invoices.map((invoice, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05, duration: 0.3 }}
          whileHover={{ x: 4 }}
          style={styles.invoiceItem}
        >
          <div>
            <div style={styles.invoiceMonth}>{invoice.month}</div>
            <div style={styles.invoiceDate}>{invoice.date}</div>
          </div>
          <div style={styles.invoiceAmount}>{invoice.amount}</div>
        </motion.div>
      ))}

      <div style={styles.sponsorCard}>
        <div style={styles.sponsorTitle}>Sponsor an education</div>
        <div style={styles.sponsorDesc}>People helped: 0</div>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} style={styles.sponsorBtn}>Sponsor →</motion.button>
      </div>
    </>
  );

  return (
    <div style={styles.container}>
      <AnimatePresence mode="wait">
        {currentStep === 'plans' && (
          <motion.div
            key="plans"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <SubscriptionPlans />
          </motion.div>
        )}
        
        {currentStep === 'scholarship-form' && (
          <ScholarshipForm 
            themeStyles={themeStyles}
            isMobile={isMobile}
            data={scholarshipData}
            onChange={handleScholarshipChange}
            onNext={() => setCurrentStep('scholarship-upload')}
          />
        )}
        
        {currentStep === 'scholarship-upload' && (
          <ScholarshipUpload 
            themeStyles={themeStyles}
            isMobile={isMobile}
            uploadedFile={uploadedFile}
            onFileUpload={handleFileUpload}
            onNext={() => setCurrentStep('scholarship-voice')}
            onBack={() => setCurrentStep('scholarship-form')}
          />
        )}
        
        {currentStep === 'scholarship-voice' && (
          <ScholarshipVoice 
            themeStyles={themeStyles}
            isMobile={isMobile}
            isRecording={isRecording}
            onToggleRecording={handleToggleRecording}
            onNext={() => setCurrentStep('scholarship-review')}
            onBack={() => setCurrentStep('scholarship-upload')}
            recordedAudio={recordedAudio}
          />
        )}
        
        {currentStep === 'scholarship-review' && (
          <ScholarshipReview 
            themeStyles={themeStyles}
            isMobile={isMobile}
            data={scholarshipData}
            uploadedFile={uploadedFile}
            recordedAudio={recordedAudio}
            onEdit={(section: string) => {}}
            onSubmit={handleSubmitScholarship}
            onBack={() => setCurrentStep('scholarship-voice')}
          />
        )}
        
        {currentStep === 'scholarship-done' && (
          <ScholarshipDone 
            themeStyles={themeStyles}
            isMobile={isMobile}
            onHome={() => window.location.href = '/'}
          />
        )}
      </AnimatePresence>

      {showCancelModal && (
        <CancelModal 
          themeStyles={themeStyles}
          isMobile={isMobile}
          onClose={() => setShowCancelModal(false)}
          onConfirm={handleCancelConfirm}
        />
      )}

      {showYearlyModal && (
        <YearlyPlanModal 
          themeStyles={themeStyles}
          isMobile={isMobile}
          onClose={() => setShowYearlyModal(false)}
          onConfirm={handleYearlyConfirm}
        />
      )}
    </div>
  );
}
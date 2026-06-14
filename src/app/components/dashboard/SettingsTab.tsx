/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Mail, BellRing, Moon, Sun, Save, 
  Lock, Key, Trash2, CheckCircle, Eye, EyeOff,
  Camera, LogOut, Edit2, Check, X
} from 'lucide-react';

export default function SettingsTab({ themeStyles, isDark, setIsDark, isMobile }: any) {
  // Profile Information
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  
  // Edit states
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  
  // Password Change
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  
  // Notifications
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  
  // Account
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Load Profile Data
    const savedName = localStorage.getItem('userName');
    const savedEmail = localStorage.getItem('userEmail');
    const savedPhone = localStorage.getItem('userPhone');
    const savedAvatar = localStorage.getItem('userAvatar');
    const savedEmailNotif = localStorage.getItem('emailNotifications');
    const savedPushNotif = localStorage.getItem('pushNotifications');
    
    if (savedName) setUserName(savedName);
    if (savedEmail) setUserEmail(savedEmail);
    if (savedPhone) setUserPhone(savedPhone);
    if (savedAvatar) setUserAvatar(savedAvatar);
    if (savedEmailNotif) setEmailNotifications(savedEmailNotif === 'true');
    if (savedPushNotif) setPushNotifications(savedPushNotif === 'true');
  }, []);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const avatarUrl = event.target?.result as string;
        setUserAvatar(avatarUrl);
        localStorage.setItem('userAvatar', avatarUrl);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const startEdit = (field: string, value: string) => {
    setEditingField(field);
    setEditValue(value);
  };

  const saveEdit = () => {
    switch(editingField) {
      case 'name':
        setUserName(editValue);
        localStorage.setItem('userName', editValue);
        break;
      case 'email':
        setUserEmail(editValue);
        localStorage.setItem('userEmail', editValue);
        break;
      case 'phone':
        setUserPhone(editValue);
        localStorage.setItem('userPhone', editValue);
        break;
    }
    setEditingField(null);
    setEditValue('');
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const cancelEdit = () => {
    setEditingField(null);
    setEditValue('');
  };

  const saveSettings = () => {
    localStorage.setItem('emailNotifications', String(emailNotifications));
    localStorage.setItem('pushNotifications', String(pushNotifications));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handlePasswordChange = () => {
    setPasswordError('');
    setPasswordSuccess('');
    
    if (!currentPassword) {
      setPasswordError('Please enter your current password');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    
    setPasswordSuccess('Password changed successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => {
      setPasswordSuccess('');
      setShowPasswordChange(false);
    }, 2000);
  };

  const handleDeleteAccount = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/welcome';
  };

  const styles = {
    container: { 
      padding: '20px 0', 
      width: '100%',
      maxWidth: '100%',
    },
    title: { 
      fontSize: isMobile ? '24px' : '28px', 
      fontWeight: 600, 
      color: themeStyles.textPrimary, 
      marginBottom: '8px' 
    },
    subtitle: { 
      fontSize: '13px', 
      color: themeStyles.textSecondary, 
      marginBottom: '24px' 
    },
    
    // Sections - Full Width
    section: { 
      background: themeStyles.cardBg, 
      borderRadius: '20px', 
      border: `1px solid ${themeStyles.borderColor}`, 
      padding: isMobile ? '20px' : '24px', 
      marginBottom: '20px',
      width: '100%',
    },
    sectionTitle: { 
      fontSize: '16px', 
      fontWeight: 600, 
      color: themeStyles.textPrimary, 
      marginBottom: '16px', 
      display: 'flex', 
      alignItems: 'center', 
      gap: '8px' 
    },
    
    // Avatar
    avatarSection: { 
      display: 'flex', 
      alignItems: 'center', 
      gap: '20px', 
      marginBottom: '24px', 
      flexWrap: 'wrap' as const 
    },
    avatarContainer: { 
      position: 'relative' as const 
    },
    avatar: { 
      width: '80px', 
      height: '80px', 
      borderRadius: '50%', 
      objectFit: 'cover' as const, 
      border: `3px solid ${themeStyles.accentColor}`, 
      cursor: 'pointer' 
    },
    avatarOverlay: { 
      position: 'absolute' as const, 
      bottom: 0, 
      right: 0, 
      background: themeStyles.accentColor, 
      borderRadius: '50%', 
      padding: '6px', 
      cursor: 'pointer' 
    },
    
    // Editable Row
    editableRow: { 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      padding: '12px 0',
      borderBottom: `1px solid ${themeStyles.borderColor}`,
      flexWrap: 'wrap' as const,
      gap: '12px',
    },
    editableLabel: { 
      display: 'flex', 
      alignItems: 'center', 
      gap: '12px',
      flex: 1,
    },
    labelText: { 
      fontSize: isMobile ? '13px' : '14px', 
      color: themeStyles.textSecondary,
      minWidth: '100px',
    },
    valueText: { 
      fontSize: isMobile ? '14px' : '15px', 
      fontWeight: 500, 
      color: themeStyles.textPrimary,
      flex: 1,
    },
    editBtn: { 
      background: 'transparent', 
      border: 'none', 
      cursor: 'pointer', 
      color: themeStyles.textSecondary,
      padding: '6px',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      transition: 'all 0.2s ease',
    },
    editInput: { 
      flex: 1,
      padding: isMobile ? '8px 12px' : '10px 14px', 
      background: themeStyles.inputBg, 
      border: `1px solid ${themeStyles.accentColor}`, 
      borderRadius: '10px', 
      color: themeStyles.textPrimary, 
      fontSize: isMobile ? '13px' : '14px',
      outline: 'none',
    },
    editActions: { 
      display: 'flex', 
      gap: '8px', 
      alignItems: 'center' 
    },
    saveEditBtn: { 
      background: themeStyles.accentColor, 
      border: 'none', 
      borderRadius: '8px', 
      padding: '6px 10px', 
      cursor: 'pointer', 
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
    },
    cancelEditBtn: { 
      background: 'transparent', 
      border: `1px solid ${themeStyles.borderColor}`, 
      borderRadius: '8px', 
      padding: '6px 10px', 
      cursor: 'pointer', 
      color: themeStyles.textSecondary,
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
    },
    
    // Input Row (for non-editable mode in other sections)
    inputRow: { 
      display: 'flex', 
      alignItems: 'center', 
      gap: '12px', 
      marginBottom: '16px', 
      flexWrap: 'wrap' as const 
    },
    inputIcon: { 
      color: themeStyles.textSecondary, 
      flexShrink: 0 
    },
    input: { 
      flex: 1, 
      padding: isMobile ? '10px 14px' : '12px 16px', 
      background: themeStyles.inputBg, 
      border: `1px solid ${themeStyles.borderColor}`, 
      borderRadius: '12px', 
      color: themeStyles.textPrimary, 
      fontSize: isMobile ? '13px' : '14px',
      outline: 'none',
      transition: 'all 0.2s ease',
      cursor: 'pointer',
    },
    
    // Password
    passwordSection: { 
      marginTop: '16px', 
      paddingTop: '16px', 
      borderTop: `1px solid ${themeStyles.borderColor}` 
    },
    passwordInputWrapper: { 
      position: 'relative' as const, 
      flex: 1 
    },
    passwordToggle: { 
      position: 'absolute' as const, 
      right: '12px', 
      top: '50%', 
      transform: 'translateY(-50%)', 
      background: 'none', 
      border: 'none', 
      cursor: 'pointer', 
      color: themeStyles.textSecondary 
    },
    errorMsg: { 
      color: '#e63939', 
      fontSize: '12px', 
      marginTop: '8px', 
      textAlign: 'center' as const 
    },
    successMsg: { 
      color: '#22c55e', 
      fontSize: '12px', 
      marginTop: '8px', 
      textAlign: 'center' as const 
    },
    
    // Theme Row
    themeRow: { 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '12px 0', 
      cursor: 'pointer' 
    },
    themeLabel: { 
      display: 'flex', 
      alignItems: 'center', 
      gap: '12px', 
      color: themeStyles.textPrimary, 
      fontSize: isMobile ? '13px' : '14px', 
      cursor: 'pointer' 
    },
    toggleSwitch: { 
      width: '52px', 
      height: '28px', 
      background: isDark ? themeStyles.accentColor : themeStyles.borderColor, 
      borderRadius: '28px', 
      border: 'none', 
      cursor: 'pointer', 
      position: 'relative' as const 
    },
    toggleKnob: { 
      width: '24px', 
      height: '24px', 
      background: '#fff', 
      borderRadius: '24px', 
      position: 'absolute' as const, 
      top: '2px', 
      left: isDark ? '26px' : '2px', 
      transition: 'left 0.2s ease' 
    },
    
    // Checkbox Row
    notifRow: { 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      marginBottom: '14px', 
      cursor: 'pointer' 
    },
    notifLabel: { 
      display: 'flex', 
      alignItems: 'center', 
      gap: '10px', 
      color: themeStyles.textPrimary, 
      fontSize: isMobile ? '13px' : '14px', 
      cursor: 'pointer' 
    },
    checkbox: { 
      width: '18px', 
      height: '18px', 
      accentColor: themeStyles.accentColor, 
      cursor: 'pointer' 
    },
    
    // Buttons
    btnOutline: { 
      background: 'transparent', 
      border: `1px solid ${themeStyles.borderColor}`, 
      borderRadius: '40px', 
      padding: '12px 20px', 
      fontSize: '14px', 
      fontWeight: 500, 
      color: themeStyles.textPrimary, 
      cursor: 'pointer', 
      width: '100%', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      gap: '8px',
      transition: 'all 0.2s ease',
    },
    btnDanger: { 
      background: 'transparent', 
      border: `1px solid #e63939`, 
      borderRadius: '40px', 
      padding: '12px 20px', 
      fontSize: '14px', 
      fontWeight: 500, 
      color: '#e63939', 
      cursor: 'pointer', 
      width: '100%', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      gap: '8px',
      transition: 'all 0.2s ease',
    },
    btnPrimary: { 
      background: themeStyles.accentColor, 
      color: '#fff', 
      padding: isMobile ? '12px 20px' : '14px 28px', 
      borderRadius: '48px', 
      fontWeight: 600, 
      fontSize: isMobile ? '13px' : '14px', 
      border: 'none', 
      cursor: 'pointer', 
      width: '100%', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      gap: '8px',
      transition: 'all 0.2s ease',
    },
    btnGroup: { 
      display: 'flex', 
      gap: '12px', 
      marginTop: '16px' 
    },
    
    // Delete Confirm
    deleteConfirm: { 
      background: themeStyles.cardBg, 
      borderRadius: '16px', 
      padding: '16px', 
      marginTop: '12px', 
      border: `1px solid #e63939` 
    },
    deleteInput: { 
      width: '100%', 
      padding: '12px', 
      background: themeStyles.inputBg, 
      border: `1px solid ${themeStyles.borderColor}`, 
      borderRadius: '12px', 
      color: themeStyles.textPrimary, 
      marginBottom: '12px', 
      fontSize: '14px', 
      outline: 'none' 
    },
    
    savedMsg: { 
      textAlign: 'center' as const, 
      marginTop: '12px', 
      fontSize: '12px', 
      color: themeStyles.accentColor, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      gap: '6px' 
    },
  };

  // Render editable row
  const renderEditableRow = (label: string, value: string, field: string, icon: any) => {
    const Icon = icon;
    const isEditing = editingField === field;
    
    return (
      <div style={styles.editableRow}>
        <div style={styles.editableLabel}>
          <Icon size={18} style={styles.inputIcon} />
          <span style={styles.labelText}>{label}</span>
          {!isEditing ? (
            <span style={styles.valueText}>{value || `Enter ${label}`}</span>
          ) : (
            <input
              type={field === 'email' ? 'email' : 'text'}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              style={styles.editInput}
              autoFocus
              onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
            />
          )}
        </div>
        {!isEditing ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => startEdit(field, value)}
            style={styles.editBtn}
          >
            <Edit2 size={14} /> Edit
          </motion.button>
        ) : (
          <div style={styles.editActions}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={saveEdit}
              style={styles.saveEditBtn}
            >
              <Check size={14} /> Save
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={cancelEdit}
              style={styles.cancelEditBtn}
            >
              <X size={14} /> Cancel
            </motion.button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Settings</h1>
      <p style={styles.subtitle}>Manage your account preferences</p>
      
      {/* Profile Section - Full Width */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          <User size={18} /> Profile Information
        </h2>
        
        {/* Avatar */}
        <div style={styles.avatarSection}>
          <div style={styles.avatarContainer}>
            <img 
              src={userAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(userName || 'User')}&background=${themeStyles.accentColor.replace('#', '')}&color=fff`} 
              alt="Avatar" 
              style={styles.avatar}
            />
            <label style={styles.avatarOverlay}>
              <Camera size={16} color="#fff" />
              <input type="file" accept="image/*" onChange={handleAvatarUpload} style={{ display: 'none' }} />
            </label>
          </div>
          <p style={{ fontSize: '13px', color: themeStyles.textSecondary }}>Click camera icon to change profile picture</p>
        </div>
        
        {/* Editable Fields */}
        {renderEditableRow('Full Name', userName, 'name', User)}
        {renderEditableRow('Email Address', userEmail, 'email', Mail)}
        {renderEditableRow('Phone Number', userPhone, 'phone', Lock)}
      </div>

      {/* Password Change Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          <Key size={18} /> Password
        </h2>
        
        {!showPasswordChange ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowPasswordChange(true)}
            style={styles.btnOutline}
          >
            <Key size={16} /> Change Password
          </motion.button>
        ) : (
          <div style={styles.passwordSection}>
            <div style={styles.inputRow}>
              <Lock size={18} style={styles.inputIcon} />
              <div style={styles.passwordInputWrapper}>
                <input 
                  type={showCurrentPassword ? "text" : "password"} 
                  placeholder="Current Password" 
                  value={currentPassword} 
                  onChange={(e) => setCurrentPassword(e.target.value)} 
                  style={styles.input}
                />
                <button onClick={() => setShowCurrentPassword(!showCurrentPassword)} style={styles.passwordToggle}>
                  {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            
            <div style={styles.inputRow}>
              <Key size={18} style={styles.inputIcon} />
              <div style={styles.passwordInputWrapper}>
                <input 
                  type={showNewPassword ? "text" : "password"} 
                  placeholder="New Password (min 6 characters)" 
                  value={newPassword} 
                  onChange={(e) => setNewPassword(e.target.value)} 
                  style={styles.input}
                />
                <button onClick={() => setShowNewPassword(!showNewPassword)} style={styles.passwordToggle}>
                  {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            
            <div style={styles.inputRow}>
              <Key size={18} style={styles.inputIcon} />
              <input 
                type="password" 
                placeholder="Confirm New Password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                style={styles.input}
              />
            </div>
            
            {passwordError && <p style={styles.errorMsg}>{passwordError}</p>}
            {passwordSuccess && <p style={styles.successMsg}>{passwordSuccess}</p>}
            
            <div style={styles.btnGroup}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePasswordChange}
                style={{ ...styles.btnPrimary, flex: 1 }}
              >
                Update Password
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setShowPasswordChange(false);
                  setPasswordError('');
                  setCurrentPassword('');
                  setNewPassword('');
                  setConfirmPassword('');
                }}
                style={{ ...styles.btnOutline, flex: 1 }}
              >
                Cancel
              </motion.button>
            </div>
          </div>
        )}
      </div>

      {/* Appearance Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          {isDark ? <Moon size={18} /> : <Sun size={18} />} Appearance
        </h2>
        <div style={styles.themeRow}>
          <div style={styles.themeLabel}>
            {isDark ? <Moon size={18} /> : <Sun size={18} />}
            <span>Dark Mode</span>
          </div>
          <motion.button 
            onClick={() => setIsDark(!isDark)} 
            style={styles.toggleSwitch}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div style={styles.toggleKnob} />
          </motion.button>
        </div>
      </div>

      {/* Notifications Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          <BellRing size={18} /> Notifications
        </h2>
        
        <div style={styles.notifRow}>
          <div style={styles.notifLabel}>
            <Mail size={16} />
            <span>Email Notifications</span>
          </div>
          <input 
            type="checkbox" 
            checked={emailNotifications} 
            onChange={(e) => setEmailNotifications(e.target.checked)} 
            style={styles.checkbox}
          />
        </div>
        
        <div style={styles.notifRow}>
          <div style={styles.notifLabel}>
            <BellRing size={16} />
            <span>Push Notifications</span>
          </div>
          <input 
            type="checkbox" 
            checked={pushNotifications} 
            onChange={(e) => setPushNotifications(e.target.checked)} 
            style={styles.checkbox}
          />
        </div>
      </div>

      {/* Account Actions */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          <LogOut size={18} /> Account
        </h2>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          style={{ ...styles.btnOutline, marginBottom: '12px' }}
        >
          <LogOut size={16} /> Logout
        </motion.button>
        
        {!showDeleteConfirm ? (
          <motion.button
            whileHover={{ scale: 1.02, background: '#e6393920' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowDeleteConfirm(true)}
            style={styles.btnDanger}
          >
            <Trash2 size={16} /> Delete Account
          </motion.button>
        ) : (
          <div style={styles.deleteConfirm}>
            <p style={{ fontSize: '14px', color: themeStyles.textSecondary, marginBottom: '12px' }}>
              Type <strong style={{ color: '#e63939' }}>DELETE</strong> to confirm account deletion
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <input 
                type="text" 
                placeholder="Type DELETE" 
                id="deleteConfirm"
                style={{ ...styles.deleteInput, flex: 1 }}
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const input = document.getElementById('deleteConfirm') as HTMLInputElement;
                  if (input?.value === 'DELETE') {
                    handleDeleteAccount();
                  }
                }}
                style={{ ...styles.btnDanger, width: 'auto', padding: '12px 20px' }}
              >
                Confirm
              </motion.button>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowDeleteConfirm(false)}
              style={{ ...styles.btnOutline, marginTop: '12px' }}
            >
              Cancel
            </motion.button>
          </div>
        )}
      </div>

      {/* Save Button for Notifications */}
      <motion.button
        onClick={saveSettings}
        style={styles.btnPrimary}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        <Save size={16} /> Save Changes
      </motion.button>
      
      {saved && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          style={styles.savedMsg}
        >
          <CheckCircle size={14} /> Settings saved successfully!
        </motion.p>
      )}
    </div>
  );
}
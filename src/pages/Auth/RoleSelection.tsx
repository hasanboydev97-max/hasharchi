import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, HardHat, ChevronRight, CheckCircle } from 'lucide-react';
import logoUrl from '../../assets/logo-hasharchi.webp';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/Button/Button';
import clsx from 'clsx';
import styles from './Auth.module.css';

export const RoleSelection: React.FC = () => {
  const navigate = useNavigate();
  const { setRole } = useAuth();
  const [selectedRole, setSelectedRole] = useState<'mijoz' | 'usta' | null>(null);

  const location = useLocation();
  const mode = location.state?.mode || 'register';

  const handleContinue = () => {
    if (selectedRole) {
      setRole(selectedRole);
      navigate('/auth/phone', { state: { mode } });
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.logoMini} style={{ background: 'transparent' }}>
            <img src={logoUrl} alt="Hasharchi" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
          </div>
          <h1 className={styles.title}>Rolingizni tanlang</h1>
          <p className={styles.subtitle}>Keyin o'zgartirishingiz mumkin</p>
        </div>

        <div className={styles.roleGrid}>
          <div 
            className={clsx(styles.roleCard, selectedRole === 'mijoz' && styles.selected)}
            onClick={() => setSelectedRole('mijoz')}
          >
            <div className={clsx(styles.roleIconBox, styles.client)}>
              <Home size={32} strokeWidth={2} />
            </div>
            <div className={styles.roleContent}>
              <h3 className={styles.roleTitle}>Mijoz</h3>
              <p className={styles.roleSubtitle}>Uy, ofis va biznes uchun malakali mutaxassislarni toping</p>
            </div>
            {selectedRole === 'mijoz' ? (
              <CheckCircle size={24} className={styles.roleCheck} />
            ) : (
              <ChevronRight size={24} className={styles.roleArrow} />
            )}
          </div>

          <div 
            className={clsx(styles.roleCard, selectedRole === 'usta' && styles.selected)}
            onClick={() => setSelectedRole('usta')}
          >
            <div className={clsx(styles.roleIconBox, styles.worker)}>
              <HardHat size={32} strokeWidth={2} />
            </div>
            <div className={styles.roleContent}>
              <h3 className={styles.roleTitle}>Hasharchi (Usta)</h3>
              <p className={styles.roleSubtitle}>O'z mahoratingizni namoyish eting va yangi mijozlar toping</p>
            </div>
            {selectedRole === 'usta' ? (
              <CheckCircle size={24} className={styles.roleCheck} />
            ) : (
              <ChevronRight size={24} className={styles.roleArrow} />
            )}
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <Button 
          variant="primary" 
          size="large" 
          fullWidth 
          disabled={!selectedRole}
          onClick={handleContinue}
        >
          Davom etish
        </Button>
      </div>
    </div>
  );
};

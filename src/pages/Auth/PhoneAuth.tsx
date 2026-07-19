import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Phone } from 'lucide-react';
import { Button } from '../../components/Button/Button';
import styles from './Auth.module.css';

export const PhoneAuth: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const mode = location.state?.mode || 'register';
  const [phone, setPhone] = useState('');

  // Format the phone number as XX XXX XX XX
  const formatPhone = (val: string) => {
    const cleaned = val.replace(/\D/g, '');
    let formatted = '';
    for (let i = 0; i < cleaned.length && i < 9; i++) {
      if (i === 2 || i === 5 || i === 7) {
        formatted += ' ';
      }
      formatted += cleaned[i];
    }
    return formatted;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value));
  };

  const isComplete = phone.replace(/\s/g, '').length === 9;

  const handleContinue = () => {
    if (isComplete) {
      const fullPhone = '+998' + phone.replace(/\s/g, '');
      navigate('/auth/otp', { state: { phone: fullPhone, mode } });
    }
  };

  return (
    <div className={styles.page}>
      <button className={styles.backBtn} onClick={() => navigate(-1)}>
        <ArrowLeft size={24} />
      </button>

      <div className={styles.content} style={{ paddingTop: '80px' }}>
        <div className={styles.headerCenter}>
          <div className={styles.centerIcon}>
            <Phone size={40} strokeWidth={2} />
          </div>
          <h1 className={styles.title}>Telefon raqamingiz</h1>
          <p className={styles.subtitle}>Tasdiqlash kodi yuboramiz</p>
        </div>

        <div className={styles.form}>
          <div className={styles.phoneRow}>
            <div className={styles.prefix}>
              <span>🇺🇿</span> +998
            </div>
            <div className={styles.inputWrapper}>
              <input
                type="tel"
                placeholder="00 000 00 00"
                value={phone}
                onChange={handlePhoneChange}
              />
            </div>
          </div>
          
          <div className={styles.termsRow}>
            Davom etib, <a href="#terms">foydalanish shartlariga</a> rozilik bildirasiz
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <Button 
          variant="primary" 
          size="large" 
          fullWidth 
          disabled={!isComplete}
          onClick={handleContinue}
        >
          SMS kod yuborish
        </Button>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { OTPInput } from '../../components/OTPInput/OTPInput';
import { Button } from '../../components/Button/Button';
import { useAuth } from '../../context/AuthContext';
import clsx from 'clsx';
import authStyles from './Auth.module.css';
import styles from './OTPVerify.module.css';

export const OTPVerify: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { role, login } = useAuth();
  const phone = location.state?.phone || '+998 00 000 00 00';
  const mode = location.state?.mode || 'register';
  
  const [timer, setTimer] = useState(60);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [flashMessage, setFlashMessage] = useState('');

  useEffect(() => {
    let interval: number;
    if (timer > 0) {
      interval = window.setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleComplete = (otp: string) => {
    if (otp.length === 6) { // Demo: qanday kod kiritilsa ham qabul qilinadi
      setError(false);
      setSuccess(true);
      setTimeout(() => {
        if (mode === 'login') {
          // Login bo'lsa, to'g'ridan-to'g'ri kiramiz (Setup kerak emas)
          login(role || 'mijoz'); // Fallback to mijoz for safety
          navigate('/', { replace: true });
        } else {
          navigate('/auth/setup');
        }
      }, 500);
    } else {
      setError(true);
      setSuccess(false);
    }
  };

  const handleDemoSkip = () => {
    setSuccess(true);
    setTimeout(() => {
      if (mode === 'login') {
        login(role || 'mijoz');
        navigate('/', { replace: true });
      } else {
        navigate('/auth/setup');
      }
    }, 500);
  };

  const handleResend = () => {
    if (timer === 0) {
      setTimer(60);
      setError(false);
      setFlashMessage('SMS qayta yuborildi');
      setTimeout(() => setFlashMessage(''), 3000);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `0${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const displayPhone = typeof phone === 'string' 
    ? phone.replace(/(\+998)(\d{2})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5') 
    : '+998 00 000 00 00';

  return (
    <div className={authStyles.page}>
      <button className={authStyles.backBtn} onClick={() => navigate(-1)}>
        <ArrowLeft size={24} />
      </button>

      <div className={authStyles.content} style={{ paddingTop: '80px' }}>
        <div className={authStyles.header}>
          <h1 className={authStyles.title}>Kodni kiriting</h1>
          <p className={authStyles.subtitle}>
            Quyidagi raqamga SMS yuborildi:<br />
            <span className={styles.phoneDisplay}>{displayPhone}</span>
          </p>
        </div>

        <div className={clsx(styles.otpContainer, success && styles.successPulse, error && styles.shake)}>
          <OTPInput length={6} onComplete={handleComplete} />
        </div>

        {error && <div className={styles.errorText}>Kod noto'g'ri</div>}
        {flashMessage && <div className={styles.flashText}>{flashMessage}</div>}

        <div className={styles.timerRow}>
          <span className={styles.timerText}>{formatTime(timer)}</span>
          <button 
            className={clsx(styles.resendBtn, timer === 0 && styles.resendEnabled)}
            onClick={handleResend}
            disabled={timer > 0}
          >
            Qayta yuborish
          </button>
        </div>

        {/* Demo maqsadlarida o'tkazib yuborish */}
        <div style={{ marginTop: '32px', textAlign: 'center' }}>
          <button 
            onClick={handleDemoSkip} 
            style={{ 
              background: 'none', 
              border: 'none', 
              color: 'var(--color-primary)', 
              textDecoration: 'underline',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Demo: O'tkazib yuborish
          </button>
        </div>
      </div>
    </div>
  );
};


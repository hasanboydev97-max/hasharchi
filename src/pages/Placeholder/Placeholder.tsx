import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import styles from './Placeholder.module.css';

export const Placeholder: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getPageName = () => {
    const path = location.pathname;
    if (path.includes('profile')) return 'Shaxsiy ma\'lumotlar';
    if (path.includes('payment')) return 'To\'lov usullari';
    if (path.includes('notifications')) return 'Bildirishnomalar';
    if (path.includes('stats')) return 'Statistika';
    if (path.includes('verify')) return 'Verifikatsiya';
    if (path.includes('help')) return 'Yordam';
    if (path.includes('settings')) return 'Sozlamalar';
    return 'Ushbu bo\'lim';
  };

  return (
    <div className={styles.page}>
      <button className={styles.backBtn} onClick={() => navigate(-1)}>
        <ArrowLeft size={24} />
      </button>

      <div className={styles.iconWrap}>
        <Clock size={40} strokeWidth={2.5} />
      </div>

      <h1 className={styles.title}>Tez kunda!</h1>
      <p className={styles.subtitle}>
        <b>{getPageName()}</b> sahifasi ustida jadal ish olib boryapmiz. Yaqin orada yangilanishlarda qo'shiladi.
      </p>
    </div>
  );
};

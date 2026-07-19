import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Bell, MessageSquare } from 'lucide-react';
import styles from './Notifications.module.css';
import clsx from 'clsx';

export const NotificationsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </button>
        <h1 className={styles.title}>Bildirishnomalar</h1>
      </header>

      <div className={styles.content}>
        
        <div className={styles.dateGroup}>Bugun</div>
        
        <div className={clsx(styles.notificationCard, styles.unread)}>
          <div className={styles.unreadDot} />
          <div className={clsx(styles.iconWrap, styles.iconBlue)}>
            <Bell size={24} />
          </div>
          <div className={styles.textContent}>
            <div className={styles.notifTitle}>Yangi mijoz xabari!</div>
            <div className={styles.notifBody}>
              Sizning e'loningiz bo'yicha yangi xabar keldi. Mijoz narxni aniqlashtirmoqchi.
            </div>
            <div className={styles.notifTime}>10:45</div>
          </div>
        </div>

        <div className={styles.notificationCard}>
          <div className={clsx(styles.iconWrap, styles.iconGreen)}>
            <CheckCircle size={24} />
          </div>
          <div className={styles.textContent}>
            <div className={styles.notifTitle}>To'lov qabul qilindi</div>
            <div className={styles.notifBody}>
              Hamyoningizga 150,000 so'm muvaffaqiyatli tushdi.
            </div>
            <div className={styles.notifTime}>09:20</div>
          </div>
        </div>

        <div className={styles.dateGroup}>Kecha</div>

        <div className={styles.notificationCard}>
          <div className={clsx(styles.iconWrap, styles.iconOrange)}>
            <MessageSquare size={24} />
          </div>
          <div className={styles.textContent}>
            <div className={styles.notifTitle}>Yangi sharh</div>
            <div className={styles.notifBody}>
              Mijoz Jasur sizning ishingizga 5 yulduzli baho qoldirdi!
            </div>
            <div className={styles.notifTime}>Kecha, 18:30</div>
          </div>
        </div>

      </div>
    </div>
  );
};

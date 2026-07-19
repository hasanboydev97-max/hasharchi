import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Globe, Moon, Bell, Shield, Smartphone, ChevronRight } from 'lucide-react';
import styles from './Settings.module.css';
import clsx from 'clsx';

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </button>
        <h1 className={styles.title}>Sozlamalar</h1>
      </header>

      <div className={styles.content}>
        
        {/* Asosiy Sozlamalar */}
        <div>
          <div className={styles.sectionTitle}>Asosiy</div>
          <div className={styles.section}>
            
            <div className={styles.settingItem}>
              <div className={styles.itemLeft}>
                <div className={styles.itemIcon}>
                  <Globe size={20} />
                </div>
                <div className={styles.itemText}>
                  <span className={styles.itemLabel}>Ilova tili</span>
                  <span className={styles.itemSub}>O'zbek (Lotin)</span>
                </div>
              </div>
              <div className={styles.itemRight}>
                <ChevronRight size={20} />
              </div>
            </div>

            <div className={styles.settingItem} onClick={() => setDarkMode(!darkMode)}>
              <div className={styles.itemLeft}>
                <div className={styles.itemIcon}>
                  <Moon size={20} />
                </div>
                <div className={styles.itemText}>
                  <span className={styles.itemLabel}>Tungi rejim</span>
                  <span className={styles.itemSub}>Yorug'likni kamaytirish</span>
                </div>
              </div>
              <div className={styles.itemRight}>
                <div className={clsx(styles.toggle, darkMode && styles.active)}>
                  <div className={styles.toggleThumb} />
                </div>
              </div>
            </div>

            <div className={styles.settingItem} onClick={() => setNotifications(!notifications)}>
              <div className={styles.itemLeft}>
                <div className={styles.itemIcon}>
                  <Bell size={20} />
                </div>
                <div className={styles.itemText}>
                  <span className={styles.itemLabel}>Bildirishnomalar</span>
                  <span className={styles.itemSub}>Push va SMS xabarlar</span>
                </div>
              </div>
              <div className={styles.itemRight}>
                <div className={clsx(styles.toggle, notifications && styles.active)}>
                  <div className={styles.toggleThumb} />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Xavfsizlik */}
        <div>
          <div className={styles.sectionTitle}>Xavfsizlik</div>
          <div className={styles.section}>
            
            <div className={styles.settingItem}>
              <div className={styles.itemLeft}>
                <div className={styles.itemIcon}>
                  <Shield size={20} />
                </div>
                <div className={styles.itemText}>
                  <span className={styles.itemLabel}>PIN kod va biometrika</span>
                  <span className={styles.itemSub}>Barmoq izi orqali kirish</span>
                </div>
              </div>
              <div className={styles.itemRight}>
                <ChevronRight size={20} />
              </div>
            </div>

            <div className={styles.settingItem}>
              <div className={styles.itemLeft}>
                <div className={styles.itemIcon}>
                  <Smartphone size={20} />
                </div>
                <div className={styles.itemText}>
                  <span className={styles.itemLabel}>Qurilmalar</span>
                  <span className={styles.itemSub}>Faol seanslarni boshqarish</span>
                </div>
              </div>
              <div className={styles.itemRight}>
                <ChevronRight size={20} />
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

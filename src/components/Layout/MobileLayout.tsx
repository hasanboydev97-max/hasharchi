import React from 'react';
import { BottomNavigation } from '../BottomNavigation/BottomNavigation';
import styles from './MobileLayout.module.css';

export const MobileLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="mobile-wrapper">
      <main className={styles.mainContent}>
        {children}
      </main>
      <BottomNavigation />
    </div>
  );
};

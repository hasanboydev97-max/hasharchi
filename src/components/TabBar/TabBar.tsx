import React from 'react';
import { clsx } from 'clsx';
import styles from './TabBar.module.css';

export interface Tab {
  id: string;
  label: string;
  count?: number;
}

export interface TabBarProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
  variant?: 'underline' | 'pill';
}

export const TabBar: React.FC<TabBarProps> = ({
  tabs,
  activeTab,
  onChange,
  variant = 'underline',
}) => {
  return (
    <div className={clsx(styles.container, styles[variant])}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            className={clsx(styles.tab, isActive && styles.active)}
            onClick={() => onChange(tab.id)}
          >
            <span className={styles.label}>{tab.label}</span>
            {tab.count !== undefined && (
              <span className={styles.badge}>{tab.count}</span>
            )}
            {variant === 'underline' && isActive && (
              <span className={styles.indicator} />
            )}
          </button>
        );
      })}
    </div>
  );
};

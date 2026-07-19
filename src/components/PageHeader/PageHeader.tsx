import React from 'react';
import clsx from 'clsx';
import { ArrowLeft } from 'lucide-react';
import { Typography } from '../Typography/Typography';
import styles from './PageHeader.module.css';

export interface PageHeaderProps {
  title: string;
  onBack?: () => void;
  rightAction?: React.ReactNode;
  transparent?: boolean;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  onBack,
  rightAction,
  transparent = false,
}) => {
  return (
    <header
      className={clsx(styles.header, {
        [styles.transparent]: transparent,
      })}
    >
      <div className={styles.left}>
        {onBack && (
          <button
            type="button"
            className={styles.backButton}
            onClick={onBack}
            aria-label="Orqaga"
          >
            <ArrowLeft size={24} strokeWidth={2} />
          </button>
        )}
      </div>

      <div className={styles.center}>
        <h1 className={styles.title}>{title}</h1>
      </div>

      <div className={styles.right}>{rightAction}</div>
    </header>
  );
};

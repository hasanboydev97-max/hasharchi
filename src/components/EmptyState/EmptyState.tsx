import React from 'react';
import clsx from 'clsx';
import { Button } from '../Button/Button';
import styles from './EmptyState.module.css';

export interface EmptyStateProps {
  emoji?: string;
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary';
  };
  compact?: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  emoji,
  icon,
  title,
  subtitle,
  action,
  compact = false,
}) => {
  return (
    <div className={clsx(styles.container, compact && styles.compact)}>
      {emoji && (
        <div className={styles.emoji}>
          {emoji}
        </div>
      )}
      
      {!emoji && icon && (
        <div className={styles.iconWrapper}>
          <div className={styles.icon}>
            {icon}
          </div>
        </div>
      )}
      
      <div className={styles.textContainer}>
        <h3 className={styles.title}>{title}</h3>
        {subtitle && (
          <p className={styles.subtitle}>{subtitle}</p>
        )}
      </div>

      {action && (
        <div className={styles.action}>
          <Button 
            variant={action.variant || 'primary'} 
            onClick={action.onClick}
          >
            {action.label}
          </Button>
        </div>
      )}
    </div>
  );
};

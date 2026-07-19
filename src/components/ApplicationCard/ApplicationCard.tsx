import React from 'react';
import clsx from 'clsx';
import { Star } from 'lucide-react';
import { Typography } from '../Typography/Typography';
import { Button } from '../Button/Button';
import styles from './ApplicationCard.module.css';

export interface ApplicationCardProps {
  workerName: string;
  workerAvatar?: string;
  rating: number;
  price: string;
  message: string;
  onAccept?: () => void;
  onReject?: () => void;
  className?: string;
}

export const ApplicationCard: React.FC<ApplicationCardProps> = ({
  workerName,
  workerAvatar,
  rating,
  price,
  message,
  onAccept,
  onReject,
  className
}) => {
  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className={clsx(styles.card, className)}>
      <div className={styles.header}>
        {workerAvatar ? (
          <img src={workerAvatar} alt={workerName} className={styles.avatarImage} />
        ) : (
          <div className={styles.avatarFallback}>{getInitials(workerName)}</div>
        )}
        
        <div className={styles.userInfo}>
          <Typography variant="body" className={styles.name}>{workerName}</Typography>
          <div className={styles.rating}>
            <Star size={14} fill="currentColor" strokeWidth={0} />
            <span>{rating.toFixed(1)}</span>
          </div>
        </div>

        <div className={styles.price}>
          {price}
        </div>
      </div>

      <div className={styles.message}>
        {message}
      </div>

      <div className={styles.actions}>
        <Button 
          variant="secondary" 
          onClick={onReject} 
          className={styles.btnReject}
          fullWidth
        >
          Rad etish
        </Button>
        <Button 
          variant="primary" 
          onClick={onAccept} 
          className={styles.btnAccept}
          fullWidth
        >
          Qabul qilish
        </Button>
      </div>
    </div>
  );
};

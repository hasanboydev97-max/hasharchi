import React from 'react';
import clsx from 'clsx';
import styles from './Avatar.module.css';
import { BadgeCheck } from 'lucide-react';

interface AvatarProps {
  src: string;
  alt: string;
  size?: 'large' | 'medium' | 'small';
  verified?: boolean;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'medium',
  verified = false,
  className,
}) => {
  return (
    <div className={clsx(styles.container, styles[`size-${size}`], className)}>
      <img src={src} alt={alt} className={styles.image} />
      {verified && (
        <div className={styles.verifiedBadge}>
          <BadgeCheck className={styles.verifiedIcon} />
        </div>
      )}
    </div>
  );
};

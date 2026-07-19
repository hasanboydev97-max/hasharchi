import React from 'react';
import { Star, MapPin, BadgeCheck, Zap } from 'lucide-react';
import clsx from 'clsx';
import styles from './UstaCard.module.css';

export interface UstaCardData {
  id: string;
  name: string;
  category: string;
  price: string;         // "80,000 so'm/soat"
  rating: number;        // 4.8
  reviews: number;       // 124
  image: string;
  experience?: number;   // yillar, masalan 6
  distance?: string;     // "1.2 km"
  isVerified?: boolean;
  isTopRated?: boolean;
  isOnline?: boolean;
}

interface UstaCardProps {
  data: UstaCardData;
  variant?: 'horizontal' | 'vertical';
  onClick?: () => void;
  className?: string;
}

export const UstaCard: React.FC<UstaCardProps> = ({
  data,
  variant = 'vertical',
  onClick,
  className,
}) => {
  const {
    name,
    category,
    price,
    rating,
    reviews,
    image,
    experience,
    distance,
    isVerified = false,
    isTopRated = false,
    isOnline = false,
  } = data;

  if (variant === 'horizontal') {
    return (
      <div
        className={clsx(styles.cardH, className)}
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && onClick?.()}
      >
        <div className={styles.imageWrapH}>
          <img src={image} alt={name} className={styles.imageH} />
          {isOnline && <span className={styles.onlineDot} />}
        </div>

        <div className={styles.bodyH}>
          <div className={styles.topRow}>
            <div className={styles.nameRow}>
              <span className={styles.name}>{name}</span>
              {isVerified && (
                <BadgeCheck size={15} className={styles.verifiedIcon} />
              )}
            </div>
            {isTopRated && (
              <span className={styles.badgeTop}>
                <Zap size={10} />
                Top
              </span>
            )}
          </div>

          <span className={styles.category}>{category}</span>

          <div className={styles.metaRow}>
            <div className={styles.ratingChip}>
              <Star size={12} className={styles.starIcon} />
              <span>{rating.toFixed(1)}</span>
              <span className={styles.reviewCount}>({reviews})</span>
            </div>
            {experience && (
              <span className={styles.expText}>{experience} yil tajriba</span>
            )}
          </div>

          <div className={styles.bottomRow}>
            <span className={styles.price}>{price}</span>
            {distance && (
              <div className={styles.distanceChip}>
                <MapPin size={11} />
                {distance}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Vertical (card grid uchun)
  return (
    <div
      className={clsx(styles.cardV, className)}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick?.()}
    >
      {/* Badge'lar — yuqori chap/o'ng burcha */}
      <div className={styles.badges}>
        {isTopRated && (
          <span className={styles.badgeTop}>
            <Zap size={10} />
            Top Usta
          </span>
        )}
      </div>

      <div className={styles.imageWrapV}>
        <img src={image} alt={name} className={styles.imageV} />
        {isOnline && <span className={styles.onlineDot} />}
      </div>

      <div className={styles.bodyV}>
        <div className={styles.nameRow}>
          <span className={styles.name}>{name}</span>
          {isVerified && (
            <BadgeCheck size={14} className={styles.verifiedIcon} />
          )}
        </div>
        <span className={styles.category}>{category}</span>

        <div className={styles.ratingChip}>
          <Star size={12} className={styles.starIcon} />
          <span>{rating.toFixed(1)}</span>
          <span className={styles.reviewCount}>({reviews})</span>
        </div>

        <div className={styles.footer}>
          <span className={styles.price}>{price}</span>
          {distance && (
            <div className={styles.distanceChip}>
              <MapPin size={11} />
              {distance}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

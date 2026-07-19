import React, { useState } from 'react';
import { BadgeCheck } from 'lucide-react';
import { clsx } from 'clsx';
import { StarRating } from '../StarRating/StarRating';
import styles from './ReviewCard.module.css';

export interface ReviewCardProps {
  reviewerName: string;
  reviewerImage?: string;
  rating: number;
  text: string;
  date: string;
  jobCategory?: string;
  isVerified?: boolean;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  reviewerName,
  reviewerImage,
  rating,
  text,
  date,
  jobCategory,
  isVerified,
}) => {
  const [expanded, setExpanded] = useState(false);

  const initials = reviewerName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.reviewerInfo}>
          {reviewerImage ? (
            <img
              src={reviewerImage}
              alt={reviewerName}
              className={styles.avatar}
            />
          ) : (
            <div className={styles.avatarFallback}>{initials}</div>
          )}
          <div className={styles.nameContainer}>
            <div className={styles.nameRow}>
              <span className={styles.name}>{reviewerName}</span>
              {isVerified && (
                <BadgeCheck
                  size={16}
                  className={styles.verifiedIcon}
                  strokeWidth={2.5}
                />
              )}
            </div>
            {jobCategory && (
              <span className={styles.categoryChip}>{jobCategory}</span>
            )}
          </div>
        </div>
        <div className={styles.ratingInfo}>
          <StarRating value={rating} size={14} />
          <span className={styles.date}>{date}</span>
        </div>
      </div>

      <div className={styles.content}>
        <p className={clsx(styles.text, !expanded && styles.clamped)}>
          {text}
        </p>
        {text.length > 120 && (
          <button
            className={styles.toggleBtn}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? 'Yashirish' : "...Ko'proq"}
          </button>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { clsx } from 'clsx';
import styles from './StarRating.module.css';

export interface StarRatingProps {
  value: number;
  max?: number;
  size?: number;
  showValue?: boolean;
  reviewCount?: number;
  interactive?: boolean;
  onChange?: (val: number) => void;
}

export const StarRating: React.FC<StarRatingProps> = ({
  value,
  max = 5,
  size = 16,
  showValue = false,
  reviewCount,
  interactive = false,
  onChange,
}) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const displayValue = hoverValue !== null ? hoverValue : value;

  const handleClick = (index: number) => {
    if (interactive && onChange) {
      onChange(index);
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= max; i++) {
      const isFull = i <= Math.floor(displayValue);
      const isPartial = !isFull && i === Math.ceil(displayValue);
      const partialPercentage = isPartial
        ? (displayValue - Math.floor(displayValue)) * 100
        : 0;

      stars.push(
        <div
          key={i}
          className={clsx(
            styles.starWrapper,
            interactive && styles.interactive
          )}
          style={{ width: size, height: size }}
          onMouseEnter={() => interactive && setHoverValue(i)}
          onMouseLeave={() => interactive && setHoverValue(null)}
          onClick={() => handleClick(i)}
        >
          {/* Base star (empty) */}
          <Star
            size={size}
            className={styles.starEmpty}
            strokeWidth={2}
          />
          {/* Filled star (clip-path for partial) */}
          {(isFull || isPartial) && (
            <div
              className={styles.starFilledWrapper}
              style={{
                clipPath: isPartial
                  ? `polygon(0 0, ${partialPercentage}% 0, ${partialPercentage}% 100%, 0 100%)`
                  : 'none',
              }}
            >
              <Star
                size={size}
                className={styles.starFilled}
                strokeWidth={2}
              />
            </div>
          )}
        </div>
      );
    }
    return stars;
  };

  return (
    <div className={styles.container}>
      <div className={styles.stars}>{renderStars()}</div>
      {showValue && (
        <span className={styles.valueText}>
          {value.toFixed(1)}
        </span>
      )}
      {reviewCount !== undefined && (
        <span className={styles.reviewCount}>
          ({reviewCount} ta sharh)
        </span>
      )}
    </div>
  );
};

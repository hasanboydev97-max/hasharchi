import React from 'react';
import clsx from 'clsx';
import styles from './KasbiChip.module.css';

export interface KasbiChipData {
  id: string;
  label: string;
  icon: React.ReactNode;  // lucide-react icon elementi
  count?: number;          // xizmatlar soni
}

interface KasbiChipProps {
  data: KasbiChipData;
  isActive?: boolean;
  onClick?: (id: string) => void;
  size?: 'sm' | 'md';
}

export const KasbiChip: React.FC<KasbiChipProps> = ({
  data,
  isActive = false,
  onClick,
  size = 'md',
}) => {
  return (
    <button
      className={clsx(
        styles.chip,
        styles[`size-${size}`],
        isActive && styles.active
      )}
      onClick={() => onClick?.(data.id)}
      type="button"
    >
      <span className={clsx(styles.iconBox, isActive && styles.iconBoxActive)}>
        {data.icon}
      </span>
      <span className={styles.label}>{data.label}</span>
      {data.count !== undefined && (
        <span className={clsx(styles.count, isActive && styles.countActive)}>
          {data.count}
        </span>
      )}
    </button>
  );
};

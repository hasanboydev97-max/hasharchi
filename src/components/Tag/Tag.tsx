import React from 'react';
import clsx from 'clsx';
import styles from './Tag.module.css';

interface TagProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  active?: boolean;
}

export const Tag: React.FC<TagProps> = ({ label, active = false, className, ...props }) => {
  return (
    <button className={clsx(styles.tag, active && styles.active, className)} {...props}>
      {label}
    </button>
  );
};

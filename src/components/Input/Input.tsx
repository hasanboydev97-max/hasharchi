import React from 'react';
import clsx from 'clsx';
import styles from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ label, error, leftIcon, className, ...props }) => {
  return (
    <div className={clsx(styles.container, className)}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={clsx(styles.inputWrapper, error && styles.errorWrapper)}>
        {leftIcon && <div className={styles.leftIcon}>{leftIcon}</div>}
        <input className={styles.input} {...props} />
      </div>
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};

import React from 'react';
import clsx from 'clsx';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'large' | 'medium' | 'small';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  fullWidth,
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={clsx(
        styles.button,
        styles[`variant-${variant}`],
        styles[`size-${size}`],
        fullWidth && styles.fullWidth,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

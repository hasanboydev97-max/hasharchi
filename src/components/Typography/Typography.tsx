import React from 'react';
import clsx from 'clsx';
import styles from './Typography.module.css';

interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption';
  color?: 'main' | 'muted' | 'white';
  align?: 'left' | 'center' | 'right';
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  color = 'main',
  align = 'left',
  className,
  style,
  children,
}) => {
  const Component = variant.startsWith('h') ? variant : 'p';

  return (
    <Component
      style={style}
      className={clsx(
        styles.text,
        styles[`variant-${variant}`],
        styles[`color-${color}`],
        styles[`align-${align}`],
        className
      )}
    >
      {children}
    </Component>
  );
};

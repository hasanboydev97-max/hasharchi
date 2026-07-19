import { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import styles from './ProgressiveImage.module.css';

interface ProgressiveImageProps {
  src: string;
  alt?: string;
  className?: string; // Wrapper uchun class (o'lchamlar, animation va radiusni meros qilib olishi uchun)
  imgClassName?: string; // Ichki img tegiga maxsus qo'shish uchun
}

export const ProgressiveImage = ({ src, alt, className, imgClassName }: ProgressiveImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Agar src o'zgarsa, loadni boshqatdan boshlaymiz
  useEffect(() => {
    setIsLoaded(false);
  }, [src]);

  return (
    <div className={clsx(styles.wrapper, className)}>
      <div className={clsx(styles.skeleton, isLoaded && styles.skeletonHidden)} />
      <img
        src={src}
        alt={alt}
        className={clsx(styles.image, isLoaded && styles.loaded, imgClassName)}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
};

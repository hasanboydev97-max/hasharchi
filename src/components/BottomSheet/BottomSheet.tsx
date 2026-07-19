import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import clsx from 'clsx';
import { X } from 'lucide-react';
import styles from './BottomSheet.module.css';

export interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  height?: 'auto' | 'half' | 'full';
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  children,
  height = 'auto',
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;

  const content = (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={clsx(styles.panel, styles[height])}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className={styles.dragIndicatorWrapper}>
          <div className={styles.dragIndicator} />
        </div>
        
        {title && (
          <div className={styles.header}>
            <h3 className={styles.title}>{title}</h3>
            <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Yopish">
              <X size={24} strokeWidth={2} />
            </button>
          </div>
        )}
        
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(content, modalRoot);
};

import React from 'react';
import ReactDOM from 'react-dom';
import { CheckCircle } from 'lucide-react';
import { Button } from '../Button/Button';
import styles from './SuccessModal.module.css';

export interface SuccessModalProps {
  isOpen: boolean;
  title: string;
  message?: string;
  ctaLabel?: string;
  onClose: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  title,
  message,
  ctaLabel = 'Davom etish',
  onClose,
}) => {
  if (!isOpen) return null;

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;

  const content = (
    <div className={styles.overlay}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
      >
        <div className={styles.iconCircle}>
          <CheckCircle size={40} strokeWidth={2} className={styles.icon} />
        </div>
        
        <h2 className={styles.title}>{title}</h2>
        
        {message && (
          <p className={styles.message}>{message}</p>
        )}
        
        <div className={styles.action}>
          <Button variant="primary" fullWidth onClick={onClose}>
            {ctaLabel}
          </Button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(content, modalRoot);
};

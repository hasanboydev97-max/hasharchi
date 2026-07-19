import React from 'react';
import ReactDOM from 'react-dom';
import clsx from 'clsx';
import { Info, AlertTriangle } from 'lucide-react';
import { Button } from '../Button/Button';
import { Typography } from '../Typography/Typography';
import styles from './ConfirmModal.module.css';

export interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'default' | 'danger';
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Tasdiqlash',
  cancelLabel = 'Bekor qilish',
  variant = 'default',
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;

  const isDanger = variant === 'danger';
  const Icon = isDanger ? AlertTriangle : Info;

  const content = (
    <div className={styles.overlay} onClick={onCancel}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className={clsx(styles.iconContainer, isDanger && styles.iconDanger)}>
          <Icon size={28} strokeWidth={2} className={isDanger ? styles.iconColorDanger : styles.iconColorDefault} />
        </div>
        <h2 className={styles.title}>{title}</h2>
        {message && (
          <p className={styles.message}>{message}</p>
        )}
        <div className={styles.actions}>
          <div className={styles.actionItem}>
            <Button variant="secondary" fullWidth onClick={onCancel}>
              {cancelLabel}
            </Button>
          </div>
          <div className={styles.actionItem}>
            <Button
              variant="primary"
              fullWidth
              onClick={onConfirm}
            >
              {confirmLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(content, modalRoot);
};

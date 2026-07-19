import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Star, X } from 'lucide-react';
import { MobileLayout } from '../../components/Layout/MobileLayout';
import { Button } from '../../components/Button/Button';
import styles from './Receipt.module.css';

export const Receipt = () => {
  const navigate = useNavigate();
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(0);

  const handlePay = () => {
    // To'lov mock: darhol baholash modalini ochamiz
    setShowRating(true);
  };

  const submitRating = () => {
    setShowRating(false);
    navigate('/');
  };

  return (
    <MobileLayout>
      <div className={styles.page}>
        
        <div className={styles.successHeader}>
          <div className={styles.successIcon}>
            <Check size={32} strokeWidth={3} />
          </div>
          <h2 className={styles.successTitle}>Ish yakunlandi</h2>
          <p className={styles.successSubtitle}>Xizmatdan foydalanganingiz uchun rahmat</p>
        </div>

        {/* Receipt Card */}
        <div className={styles.receiptCard}>
          <div className={styles.receiptContent}>
            
            <div className={styles.receiptHeader}>
              <div>
                <div className={styles.brand}>HASHARCHI</div>
                <div className={styles.orderId}>Buyurtma: #ORD-9021</div>
              </div>
              <div className={styles.date}>
                {new Date().toLocaleDateString('uz-UZ')}
              </div>
            </div>

            <div className={styles.row}>
              <span>Asosiy xizmat</span>
              <span>150 000 so'm</span>
            </div>
            <div className={styles.row}>
              <span>Ehtiyot qismlar</span>
              <span>25 000 so'm</span>
            </div>
            <div className={styles.row} style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
              <span>Platforma xizmat haqi</span>
              <span>5 000 so'm</span>
            </div>

            <div className={`${styles.row} ${styles.total}`}>
              <span>Jami:</span>
              <span>180 000 so'm</span>
            </div>

          </div>
        </div>

      </div>

      <div className={styles.bottomFixed}>
        <Button variant="primary" size="large" fullWidth onClick={handlePay}>
          To'lash (180 000 so'm)
        </Button>
      </div>

      {/* Rating Bottom Sheet / Modal */}
      {showRating && (
        <div className={styles.modalOverlay} onClick={() => setShowRating(false)}>
          <div className={styles.bottomSheet} onClick={e => e.stopPropagation()}>
            <div className={styles.sheetHeader}>
              <h3 className={styles.sheetTitle}>Ustani baholang</h3>
              <button className={styles.starBtn} onClick={() => setShowRating(false)}>
                <X size={24} />
              </button>
            </div>
            
            <div className={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button 
                  key={star} 
                  className={`${styles.starBtn} ${rating >= star ? styles.starActive : ''}`}
                  onClick={() => setRating(star)}
                >
                  <Star size={40} fill={rating >= star ? 'currentColor' : 'none'} strokeWidth={1.5} />
                </button>
              ))}
            </div>

            <textarea 
              className={styles.commentInput} 
              placeholder="Fikringizni qoldiring (ixtiyoriy)..."
            />

            <Button variant="primary" size="large" fullWidth onClick={submitRating} disabled={rating === 0}>
              Yuborish
            </Button>
          </div>
        </div>
      )}

    </MobileLayout>
  );
};

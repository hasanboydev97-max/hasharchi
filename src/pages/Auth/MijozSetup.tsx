import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Check, MapPin, User, Search, MessageSquare, CheckCircle2, Rocket } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/Button/Button';
import styles from './MijozSetup.module.css';
import clsx from 'clsx';

const SHAHARLAR = ['Toshkent', 'Samarqand', 'Buxoro', 'Namangan', 'Andijon', 'Farg\'ona', 'Nukus'];

export const MijozSetup = () => {
  const [step, setStep]  = useState(1);
  const [ism, setIsm]    = useState('');
  const [shahar, setShahar] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const canNext = step === 1 ? ism.trim().length >= 2 && shahar !== '' : true;

  const handleFinish = () => {
    login('mijoz');
    navigate('/', { replace: true });
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <button
          className={styles.backBtn}
          onClick={() => step === 1 ? navigate(-1) : setStep(1)}
          type="button"
        >
          <ChevronRight size={20} style={{ transform: 'rotate(180deg)' }} />
        </button>
        <span className={styles.stepLabel}>{step} / 2</span>
        <div style={{ width: 36 }} />
      </div>

      {/* Progress */}
      <div className={styles.progressTrack}>
        <div className={styles.progressFill} style={{ width: `${(step / 2) * 100}%` }} />
      </div>

      <div className={styles.content}>

        {/* ═══ STEP 1: Ma'lumotlar ═══ */}
        {step === 1 && (
          <div className={styles.stepBlock}>
            <h1 className={styles.stepTitle}>Siz haqingizda</h1>
            <p className={styles.stepSub}>Asosiy ma'lumotlarni kiriting</p>

            {/* Ism */}
            <div className={styles.field}>
              <label className={styles.fieldLabel}>
                <User size={14} />
                Ism-familiyangiz
              </label>
              <input
                className={styles.fieldInput}
                type="text"
                placeholder="Hasan Toshmatov"
                value={ism}
                onChange={e => setIsm(e.target.value)}
                autoFocus
              />
            </div>

            {/* Shahar */}
            <div className={styles.field}>
              <label className={styles.fieldLabel}>
                <MapPin size={14} />
                Shahringiz
              </label>
              <div className={styles.shaharGrid}>
                {SHAHARLAR.map(sh => (
                  <button
                    key={sh}
                    className={clsx(styles.shaharChip, shahar === sh && styles.shaharChipSel)}
                    onClick={() => setShahar(sh)}
                    type="button"
                  >
                    {shahar === sh && <Check size={12} />}
                    {sh}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ═══ STEP 2: Preview ═══ */}
        {step === 2 && (
          <div className={styles.stepBlock}>
            <h1 className={styles.stepTitle}>Profilingiz tayyor!</h1>
            <p className={styles.stepSub}>Usta izlashni boshlashingiz mumkin</p>

            <div className={styles.previewCard}>
              <div className={styles.avatar}>
                {ism.charAt(0).toUpperCase()}
              </div>
              <div className={styles.previewInfo}>
                <div className={styles.previewName}>{ism}</div>
                <div className={styles.previewRole}>Mijoz</div>
                <div className={styles.previewCity}>
                  <MapPin size={13} />
                  {shahar}
                </div>
              </div>
            </div>

            <div className={styles.readyBox}>
              <div className={styles.readyItem}>
                <Search size={22} className={styles.readyIcon} />
                <span>500+ tasdiqlangan ustalarni ko'ring</span>
              </div>
              <div className={styles.readyItem}>
                <MessageSquare size={22} className={styles.readyIcon} />
                <span>Narx va vaqt bo'yicha kelishing</span>
              </div>
              <div className={styles.readyItem}>
                <CheckCircle2 size={22} className={styles.readyIcon} />
                <span>Ish tugagach baholang</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <Button
          variant="primary"
          size="large"
          fullWidth
          disabled={!canNext}
          onClick={step === 2 ? handleFinish : () => setStep(2)}
        >
          {step === 2 ? <><Rocket size={18} /> Usta izlashni boshlash</> : 'Keyingi'}
        </Button>
      </div>
    </div>
  );
};

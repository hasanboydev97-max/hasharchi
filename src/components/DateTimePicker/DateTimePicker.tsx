import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import styles from './DateTimePicker.module.css';
import clsx from 'clsx';

interface DateTimePickerProps {
  value: { date: string; time: string };
  onChange: (val: { date: string; time: string }) => void;
}

const DATES = [
  { id: 'bugun', label: 'Bugun' },
  { id: 'ertaga', label: 'Ertaga' },
  { id: 'boshqa', label: 'Boshqa sana' }
];

const TIMES = [
  { id: 'ertalab', label: 'Ertalab (08:00 - 12:00)' },
  { id: 'tushdan_keyin', label: 'Tushdan keyin (12:00 - 17:00)' },
  { id: 'kechqurun', label: 'Kechqurun (17:00 - 21:00)' }
];

export const DateTimePicker = ({ value, onChange }: DateTimePickerProps) => {
  
  const handleDate = (id: string) => onChange({ ...value, date: id });
  const handleTime = (id: string) => onChange({ ...value, time: id });

  return (
    <div className={styles.container}>
      
      <div className={styles.section}>
        <div className={styles.label}>
          <CalendarIcon size={16} /> Qachon kelishlari kerak?
        </div>
        <div className={styles.optionsGrid}>
          {DATES.map(d => (
            <button
              key={d.id}
              type="button"
              className={clsx(styles.optionCard, value.date === d.id && styles.active)}
              onClick={() => handleDate(d.id)}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.label}>
          <Clock size={16} /> Qaysi vaqtda?
        </div>
        <div className={styles.optionsList}>
          {TIMES.map(t => (
            <button
              key={t.id}
              type="button"
              className={clsx(styles.optionRow, value.time === t.id && styles.activeRow)}
              onClick={() => handleTime(t.id)}
            >
              <div className={styles.radioCircle}>
                {value.time === t.id && <div className={styles.radioDot} />}
              </div>
              <span>{t.label}</span>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};

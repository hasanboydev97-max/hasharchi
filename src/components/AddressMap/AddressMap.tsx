import { MapPin } from 'lucide-react';
import styles from './AddressMap.module.css';

interface AddressMapProps {
  value: string;
  onChange: (val: string) => void;
}

export const AddressMap = ({ value, onChange }: AddressMapProps) => {
  return (
    <div className={styles.container}>
      {/* Kichik qalbaki xarita / placeholder */}
      <div className={styles.mapBox}>
        <div className={styles.mapOverlay}>
          <div className={styles.pin}>
            <MapPin size={24} color="white" />
          </div>
          <div className={styles.mapPulse} />
        </div>
        <img 
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800&h=400" 
          alt="Map placeholder" 
          className={styles.mapImage}
        />
      </div>

      <div className={styles.inputWrap}>
        <div className={styles.inputIcon}>
          <MapPin size={18} />
        </div>
        <input 
          type="text" 
          placeholder="Aniq manzilingizni kiriting"
          className={styles.input}
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};

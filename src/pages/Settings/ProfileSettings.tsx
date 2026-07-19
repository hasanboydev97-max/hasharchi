import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, User, Phone, MapPin, Briefcase } from 'lucide-react';
import { Button } from '../../components/Button/Button';
import { useAuth } from '../../context/AuthContext';
import styles from './ProfileSettings.module.css';

export const ProfileSettings: React.FC = () => {
  const navigate = useNavigate();
  const { role } = useAuth();
  
  const [name, setName] = useState('Hasanboy');
  const [phone, setPhone] = useState('+998 90 123 45 67');
  const [city, setCity] = useState('Toshkent, Yunusobod');
  const [bio, setBio] = useState('Tajribali usta');

  const handleSave = () => {
    // Save logic
    navigate(-1);
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </button>
        <h1 className={styles.title}>Shaxsiy ma'lumotlar</h1>
      </header>

      <div className={styles.content}>
        
        <div className={styles.avatarSection}>
          <div className={styles.avatarWrap}>
            <div className={styles.avatar}>
              {name.charAt(0).toUpperCase()}
            </div>
            <button className={styles.cameraBtn}>
              <Camera size={14} strokeWidth={3} />
            </button>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Ism va Familiya</label>
          <div className={styles.inputWrap}>
            <User size={20} className={styles.inputIcon} />
            <input 
              type="text" 
              className={styles.input} 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Telefon raqam</label>
          <div className={styles.inputWrap}>
            <Phone size={20} className={styles.inputIcon} />
            <input 
              type="tel" 
              className={styles.input} 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Shahar va tuman</label>
          <div className={styles.inputWrap}>
            <MapPin size={20} className={styles.inputIcon} />
            <input 
              type="text" 
              className={styles.input} 
              value={city} 
              onChange={(e) => setCity(e.target.value)} 
            />
          </div>
        </div>

        {role === 'usta' && (
          <div className={styles.formGroup}>
            <label className={styles.label}>Qisqacha o'zingiz haqingizda</label>
            <div className={styles.inputWrap}>
              <Briefcase size={20} className={styles.inputIcon} />
              <input 
                type="text" 
                className={styles.input} 
                value={bio} 
                onChange={(e) => setBio(e.target.value)} 
              />
            </div>
          </div>
        )}

      </div>

      <div className={styles.footer}>
        <Button variant="primary" size="large" fullWidth onClick={handleSave}>
          Saqlash
        </Button>
      </div>
    </div>
  );
};

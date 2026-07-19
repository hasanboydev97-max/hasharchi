import React from 'react';
import { useNavigate } from 'react-router-dom';
import heroImage from '../../assets/xush kelibsiz.webp';
import { Button } from '../../components/Button/Button';
import { ProgressiveImage } from '../../components/ProgressiveImage/ProgressiveImage';
import styles from './Auth.module.css';

export const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.pageGradient}>
      <div className={styles.heroImageArea}>
        <ProgressiveImage src={heroImage} alt="Service" className={styles.heroImage} />
      </div>
      
      <div className={styles.welcomeContent}>
        <h2 className={styles.title} style={{ marginBottom: '12px' }}>Xush kelibsiz!</h2>
        <p className={styles.subtitle} style={{ marginBottom: '40px' }}>
          Uy, ofis va biznesingiz uchun eng yaxshi mutaxassislarni toping yoki o'z xizmatlaringizni taklif qiling.
        </p>
        
        <div className={styles.form} style={{ width: '100%', gap: '12px', marginTop: 'auto' }}>
          <Button 
            variant="primary" 
            size="large" 
            fullWidth 
            onClick={() => navigate('/auth/role', { state: { mode: 'register' } })}
          >
            Ro'yxatdan o'tish
          </Button>
          <Button 
            variant="secondary" 
            size="large" 
            fullWidth 
            onClick={() => navigate('/auth/role', { state: { mode: 'login' } })}
          >
            Kirish
          </Button>
        </div>
      </div>
    </div>
  );
};

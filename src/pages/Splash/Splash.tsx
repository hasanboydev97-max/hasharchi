import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logoUrl from '../../assets/logo-hasharchi.webp';
import styles from './Splash.module.css';

export const Splash = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const hasNavigated = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (hasNavigated.current) return;
      hasNavigated.current = true;
      if (isLoggedIn) {
        navigate('/', { replace: true });
      } else {
        navigate('/onboarding', { replace: true });
      }
    }, 2400);
    return () => clearTimeout(timer);
  }, [isLoggedIn, navigate]);

  return (
    <div className={styles.page}>
      {/* Fon dekoratsiyasi */}
      <div className={styles.deco1} />
      <div className={styles.deco2} />
      <div className={styles.deco3} />

      <div className={styles.center}>
        {/* Logo mark */}
        <div className={styles.logoWrap}>
          <div className={styles.logoRing} />
          <div className={styles.logoBox}>
            <img src={logoUrl} alt="Hasharchi Logo" className={styles.logoImage} />
          </div>
        </div>

        <div className={styles.brandName}>Hasharchi</div>
        <div className={styles.tagline}>Ishonchli ustalar platformasi</div>
      </div>

      {/* Loading indikator */}
      <div className={styles.loader}>
        <div className={styles.loaderBar} />
      </div>

      <p className={styles.version}>v1.0.0</p>
    </div>
  );
};

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './RouteManager.module.css';

export const RouteManager = () => {
  const location = useLocation();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    // 1. Scroll top immediately
    const wrapper = document.querySelector('.mobile-wrapper');
    if (wrapper) {
      wrapper.scrollTo(0, 0);
    }
    window.scrollTo(0, 0);

    // 2. Show loader
    setIsNavigating(true);

    // 3. Hide loader after 300ms (to feel smooth)
    const timer = setTimeout(() => {
      setIsNavigating(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (!isNavigating) return null;

  return (
    <div className={styles.loaderOverlay}>
      <div className={styles.spinner}></div>
    </div>
  );
};

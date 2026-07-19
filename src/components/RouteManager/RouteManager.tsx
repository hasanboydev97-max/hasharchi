import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './RouteManager.module.css';

// Loader ko'rsatilmaydigan sahifalar (faqatgina scroll to top ishlaydi)
const EXCLUDED_PATHS = [
  '/',
  '/onboarding',
  '/auth/welcome',
  '/auth/role',
  '/auth/phone',
  '/auth/verify',
  '/auth/setup',
  '/auth/hasharchi-setup',
  '/auth/mijoz-setup'
];

export const RouteManager = () => {
  const location = useLocation();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    // 1. Scroll top immediately (Hamma sahifa uchun ishlaydi)
    const wrapper = document.querySelector('.mobile-wrapper');
    if (wrapper) {
      wrapper.scrollTo(0, 0);
    }
    window.scrollTo(0, 0);

    // 2. Keraksiz joylarda loaderni o'chiramiz
    const shouldShowLoader = !EXCLUDED_PATHS.includes(location.pathname);

    if (shouldShowLoader) {
      setIsNavigating(true);

      // 3. Hide loader after 300ms (to feel smooth)
      const timer = setTimeout(() => {
        setIsNavigating(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  if (!isNavigating) return null;

  return (
    <div className={styles.loaderOverlay}>
      <div className={styles.spinner}></div>
    </div>
  );
};

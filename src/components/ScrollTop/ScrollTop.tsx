import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import styles from './ScrollTop.module.css';

export const ScrollTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = (e: Event) => {
      // Find the scroll position from the event target
      const target = e.target as HTMLElement;
      // We check if the scrolled element is our mobile-wrapper or window
      const scrollTop = target.scrollTop || window.scrollY;
      
      if (scrollTop > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Use capture phase (true) to catch scroll events from any nested scrollable container (.mobile-wrapper)
    window.addEventListener('scroll', toggleVisibility, true);
    
    return () => {
      window.removeEventListener('scroll', toggleVisibility, true);
    };
  }, []);

  const scrollToTop = () => {
    // Try to find the active .mobile-wrapper
    const wrapper = document.querySelector('.mobile-wrapper');
    if (wrapper) {
      wrapper.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div 
      className={`${styles.scrollTopBtn} ${isVisible ? styles.visible : ''}`} 
      onClick={scrollToTop}
      aria-label="Tepaga qaytish"
    >
      <ArrowUp size={22} strokeWidth={2.5} />
    </div>
  );
};

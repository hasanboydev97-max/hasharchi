import { useState, useEffect } from 'react';
import { X, Share, PlusSquare, Download } from 'lucide-react';
import { Button } from '../Button/Button';
import logoUrl from '../../assets/logo-hasharchi.webp';
import styles from './PWAInstallModal.module.css';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const PWAInstallModal = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (navigator as any).standalone;
    if (isStandalone) return;

    // Check if dismissed recently
    const dismissedAt = localStorage.getItem('pwa_install_dismissed');
    if (dismissedAt && Date.now() - parseInt(dismissedAt) < 1000 * 60 * 60 * 24 * 3) {
      // Don't show again for 3 days if dismissed
      return;
    }

    // iOS Detection
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    
    if (isIosDevice) {
      setIsIOS(true);
      // Show iOS prompt after 3 seconds
      const timer = setTimeout(() => setShowModal(true), 3000);
      return () => clearTimeout(timer);
    }

    // Android/Chrome beforeinstallprompt detection
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show prompt after 3 seconds
      setTimeout(() => setShowModal(true), 3000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowModal(false);
      }
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem('pwa_install_dismissed', Date.now().toString());
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <div className={styles.overlay} onClick={handleDismiss}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={handleDismiss}>
          <X size={20} />
        </button>

        <div className={styles.content}>
          <div className={styles.iconWrapper}>
            <img src={logoUrl} alt="Hasharchi Logo" className={styles.logo} />
          </div>
          
          <h2 className={styles.title}>Hasharchi ilovasini o'rnating</h2>
          <p className={styles.subtitle}>
            Tezroq kirish, bildirishnomalar va oflayn rejimda ishlash uchun ilovani telefoningizga o'rnatib oling.
          </p>

          {isIOS ? (
            <div className={styles.iosInstructions}>
              <div className={styles.instructionRow}>
                <div className={styles.iconBox}>
                  <Share size={18} />
                </div>
                <span>1. Brauzer pastidagi "Ulashish" tugmasini bosing.</span>
              </div>
              <div className={styles.instructionRow}>
                <div className={styles.iconBox}>
                  <PlusSquare size={18} />
                </div>
                <span>2. "Asosiy ekranga qo'shish" (Add to Home Screen) ni tanlang.</span>
              </div>
            </div>
          ) : (
            <Button 
              variant="primary" 
              size="large" 
              fullWidth 
              onClick={handleInstall}
            >
              <Download size={20} /> O'rnatib olish
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

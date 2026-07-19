import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User, Wallet, Bell, Settings, HelpCircle, LogOut,
  ChevronRight, Star, Briefcase, MapPin, Shield, Edit3,
  BadgeCheck, TrendingUp,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ConfirmModal } from '../../components/ConfirmModal/ConfirmModal';
import styles from './MyProfile.module.css';

interface MenuItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  badge?: string;
  route?: string;
}

const CLIENT_MENU: MenuItem[] = [
  { id: 'info',    icon: <User size={19} />,        label: 'Shaxsiy ma\'lumotlar',  route: '/settings/profile' },
  { id: 'wallet',  icon: <Wallet size={19} />,      label: 'To\'lov usullari',       route: '/settings/payment' },
  { id: 'bell',    icon: <Bell size={19} />,        label: 'Bildirishnomalar',       badge: '3', route: '/notifications' },
  { id: 'settings',icon: <Settings size={19} />,    label: 'Sozlamalar',             route: '/settings' },
  { id: 'help',    icon: <HelpCircle size={19} />,  label: 'Yordam va qo\'llab-quvvatlash', route: '/help' },
];

const WORKER_MENU: MenuItem[] = [
  { id: 'info',    icon: <User size={19} />,        label: 'Profilni tahrirlash',   route: '/settings/profile' },
  { id: 'stats',   icon: <TrendingUp size={19} />,  label: 'Statistika va tahlil',  route: '/stats' },
  { id: 'wallet',  icon: <Wallet size={19} />,      label: 'Daromad va to\'lovlar',  route: '/settings/payment' },
  { id: 'bell',    icon: <Bell size={19} />,        label: 'Bildirishnomalar',       badge: '2', route: '/notifications' },
  { id: 'verify',  icon: <Shield size={19} />,      label: 'Verifikatsiya',          route: '/verify' },
  { id: 'settings',icon: <Settings size={19} />,    label: 'Sozlamalar',             route: '/settings' },
  { id: 'help',    icon: <HelpCircle size={19} />,  label: 'Yordam',                 route: '/help' },
];

export const MyProfile = () => {
  const { role, logout } = useAuth();
  const navigate         = useNavigate();
  const [logoutModal, setLogoutModal] = useState(false);
  const isWorker = role === 'usta';
  const menu = isWorker ? WORKER_MENU : CLIENT_MENU;

  const handleLogout = () => {
    logout();
    navigate('/auth/welcome', { replace: true });
  };

  return (
    <div className={styles.page}>

      {/* ═══ HERO ═══ */}
      <div className={styles.hero}>
        <div className={styles.heroGradient} />

        {/* Avatar */}
        <div className={styles.avatarWrap}>
          <div className={styles.avatar}>
            {isWorker ? 'U' : 'M'}
          </div>
          <button className={styles.editAvatar} type="button" aria-label="Rasm o'zgartirish">
            <Edit3 size={14} />
          </button>
          {isWorker && (
            <div className={styles.verifyBadge} title="Tasdiqlangan">
              <BadgeCheck size={16} />
            </div>
          )}
        </div>

        <div className={styles.heroName}>{isWorker ? 'Usta' : 'Mijoz'}</div>
        <div className={styles.heroRole}>
          {isWorker ? (
            <span className={styles.workerTag}>
              <Briefcase size={12} /> Hasharchi (Usta)
            </span>
          ) : (
            <span className={styles.clientTag}>
              <MapPin size={12} /> Toshkent, Yunusobod
            </span>
          )}
        </div>

        {/* Statistika (faqat usta uchun) */}
        {isWorker && (
          <div className={styles.statsRow}>
            <div className={styles.statBox}>
              <span className={styles.statNum}>47</span>
              <span className={styles.statLabel}>Ish</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statBox}>
              <span className={styles.statNum}>4.9</span>
              <span className={styles.statLabel}>Reyting</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statBox}>
              <span className={styles.statNum}>98%</span>
              <span className={styles.statLabel}>Tasdiqlash</span>
            </div>
          </div>
        )}
      </div>

      {/* ═══ KONTENT ═══ */}
      <div className={styles.content}>

        {/* Hamyon kartasi (mijoz) */}
        {!isWorker && (
          <div className={styles.walletCard}>
            <div className={styles.walletTop}>
              <div>
                <div className={styles.walletLabel}>Hamyon balansi</div>
                <div className={styles.walletAmount}>250 000 <span>so'm</span></div>
              </div>
              <div className={styles.walletIcon}>
                <Wallet size={22} />
              </div>
            </div>
            <button className={styles.topupBtn} type="button">
              + To'ldirish
            </button>
          </div>
        )}

        {/* Reyting kartasi (usta) */}
        {isWorker && (
          <div className={styles.ratingCard}>
            <Star size={20} className={styles.ratingIcon} fill="currentColor" />
            <div>
              <div className={styles.ratingLabel}>Umumiy reyting</div>
              <div className={styles.ratingValue}>4.9 / 5.0 <span>(120 ta sharh)</span></div>
            </div>
            <ChevronRight size={18} className={styles.ratingArrow} />
          </div>
        )}

        {/* Menu ro'yxati */}
        <div className={styles.menuSection}>
          <div className={styles.menuList}>
            {menu.map(item => (
              <button
                key={item.id}
                className={styles.menuItem}
                onClick={() => item.route && navigate(item.route)}
                type="button"
              >
                <div className={styles.menuLeft}>
                  <span className={styles.menuIcon}>{item.icon}</span>
                  <span className={styles.menuLabel}>{item.label}</span>
                </div>
                <div className={styles.menuRight}>
                  {item.badge && (
                    <span className={styles.menuBadge}>{item.badge}</span>
                  )}
                  <ChevronRight size={17} className={styles.menuArrow} />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chiqish tugmasi */}
        <button
          className={styles.logoutBtn}
          onClick={() => setLogoutModal(true)}
          type="button"
        >
          <LogOut size={18} />
          Tizimdan chiqish
        </button>

        <p className={styles.versionText}>Hasharchi v1.0.0</p>
      </div>

      {/* ═══ LOGOUT MODAL ═══ */}
      <ConfirmModal
        isOpen={logoutModal}
        title="Tizimdan chiqish"
        message="Hisobingizdan chiqmoqchimisiz? Qayta kirish uchun telefon raqamingiz kerak bo'ladi."
        confirmLabel="Ha, chiqish"
        cancelLabel="Yo'q"
        variant="danger"
        onConfirm={handleLogout}
        onCancel={() => setLogoutModal(false)}
      />
    </div>
  );
};

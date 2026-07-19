import { NavLink } from 'react-router-dom';
import { Home, Briefcase, MessageSquare, User, Plus } from 'lucide-react';
import styles from './BottomNavigation.module.css';
import { useAuth } from '../../context/AuthContext';

export const BottomNavigation = () => {
  const { role } = useAuth();

  return (
    <div className={styles.navWrapper}>
      <nav className={styles.nav}>
        <NavLink to="/" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
          {({ isActive }) => (
            <>
              <div className={styles.iconWrapper}>
                <Home size={22} strokeWidth={isActive ? 2.5 : 2} color={isActive ? '#fff' : 'currentColor'} />
              </div>
              <span className={styles.navLabel}>Bosh</span>
            </>
          )}
        </NavLink>

        <NavLink to="/orders" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
          {({ isActive }) => (
            <>
              <div className={styles.iconWrapper}>
                <Briefcase size={22} strokeWidth={isActive ? 2.5 : 2} color={isActive ? '#fff' : 'currentColor'} />
              </div>
              <span className={styles.navLabel}>E'lonlar</span>
            </>
          )}
        </NavLink>

        {role === 'mijoz' && (
          <NavLink to="/add" className={styles.addBtn}>
            <div className={styles.addBtnInner}>
              <Plus size={24} color="#fff" strokeWidth={3} />
            </div>
          </NavLink>
        )}

        <NavLink to="/chat" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
          {({ isActive }) => (
            <>
              <div className={styles.iconWrapper}>
                <MessageSquare size={22} strokeWidth={isActive ? 2.5 : 2} color={isActive ? '#fff' : 'currentColor'} />
              </div>
              <span className={styles.navLabel}>Chat</span>
            </>
          )}
        </NavLink>

        <NavLink to="/profile/me" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
          {({ isActive }) => (
            <>
              <div className={styles.iconWrapper}>
                <User size={22} strokeWidth={isActive ? 2.5 : 2} color={isActive ? '#fff' : 'currentColor'} />
              </div>
              <span className={styles.navLabel}>Profil</span>
            </>
          )}
        </NavLink>
      </nav>
    </div>
  );
};

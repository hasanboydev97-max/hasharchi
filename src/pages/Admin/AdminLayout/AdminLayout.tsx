import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Briefcase, DollarSign, 
  Settings, LogOut, Menu, Bell, Search 
} from 'lucide-react';
import { useState } from 'react';
import logoUrl from '../../../assets/logo-hasharchi.webp';
import { useAuth } from '../../../context/AuthContext';
import styles from './AdminLayout.module.css';
import { clsx } from 'clsx';

export const AdminLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/auth/welcome');
  };

  const menuItems = [
    { id: 'dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/admin' },
    { id: 'users',     icon: <Users size={20} />,           label: 'Foydalanuvchilar', path: '/admin/users' },
    { id: 'orders',    icon: <Briefcase size={20} />,       label: 'Buyurtmalar', path: '/admin/orders' },
    { id: 'finance',   icon: <DollarSign size={20} />,      label: 'Moliya', path: '/admin/finance' },
    { id: 'settings',  icon: <Settings size={20} />,        label: 'Sozlamalar', path: '/admin/settings' },
  ];

  return (
    <div className={styles.layout}>
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className={styles.sidebarOverlay} onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={clsx(styles.sidebar, isSidebarOpen && styles.sidebarOpen)}>
        <div className={styles.sidebarHeader}>
          <img src={logoUrl} alt="Hasharchi Logo" className={styles.logo} />
          <h2 className={styles.brand}>Admin CRM</h2>
        </div>

        <nav className={styles.nav}>
          {menuItems.map(item => (
            <NavLink
              key={item.id}
              to={item.path}
              end={item.path === '/admin'}
              className={({ isActive }) => clsx(styles.navItem, isActive && styles.navItemActive)}
              onClick={() => setSidebarOpen(false)}
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <LogOut size={20} />
            Chiqish
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.main}>
        {/* Top Navbar */}
        <header className={styles.topbar}>
          <div className={styles.topbarLeft}>
            <button className={styles.menuBtn} onClick={() => setSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <div className={styles.searchBox}>
              <Search size={18} className={styles.searchIcon} />
              <input type="text" placeholder="Qidirish..." className={styles.searchInput} />
            </div>
          </div>
          
          <div className={styles.topbarRight}>
            <button className={styles.iconBtn}>
              <Bell size={20} />
              <span className={styles.badge} />
            </button>
            <div className={styles.adminProfile}>
              <div className={styles.adminAvatar}>A</div>
              <div className={styles.adminInfo}>
                <div className={styles.adminName}>Super Admin</div>
                <div className={styles.adminRole}>Boshqaruvchi</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className={styles.contentArea}>
          <Outlet />
        </div>
      </main>

    </div>
  );
};

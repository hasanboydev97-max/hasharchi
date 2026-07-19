import { useState } from 'react';
import { Search, Filter, MoreVertical, Shield, ShieldAlert, CheckCircle } from 'lucide-react';
import styles from './AdminUsers.module.css';

const MOCK_USERS = [
  { id: 1, name: 'Hasanboy M.', role: 'usta', phone: '+998 90 123 45 67', status: 'verified', registeredAt: '2023-10-12' },
  { id: 2, name: 'Aziz R.', role: 'mijoz', phone: '+998 93 987 65 43', status: 'active', registeredAt: '2023-10-14' },
  { id: 3, name: 'Sardor A.', role: 'usta', phone: '+998 99 111 22 33', status: 'pending', registeredAt: '2023-10-15' },
  { id: 4, name: 'Dilshod T.', role: 'mijoz', phone: '+998 94 444 55 66', status: 'banned', registeredAt: '2023-09-01' },
];

export const AdminUsers = () => {
  const [filterRole, setFilterRole] = useState('all');

  const filteredUsers = filterRole === 'all' 
    ? MOCK_USERS 
    : MOCK_USERS.filter(u => u.role === filterRole);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Foydalanuvchilar</h1>
        <div className={styles.actions}>
          <div className={styles.searchBox}>
            <Search size={18} className={styles.icon} />
            <input type="text" placeholder="Ism yoki telefon..." className={styles.input} />
          </div>
          <button className={styles.filterBtn}>
            <Filter size={18} />
            Filtr
          </button>
        </div>
      </div>

      <div className={styles.tabs}>
        <button 
          className={filterRole === 'all' ? styles.tabActive : styles.tab} 
          onClick={() => setFilterRole('all')}
        >Barchasi</button>
        <button 
          className={filterRole === 'usta' ? styles.tabActive : styles.tab}
          onClick={() => setFilterRole('usta')}
        >Ustalar</button>
        <button 
          className={filterRole === 'mijoz' ? styles.tabActive : styles.tab}
          onClick={() => setFilterRole('mijoz')}
        >Mijozlar</button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Foydalanuvchi</th>
              <th>Rol</th>
              <th>Telefon</th>
              <th>Ro'yxatdan o'tgan</th>
              <th>Status</th>
              <th>Amallar</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>
                  <div className={styles.userInfo}>
                    <div className={styles.avatar}>{user.name.charAt(0)}</div>
                    <span className={styles.userName}>{user.name}</span>
                  </div>
                </td>
                <td>
                  <span className={styles.roleBadge}>
                    {user.role === 'usta' ? 'Usta' : 'Mijoz'}
                  </span>
                </td>
                <td className={styles.phone}>{user.phone}</td>
                <td className={styles.date}>{user.registeredAt}</td>
                <td>
                  {user.status === 'verified' && <span className={`${styles.statusBadge} ${styles.success}`}><CheckCircle size={14}/> Tasdiqlangan</span>}
                  {user.status === 'active' && <span className={`${styles.statusBadge} ${styles.primary}`}>Faol</span>}
                  {user.status === 'pending' && <span className={`${styles.statusBadge} ${styles.warning}`}><Shield size={14}/> Kutmoqda</span>}
                  {user.status === 'banned' && <span className={`${styles.statusBadge} ${styles.danger}`}><ShieldAlert size={14}/> Bloklangan</span>}
                </td>
                <td>
                  <button className={styles.actionBtn}>
                    <MoreVertical size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

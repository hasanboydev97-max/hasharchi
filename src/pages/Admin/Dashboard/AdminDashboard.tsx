import { 
  Users, Briefcase, TrendingUp, AlertCircle 
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import styles from './AdminDashboard.module.css';

const data = [
  { name: 'Yan', daromad: 4000, buyurtma: 240 },
  { name: 'Fev', daromad: 3000, buyurtma: 139 },
  { name: 'Mar', daromad: 2000, buyurtma: 980 },
  { name: 'Apr', daromad: 2780, buyurtma: 390 },
  { name: 'May', daromad: 1890, buyurtma: 480 },
  { name: 'Iyun', daromad: 2390, buyurtma: 380 },
  { name: 'Iyul', daromad: 3490, buyurtma: 430 },
];

export const AdminDashboard = () => {
  return (
    <div className={styles.dashboard}>
      <h1 className={styles.pageTitle}>Dashboard Tahlili</h1>
      
      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <div className={styles.statIconWrapper} style={{ backgroundColor: '#E0F2FE', color: '#0284C7' }}>
              <Users size={24} />
            </div>
            <span className={styles.statTrend} style={{ color: '#16A34A' }}>+12.5%</span>
          </div>
          <div className={styles.statValue}>12,450</div>
          <div className={styles.statLabel}>Jami Foydalanuvchilar</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <div className={styles.statIconWrapper} style={{ backgroundColor: '#FEF9C3', color: '#CA8A04' }}>
              <Briefcase size={24} />
            </div>
            <span className={styles.statTrend} style={{ color: '#16A34A' }}>+5.2%</span>
          </div>
          <div className={styles.statValue}>3,842</div>
          <div className={styles.statLabel}>Aktiv Ustalar</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <div className={styles.statIconWrapper} style={{ backgroundColor: '#DCFCE7', color: '#16A34A' }}>
              <TrendingUp size={24} />
            </div>
            <span className={styles.statTrend} style={{ color: '#16A34A' }}>+18.1%</span>
          </div>
          <div className={styles.statValue}>452.8M</div>
          <div className={styles.statLabel}>Oylik Daromad (UZS)</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <div className={styles.statIconWrapper} style={{ backgroundColor: '#FEE2E2', color: '#DC2626' }}>
              <AlertCircle size={24} />
            </div>
            <span className={styles.statTrend} style={{ color: '#DC2626' }}>-2.4%</span>
          </div>
          <div className={styles.statValue}>14</div>
          <div className={styles.statLabel}>Ochiq Shikoyatlar (Disputes)</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className={styles.chartsGrid}>
        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Daromad o'sishi (Platforma foizi)</h3>
          <div className={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorDaromad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00A3FF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00A3FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}k`} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <Tooltip />
                <Area type="monotone" dataKey="daromad" stroke="#00A3FF" strokeWidth={3} fillOpacity={1} fill="url(#colorDaromad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Bajarilgan buyurtmalar soni</h3>
          <div className={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <Tooltip cursor={{fill: '#F1F5F9'}} />
                <Bar dataKey="buyurtma" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
    </div>
  );
};

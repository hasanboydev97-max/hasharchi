import React, { useState } from 'react';
import { MapPin, Calendar, Clock, ChevronRight, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';
import { useData } from '../../context/DataContext';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import styles from './Orders.module.css';

type TabType = 'barchasi' | 'faol' | 'yakunlangan' | 'bekor';

export const Orders = () => {
  const { orders } = useData();
  const [activeTab, setActiveTab] = useState<TabType>('barchasi');
  const navigate = useNavigate();

  // fallback data if empty
  const ordersData = orders?.length ? orders : [
    { id: '1', title: 'Oshxona kranini almashtirish', worker: { category: 'Santexnik' }, status: 'pending', address: 'Toshkent, Yunusobod', date: 'Bugun', time: '14:00', price: 'Kelishilgan' },
    { id: '2', title: 'Muzlatgich tuzatish', worker: { category: 'Ustalar' }, status: 'completed', address: 'Toshkent, Chilonzor', date: 'Kecha', time: '10:00', price: '150 000 so\'m' }
  ];

  const filteredOrders = ordersData.filter((order: any) => {
    if (activeTab === 'faol') return order.status === 'pending';
    if (activeTab === 'yakunlangan') return order.status === 'completed';
    if (activeTab === 'bekor') return order.status === 'cancelled';
    return true;
  });

  const getStatusText = (status: string) => {
    switch(status) {
      case 'pending': return '• Kutilmoqda';
      case 'completed': return '✓ Yakunlangan';
      case 'cancelled': return '✕ Bekor qilingan';
      default: return status;
    }
  };

  const getStatusClass = (status: string) => {
    switch(status) {
      case 'pending': return styles.statusPending;
      case 'completed': return styles.statusCompleted;
      case 'cancelled': return styles.statusCancelled;
      default: return '';
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Buyurtmalarim</h1>
        <div className={styles.tabsContainer}>
          <div className={styles.tabs}>
            {(['barchasi', 'faol', 'yakunlangan', 'bekor'] as TabType[]).map((tab) => (
              <button
                key={tab}
                className={clsx(styles.tab, activeTab === tab && styles.tabActive)}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className={styles.main}>
        {filteredOrders.length === 0 ? (
          <EmptyState
            icon={<Briefcase size={48} />}
            title="Buyurtmalar yo'q"
            description={`Hozircha ${activeTab !== 'barchasi' ? activeTab + ' ' : ''}buyurtmalar mavjud emas.`}
          />
        ) : (
          <div className={styles.orderList}>
            {filteredOrders.map((order: any, idx: number) => (
              <div key={order.id || idx} className={styles.orderCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.categoryBadge}>
                    {order.worker?.category || "Xizmat"}
                  </div>
                  <div className={clsx(styles.statusBadge, getStatusClass(order.status))}>
                    {getStatusText(order.status)}
                  </div>
                </div>
                
                <h3 className={styles.orderTitle}>{order.title || 'Xizmat turi'}</h3>
                
                <div className={styles.orderMeta}>
                  <div className={styles.metaItem}>
                    <MapPin size={16} className={styles.metaIcon} />
                    <span>{order.address || 'Toshkent, Yunusobod'}</span>
                  </div>
                  <div className={styles.metaItem}>
                    <Calendar size={16} className={styles.metaIcon} />
                    <span>{order.date || 'Bugun'}, {order.time || '14:00'}</span>
                  </div>
                </div>

                <hr className={styles.divider} />

                <div className={styles.cardFooter}>
                  <div className={styles.priceContainer}>
                    <span className={styles.priceLabel}>Byudjet:</span>
                    <span className={styles.priceValue}>{order.price || 'Kelishilgan'}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className={styles.detailsButton} onClick={() => navigate(`/job/${order.id || idx}`)}>
                      E'lon
                    </button>
                    <button 
                      className={styles.detailsButton} 
                      onClick={() => navigate(`/booking/${order.id || idx}`)}
                      style={{ background: 'var(--color-primary-50)', color: 'var(--color-primary)', fontWeight: 600 }}
                    >
                      Jarayon <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

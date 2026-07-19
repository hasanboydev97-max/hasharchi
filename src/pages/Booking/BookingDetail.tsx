import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Phone, Check, Clock, Truck, Hammer, CheckCircle2 } from 'lucide-react';
import { MobileLayout } from '../../components/Layout/MobileLayout';
import { Button } from '../../components/Button/Button';
import { useAuth } from '../../context/AuthContext';
import styles from './BookingDetail.module.css';

// Mock data
const MOCK_ORDER = {
  id: '1',
  worker: {
    name: 'Alisher Qodirov',
    role: 'Santexnik',
    phone: '+998 90 123 45 67',
    avatar: 'https://i.pravatar.cc/150?u=alisher',
  },
  address: 'Yunusobod tumani, 4-mavze, 12-uy',
  service: 'Quvurlarni almashtirish',
  status: 1, // 0: kutilmoqda, 1: yo'lda, 2: jarayonda, 3: yakunlandi
};

const TIMELINE_STEPS = [
  { id: 0, title: 'Kelishildi', desc: 'Usta bilan narx va vaqt kelishildi', icon: Check },
  { id: 1, title: 'Yo\'lga chiqdi', desc: 'Usta sizning manzilingizga kelyapti', icon: Truck },
  { id: 2, title: 'Jarayonda', desc: 'Ish boshlandi va olib borilmoqda', icon: Hammer },
  { id: 3, title: 'Yakunlandi', desc: 'Ish muvaffaqiyatli tugatildi', icon: CheckCircle2 },
];

export const BookingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Real loyihada API dan order ma'lumotlarini id bo'yicha olamiz
  const [order, setOrder] = useState(MOCK_ORDER);

  // Faqat Hasharchi holatni o'zgartira oladi (demo uchun taymer qo'yamiz)
  useEffect(() => {
    if (order.status < 3 && user?.role === 'hasharchi') {
      const timer = setTimeout(() => {
        setOrder(prev => ({ ...prev, status: prev.status + 1 }));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [order.status, user?.role]);

  const handleFinish = () => {
    navigate(`/booking/${id}/receipt`);
  };

  return (
    <MobileLayout title="Ish jarayoni" showBackButton>
      <div className={styles.page}>
        
        {/* Worker Info */}
        <div className={styles.workerCard}>
          <img src={order.worker.avatar} alt="Usta" className={styles.avatar} />
          <div className={styles.workerInfo}>
            <h3 className={styles.workerName}>{order.worker.name}</h3>
            <p className={styles.workerRole}>{order.worker.role}</p>
          </div>
          <button className={styles.contactBtn}>
            <Phone size={20} />
          </button>
        </div>

        {/* Timeline */}
        <div className={styles.timelineCard}>
          <h2 className={styles.timelineTitle}>Jarayon holati</h2>
          
          <div className={styles.timeline}>
            {TIMELINE_STEPS.map((step, index) => {
              const isCompleted = order.status > step.id;
              const isActive = order.status === step.id;
              const isLast = index === TIMELINE_STEPS.length - 1;
              const StepIcon = step.icon;

              return (
                <div 
                  key={step.id} 
                  className={`${styles.step} ${isActive ? styles.stepActive : ''} ${isCompleted ? styles.stepCompleted : ''}`}
                >
                  {!isLast && <div className={styles.stepLine} />}
                  
                  <div className={styles.stepIcon}>
                    <StepIcon size={16} strokeWidth={isCompleted || isActive ? 2.5 : 2} />
                  </div>
                  
                  <div className={styles.stepContent}>
                    <h4 className={styles.stepTitle}>{step.title}</h4>
                    <p className={styles.stepDesc}>{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Agar ish yakunlangan bo'lsa to'lov sahifasiga o'tish */}
      {order.status === 3 && (
        <div className={styles.bottomFixed}>
          <Button variant="primary" size="large" fullWidth onClick={handleFinish}>
            Chek va To'lovni ko'rish
          </Button>
        </div>
      )}
      
      {/* Mijoz emas, faqat Hasharchi o'z ishini tugatganda "Tugatish" tugmasini bosishi mumkin (Mock logic) */}
      {order.status < 3 && user?.role === 'hasharchi' && (
        <div className={styles.bottomFixed}>
          <Button 
            variant="primary" 
            size="large" 
            fullWidth 
            onClick={() => setOrder(prev => ({ ...prev, status: 3 }))}
          >
            Ishni yakunladim
          </Button>
        </div>
      )}

    </MobileLayout>
  );
};

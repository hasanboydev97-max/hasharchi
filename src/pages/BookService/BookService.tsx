import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Calendar, MoreVertical } from 'lucide-react';
import { clsx } from 'clsx';
import { useData } from '../../context/DataContext';
import { Button } from '../../components/Button/Button';
import styles from './BookService.module.css';

interface DateObj {
  day: string;
  date: number;
  month: string;
  fullDate: Date;
}

const DAYS = ['Yak', 'Dush', 'Sesh', 'Chor', 'Pay', 'Jum', 'Shan'];
const MONTHS = ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyn', 'Iyl', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek'];
const TIMES = ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

const getDates = (): DateObj[] => {
  const dates: DateObj[] = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push({
      day: DAYS[d.getDay()],
      date: d.getDate(),
      month: MONTHS[d.getMonth()],
      fullDate: d,
    });
  }
  return dates;
};

export const BookService = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { workers } = useData();
  const worker = workers?.find((w: any) => w.id === id) || {
    id: '1',
    name: 'Bahriddin Usta',
    category: 'Elektrik',
    rating: '4.9',
    price: 'Kelishilgan',
    imageUrl: ''
  };

  const [dates] = useState<DateObj[]>(getDates());
  const [selectedDate, setSelectedDate] = useState<DateObj | null>(dates[0]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [address] = useState('Toshkent, Yunusobod tumani');
  const [comment, setComment] = useState('');

  const handleBook = () => {
    navigate('/orders');
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button onClick={() => navigate(-1)} className={styles.iconButton}>
          <ArrowLeft size={24} strokeWidth={2} />
        </button>
        <h1 className={styles.title}>Band qilish</h1>
        <button className={styles.iconButton}>
          <MoreVertical size={24} strokeWidth={2} />
        </button>
      </header>

      <main className={styles.main}>
        <div className={styles.workerCard}>
          <img src={(worker as any).imageUrl || `https://ui-avatars.com/api/?name=${worker.name}`} alt={worker.name} className={styles.avatar} />
          <div className={styles.workerInfo}>
            <h2 className={styles.workerName}>{worker.name}</h2>
            <p className={styles.workerCategory}>{worker.category}</p>
            <div className={styles.workerStats}>
              <span className={styles.rating}>⭐ {worker.rating}</span>
              <span className={styles.dot}>•</span>
              <span className={styles.price}>{worker.price}</span>
            </div>
          </div>
        </div>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <Calendar className={styles.sectionIcon} size={20} />
            <h3 className={styles.sectionTitle}>Sanani tanlang</h3>
          </div>
          <div className={styles.dateScroll}>
            {dates.map((d, i) => {
              const isActive = selectedDate?.date === d.date && selectedDate?.month === d.month;
              return (
                <button
                  key={i}
                  className={clsx(styles.dateCard, isActive && styles.dateActive)}
                  onClick={() => setSelectedDate(d)}
                >
                  <span className={styles.dateDay}>{d.day}</span>
                  <span className={styles.dateNumber}>{d.date}</span>
                </button>
              );
            })}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <Clock className={styles.sectionIcon} size={20} />
            <h3 className={styles.sectionTitle}>Vaqtni tanlang</h3>
          </div>
          <div className={styles.timeGrid}>
            {TIMES.map((time, i) => {
              const isActive = selectedTime === time;
              return (
                <button
                  key={i}
                  className={clsx(styles.timeCard, isActive && styles.timeActive)}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </button>
              );
            })}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <MapPin className={styles.sectionIcon} size={20} />
            <h3 className={styles.sectionTitle}>Xizmat manzili</h3>
          </div>
          <div className={styles.addressBox}>
            <div className={styles.mapPinCircle}>
              <MapPin size={24} color="var(--color-primary)" />
            </div>
            <span className={styles.addressText}>{address}</span>
          </div>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitlePlain}>📝 Izoh (ixtiyoriy)</h3>
          <textarea
            className={styles.textarea}
            placeholder="Qo'shimcha ma'lumot qoldiring..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </section>

        <section className={styles.summaryCard}>
          <h3 className={styles.summaryTitle}>📋 Buyurtma xulosasi</h3>
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Xizmat:</span>
            <span className={styles.summaryValue}>{worker.category}</span>
          </div>
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Sana:</span>
            <span className={styles.summaryValue}>
              {selectedDate?.date} {selectedDate?.month}, {selectedTime || '...'}
            </span>
          </div>
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Narx:</span>
            <span className={styles.summaryValue}>{worker.price}</span>
          </div>
        </section>
      </main>

      <div className={styles.footer}>
        <Button 
          variant="primary" 
          size="large" 
          fullWidth 
          onClick={handleBook}
          disabled={!selectedTime}
        >
          ✓ Band qilish
        </Button>
      </div>
    </div>
  );
};

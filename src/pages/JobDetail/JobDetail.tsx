import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { MapPin, Calendar, Clock, Wallet, ChevronLeft } from 'lucide-react';
import { Typography } from '../../components/Typography/Typography';
import { Button } from '../../components/Button/Button';
import { ApplicationCard } from '../../components/ApplicationCard/ApplicationCard';
import styles from './JobDetail.module.css';

// Mock data (You can later replace this with your real store/API fetch)
const MOCK_JOB = {
  id: '1',
  title: 'Oshxona kranini almashtirish',
  description: 'Oshxonadagi eski suv kranini yangisiga almashtirish kerak. Yangi kran o\'zimda bor. Faqat o\'rnatib berish kerak. Iloji boricha tezroq keladigan usta kerak.',
  category: 'Santexnika',
  status: 'pending', // pending, in_progress, completed
  location: 'Toshkent, Yunusobod tumani',
  date: '2026-07-20',
  time: '14:00 - 16:00',
  budget: '150 000 so\'m',
  isClientView: true, // mock flag to toggle between client and worker views
  applications: [
    {
      id: 'a1',
      workerName: 'Azizbek Rahimov',
      rating: 4.8,
      price: '150 000 so\'m',
      message: 'Assalomu alaykum. Man shu ishni qilib bera olaman. Tajribam 5 yil.'
    },
    {
      id: 'a2',
      workerName: 'Dilshod Usta',
      rating: 4.5,
      price: '130 000 so\'m',
      message: 'Tez va sifatli o\'rnatib beraman. Asboblarim bor.'
    }
  ]
};

export const JobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job] = useState(MOCK_JOB); // Normally we fetch job by id here

  const handleBack = () => {
    navigate(-1);
  };

  const handleApply = () => {
    // apply logic for worker
    console.log('Ariza yuborildi');
  };

  const handleAccept = (appId: string) => {
    console.log('Accepted', appId);
  };

  const handleReject = (appId: string) => {
    console.log('Rejected', appId);
  };

  if (!job) {
    return <div className={styles.container}>Topilmadi</div>;
  }

  return (
    <div className={styles.container}>
      {/* Fallback PageHeader inline if PageHeader component is not fully structured yet */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '16px', backgroundColor: 'var(--color-bg-secondary)' }}>
        <button 
          onClick={handleBack} 
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', color: 'var(--color-text-main)' }}
        >
          <ChevronLeft size={24} />
        </button>
        <Typography variant="h3" style={{ margin: '0 auto', paddingRight: 24 }}>E'lon tafsiloti</Typography>
      </div>

      <div className={styles.content}>
        <div className={styles.mainCard}>
          <div className={styles.titleSection}>
            <Typography variant="h2" className={styles.title}>{job.title}</Typography>
            <div className={styles.badges}>
              <span className={clsx(styles.badge, styles.badgeCategory)}>{job.category}</span>
              <span className={clsx(styles.badge, styles.badgeStatus, {
                [styles.completed]: job.status === 'completed'
              })}>
                {job.status === 'pending' ? 'Kutmoqda' : job.status}
              </span>
            </div>
          </div>

          <div className={styles.description}>
            {job.description}
          </div>

          <div className={styles.detailsList}>
            <div className={styles.detailRow}>
              <div className={styles.detailIcon}>
                <MapPin size={18} />
              </div>
              <div className={styles.detailText}>
                <span className={styles.detailLabel}>Manzil</span>
                <span className={styles.detailValue}>{job.location}</span>
              </div>
            </div>

            <div className={styles.detailRow}>
              <div className={styles.detailIcon}>
                <Calendar size={18} />
              </div>
              <div className={styles.detailText}>
                <span className={styles.detailLabel}>Sana</span>
                <span className={styles.detailValue}>{job.date}</span>
              </div>
            </div>

            <div className={styles.detailRow}>
              <div className={styles.detailIcon}>
                <Clock size={18} />
              </div>
              <div className={styles.detailText}>
                <span className={styles.detailLabel}>Vaqt</span>
                <span className={styles.detailValue}>{job.time}</span>
              </div>
            </div>

            <div className={styles.detailRow}>
              <div className={styles.detailIcon}>
                <Wallet size={18} />
              </div>
              <div className={styles.detailText}>
                <span className={styles.detailLabel}>Byudjet</span>
                <span className={styles.detailValue}>{job.budget}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Client View: Show applications */}
        {job.isClientView && job.status === 'pending' && job.applications.length > 0 && (
          <div>
            <Typography variant="h3" className={styles.sectionTitle}>
              Arizalar ({job.applications.length})
            </Typography>
            <div className={styles.applicationsList}>
              {job.applications.map((app) => (
                <ApplicationCard
                  key={app.id}
                  workerName={app.workerName}
                  rating={app.rating}
                  price={app.price}
                  message={app.message}
                  onAccept={() => handleAccept(app.id)}
                  onReject={() => handleReject(app.id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Worker View: Apply Button */}
      {!job.isClientView && job.status === 'pending' && (
        <div className={styles.bottomAction}>
          <Button variant="primary" size="large" fullWidth onClick={handleApply}>
            Ariza yuborish
          </Button>
        </div>
      )}
    </div>
  );
};

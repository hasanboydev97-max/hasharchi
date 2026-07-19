import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  MoreVertical,
  Phone,
  MessageSquare,
  BadgeCheck,
  MapPin,
  Clock,
  Briefcase,
  Star
} from 'lucide-react';
import { clsx } from 'clsx';

import { useData } from '../../context/DataContext';
import { TabBar, type Tab } from '../../components/TabBar/TabBar';
import { StarRating } from '../../components/StarRating/StarRating';
import { ReviewCard } from '../../components/ReviewCard/ReviewCard';
import { Button } from '../../components/Button/Button';
import { Typography } from '../../components/Typography/Typography';

import styles from './Profile.module.css';

const MOCK_PORTFOLIO = [
  'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
  'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400',
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400',
];

export const Profile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { workers } = useData();

  const [activeTab, setActiveTab] = useState<string>('about');

  const worker = workers.find((w) => w.id === id);

  if (!worker) {
    return (
      <div className={styles.notFound}>
        <Typography variant="h3">Usta topilmadi</Typography>
        <Button onClick={() => navigate(-1)} variant="secondary" className={styles.backBtn}>
          Orqaga
        </Button>
      </div>
    );
  }

  const MOCK_REVIEWS = [
    {
      id: 1,
      reviewerName: 'Jasur Toshmatov',
      rating: 5,
      text: 'Juda malakali usta. Ish sifati ajoyib, vaqtida keldi va hamma narsani tartibli qilib ketdi. Albatta tavsiya qilaman!',
      date: '3 kun oldin',
      jobCategory: worker.category,
      isVerified: true,
    },
    {
      id: 2,
      reviewerName: 'Madina Yusupova',
      rating: 4,
      text: 'Yaxshi ishladiz, lekin biroz kech qoldi. Umumiy natija maqul.',
      date: '1 hafta oldin',
      jobCategory: worker.category,
      isVerified: false,
    },
    {
      id: 3,
      reviewerName: 'Bobur Karimov',
      rating: 5,
      text: 'Superr usta! Narxi ham mos, ishni tez bajardi.',
      date: '2 hafta oldin',
      jobCategory: worker.category,
      isVerified: true,
    },
  ];

  const TABS: Tab[] = [
    { id: 'about', label: 'Haqida' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'reviews', label: 'Baholash', count: MOCK_REVIEWS.length },
  ];

  const initials = worker.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      {/* Fixed Header */}
      <header className={styles.header}>
        <button className={styles.iconBtn} onClick={handleBack}>
          <ArrowLeft size={24} strokeWidth={2.5} color="var(--color-text-main)" />
        </button>
        <Typography variant="h3" className={styles.headerTitle}>
          Ma'lumotlar
        </Typography>
        <button className={styles.iconBtn}>
          <MoreVertical size={24} strokeWidth={2.5} color="var(--color-text-main)" />
        </button>
      </header>

      {/* Hero Background */}
      <div className={styles.heroGradient}>
        <div className={styles.avatarWrapper}>
          {worker.image ? (
            <img src={worker.image} alt={worker.name} className={styles.avatar} />
          ) : (
            <div className={styles.avatarFallback}>{initials}</div>
          )}
        </div>
      </div>

      {/* Bottom Sheet */}
      <div className={styles.bottomSheet}>
        <div className={styles.sheetHeader}>
          <div className={styles.titleRow}>
            <span className={styles.categoryBadge}>{worker.category}</span>
            <span className={styles.price}>
              {worker.price.toString().replace("so'm", "").trim()}{" so'm"}<small>/soat</small>
            </span>
          </div>

          <div className={styles.workerInfoRow}>
            <div className={styles.workerMain}>
              <Typography variant="h2" className={styles.workerName}>
                {worker.name}
              </Typography>
              <div className={styles.verifiedRow}>
                <BadgeCheck size={16} className={styles.verifiedIcon} strokeWidth={2.5} />
                <span className={styles.verifiedText}>Tasdiqlangan usta</span>
              </div>
            </div>
            <div className={styles.actionBtns}>
              <button className={clsx(styles.circleBtn, styles.callBtn)}>
                <Phone size={20} strokeWidth={2.5} />
              </button>
              <button className={clsx(styles.circleBtn, styles.msgBtn)}>
                <MessageSquare size={20} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          <div className={styles.ratingRow}>
            <StarRating value={worker.rating} showValue reviewCount={120} />
          </div>
        </div>

        <div className={styles.tabsWrapper}>
          <TabBar
            tabs={TABS}
            activeTab={activeTab}
            onChange={setActiveTab}
            variant="underline"
          />
        </div>

        <div className={styles.tabContent}>
          {activeTab === 'about' && (
            <div className={styles.aboutTab}>
              <p className={styles.bio}>
                Assalomu alaykum! Men {worker.category.toLowerCase()} bo'yicha 8 yillik
                tajribaga egaman. Sifatli va ishonchli xizmat ko'rsatish mening asosiy
                maqsadim. Barcha ishlarga kafolat beraman.
              </p>

              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <Briefcase size={24} className={styles.statIcon} />
                  <span className={styles.statValue}>47</span>
                  <span className={styles.statLabel}>Bajarilgan</span>
                </div>
                <div className={styles.statCard}>
                  <Star size={24} className={styles.statIcon} />
                  <span className={styles.statValue}>{worker.rating}</span>
                  <span className={styles.statLabel}>Reyting</span>
                </div>
                <div className={styles.statCard}>
                  <Clock size={24} className={styles.statIcon} />
                  <span className={styles.statValue}>8 yil</span>
                  <span className={styles.statLabel}>Tajriba</span>
                </div>
              </div>

              <div className={styles.section}>
                <Typography variant="h3" className={styles.sectionTitle}>
                  Ko'nikmalar
                </Typography>
                <div className={styles.skillsScroll}>
                  {['Suvquvur almashtirish', 'Bosim sinovlash', 'Nasoslar o\'rnatish', 'Santexnika ta\'miri'].map(
                    (skill, i) => (
                      <span key={i} className={styles.skillChip}>
                        {skill}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div className={styles.section}>
                <Typography variant="h3" className={styles.sectionTitle}>
                  Ish grafigi
                </Typography>
                <div className={styles.scheduleCard}>
                  <div className={styles.scheduleRow}>
                    <Clock size={18} className={styles.scheduleIcon} />
                    <span>Dushanba – Juma</span>
                    <span className={styles.time}>09:00 – 18:00</span>
                  </div>
                  <div className={styles.scheduleRow}>
                    <MapPin size={18} className={styles.scheduleIcon} />
                    <span>Toshkent shahri</span>
                    <span className={styles.time}>Barcha tumanlar</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'portfolio' && (
            <div className={styles.portfolioTab}>
              <div className={styles.portfolioGrid}>
                {MOCK_PORTFOLIO.map((img, i) => (
                  <img key={i} src={img} alt={`Portfolio ${i}`} className={styles.portfolioImg} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className={styles.reviewsTab}>
              <div className={styles.ratingSummary}>
                <div className={styles.ratingBig}>
                  <span className={styles.ratingBigValue}>{worker.rating}</span>
                  <StarRating value={worker.rating} size={20} />
                  <span className={styles.ratingBigCount}>120 ta sharh</span>
                </div>
                <div className={styles.ratingBars}>
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className={styles.ratingBarRow}>
                      <span className={styles.barLabel}>{star} <Star size={12} fill="currentColor" /></span>
                      <div className={styles.barTrack}>
                        <div
                          className={styles.barFill}
                          style={{ width: `${star === 5 ? 75 : star === 4 ? 20 : star === 3 ? 5 : 0}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.reviewList}>
                {MOCK_REVIEWS.map((review) => (
                  <ReviewCard key={review.id} {...review} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Bottom Action */}
      <div className={styles.stickyBottom}>
        <Button variant="primary" size="large" fullWidth>
          Band qilish
        </Button>
      </div>
    </div>
  );
};

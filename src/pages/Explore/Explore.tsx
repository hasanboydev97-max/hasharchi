import { useState } from 'react';
import { Search, Bell, Wrench, Zap, Droplets, Wind, Brush, Hammer } from 'lucide-react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { KasbiChip } from '../../components/KasbiChip/KasbiChip';
import { PromoCard } from '../../components/PromoCard/PromoCard';
import { UstaCard } from '../../components/UstaCard/UstaCard';
import styles from './Explore.module.css';

// Kategoriyalar — icon bilan birga, Hasharchi kontekstiga moslashtirilgan
const KATEGORIYALAR = [
  { id: 'barchasi', label: 'Barchasi',    icon: <Hammer size={14} />,  count: 120 },
  { id: 'elektr',   label: 'Elektrik',    icon: <Zap size={14} />,     count: 34  },
  { id: 'sante',    label: 'Santexnik',   icon: <Droplets size={14} />, count: 28  },
  { id: 'kondits',  label: 'Konditsioner',icon: <Wind size={14} />,     count: 19  },
  { id: 'tozalash', label: 'Tozalash',    icon: <Brush size={14} />,    count: 15  },
  { id: 'tamir',    label: "Ta'mirlash",  icon: <Wrench size={14} />,   count: 24  },
];

// Vaqtga qarab salomlashish — kichik detal, lekin samimiy his beradi
function getSalomText(name?: string): { greeting: string; sub: string } {
  const h = new Date().getHours();
  const firstName = name ? name.split(' ')[0] : 'do\'st';
  if (h < 12) return { greeting: `Xayrli tong, ${firstName} 👋`, sub: 'Bugun kimga yordam kerak?' };
  if (h < 17) return { greeting: `Xayrli kun, ${firstName} 👋`,  sub: 'Usta toping, ishni topshiring' };
  return     { greeting: `Xayrli oqshom, ${firstName} 👋`, sub: 'Kechqurun ham ustalar tayyor!' };
}

export const Explore = () => {
  const [activeCat, setActiveCat] = useState('barchasi');
  const navigate  = useNavigate();
  const { role }  = useAuth();
  const { workers } = useData();

  const { greeting, sub } = getSalomText('Hasan');

  // Kategoriyaga qarab filter
  const displayWorkers = workers.filter(w => {
    if (activeCat === 'barchasi') return true;
    if (activeCat === 'elektr')   return w.category.toLowerCase().includes('elektr');
    if (activeCat === 'sante')    return w.category.toLowerCase().includes('santex');
    if (activeCat === 'tamir')    return w.category.toLowerCase().includes('tami');
    return true;
  }).map(w => ({
    ...w,
    isVerified:  [1, 2].includes(Number(w.id)),
    isTopRated:  Number(w.rating) >= 4.8,
    isOnline:    Number(w.id) % 2 === 0,
    experience:  Number(w.id) * 2 + 4,
    distance:    `${(Number(w.id) * 0.7).toFixed(1)} km`,
  }));

  return (
    <div className={styles.page}>

      {/* ═══ HEADER ═══ */}
      <div className={styles.header}>
        <div className={styles.userInfo}>
          <div className={styles.avatarBox}>
            <span className={styles.avatarLetter}>H</span>
          </div>
          <div className={styles.greetBlock}>
            <p className={styles.greetMain}>{greeting}</p>
            <p className={styles.greetSub}>{sub}</p>
          </div>
        </div>
        <button
          className={styles.bellBtn}
          type="button"
          aria-label="Bildirishnomalar"
        >
          <Bell size={20} strokeWidth={2} />
          <span className={styles.bellDot} />
        </button>
      </div>

      {/* ═══ QIDIRUV ═══ */}
      <div className={styles.searchBar} onClick={() => navigate('/search')} role="button" tabIndex={0}>
        <div className={styles.searchIcon}>
          <Search size={18} color="var(--color-primary)" strokeWidth={2.5} />
        </div>
        <span className={styles.searchInput} style={{ color: 'var(--color-text-soft)' }}>
          Usta yoki xizmat turi qidiring...
        </span>
      </div>

      {/* ═══ PROMO BANNER SWIPER ═══ */}
      <div className={styles.promoWrap}>
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={16}
          slidesPerView={1.05}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className={styles.realSwiper}
        >
          <SwiperSlide>
            <PromoCard
              title={"Ishonchli usta\nbir daqiqada"}
              subtitle="Toshkentda 500+ tasdiqlangan usta xizmatingizda"
              ctaLabel="Usta topish"
              onCtaClick={() => role === 'mijoz' ? navigate('/add') : undefined}
            />
          </SwiperSlide>
          <SwiperSlide>
            <PromoCard
              title={"Kuzgi mavsum\nchegirmalari"}
              subtitle="Ta'mirlash xizmatlariga 20% gacha chegirmalar"
              ctaLabel="Batafsil"
              onCtaClick={() => navigate('/search')}
            />
          </SwiperSlide>
          <SwiperSlide>
            <PromoCard
              title={"Xavfsizlik\nkafolati"}
              subtitle="Barcha ustalar shaxsini tasdiqlovchi hujjatdan o'tgan"
              ctaLabel="O'qish"
              onCtaClick={() => navigate('/onboarding')}
            />
          </SwiperSlide>
        </Swiper>
      </div>

      {/* ═══ KATEGORIYALAR ═══ */}
      <div className={styles.sectionBlock}>
        <div className={styles.sectionScroll}>
          {KATEGORIYALAR.map(cat => (
            <KasbiChip
              key={cat.id}
              data={cat}
              isActive={activeCat === cat.id}
              onClick={id => setActiveCat(id)}
            />
          ))}
        </div>
      </div>

      {/* ═══ TAVSIYA ETILGAN USTALAR ═══ */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Tavsiya etilgan ustalar</h2>
          <button className={styles.viewAllBtn} type="button">Barchasi</button>
        </div>
        <div className={styles.horizontalScroll}>
          {displayWorkers.map(w => (
            <UstaCard
              key={w.id}
              data={{
                id:         w.id,
                name:       w.name,
                category:   w.category,
                price:      w.price,
                rating:     w.rating,
                reviews:    w.reviews,
                image:      w.image,
                experience: w.experience,
                distance:   w.distance,
                isVerified: w.isVerified,
                isTopRated: w.isTopRated,
                isOnline:   w.isOnline,
              }}
              variant="vertical"
              onClick={() => navigate(`/profile/${w.id}`)}
            />
          ))}
        </div>
      </div>

      {/* ═══ BARCHA USTALAR ═══ */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Barcha ustalar</h2>
          <span className={styles.countBadge}>{displayWorkers.length} ta</span>
        </div>

        <div className={styles.workerList}>
          {displayWorkers.map(w => (
            <UstaCard
              key={w.id}
              data={{
                id:         w.id,
                name:       w.name,
                category:   w.category,
                price:      w.price,
                rating:     w.rating,
                reviews:    w.reviews,
                image:      w.image,
                experience: w.experience,
                distance:   w.distance,
                isVerified: w.isVerified,
                isTopRated: w.isTopRated,
                isOnline:   w.isOnline,
              }}
              variant="horizontal"
              onClick={() => navigate(`/profile/${w.id}`)}
            />
          ))}
        </div>
      </div>

    </div>
  );
};

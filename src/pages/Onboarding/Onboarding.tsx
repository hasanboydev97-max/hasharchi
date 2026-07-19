import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { ProgressiveImage } from '../../components/ProgressiveImage/ProgressiveImage';
import imgSearch from '../../assets/kerakli ustani toping.webp';
import imgDeal from '../../assets/tez kelishib oling.webp';
import imgShield from '../../assets/ishonchli va havfsiz.webp';
import styles from './Onboarding.module.css';

interface Slide {
  id: number;
  image: string;
  accentColor: string;
  bgColor: string;
  title: string;
  subtitle: string;
}

const SLIDES: Slide[] = [
  {
    id: 1,
    image: imgSearch,
    accentColor: '#00A3FF',
    bgColor: '#E5F6FF',
    title: 'Kerakli ustani toping',
    subtitle: 'Santexnik, elektrik, ta\'mirchi — 500+ tasdiqlangan usta bir joyda. Kasb, reyting va manzil bo\'yicha qidiring.',
  },
  {
    id: 2,
    image: imgDeal,
    accentColor: '#0072FF',
    bgColor: '#E6F0FF',
    title: 'Tez kelishib oling',
    subtitle: 'Narx va vaqt bo\'yicha kelishing, chat orqali muloqot qiling. Hamma jarayon ilovaning o\'zida.',
  },
  {
    id: 3,
    image: imgShield,
    accentColor: '#00A3FF',
    bgColor: '#E5F6FF',
    title: 'Ishonchli va xavfsiz',
    subtitle: 'Har bir usta tekshirilgan va tasdiqlangan. Ish tugagach baholang — keyingi foydalanuvchilarga yordam bering.',
  },
];

export const Onboarding = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const slide = SLIDES[current];
  const isLast = current === SLIDES.length - 1;

  const handleNext = () => {
    if (isLast) {
      navigate('/auth/welcome', { replace: true });
    } else {
      setCurrent(prev => prev + 1);
    }
  };

  const handleSkip = () => {
    navigate('/auth/welcome', { replace: true });
  };

  return (
    <div className={styles.page}>
      {!isLast && (
        <button className={styles.skipBtn} onClick={handleSkip} type="button">
          O'tkazib yuborish
        </button>
      )}

      <div
        className={styles.illustrationArea}
        style={{ background: slide.bgColor }}
      >
        <div className={styles.glow1} style={{ backgroundColor: slide.accentColor }} />
        <div className={styles.glow2} style={{ backgroundColor: slide.accentColor }} />

        <div className={styles.imageBox} key={`img-${current}`}>
          <ProgressiveImage src={slide.image} alt={slide.title} className={styles.slideImage} />
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.dots}>
          {SLIDES.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
              onClick={() => setCurrent(i)}
              type="button"
              aria-label={`${i + 1}-slide`}
            />
          ))}
        </div>

        <div className={styles.textBlock} key={`text-${current}`}>
          <h1 className={styles.title}>{slide.title}</h1>
          <p className={styles.subtitle}>{slide.subtitle}</p>
        </div>

        <div className={styles.actions}>
          <Button
            variant="primary"
            size="large"
            fullWidth
            onClick={handleNext}
          >
            {isLast ? 'Boshlash' : 'Keyingi'}
          </Button>
        </div>
      </div>
    </div>
  );
};


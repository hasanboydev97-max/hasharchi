import React from 'react';
import { ArrowRight } from 'lucide-react';
import styles from './PromoCard.module.css';

interface PromoCardProps {
  title: string;
  subtitle: string;
  ctaLabel: string;
  onCtaClick?: () => void;
  /** Optional decorative illustration/image URL */
  illustrationSrc?: string;
  /** Custom gradient override — CSS gradient string */
  gradient?: string;
}

// Cleansheet'da promo banner oddiy gradient + stock foto edi.
// Hasharchi versiyasida: dekorativ SVG nuqtalar patterni + pill tag "Yangi" + subtle glassy CTA —
// foto yo'q, chunki bizda hali real foto yo'q va illustration yondashuvi premium his beradi.
export const PromoCard: React.FC<PromoCardProps> = ({
  title,
  subtitle,
  ctaLabel,
  onCtaClick,
  illustrationSrc,
  gradient,
}) => {
  return (
    <div
      className={styles.card}
      style={gradient ? { background: gradient } : undefined}
    >
      {/* Fon dekoratsiyasi — SVG pattern o'rniga CSS circle'lar */}
      <div className={styles.deco1} />
      <div className={styles.deco2} />
      <div className={styles.deco3} />

      <div className={styles.content}>
        <span className={styles.tag}>⚡ Tez xizmat</span>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subtitle}>{subtitle}</p>
        <button className={styles.cta} onClick={onCtaClick} type="button">
          {ctaLabel}
          <ArrowRight size={15} strokeWidth={2.5} />
        </button>
      </div>

      {illustrationSrc && (
        <div className={styles.illustration}>
          <img src={illustrationSrc} alt="" className={styles.illustrationImg} />
        </div>
      )}
    </div>
  );
};

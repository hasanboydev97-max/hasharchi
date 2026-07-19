import { useNavigate } from 'react-router-dom';
import { Zap, Droplets, Wind, Brush, Hammer, PaintBucket, Layers, TreePine, Shield, Truck, Cpu, ChevronRight } from 'lucide-react';
import styles from './CategoriesPage.module.css';

interface CategoryItem {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  count: number;
}

const CATEGORIES: CategoryItem[] = [
  { id: 'elektr',    label: 'Elektrika',          description: 'Sim tortish, rozetek, panel',     icon: <Zap size={28} strokeWidth={1.8} />,         color: '#F59E0B', bgColor: '#FFFBEB', count: 34 },
  { id: 'sante',     label: 'Santexnika',          description: 'Quvur, kran, vannaxona',          icon: <Droplets size={28} strokeWidth={1.8} />,    color: '#0EA5E9', bgColor: '#F0F9FF', count: 28 },
  { id: 'kondits',   label: 'Konditsioner',        description: "O'rnatish, ta'mirlash",           icon: <Wind size={28} strokeWidth={1.8} />,        color: '#6366F1', bgColor: '#EEF2FF', count: 19 },
  { id: 'tozalash',  label: 'Tozalash',            description: 'Uy, ofis, deraza tozalash',       icon: <Brush size={28} strokeWidth={1.8} />,       color: '#10B981', bgColor: '#ECFDF5', count: 15 },
  { id: 'tamir',     label: "Ta'mirlash",          description: "Qurilish va ta'mirlash ishlari",  icon: <Hammer size={28} strokeWidth={1.8} />,      color: '#059669', bgColor: '#ECFDF5', count: 24 },
  { id: 'boyoq',     label: "Bo'yash",             description: 'Devor, shiftni bo\'yash',         icon: <PaintBucket size={28} strokeWidth={1.8} />, color: '#EC4899', bgColor: '#FDF2F8', count: 11 },
  { id: 'boshqa',    label: 'Qurilish',            description: 'Umumiy qurilish ishlari',         icon: <Layers size={28} strokeWidth={1.8} />,      color: '#8B5CF6', bgColor: '#F5F3FF', count: 22 },
  { id: 'bogdorlik', label: "Bog'-hovli",          description: "Daraxt kesish, o'tlarni ko'chirish", icon: <TreePine size={28} strokeWidth={1.8} />, color: '#16A34A', bgColor: '#F0FDF4', count: 8  },
  { id: 'mebel',     label: 'Mebel yig\'ish',      description: 'IKEA, mebel montaj',              icon: <Shield size={28} strokeWidth={1.8} />,      color: '#D97706', bgColor: '#FFFBEB', count: 13 },
  { id: 'ko\'chish', label: "Ko'chirish",          description: "Jabhalar, og'ir narsalar",        icon: <Truck size={28} strokeWidth={1.8} />,       color: '#64748B', bgColor: '#F8FAFC', count: 7  },
  { id: 'texnik',    label: 'Texnik ta\'mir',      description: "Noutbuk, telefon, TV ta'miri",    icon: <Cpu size={28} strokeWidth={1.8} />,         color: '#0F766E', bgColor: '#F0FDFA', count: 16 },
];

export const CategoriesPage = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (id: string) => {
    // Qidiruvga o'tib filter qo'llanadi
    navigate(`/search?category=${id}`);
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Kasblar</h1>
        <p className={styles.subtitle}>Kerakli xizmat turini tanlang</p>
      </div>

      {/* Categories grid */}
      <div className={styles.grid}>
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            className={styles.card}
            onClick={() => handleCategoryClick(cat.id)}
            type="button"
          >
            <div className={styles.iconWrap} style={{ background: cat.bgColor, color: cat.color }}>
              {cat.icon}
            </div>
            <div className={styles.cardBody}>
              <span className={styles.cardLabel}>{cat.label}</span>
              <span className={styles.cardDesc}>{cat.description}</span>
            </div>
            <div className={styles.cardRight}>
              <span className={styles.count} style={{ background: cat.bgColor, color: cat.color }}>
                {cat.count}
              </span>
              <ChevronRight size={16} className={styles.arrow} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

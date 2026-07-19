import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, TrendingUp, Clock, ArrowUpRight } from 'lucide-react';
import { UstaCard } from '../../components/UstaCard/UstaCard';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import { useData } from '../../context/DataContext';
import styles from './SearchPage.module.css';
import clsx from 'clsx';

const TRENDING = [
  'Santexnik', 'Elektrik', 'Konditsioner ta\'miri',
  'Oboy yopish', 'Tozalash', 'Gaz plitasi ta\'miri',
];

const RECENT_KEY = 'hasharchi_recent_searches';

const getRecent = (): string[] => {
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
  } catch { return []; }
};

const addRecent = (term: string) => {
  const list = getRecent().filter(r => r !== term);
  localStorage.setItem(RECENT_KEY, JSON.stringify([term, ...list].slice(0, 8)));
};

export const SearchPage = () => {
  const [query, setQuery]       = useState('');
  const [recent, setRecent]     = useState<string[]>(getRecent);
  const [isFocused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { workers } = useData();

  // Avtomatik fokus
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const results = query.trim().length >= 1
    ? workers.filter(w =>
        w.name.toLowerCase().includes(query.toLowerCase()) ||
        w.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSearch = (term: string) => {
    setQuery(term);
    addRecent(term);
    setRecent(getRecent());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) handleSearch(query.trim());
  };

  const removeRecent = (term: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = recent.filter(r => r !== term);
    localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
    setRecent(updated);
  };

  const clearAll = () => {
    localStorage.removeItem(RECENT_KEY);
    setRecent([]);
  };

  const showSuggestions = !query.trim();
  const showResults     = query.trim().length >= 1;

  return (
    <div className={styles.page}>

      {/* ═══ SEARCH BAR ═══ */}
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <button
          className={styles.backBtn}
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Orqaga"
        >
          <X size={20} />
        </button>

        <div className={clsx(styles.searchBar, isFocused && styles.searchBarFocused)}>
          <Search size={17} className={styles.searchIcon} />
          <input
            ref={inputRef}
            type="search"
            className={styles.searchInput}
            placeholder="Usta yoki xizmat turi..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            aria-label="Qidiruv"
          />
          {query && (
            <button
              className={styles.clearBtn}
              type="button"
              onClick={() => setQuery('')}
              aria-label="Tozalash"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </form>

      <div className={styles.content}>

        {/* ═══ TAKLIFLAR (query yo'q) ═══ */}
        {showSuggestions && (
          <>
            {/* So'nggi qidiruvlar */}
            {recent.length > 0 && (
              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionTitle}>
                    <Clock size={15} />
                    So'nggi qidiruvlar
                  </div>
                  <button className={styles.clearAllBtn} onClick={clearAll} type="button">
                    Barchasini o'chirish
                  </button>
                </div>
                <div className={styles.chipList}>
                  {recent.map(term => (
                    <div key={term} className={styles.recentChip}>
                      <button
                        className={styles.recentLabel}
                        onClick={() => handleSearch(term)}
                        type="button"
                      >
                        <Clock size={12} className={styles.chipClock} />
                        {term}
                      </button>
                      <button
                        className={styles.removeChip}
                        onClick={e => removeRecent(term, e)}
                        type="button"
                        aria-label="O'chirish"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Trend qidiruvlar */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionTitle}>
                  <TrendingUp size={15} />
                  Mashhur qidiruvlar
                </div>
              </div>
              <div className={styles.trendList}>
                {TRENDING.map((term, i) => (
                  <button
                    key={term}
                    className={styles.trendItem}
                    onClick={() => handleSearch(term)}
                    type="button"
                  >
                    <span className={styles.trendNum}>{i + 1}</span>
                    <span className={styles.trendLabel}>{term}</span>
                    <ArrowUpRight size={14} className={styles.trendArrow} />
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ═══ NATIJALAR ═══ */}
        {showResults && (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitle}>
                Natijalar
              </div>
              <span className={styles.countBadge}>{results.length} ta</span>
            </div>

            {results.length === 0 ? (
              <EmptyState
                emoji="🔍"
                title="Hech narsa topilmadi"
                subtitle={`"${query}" bo'yicha natija yo'q. Boshqa so'z bilan qidiring.`}
                action={{ label: 'Qidiruvni tozalash', onClick: () => setQuery('') }}
              />
            ) : (
              <div className={styles.resultsList}>
                {results.map(w => (
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
                      experience: Number(w.id) * 2 + 3,
                      distance:   `${(Number(w.id) * 0.8).toFixed(1)} km`,
                      isVerified: Number(w.id) <= 2,
                      isTopRated: w.rating >= 4.8,
                      isOnline:   Number(w.id) % 2 === 0,
                    }}
                    variant="horizontal"
                    onClick={() => navigate(`/profile/${w.id}`)}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ChevronRight, Wrench, Zap, Droplets, Wind, Brush, Hammer, PaintBucket, Layers, Rocket, MapPin } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/Button/Button';
import styles from './HasharchiSetup.module.css';
import clsx from 'clsx';

// ─── Ma'lumotlar ────────────────────────────────────────────────
const KASBLAR = [
  { id: 'elektr',   label: 'Elektrik',     icon: <Zap size={20} />,          color: '#F59E0B' },
  { id: 'sante',    label: 'Santexnik',    icon: <Droplets size={20} />,     color: '#0EA5E9' },
  { id: 'kondits',  label: 'Konditsioner', icon: <Wind size={20} />,         color: '#6366F1' },
  { id: 'tozalash', label: 'Tozalash',     icon: <Brush size={20} />,        color: '#10B981' },
  { id: 'tamir',    label: "Ta'mirlash",   icon: <Wrench size={20} />,       color: '#059669' },
  { id: 'qurilish', label: 'Qurilish',     icon: <Hammer size={20} />,       color: '#D97706' },
  { id: 'boyoq',    label: "Bo'yoqchi",    icon: <PaintBucket size={20} />,  color: '#EC4899' },
  { id: 'boshqa',   label: 'Boshqa',       icon: <Layers size={20} />,       color: '#8B5CF6' },
];

const DARAJALAR = [
  { id: 'yangi',   label: 'Yangi boshlagan', desc: '0–2 yil' },
  { id: 'orta',    label: "O'rta daraja",    desc: '2–5 yil' },
  { id: 'senior',  label: 'Tajribali',       desc: '5+ yil'  },
];

const DAVR_OPTIONS = [
  { id: 'soat',  label: 'Soatlik' },
  { id: 'kun',   label: 'Kunlik'  },
  { id: 'loyiha', label: 'Loyiha' },
];

const TUMANLAR = [
  'Yunusobod', 'Chilonzor', 'Mirzo Ulugbek', 'Uchtepa', 'Yakkasaroy',
  'Bektemir', 'Olmazor', 'Shayxontohur', 'Sirg\'ali', 'Yashnobod',
  'Mirobod', 'Hamza',
];

const TOTAL_STEPS = 6;

// ─── Holat ──────────────────────────────────────────────────────
interface SetupState {
  kasblar: string[];
  daraja: string;
  tajribaYil: string;
  narx: string;
  davr: string;
  tumanlar: string[];
  bio: string;
}

const INITIAL: SetupState = {
  kasblar:    [],
  daraja:     '',
  tajribaYil: '',
  narx:       '',
  davr:       'soat',
  tumanlar:   [],
  bio:        '',
};

// ─── Komponent ──────────────────────────────────────────────────
export const HasharchiSetup = () => {
  const [step, setStep]   = useState(1);
  const [data, setData]   = useState<SetupState>(INITIAL);
  const navigate          = useNavigate();
  const { login }         = useAuth();

  const progress = (step / TOTAL_STEPS) * 100;

  // Orqaga
  const handleBack = () => {
    if (step === 1) navigate(-1);
    else setStep(s => s - 1);
  };

  // Oldinga
  const handleNext = () => {
    if (step < TOTAL_STEPS) setStep(s => s + 1);
  };

  // Tugatish
  const handleFinish = () => {
    login('usta');
    navigate('/', { replace: true });
  };

  // Toggle helpers
  const toggleKasb  = (id: string) => setData(d => ({
    ...d, kasblar: d.kasblar.includes(id) ? d.kasblar.filter(k => k !== id) : [...d.kasblar, id]
  }));
  const toggleTuman = (t: string)  => setData(d => ({
    ...d, tumanlar: d.tumanlar.includes(t) ? d.tumanlar.filter(x => x !== t) : [...d.tumanlar, t]
  }));

  // Validation
  const canProceed = () => {
    if (step === 1) return data.kasblar.length > 0;
    if (step === 2) return data.daraja !== '' && data.tajribaYil !== '';
    if (step === 3) return data.narx !== '';
    if (step === 4) return data.tumanlar.length > 0;
    if (step === 5) return data.bio.length >= 20;
    return true;
  };

  return (
    <div className={styles.page}>
      {/* ─── Header ─── */}
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={handleBack} type="button">
          <ChevronRight size={20} style={{ transform: 'rotate(180deg)' }} />
        </button>
        <span className={styles.stepLabel}>{step} / {TOTAL_STEPS}</span>
        <div style={{ width: 36 }} />
      </div>

      {/* ─── Progress bar ─── */}
      <div className={styles.progressTrack}>
        <div className={styles.progressFill} style={{ width: `${progress}%` }} />
      </div>

      {/* ─── Kontent ─── */}
      <div className={styles.content}>

        {/* ═══ STEP 1: Kasb tanlash ═══ */}
        {step === 1 && (
          <div className={styles.stepBlock}>
            <h1 className={styles.stepTitle}>Kasb-koringizni tanlang</h1>
            <p className={styles.stepSub}>Bir nechta kasb tanlashingiz mumkin</p>
            <div className={styles.kasbGrid}>
              {KASBLAR.map(k => {
                const sel = data.kasblar.includes(k.id);
                return (
                  <button
                    key={k.id}
                    className={clsx(styles.kasbCard, sel && styles.kasbCardSel)}
                    onClick={() => toggleKasb(k.id)}
                    type="button"
                    style={sel ? { borderColor: k.color, background: `${k.color}12` } : undefined}
                  >
                    <span className={styles.kasbIcon} style={{ color: k.color, background: `${k.color}18` }}>
                      {k.icon}
                    </span>
                    <span className={styles.kasbLabel}>{k.label}</span>
                    {sel && <Check size={14} className={styles.kasbCheck} style={{ color: k.color }} />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ═══ STEP 2: Tajriba ═══ */}
        {step === 2 && (
          <div className={styles.stepBlock}>
            <h1 className={styles.stepTitle}>Tajribangiz</h1>
            <p className={styles.stepSub}>Qancha vaqtdan beri ishlaysiz?</p>

            <div className={styles.darajaList}>
              {DARAJALAR.map(d => (
                <button
                  key={d.id}
                  className={clsx(styles.darajaCard, data.daraja === d.id && styles.darajaCardSel)}
                  onClick={() => setData(prev => ({ ...prev, daraja: d.id }))}
                  type="button"
                >
                  <div>
                    <div className={styles.darajaLabel}>{d.label}</div>
                    <div className={styles.darajaDesc}>{d.desc}</div>
                  </div>
                  {data.daraja === d.id && (
                    <div className={styles.radioCheck}><Check size={14} /></div>
                  )}
                </button>
              ))}
            </div>

            <div className={styles.fieldBlock}>
              <label className={styles.fieldLabel}>Aniq tajriba yili</label>
              <div className={styles.yearInput}>
                <input
                  type="number"
                  className={styles.numInput}
                  placeholder="0"
                  min="0"
                  max="50"
                  value={data.tajribaYil}
                  onChange={e => setData(d => ({ ...d, tajribaYil: e.target.value }))}
                />
                <span className={styles.unitLabel}>yil</span>
              </div>
            </div>
          </div>
        )}

        {/* ═══ STEP 3: Narx ═══ */}
        {step === 3 && (
          <div className={styles.stepBlock}>
            <h1 className={styles.stepTitle}>Xizmat narxingiz</h1>
            <p className={styles.stepSub}>Keyinchalik o'zgartirish mumkin</p>

            <div className={styles.davrToggle}>
              {DAVR_OPTIONS.map(o => (
                <button
                  key={o.id}
                  className={clsx(styles.davrBtn, data.davr === o.id && styles.davrBtnActive)}
                  onClick={() => setData(d => ({ ...d, davr: o.id }))}
                  type="button"
                >
                  {o.label}
                </button>
              ))}
            </div>

            <div className={styles.narxRow}>
              <input
                type="number"
                className={styles.narxInput}
                placeholder="50 000"
                value={data.narx}
                onChange={e => setData(d => ({ ...d, narx: e.target.value }))}
              />
              <span className={styles.narxUnit}>so'm</span>
            </div>

            <p className={styles.narxHint}>
              💡 Toshkentda {data.davr === 'soat' ? 'soatlik' : data.davr === 'kun' ? 'kunlik' : 'loyiha'} o'rtacha narx:{' '}
              <strong>{data.davr === 'soat' ? '50,000–150,000' : data.davr === 'kun' ? '300,000–800,000' : '500,000+'} so'm</strong>
            </p>
          </div>
        )}

        {/* ═══ STEP 4: Hudud ═══ */}
        {step === 4 && (
          <div className={styles.stepBlock}>
            <h1 className={styles.stepTitle}>Ish hududingiz</h1>
            <p className={styles.stepSub}>Qaysi tumanlarda xizmat ko'rsatasiz?</p>
            <div className={styles.tumanGrid}>
              {TUMANLAR.map(t => {
                const sel = data.tumanlar.includes(t);
                return (
                  <button
                    key={t}
                    className={clsx(styles.tumanChip, sel && styles.tumanChipSel)}
                    onClick={() => toggleTuman(t)}
                    type="button"
                  >
                    {sel && <Check size={12} />}
                    {t}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ═══ STEP 5: Bio ═══ */}
        {step === 5 && (
          <div className={styles.stepBlock}>
            <h1 className={styles.stepTitle}>O'zingiz haqingizda</h1>
            <p className={styles.stepSub}>Mijozlar bu ma'lumotni ko'radi</p>
            <div className={styles.bioWrap}>
              <textarea
                className={styles.bioArea}
                placeholder="Men 5 yildan beri elektr montaj ishlari bilan shug'ullanaman. Uylar, ofislar va sanoat binolari uchun xizmat ko'rsataman..."
                value={data.bio}
                onChange={e => setData(d => ({ ...d, bio: e.target.value }))}
                maxLength={500}
                rows={6}
              />
              <div className={styles.bioCount}>
                <span className={data.bio.length < 20 ? styles.bioCountWarn : styles.bioCountOk}>
                  {data.bio.length}
                </span>
                /500 belgi {data.bio.length < 20 && `(kamida ${20 - data.bio.length} ta qoldi)`}
              </div>
            </div>
          </div>
        )}

        {/* ═══ STEP 6: Preview ═══ */}
        {step === 6 && (
          <div className={styles.stepBlock}>
            <h1 className={styles.stepTitle}>Profilingiz tayyor!</h1>
            <p className={styles.stepSub}>Shunday ko'rinadi</p>

            <div className={styles.previewCard}>
              {/* Avatar */}
              <div className={styles.previewAvatar}>
                <span>{data.bio.charAt(0).toUpperCase() || 'U'}</span>
              </div>
              <div className={styles.previewInfo}>
                <div className={styles.previewName}>Siz</div>
                <div className={styles.previewKasb}>
                  {data.kasblar.map(k => KASBLAR.find(x => x.id === k)?.label).join(', ')}
                </div>
                <div className={styles.previewMeta}>
                  {data.tajribaYil} yil tajriba • {DARAJALAR.find(d => d.id === data.daraja)?.label}
                </div>
                <div className={styles.previewNarx}>
                  {data.narx ? `${Number(data.narx).toLocaleString()} so'm/${data.davr === 'soat' ? 'soat' : data.davr === 'kun' ? 'kun' : 'loyiha'}` : '—'}
                </div>
              </div>
            </div>

            <div className={styles.previewHudud}>
              <span className={styles.previewHududLabel}><MapPin size={16} /> Ish hududi:</span>
              <span>{data.tumanlar.join(', ') || '—'}</span>
            </div>

            {data.bio && (
              <div className={styles.previewBio}>"{data.bio}"</div>
            )}
          </div>
        )}
      </div>

      {/* ─── Footer CTA ─── */}
      <div className={styles.footer}>
        <Button
          variant="primary"
          size="large"
          fullWidth
          disabled={!canProceed()}
          onClick={step === TOTAL_STEPS ? handleFinish : handleNext}
        >
          {step === TOTAL_STEPS ? <><Rocket size={18} /> Ilovaga kirish</> : 'Keyingi'}
        </Button>
      </div>
    </div>
  );
};

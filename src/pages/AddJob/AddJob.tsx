import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { Wrench, Zap, Sparkles, Hammer, MoreHorizontal } from 'lucide-react';

import { PageHeader } from '../../components/PageHeader/PageHeader';
import { SuccessModal } from '../../components/SuccessModal/SuccessModal';
import { Button } from '../../components/Button/Button';
import { Typography } from '../../components/Typography/Typography';
import { Input } from '../../components/Input/Input';
import { useData } from '../../context/DataContext';

import styles from './AddJob.module.css';

const CATEGORIES = [
  { id: 'Santexnika', label: 'Santexnika', icon: Wrench },
  { id: 'Elektrika', label: 'Elektrika', icon: Zap },
  { id: 'Tozalash', label: 'Tozalash', icon: Sparkles },
  { id: "Ta'mirlash", label: "Ta'mirlash", icon: Hammer },
  { id: 'Boshqa', label: 'Boshqa', icon: MoreHorizontal },
];

const DISTRICTS = [
  'Yunusobod tumani',
  'Chilonzor tumani',
  'Mirobod tumani',
  'Mirzo Ulug\'bek tumani',
  'Olmazor tumani',
  'Sergeli tumani',
  'Shayxontohur tumani',
  'Uchtepa tumani',
  'Yakkasaroy tumani',
  'Yashnobod tumani',
  'Bektemir tumani'
];

export const AddJob: React.FC = () => {
  const navigate = useNavigate();
  const { addJob } = useData();

  const [step, setStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [budgetType, setBudgetType] = useState<'exact' | 'negotiable'>('exact');
  const [budgetAmount, setBudgetAmount] = useState('');
  const [dateType, setDateType] = useState('Bugun');
  const [timeSlot, setTimeSlot] = useState('Ertalab');
  const [district, setDistrict] = useState(DISTRICTS[0]);
  const [address, setAddress] = useState('');

  const handleBack = () => {
    if (step > 1) {
      setStep(s => s - 1);
    } else {
      navigate('/');
    }
  };

  const handleNext = () => {
    setStep(s => s + 1);
  };

  const handleSubmit = () => {
    const title = description.length > 25 ? description.slice(0, 25) + '...' : description;
    const price = budgetType === 'exact' && budgetAmount 
      ? `${budgetAmount} so'm` 
      : 'Kelishuv asosida';
    
    addJob({
      title,
      category,
      price,
      address: `${district}, ${address}`,
      date: `${dateType}, ${timeSlot}`,
    });
    
    setShowSuccess(true);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    navigate('/orders');
  };

  return (
    <div className={styles.container}>
      <PageHeader title="E'lon berish" onBack={handleBack} />
      
      <div className={styles.progressContainer}>
        <div 
          className={styles.progressBar} 
          style={{ width: `${(step / 6) * 100}%` }}
        />
      </div>

      <div className={styles.content}>
        {step === 1 && (
          <div className={styles.stepContent}>
            <Typography variant="h2" className={styles.stepTitle}>Xizmat turini tanlang</Typography>
            <div className={styles.categoryGrid}>
              {CATEGORIES.map((cat) => (
                <div 
                  key={cat.id} 
                  className={clsx(styles.categoryCard, category === cat.id && styles.selected)}
                  onClick={() => {
                    setCategory(cat.id);
                    setTimeout(() => handleNext(), 150);
                  }}
                >
                  <cat.icon size={32} strokeWidth={1.5} className={styles.categoryIcon} />
                  <span className={styles.categoryLabel}>{cat.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className={styles.stepContent}>
            <Typography variant="h2" className={styles.stepTitle}>Muammoni ta'riflang</Typography>
            <textarea
              className={styles.textarea}
              placeholder="Muammo nima ekanligini batafsil yozing..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className={styles.footer}>
              <Button 
                variant="primary" 
                fullWidth 
                size="large"
                onClick={handleNext}
                disabled={description.length < 10}
              >
                Keyingi
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className={styles.stepContent}>
            <Typography variant="h2" className={styles.stepTitle}>Byudjetingiz qancha?</Typography>
            <div className={styles.radioGroup}>
              <div 
                className={clsx(styles.radioCard, budgetType === 'exact' && styles.selected)}
                onClick={() => setBudgetType('exact')}
              >
                <Typography variant="h3">Aniq byudjet</Typography>
                <Typography variant="caption" color="muted">O'zingiz narx taklif qilasiz</Typography>
              </div>
              <div 
                className={clsx(styles.radioCard, budgetType === 'negotiable' && styles.selected)}
                onClick={() => setBudgetType('negotiable')}
              >
                <Typography variant="h3">Kelishuv asosida</Typography>
                <Typography variant="caption" color="muted">Ustalar bilan joyida kelishasiz</Typography>
              </div>
            </div>

            {budgetType === 'exact' && (
              <div className={styles.fadeIn}>
                <Input
                  type="number"
                  placeholder="Summani kiriting (so'm)"
                  value={budgetAmount}
                  onChange={(e) => setBudgetAmount(e.target.value)}
                />
              </div>
            )}

            <div className={styles.footer}>
              <Button 
                variant="primary" 
                fullWidth 
                size="large"
                onClick={handleNext}
                disabled={budgetType === 'exact' && !budgetAmount}
              >
                Keyingi
              </Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className={styles.stepContent}>
            <Typography variant="h2" className={styles.stepTitle}>Qachon kelishlari kerak?</Typography>
            
            <Typography variant="body" color="muted" className={styles.label}>Kunni tanlang</Typography>
            <div className={styles.radioRow}>
              {['Bugun', 'Ertaga', 'Boshqa sana'].map((dateOpt) => (
                <div
                  key={dateOpt}
                  className={clsx(styles.radioChip, dateType === dateOpt && styles.selectedChip)}
                  onClick={() => setDateType(dateOpt)}
                >
                  {dateOpt}
                </div>
              ))}
            </div>

            <Typography variant="body" color="muted" className={styles.label}>Vaqtni tanlang</Typography>
            <div className={styles.radioRow}>
              {['Ertalab', 'Tushdan keyin', 'Kechqurun'].map((timeOpt) => (
                <div
                  key={timeOpt}
                  className={clsx(styles.radioChip, timeSlot === timeOpt && styles.selectedChip)}
                  onClick={() => setTimeSlot(timeOpt)}
                >
                  {timeOpt}
                </div>
              ))}
            </div>

            <div className={styles.footer}>
              <Button 
                variant="primary" 
                fullWidth 
                size="large"
                onClick={handleNext}
              >
                Keyingi
              </Button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className={styles.stepContent}>
            <Typography variant="h2" className={styles.stepTitle}>Manzilni kiriting</Typography>
            
            <select 
              className={styles.select}
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            >
              {DISTRICTS.map((dist) => (
                <option key={dist} value={dist}>{dist}</option>
              ))}
            </select>

            <Input
              placeholder="Aniq manzil (Ko'cha, uy raqami...)"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <div className={styles.footer}>
              <Button 
                variant="primary" 
                fullWidth 
                size="large"
                onClick={handleNext}
                disabled={!address.trim()}
              >
                Keyingi
              </Button>
            </div>
          </div>
        )}

        {step === 6 && (
          <div className={styles.stepContent}>
            <Typography variant="h2" className={styles.stepTitle}>E'lonni tekshiring</Typography>
            
            <div className={styles.summaryCard}>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Xizmat turi</span>
                <span className={styles.summaryValue}>{category}</span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Muammo</span>
                <span className={styles.summaryValue}>{description}</span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Byudjet</span>
                <span className={styles.summaryValue}>
                  {budgetType === 'exact' ? `${budgetAmount} so'm` : 'Kelishuv asosida'}
                </span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Vaqt</span>
                <span className={styles.summaryValue}>{dateType}, {timeSlot}</span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Manzil</span>
                <span className={styles.summaryValue}>{district}, {address}</span>
              </div>
            </div>

            <div className={styles.footer}>
              <Button 
                variant="primary" 
                fullWidth 
                size="large"
                onClick={handleSubmit}
              >
                E'lonni joylash
              </Button>
            </div>
          </div>
        )}
      </div>

      <SuccessModal
        isOpen={showSuccess}
        title="E'lon joylandi!"
        message="Ustalardan arizalar tushishini kuting."
        onClose={handleSuccessClose}
      />
    </div>
  );
};

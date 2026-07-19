import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, ArrowDownLeft, ArrowUpRight, X } from 'lucide-react';
import { Button } from '../../components/Button/Button';
import styles from './PaymentSettings.module.css';
import clsx from 'clsx';

export const PaymentSettings: React.FC = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = React.useState(false);
  const [cardNumber, setCardNumber] = React.useState('');
  const [cardExpiry, setCardExpiry] = React.useState('');
  const [cardName, setCardName] = React.useState('');
  const [cardDesign, setCardDesign] = React.useState<'primaryCard' | 'secondaryCard' | 'emeraldCard' | 'sunsetCard'>('primaryCard');

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 16) val = val.slice(0, 16);
    const formatted = val.replace(/(\d{4})/g, '$1 ').trim();
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 4) val = val.slice(0, 4);
    if (val.length > 2) {
      val = `${val.slice(0, 2)}/${val.slice(2)}`;
    }
    setCardExpiry(val);
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </button>
        <h1 className={styles.title}>To'lov usullari</h1>
      </header>

      <div className={styles.content}>
        
        <div className={styles.cardList}>
          {/* Asosiy Karta */}
          <div className={clsx(styles.creditCard, styles.primaryCard)}>
            <div className={styles.cardGlass1} />
            <div className={styles.cardGlass2} />
            
            <div className={styles.cardTop}>
              <div className={styles.cardChip} />
              <div className={styles.cardType}>UZCARD</div>
            </div>
            
            <div className={styles.cardNumber}>8600 •••• •••• 1234</div>
            
            <div className={styles.cardBottom}>
              <div>
                <div className={styles.cardLabel}>Karta egasi</div>
                <div className={styles.cardValue}>HASANBOY</div>
              </div>
              <div>
                <div className={styles.cardLabel}>Amal qilish</div>
                <div className={styles.cardValue}>12/26</div>
              </div>
            </div>
          </div>

          {/* Ikinchi Karta */}
          <div className={clsx(styles.creditCard, styles.secondaryCard)}>
            <div className={styles.cardGlass1} />
            <div className={styles.cardGlass2} />
            
            <div className={styles.cardTop}>
              <div className={styles.cardChip} />
              <div className={styles.cardType}>HUMO</div>
            </div>
            
            <div className={styles.cardNumber}>9860 •••• •••• 5678</div>
            
            <div className={styles.cardBottom}>
              <div>
                <div className={styles.cardLabel}>Karta egasi</div>
                <div className={styles.cardValue}>HASANBOY</div>
              </div>
              <div>
                <div className={styles.cardLabel}>Amal qilish</div>
                <div className={styles.cardValue}>08/25</div>
              </div>
            </div>
          </div>

          <button className={styles.addCardBtn} onClick={() => setShowModal(true)}>
            <Plus size={24} />
            Yangi karta qo'shish
          </button>
        </div>

        {/* Tranzaksiyalar */}
        <div style={{ marginTop: '16px' }}>
          <h2 className={styles.historyTitle}>So'nggi tranzaksiyalar</h2>
          
          <div className={styles.historyList}>
            <div className={styles.historyItem}>
              <div className={styles.historyLeft}>
                <div className={styles.historyIcon}>
                  <ArrowUpRight size={20} />
                </div>
                <div>
                  <div className={styles.historyTitleText}>Santexnika xizmati</div>
                  <div className={styles.historyDate}>Bugun, 14:30</div>
                </div>
              </div>
              <div className={clsx(styles.historyAmount, styles.negative)}>
                - 150,000 so'm
              </div>
            </div>

            <div className={styles.historyItem}>
              <div className={styles.historyLeft}>
                <div className={clsx(styles.historyIcon, styles.green)}>
                  <ArrowDownLeft size={20} />
                </div>
                <div>
                  <div className={styles.historyTitleText}>Hisob to'ldirildi</div>
                  <div className={styles.historyDate}>Kecha, 09:15</div>
                </div>
              </div>
              <div className={clsx(styles.historyAmount, styles.positive)}>
                + 500,000 so'm
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Add Card Modal */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Karta qo'shish</h3>
              <button className={styles.closeBtn} onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>
            
            {/* Live Card Preview */}
            <div className={clsx(styles.creditCard, styles[cardDesign])} style={{ marginBottom: '24px', transform: 'scale(0.95)', transformOrigin: 'top center' }}>
              <div className={styles.cardGlass1} />
              <div className={styles.cardGlass2} />
              <div className={styles.cardTop}>
                <div className={styles.cardChip} />
                <div className={styles.cardType}>KARTA TURI</div>
              </div>
              <div className={styles.cardNumber}>
                {cardNumber || '0000 0000 0000 0000'}
              </div>
              <div className={styles.cardBottom}>
                <div>
                  <div className={styles.cardLabel}>Karta egasi</div>
                  <div className={styles.cardValue}>{cardName.toUpperCase() || 'ISM FAMILIYA'}</div>
                </div>
                <div>
                  <div className={styles.cardLabel}>Amal qilish</div>
                  <div className={styles.cardValue}>{cardExpiry || '00/00'}</div>
                </div>
              </div>
            </div>

            {/* Design Swatches */}
            <div className={styles.designPicker}>
              <button 
                type="button"
                className={clsx(styles.designSwatch, styles.swatchPrimary, cardDesign === 'primaryCard' && styles.active)}
                onClick={() => setCardDesign('primaryCard')}
                aria-label="Ko'k dizayn"
              />
              <button 
                type="button"
                className={clsx(styles.designSwatch, styles.swatchSecondary, cardDesign === 'secondaryCard' && styles.active)}
                onClick={() => setCardDesign('secondaryCard')}
                aria-label="To'q dizayn"
              />
              <button 
                type="button"
                className={clsx(styles.designSwatch, styles.swatchEmerald, cardDesign === 'emeraldCard' && styles.active)}
                onClick={() => setCardDesign('emeraldCard')}
                aria-label="Yashil dizayn"
              />
              <button 
                type="button"
                className={clsx(styles.designSwatch, styles.swatchSunset, cardDesign === 'sunsetCard' && styles.active)}
                onClick={() => setCardDesign('sunsetCard')}
                aria-label="Olovrang dizayn"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Karta raqami</label>
              <input 
                type="text" 
                className={styles.input} 
                placeholder="0000 0000 0000 0000" 
                maxLength={19} 
                value={cardNumber}
                onChange={handleCardNumberChange}
              />
            </div>
            
            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Amal qilish</label>
                <input 
                  type="text" 
                  className={styles.input} 
                  placeholder="00/00" 
                  maxLength={5} 
                  value={cardExpiry}
                  onChange={handleExpiryChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Karta egasi</label>
                <input 
                  type="text" 
                  className={styles.input} 
                  placeholder="ISM FAMILIYA" 
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.saveBtn}>
              <Button variant="primary" size="large" fullWidth onClick={() => setShowModal(false)}>
                Kartani saqlash
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

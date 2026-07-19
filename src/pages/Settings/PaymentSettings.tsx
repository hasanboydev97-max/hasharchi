import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import styles from './PaymentSettings.module.css';
import clsx from 'clsx';

export const PaymentSettings: React.FC = () => {
  const navigate = useNavigate();

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

          <button className={styles.addCardBtn}>
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
    </div>
  );
};

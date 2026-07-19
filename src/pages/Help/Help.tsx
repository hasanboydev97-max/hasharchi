import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle, PhoneCall, ChevronDown } from 'lucide-react';
import styles from './Help.module.css';
import clsx from 'clsx';

const FAQ_DATA = [
  {
    q: "Usta xizmati qanday narxlanadi?",
    a: "Har bir usta o'zining soatlik yoki ish hajmidan kelib chiqib narx belgilaydi. Narxlarni ustaniki profilidan ko'rishingiz mumkin."
  },
  {
    q: "To'lovni qanday usulda qilsam bo'ladi?",
    a: "Ilovaga ulaangan plastik kartangiz (Uzcard/Humo) orqali yoki naqd pulda to'lash imkoniyati mavjud."
  },
  {
    q: "Ustaga bahoni qachon qo'yaman?",
    a: "Ish to'liq yakunlangandan so'ng tizim sizga ustaga baho berish va sharh qoldirish oynasini ochib beradi."
  }
];

export const HelpPage: React.FC = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </button>
        <h1 className={styles.title}>Yordam markazi</h1>
      </header>

      <div className={styles.content}>
        
        <div className={styles.contactGrid}>
          <div className={clsx(styles.contactCard, styles.telegram)}>
            <div className={styles.contactIcon}>
              <MessageCircle size={24} />
            </div>
            <div className={styles.contactTitle}>Telegram orqali yozish</div>
          </div>
          <div className={clsx(styles.contactCard, styles.phone)}>
            <div className={styles.contactIcon}>
              <PhoneCall size={24} />
            </div>
            <div className={styles.contactTitle}>Call-markazga qo'ng'iroq</div>
          </div>
        </div>

        <div style={{ marginTop: '16px' }}>
          <h2 className={styles.faqTitle}>Ko'p beriladigan savollar</h2>
          
          <div className={styles.faqList}>
            {FAQ_DATA.map((faq, index) => (
              <div key={index} className={clsx(styles.faqItem, openFaq === index && styles.open)}>
                <button className={styles.faqQuestion} onClick={() => toggleFaq(index)}>
                  {faq.q}
                  <ChevronDown size={20} className={styles.faqIcon} />
                </button>
                {openFaq === index && (
                  <div className={styles.faqAnswer}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Search, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';
import { useData } from '../../context/DataContext';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import styles from './ChatList.module.css';

interface Chat {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  time: string;
  unread: number;
  isOnline: boolean;
}

export const ChatList = () => {
  const navigate = useNavigate();
  // Using mock data for UI
  const [chats, setChats] = useState<Chat[]>([
    { id: '1', name: 'Bahriddin Usta', lastMessage: 'Salom, kelaman...', time: '10:42', unread: 2, isOnline: true },
    { id: '2', name: 'Alisher Akfa', lastMessage: 'Rahmat!', time: 'Kecha', unread: 0, isOnline: false }
  ]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChats = chats.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Xabarlar</h1>
        <div className={styles.searchContainer}>
          <Search size={20} className={styles.searchIcon} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Suhbatlarni qidirish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      <main className={styles.main}>
        {filteredChats.length === 0 ? (
          <EmptyState
            icon={<MessageSquare size={48} />}
            title="Xabarlar yo'q"
            description="Hozircha hech qanday suhbat mavjud emas"
          />
        ) : (
          <div className={styles.chatList}>
            {filteredChats.map((chat, idx) => (
              <React.Fragment key={chat.id}>
                <div 
                  className={styles.chatItem}
                  onClick={() => navigate(`/chat/${chat.id}`)}
                >
                  <div className={styles.avatarContainer}>
                    <img 
                      src={chat.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(chat.name)}`} 
                      alt={chat.name} 
                      className={styles.avatar} 
                    />
                    <div className={clsx(styles.statusDot, chat.isOnline ? styles.online : styles.offline)}></div>
                  </div>
                  
                  <div className={styles.chatInfo}>
                    <div className={styles.chatHeader}>
                      <h3 className={styles.chatName}>{chat.name}</h3>
                      <span className={styles.chatTime}>{chat.time}</span>
                    </div>
                    <div className={styles.chatFooter}>
                      <p className={styles.lastMessage}>{chat.lastMessage}</p>
                      {chat.unread > 0 && (
                        <span className={styles.unreadBadge}>{chat.unread}</span>
                      )}
                    </div>
                  </div>
                </div>
                {idx < filteredChats.length - 1 && <hr className={styles.divider} />}
              </React.Fragment>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

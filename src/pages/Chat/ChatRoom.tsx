import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Send, Paperclip, Smile, MoreVertical } from 'lucide-react';
import { clsx } from 'clsx';
import { useData } from '../../context/DataContext';
import styles from './ChatRoom.module.css';

interface Message {
  id: string;
  text: string;
  time: string;
  isMine: boolean;
}

export const ChatRoom = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  // using mock data
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Assalomu alaykum!', time: '10:40', isMine: true },
    { id: '2', text: 'Va alaykum assalom. Xizmat qanday edi?', time: '10:41', isMine: false },
    { id: '3', text: 'Muzlatkich ishlamay qoldi, ko\'rib bera olasizmi?', time: '10:42', isMine: true },
    { id: '4', text: 'Albatta, manzilni tashlang', time: '10:43', isMine: false },
  ]);
  const [inputText, setInputText] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMine: true
    };
    
    setMessages([...messages, newMessage]);
    setInputText('');
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <button onClick={() => navigate(-1)} className={styles.iconButton}>
            <ArrowLeft size={24} strokeWidth={2} />
          </button>
          <img src={`https://ui-avatars.com/api/?name=Bahriddin+Usta`} alt="Avatar" className={styles.avatar} />
          <div className={styles.userInfo}>
            <h2 className={styles.userName}>Bahriddin Usta</h2>
            <span className={styles.userStatus}>Online</span>
          </div>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.iconButton}>
            <Phone size={22} strokeWidth={2} />
          </button>
          <button className={styles.iconButton}>
            <MoreVertical size={22} strokeWidth={2} />
          </button>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.dateSeparator}>
          <span>Bugun</span>
        </div>

        <div className={styles.messageList}>
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={clsx(styles.messageWrapper, msg.isMine ? styles.mineWrapper : styles.theirsWrapper)}
            >
              <div className={clsx(styles.messageBubble, msg.isMine ? styles.mineBubble : styles.theirsBubble)}>
                <p className={styles.messageText}>{msg.text}</p>
              </div>
              <span className={styles.messageTime}>{msg.time}</span>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </main>

      <footer className={styles.footer}>
        <button className={styles.attachButton}>
          <Paperclip size={22} />
        </button>
        <div className={styles.inputContainer}>
          <input
            type="text"
            className={styles.input}
            placeholder="Xabar yozing..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button className={styles.smileButton}>
            <Smile size={22} />
          </button>
        </div>
        <button 
          className={clsx(styles.sendButton, inputText.trim() && styles.sendButtonActive)}
          onClick={handleSend}
          disabled={!inputText.trim()}
        >
          <Send size={20} className={styles.sendIcon} />
        </button>
      </footer>
    </div>
  );
};

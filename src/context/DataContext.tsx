import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export interface Worker {
  id: string;
  name: string;
  category: string;
  price: string;
  rating: number;
  reviews: number;
  image: string;
}

export interface Job {
  id: string;
  title: string;
  category: string;
  price: string;
  address: string;
  date: string;
  status: 'pending' | 'completed';
}

interface DataContextType {
  workers: Worker[];
  jobs: Job[];
  addJob: (job: Omit<Job, 'id' | 'status'>) => void;
  markJobCompleted: (id: string) => void;
}

const INITIAL_WORKERS: Worker[] = [
  { id: '1', name: 'Bahriddin Usta', category: 'Santexnika', price: '50,000 so\'m', rating: 4.8, reviews: 120, image: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: '2', name: 'Alisher Akfa', category: 'Ta\'mirlash', price: '80,000 so\'m', rating: 4.9, reviews: 85, image: 'https://randomuser.me/api/portraits/men/44.jpg' },
  { id: '3', name: 'Jamshid Elektrik', category: 'Elektrika', price: '100,000 so\'m', rating: 4.7, reviews: 200, image: 'https://randomuser.me/api/portraits/men/22.jpg' },
  { id: '4', name: 'Qodir Bo\'yoqchi', category: 'Ta\'mirlash', price: '40,000 so\'m', rating: 4.5, reviews: 50, image: 'https://randomuser.me/api/portraits/men/55.jpg' },
];

const INITIAL_JOBS: Job[] = [
  { id: '101', title: 'Oshxona kranini almashtirish', category: 'Santexnika', price: 'Kelishilgan', address: 'Toshkent, Yunusobod', date: 'Bugun, 14:00', status: 'pending' },
  { id: '102', title: '2 xonali uyni oboy qilish', category: "Ta'mirlash", price: '1,500,000 so\'m', address: 'Toshkent, Chilonzor', date: 'Ertaga', status: 'completed' },
];

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [workers] = useState<Worker[]>(INITIAL_WORKERS);
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);

  const addJob = (job: Omit<Job, 'id' | 'status'>) => {
    const newJob: Job = {
      ...job,
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending',
    };
    setJobs(prev => [newJob, ...prev]);
  };

  const markJobCompleted = (id: string) => {
    setJobs(prev => prev.map(job => job.id === id ? { ...job, status: 'completed' } : job));
  };

  return (
    <DataContext.Provider value={{ workers, jobs, addJob, markJobCompleted }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

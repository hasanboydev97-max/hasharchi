import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  role: 'usta' | 'mijoz' | 'admin' | null;
  login: (role: 'usta' | 'mijoz' | 'admin') => void;
  logout: () => void;
  setRole: (role: 'usta' | 'mijoz' | 'admin') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRoleState] = useState<'usta' | 'mijoz' | 'admin' | null>(null);

  const login = (selectedRole: 'usta' | 'mijoz' | 'admin') => {
    setRoleState(selectedRole);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setRoleState(null);
  };

  const setRole = (selectedRole: 'usta' | 'mijoz' | 'admin') => {
    setRoleState(selectedRole);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, login, logout, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

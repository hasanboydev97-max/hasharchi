import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Bu komponent faqat role tekshirib yo'naltiradi.
// Agar role 'usta' bo'lsa → HasharchiSetup
// Agar role 'mijoz' bo'lsa → MijozSetup
export const SetupProfile = () => {
  const { role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (role === 'usta') {
      navigate('/auth/setup/hasharchi', { replace: true });
    } else if (role === 'mijoz') {
      navigate('/auth/setup/mijoz', { replace: true });
    } else {
      // Role aniqlanmagan — rol tanlashga qayt
      navigate('/auth/role', { replace: true });
    }
  }, [role, navigate]);

  return null;
};

import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { MobileLayout } from './components/Layout/MobileLayout';

// Pages
import { Splash }          from './pages/Splash/Splash';
import { Onboarding }      from './pages/Onboarding/Onboarding';
import { Explore }         from './pages/Explore/Explore';
import { Profile }         from './pages/Profile/Profile';
import { Orders }          from './pages/Orders/Orders';
import { AddJob }          from './pages/AddJob/AddJob';
import { ChatList }        from './pages/Chat/ChatList';
import { ChatRoom }        from './pages/Chat/ChatRoom';
import { MyProfile }       from './pages/MyProfile/MyProfile';
import { BookService }     from './pages/BookService/BookService';
import { SearchPage }      from './pages/Search/SearchPage';
import { CategoriesPage }  from './pages/Categories/CategoriesPage';
import { JobDetail }       from './pages/JobDetail/JobDetail';
import { BookingDetail }   from './pages/Booking/BookingDetail';
import { Receipt }         from './pages/Booking/Receipt';

// Auth pages
import { Welcome }         from './pages/Auth/Welcome';
import { RoleSelection }   from './pages/Auth/RoleSelection';
import { PhoneAuth }       from './pages/Auth/PhoneAuth';
import { OTPVerify }       from './pages/Auth/OTPVerify';
import { SetupProfile }    from './pages/Auth/SetupProfile';
import { HasharchiSetup }  from './pages/Auth/HasharchiSetup';
import { MijozSetup }      from './pages/Auth/MijozSetup';
import { Placeholder }     from './pages/Placeholder/Placeholder';

import { SettingsPage }       from './pages/Settings/Settings';
import { ProfileSettings }    from './pages/Settings/ProfileSettings';
import { PaymentSettings }    from './pages/Settings/PaymentSettings';
import { NotificationsPage }  from './pages/Notifications/Notifications';
import { HelpPage }           from './pages/Help/Help';
import { PWAInstallModal }    from './components/PWAInstallModal/PWAInstallModal';
import { ScrollTop }          from './components/ScrollTop/ScrollTop';
import { RouteManager }       from './components/RouteManager/RouteManager';

import { AdminLayout } from './pages/Admin/AdminLayout/AdminLayout';
import { AdminDashboard } from './pages/Admin/Dashboard/AdminDashboard';
import { AdminUsers } from './pages/Admin/Users/AdminUsers';

import { useAuth } from './context/AuthContext';
import { useEffect } from 'react';

// ─── Secret Admin Login ──────────────────────────────────────────
function SecretAdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    login('admin');
    navigate('/admin', { replace: true });
  }, [login, navigate]);
  return null;
}

// ─── Wrapper ────────────────────────────────────────────────────
const W = ({ children, noScroll }: { children: React.ReactNode, noScroll?: boolean }) => (
  <div className={`mobile-wrapper ${noScroll ? 'no-scroll' : ''}`}>{children}</div>
);

// ─── App ────────────────────────────────────────────────────────
function App() {
  const { isLoggedIn, role } = useAuth();

  return (
    <BrowserRouter>
      <RouteManager />
      <PWAInstallModal />
      <ScrollTop />
      <Routes>

        {/* ═══ Splash (hammaga ochiq) ═══ */}
        <Route path="/splash" element={<W noScroll><Splash /></W>} />
        
        {/* ═══ Maxfiy Admin Kirish yo'li ═══ */}
        <Route path="/secret-admin" element={<SecretAdminLogin />} />

        {/* ═══ Onboarding ═══ */}
        <Route path="/onboarding" element={<W noScroll><Onboarding /></W>} />

        {/* ═══ Auth oqimi ═══ */}
        <Route path="/auth/welcome"  element={<W noScroll><Welcome /></W>} />
        <Route path="/auth/role"     element={<W><RoleSelection /></W>} />
        <Route path="/auth/phone"    element={<W><PhoneAuth /></W>} />
        <Route path="/auth/otp"      element={<W><OTPVerify /></W>} />
        <Route path="/auth/setup"    element={<W><SetupProfile /></W>} />
        <Route path="/auth/setup/hasharchi" element={<W><HasharchiSetup /></W>} />
        <Route path="/auth/setup/mijoz"     element={<W><MijozSetup /></W>} />

        {/* ═══ Asosiy (login kerak) ═══ */}
        {isLoggedIn && role !== 'admin' && (
          <>
            {/* Bottom nav bilan sahifalar */}
            <Route path="/"            element={<MobileLayout><Explore /></MobileLayout>} />
            <Route path="/orders"      element={<MobileLayout><Orders /></MobileLayout>} />
            <Route path="/chat"        element={<MobileLayout><ChatList /></MobileLayout>} />
            <Route path="/profile/me"  element={<MobileLayout><MyProfile /></MobileLayout>} />

            <Route path="/search"      element={<W><SearchPage /></W>} />
            <Route path="/categories"  element={<MobileLayout><CategoriesPage /></MobileLayout>} />

            {/* Sozlamalar va Profil menyulari */}
            <Route path="/settings"          element={<W><SettingsPage /></W>} />
            <Route path="/settings/profile"  element={<W><ProfileSettings /></W>} />
            <Route path="/settings/payment"  element={<W><PaymentSettings /></W>} />
            <Route path="/notifications"     element={<W><NotificationsPage /></W>} />
            <Route path="/help"              element={<W><HelpPage /></W>} />
            
            {/* Hali qilinmagan qismlar uchun Placeholder qoladi */}
            <Route path="/stats"             element={<W><Placeholder /></W>} />
            <Route path="/verify"            element={<W><Placeholder /></W>} />

            {/* Mijoz uchun e'lon berish */}
            {role === 'mijoz' && (
              <Route path="/add" element={<W><AddJob /></W>} />
            )}

            {/* Full-screen sahifalar (nav yo'q) */}
            <Route path="/profile/:id" element={<W><Profile /></W>} />
            <Route path="/book/:id"    element={<W><BookService /></W>} />
            <Route path="/chat/:id"    element={<W><ChatRoom /></W>} />
            <Route path="/job/:id"     element={<W><JobDetail /></W>} />
            <Route path="/booking/:id" element={<W><BookingDetail /></W>} />
            <Route path="/booking/:id/receipt" element={<W><Receipt /></W>} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}

        {/* ═══ Admin CRM ═══ */}
        {isLoggedIn && role === 'admin' && (
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Route>
        )}

        {/* ═══ Login qilinmagan ═══ */}
        {!isLoggedIn && (
          <>
            {/* Login qilmagan → splash'ga */}
            <Route path="/" element={<Navigate to="/splash" replace />} />
            <Route path="*" element={<Navigate to="/splash" replace />} />
          </>
        )}

      </Routes>
    </BrowserRouter>
  );
}

export default App;

import NotFound from './Pages/OtherPage/NotFound';
import { ScrollToTop } from './components/common/ScrollToTop';
import Attendance from './Pages/Attendance/Attendance';
import Dashboard from './Pages/ChurchDashboard/DashboardPage';
import Home from './Pages/Home/Home';
import AdminHome from './Pages/Dashboard/Home';
import AppLayout from './layout/AppLayout';
import { useEffect } from 'react';
import useAuthStore from './store/authStore';
import ProtectedRoute from './Utils/ProtectedRoutes.jsx';
import { fetchProfile } from './services/authServices';
import Login from './Pages/AuthPage/Login';
import { ToastContainer } from 'react-toastify';
import { Route, Routes } from 'react-router';
import Formspage from './Pages/ChurchDashboard/FormPage.jsx';

export default function App() {
  const setUser = useAuthStore((state) => state.setUser);
  const setAuthFromToken = useAuthStore((state) => state.setAuthFromToken);

  useEffect(() => {
    setAuthFromToken();
    (async () => {
      try {
        const profileResponse = await fetchProfile();
        const userData = profileResponse?.data?.user;
        if (userData) setUser(userData);
      } catch (err) {
        // silently ignore if unauthenticated
      }
    })();
  }, []);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Protected Dashboard Routes */}
        <Route path="/" element={<ProtectedRoute element={<Dashboard />} />}>
          <Route index element={<Home />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="form" element={<Formspage />} />
        </Route>
        <Route
          path="admin"
          element={
            <ProtectedRoute allowedRoles={['admin']} element={<AppLayout />} />
          }
        >
          <Route index element={<AdminHome />} />
        </Route>

        {/* Catch-all Not Found
         */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        closeOnClick={true}
      />
    </>
  );
}

{
  /* Dashboard Layout *
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />

            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />

            <Route path="/form-elements" element={<FormElements />} />

            <Route path="/basic-tables" element={<BasicTables />} />

            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />

            {/* Charts 
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
          </Route>
            */
}

{
  /* Fallback Route */
}

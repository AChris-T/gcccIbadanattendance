/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import './App.css';
import { useState, useEffect } from 'react';
import Login from '../src/Pages/AuthPage/Login';
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import Attendance from './Pages/Attendance/Attendance';
import Dashboard from './Pages/ChurchDashboard/Dashboard';
import Events from './Pages/Events/Events';
import LandingPage from './Pages/LandingPage/HomePage/Home';
import Home from './Pages/Home/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import About from './Pages/LandingPage/AboutPage/Aboutpage';
import Forms from './Pages/LandingPage/Formspage/Formspage';
import HomeDetails from './Pages/LandingPage/HomeDetails/HomeDetails';
import Stream from './Pages/LandingPage/StreamPage.jsx/Stream';
import Give from './Pages/LandingPage/GivePage/Give';
import Navbar from './Modals/Navbar';
import HomeNavbar from './Modals/HomeNavbar';
import Resources from './Pages/Resources/Resources';
import 'aos/dist/aos.css';
import ProtectedRoute from './Utils/ProtectedRoutes';
import AdminPage from './Pages/Admin/AdminPage';
import useAuthStore from './store/authStore';
import { fetchProfile } from './services/authServices';

function App() {
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
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute element={<Dashboard />} />}>
          <Route path="/" element={<Home />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute
                allowedRoles={['admin']}
                element={<AdminPage />}
              />
            }
          />
        </Route>
        <Route
          path="*"
          element={
            <div className="flex flex-col gap-6 items-center justify-center w-full h-[100vh]">
              <h1 className="text-2xl font-bold">Error 404: Page Not Found.</h1>
              <button className="px-6 py-4 text-lg text-white bg-purple-600 border rounded-lg">
                Back to Home
              </button>
            </div>
          }
        />
      </Routes>
      <ToastContainer position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        closeOnClick={true}
      />
    </>
  );
}

export default App;

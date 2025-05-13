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
import Home from './Pages/Home/Home';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AOS from 'aos';
import 'aos/dist/aos.css';

// Define routes outside of component to ensure they're always available
const ROUTES = {
  physical: {
    base: '/physical',
    login: '/physical/login',
    home: '/physical/home',
    attendance: '/physical/attendance'
  },
  online: {
    base: '/online',
    login: '/online/login',
    home: '/online/home',
    attendance: '/online/attendance'
  }
};

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const getDataUrl = import.meta.env.VITE_APP_GET_DATA;
  const [isMarked, setIsMarked] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get current route type from path
  const getRouteType = (path) => {
    if (!path) return null;
    if (path.startsWith(ROUTES.physical.base)) return 'physical';
    if (path.startsWith(ROUTES.online.base)) return 'online';
    return null;
  };

  // Initialize app and handle stored user
  useEffect(() => {
    AOS.init();
    try {
      const storedUser = localStorage.getItem('GCCC_ATTENDANCE');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setLoggedInUser(userData);
        
        const currentPath = location.pathname;
        const routeType = getRouteType(currentPath);
        
        // If user is on a specific route type, stay there
        if (routeType) {
          if (currentPath === ROUTES[routeType].login) {
            navigate(ROUTES[routeType].home);
          }
        } else {
          // Default to user's stored type
          navigate(ROUTES[userData.attendanceType]?.home || ROUTES.physical.home);
        }
      }
    } catch (error) {
      console.error('Error initializing app:', error);
      // Handle initialization error gracefully
      navigate(ROUTES.physical.login);
    }
  }, [location.pathname]);

  const handleLogin = async (username, password) => {
    try {
      const response = await fetch(getDataUrl);
      const users = await response.json();
      const lowercaseUsername = username.toLowerCase();
      const user = users.find(
        (user) =>
          user.Email.toLowerCase() === lowercaseUsername ||
          user['Phone Number'] === username
      );

      if (user) {
        // Determine attendance type from current URL
        const routeType = getRouteType(location.pathname);
        if (!routeType) {
          toast.error('Invalid access path', {
            position: 'top-right',
          });
          return;
        }

        const userWithType = { ...user, attendanceType: routeType };
        setLoggedInUser(userWithType);
        localStorage.setItem('GCCC_ATTENDANCE', JSON.stringify(userWithType));
        
        toast.success('Login successful', {
          position: 'top-right',
        });
        
        navigate(ROUTES[routeType].home);
      } else {
        toast.error('Invalid Email/Phone Number', {
          position: 'top-right',
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.', {
        position: 'top-right',
      });
    }
  };

  const handleLogout = (attendanceType) => {
    try {
      localStorage.removeItem('GCCC_ATTENDANCE');
      setLoggedInUser(null);
      navigate(ROUTES[attendanceType].login);
      toast.success('Logged out successfully', {
        position: 'top-right',
      });
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Error during logout. Please try again.', {
        position: 'top-right',
      });
    }
  };

  const ProtectedRoute = ({ element, attendanceType }) => {
    if (!loggedInUser) {
      return <Navigate to={ROUTES[attendanceType].login} replace />;
    }
    if (loggedInUser.attendanceType !== attendanceType) {
      return <Navigate to={ROUTES[loggedInUser.attendanceType].home} replace />;
    }
    return element;
  };

  return (
    <>
      <Routes>
        {/* Physical Member Routes */}
        <Route
          path={ROUTES.physical.login}
          element={
            loggedInUser ? (
              <Navigate to={ROUTES.physical.home} replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path={`${ROUTES.physical.base}/*`}
          element={
            <ProtectedRoute
              element={
                <Dashboard
                  user={loggedInUser}
                  isMarked={isMarked}
                  setIsMarked={setIsMarked}
                  attendanceType="physical"
                  onLogout={() => handleLogout('physical')}
                />
              }
              attendanceType="physical"
            />
          }
        >
          <Route path="home" element={<Home isMarked={isMarked} setIsMarked={setIsMarked} />} />
          <Route path="attendance" element={<Attendance attendanceType="physical" />} />
        </Route>

        {/* Online Member Routes */}
        <Route
          path={ROUTES.online.login}
          element={
            loggedInUser ? (
              <Navigate to={ROUTES.online.home} replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path={`${ROUTES.online.base}/*`}
          element={
            <ProtectedRoute
              element={
                <Dashboard
                  user={loggedInUser}
                  isMarked={isMarked}
                  setIsMarked={setIsMarked}
                  attendanceType="online"
                  onLogout={() => handleLogout('online')}
                />
              }
              attendanceType="online"
            />
          }
        >
          <Route path="home" element={<Home isMarked={isMarked} setIsMarked={setIsMarked} />} />
          <Route path="attendance" element={<Attendance attendanceType="online" />} />
        </Route>

        {/* Default Route */}
        <Route
          path="*"
          element={
            <div className="flex flex-col gap-6 items-center justify-center w-full h-[100vh]">
              <h1 className="text-2xl font-bold">Error 404: Page Not Found</h1>
              <button
                className="px-6 py-4 text-lg text-white bg-purple-600 border rounded-lg"
                onClick={() => navigate(ROUTES.physical.home)}
              >
                Back to Home
              </button>
            </div>
          }
        />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
/*  
import About from './Pages/LandingPage/AboutPage/Aboutpage';
import Forms from './Pages/LandingPage/Formspage/Formspage';
import HomeDetails from './Pages/LandingPage/HomeDetails/HomeDetails';
import Stream from './Pages/LandingPage/StreamPage.jsx/Stream';
import Give from './Pages/LandingPage/GivePage/Give';
import Navbar from './Modals/Navbar';
import HomeNavbar from './Modals/HomeNavbar';
import Resources from './Pages/Resources/Resources';
import Events from './Pages/Events/Events';
import LandingPage from './Pages/LandingPage/HomePage/Home';
(user) =>
          (user.Email.toLowerCase() == lowercaseUsername &&
            user["Phone Number"] == password) ||
          (user["Phone Number"] == username && user["Phone Number"] == password)
      ); */
{
  /*   {/*     <Route path="/login">
        <Route index element={<Login onLogin={handleLogin}/>}/>
        <Route path='login' element={<Login/>}/>
{/*      <Route path='Register' element={<Register/>}/>
    </Route> */
}
{
  /*  <Route path="/" element={<LandingPage loggedInUser={loggedInUser} />}>
          <Route path="/" element={<HomeDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/forms" element={<Forms />} />
          <Route path="/events" element={<Stream />} />
          <Route path="/give" element={<Give />} />
          <Route path="/home/resources" element={<Resources />} />
        </Route> */
}

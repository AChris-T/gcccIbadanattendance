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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import About from './Pages/LandingPage/AboutPage/Aboutpage';
import Forms from './Pages/LandingPage/Formspage/Formspage';
import HomeDetails from './Pages/LandingPage/HomeDetails/HomeDetails';
import Stream from './Pages/LandingPage/StreamPage.jsx/Stream';
import Give from './Pages/LandingPage/GivePage/Give';
import Navbar from './Modals/Navbar';
import HomeNavbar from './Modals/HomeNavbar';
import Resources from './Pages/Resources/Resources';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const getDataUrl = import.meta.env.VITE_APP_GET_DATA;
  const [isMarked, setIsMarked] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    AOS.init();
    const storedUser = localStorage.getItem('GCCC_ATTENDANCE');
    const params = new URLSearchParams(location.search);
    const source = params.get('source');

    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
      if (source === 'online') {
        navigate('/attendance?source=online');
      } else {
        navigate('/');
      }
    }
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const response = await fetch(getDataUrl);
      const users = await response.json();
      console.log({ users })
      const lowercaseUsername = username.toLowerCase();
      const user = users.find(
        (user) =>
          user.Email.toLowerCase() === lowercaseUsername ||
          user['Phone Number'] === username
      );

      if (user) {
        setLoggedInUser(user);
        localStorage.setItem('GCCC_ATTENDANCE', JSON.stringify(user));

        toast.success('Login successful', {
          position: 'top-right',
        });
        const params = new URLSearchParams(location.search);
        const source = params.get('source');

        if (source === 'online') {
          navigate('/attendance?source=online');
        } else {
          navigate('/');
        }
      } else {
        toast.error('Invalid Email/Phone Number', {
          position: 'top-right',
        });
      }
    } catch (error) {
      toast.error(error.message || 'An error occurred', {
        position: 'top-right',
      });
    }
  };

  const ProtectedRoute = ({ element, ...rest }) => {
    return loggedInUser ? element : <Navigate to="/login" />;
  };

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/"
          element={
            <ProtectedRoute
              element={
                <Dashboard
                  user={loggedInUser}
                  isMarked={isMarked}
                  setIsMarked={setIsMarked}
                />
              }
            />
          }
        >
          <Route
            path="/"
            element={<Home isMarked={isMarked} setIsMarked={setIsMarked} />}
          />
          <Route path="/attendance" element={<Attendance />} />
        </Route>
        <Route
          path="*"
          element={
            <div className="flex flex-col gap-6 items-center justify-center w-full h-[100vh]">
              <h1 className="text-2xl font-bold">Error 404: Page Not Found.</h1>
              <button
                className="px-6 py-4 text-lg text-white bg-purple-600 border rounded-lg"
                onClick={() => navigate('/?source=404')}
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

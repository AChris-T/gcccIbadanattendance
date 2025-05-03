/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import './App.css';
import { useState, useEffect } from 'react';
import Login from '../src/Pages/AuthPage/Login';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
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

  useEffect(() => {
    AOS.init();
    const storedUser = localStorage.getItem('GCCC_ATTENDANCE');
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
      navigate('/');
    }
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const response = await fetch(getDataUrl);
      const users = await response.json();
      const lowercaseUsername = username.toLowerCase();
      const user = users.find(
        (user) =>
          user.Email.toLowerCase() == lowercaseUsername ||
          user['Phone Number'] == username
      );
      /*   (user) =>
          (user.Email.toLowerCase() == lowercaseUsername &&
            user["Phone Number"] == password) ||
          (user["Phone Number"] == username && user["Phone Number"] == password)
      ); */

      if (user) {
        setLoggedInUser(user);
        localStorage.setItem('GCCC_ATTENDANCE', JSON.stringify(user));
        toast.success('Login successfull', {
          position: 'top-right',
        });
        navigate('/');
      } else {
        toast.error('Invalid Email/Phone Number ', {
          position: 'top-right',
        });
      }
    } catch (error) {
      toast.error(error, {
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
        {/*  <Route path="/" element={<LandingPage loggedInUser={loggedInUser} />}>
          <Route path="/" element={<HomeDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/forms" element={<Forms />} />
          <Route path="/events" element={<Stream />} />
          <Route path="/give" element={<Give />} />
          <Route path="/home/resources" element={<Resources />} />
        </Route> */}
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

        {/*   {/*     <Route path="/login">
        <Route index element={<Login onLogin={handleLogin}/>}/>
        <Route path='login' element={<Login/>}/>
{/*      <Route path='Register' element={<Register/>}/>
    </Route> */}
        <Route
          path="*"
          element={
            <>
              <div className="flex flex-col gap-6 items-center justify-center w-full h-[100vh]">
                <h1 className="text-2xl font-bold">
                  Error 404: Page Not Found.
                </h1>{' '}
                <button
                  className="px-6 py-4 text-lg text-white bg-purple-600 border rounded-lg"
                  onClick={() => navigate('/')}
                >
                  Back to Home
                </button>{' '}
              </div>
            </>
          }
        />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;

/* eslint-disable react/prop-types */
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import logo from '../../assets/Images/gcc.png';
import { ClipLoader } from 'react-spinners';
import { NavLink, useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/authServices';
import useAuthStore from '../../store/authStore';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      return toast.error('Email/Phone and Password are required');
    }

    let formattedPassword = password.trim();
    if (/^0\d+/.test(formattedPassword)) {
      7;
      formattedPassword = formattedPassword.substring(1);
    }
    setLoading(true);
    try {
      const data = await loginUser({ username, password: formattedPassword });
      login(data.data.user, data.data.token);
      toast.success('Login successful');
      navigate('/');
    } catch (error) {
      console.log(error.message);
      const err = JSON.parse(error.message);
      console.log(err);
      toast.error(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className=" max-w-[1940px]  bg-[#24244e] mx-auto  overflow-x-hidden">
        <div className="flex items-center justify-center w-full px-4 align-middle md:px-0 ">
          <div className="flex w-full justify-center items-center h-[100vh]">
            <div className="flex flex-col items-center w-full railway">
              <NavLink to="/" className="">
                <img src={logo} alt="GCC logo" className="w-[150px]" />
              </NavLink>
              <p className="px-3 -mt-5 font-medium text-center text-white railway">
                Grow deeper in your commitment to God’s house.
              </p>
              <form
                className="flex md:w-[450px] w-full  mt-10 flex-col  gap-3 md:px-[30px] "
                onSubmit={handleSubmit}
              >
                <div>
                  <label htmlFor="username" className="sr-only">
                    Email or Phone Number
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    placeholder="Email or Phone Number"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full  focus:outline-none py-[13px] px-2 rounded border-b-[1.8px] text-white bg-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="username" className="sr-only">
                    Password
                  </label>
                  <input
                    type="text"
                    id="password"
                    value={password}
                    placeholder="Password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full  focus:outline-none py-[13px] px-2 rounded border-b-[1.8px] text-white bg-transparent"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 rounded-lg railway  text-[#fff] text-[20px] border-none hover:bg-blue-400 bg-[#4C8EFF] w-full py-3 flex justify-center font-normal"
                >
                  {loading ? (
                    <ClipLoader size={20} className="mt-1" color="#fff" />
                  ) : (
                    <span>Sign in</span>
                  )}
                </button>
                <p className="flex w-full text-white railway text-[14px]  justify-center  items-center">
                  Dont have an account?
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLScZ48ojbVzUIjByfLBxO7aSG9GUiyNFKXwD7XiJqTFVNtjdrw/viewform?usp=sf_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[12px]  text-blue-500 ml-1 cursor-pointer underline"
                  >
                    Register
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

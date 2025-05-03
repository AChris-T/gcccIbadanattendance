/* eslint-disable react/prop-types */
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import logo from '../../assets/Images/image.png';
import { ClipLoader } from 'react-spinners';
import { NavLink } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [username, setusername] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    if (!username.trim().length)
      return toast.error('Invalid Email/Phone Number');
    setLoading(true);
    e.preventDefault();
    await onLogin(username);
    setLoading(false);
  };

  return (
    <div>
      <div className=" max-w-[1940px]  bg-[#24244e] mx-auto  overflow-x-hidden">
        <div className="flex items-center justify-center w-full px-2 align-middle ">
          <div className="flex w-full  justify-center items-center  h-[100vh] ">
            <div className="w-full  flex flex-col items-center  py-[30px] railway">
              {' '}
              <NavLink to="/" className="mb-3">
                <img src={logo} alt="" />
              </NavLink>
              <h3 className="text-[32px] px-3 mt-2 leading-10 mb-2 railway font-semibold flex justify-center  text-white w-[390px] text-center">
                Sign In
              </h3>
              <p className="px-3 font-medium text-center text-white railway">
                Grow deeper in your commitment to God’s house.
              </p>
              <form className="flex md:w-[450px] w-full  mt-10 flex-col  gap-3 md:px-[30px] ">
                <label className="text-sm text-white mb:text-base">
                  Email Address Or Phone Number
                </label>
                <input
                  type="text"
                  value={username}
                  placeholder="Email/Phone Number"
                  required
                  onChange={(e) => setusername(e.target.value)}
                  className="px-4 w-full  focus:outline-none py-[13px] rounded-lg border-[1.8px] bg-white"
                />
                {/*  <div className="flex justify-between mt-2">
                  <div className="flex items-center gap-1">
                    <input type="checkbox" className="" />
                    <span className="text-[12px]">Remenber Me</span>
                  </div>
                  {/* <div>
                <span  className="text-[12px] text-blue-500 underline cursor-pointer">Forget password?</span>
               </div> 
                </div> */}
                <div className="flex justify-center w-full">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="mt-2 rounded-lg railway  text-[#fff] text-[20px] border-none hover:bg-blue-400 bg-[#4C8EFF] w-full py-3 flex justify-center font-normal"
                  >
                    {loading && (
                      <ClipLoader size={20} className="mt-1" color="#fff" />
                    )}
                    {!loading && <span>Sign in</span>}
                  </button>
                </div>
                <p className="flex w-full text-white railway text-[14px]  justify-center  items-center">
                  Dont have an account?
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLScZ48ojbVzUIjByfLBxO7aSG9GUiyNFKXwD7XiJqTFVNtjdrw/viewform?usp=sf_link"
                    target="_blank"
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

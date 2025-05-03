/* eslint-disable no-unused-vars */

/* eslint-disable react/prop-types */
//import React from 'react'
import profile from '../../src/assets/Images/user.png';

import { Popover, Text, Button } from '@mantine/core';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
//import Sidebar from "./Sidebar";
import gccclogo from '../assets/Images/log.png';
import check from '../assets/Images/check.png';
import settings from '../assets/Images/settings.png';
import logout from '../assets/Images/logout.png';
import { Paper } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import { useState } from 'react';
import { FaUserCheck } from 'react-icons/fa';
import dayjs from 'dayjs';
import logo from '../assets/Images/image.png';

const Navbar = ({ isMarked }) => {
  const formattedDateTime = dayjs().format('dddd  [,] MMMM DD YYYY');
  const formattedTime = dayjs().format('hh:mm A ');
  return (
    <div className="flex   w-full bg-[#24244e] z-50 relative  justify-between  md:h-[108px] h-[59px]   md:items-center p-4">
      <img src={gccclogo} alt="menu" className="w-[200px] hidden md:flex" />
      <img src={logo} alt="menu" className="flex md:hidden" />
      <p className="text-[14px] flex items-center gap-2 text-white leading-6 font-normal">
        {formattedTime} |{' '}
        <p className={`${isMarked ? 'text-white' : 'text-[#86888A]'}`}>
          {formattedDateTime}
        </p>{' '}
      </p>
    </div>
  );
};

export default Navbar;
{
  /*  <Button className="flex">
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-start justify-start">
            <p className=" text-[#120F14] leading-5 text-[8px] md:text-[14px] font-medium">
              {authUser["Last Name"]} {authUser["First Name"]}
            </p>
            {/*           <p className=' text-[#42394A] mt-[-px2rem(5)] md:mt-[px2rem(0)] leading-4 text-[7.px2rem(59)] md:text-[px2rem(12)] font-normal'>Music team</p>
          </div>
          <img src={profile} alt={profile} width={"25px"} height={"25px"} />
        </div>
      </Button> */
}
{
  /* <Drawer
        open={open}
        sx={{ paddingyTop: "200px" }}
        onClose={toggelDrawer(false)}
        className="flex   bg-white  shadow-black justify-end   flex-col absolute   mt-9   w-[40px]   text-[white] rounded-sm"
      >
        <div className="">
          <div className="flex items-center justify-between px-2 py-6">
            <img
              src={gccclogo}
              alt="gccclogo"
              width={"230px"}
              height={"65px"}
            />
          </div>
        </div>

        <div className="flex flex-col justify-between h-full px-6 mt-9 gap-7">
          <div className="flex flex-col gap-3">
            <NavLink
              to="/"
              className="flex items-center text-[#0094D3]  rounded gap-[8px] h-[48px] px-2 text-[14px] font-medium hover:bg-[#D1F1FF]  "
              style={({ isActive }) => {
                return {
                  fontWeight: isActive ? "#0094D3" : "",
                  color: isActive ? "#0094D3" : "",
                };
              }}
            >
              <FaUserCheck className="text-[24px]" />
              {/*           <img src={check} alt="gccclogo" width={"px2rem(24)"} height={"px2rem(24)"} />
              Home
            </NavLink>
            <NavLink
              to="/dashboard/attendance"
              className="flex items-center text-[#0094D3]  rounded gap-[8px] h-[48px] px-2 text-[14px] font-medium text-center bg-[#D1F1FF] "
              style={({ isActive }) => {
                return {
                  fontWeight: isActive ? "#0094D3" : "",
                  color: isActive ? "#0094D3" : "",
                };
              }}
            >
              <img src={check} alt="gccclogo" width={"24px"} height={"24px"} />
              Attendance Log
            </NavLink>
            <NavLink
              to="/dashboard/attendance"
              className="flex items-center text-[#0094D3]  rounded gap-[8px] h-[48px] px-2 text-base leading-6 font-normal text-center hover:bg-[#D1F1FF] "
            >
              <img
                src={settings}
                alt="gccclogo"
                width={"20px"}
                height={"20px"}
              />
              Settings
            </NavLink>
          </div>
          <div className="flex flex-col justify-start gap-3 mb-3">
            <NavLink
              to="/"
              onClick={handleClearLocalStorage}
              className="flex items-center text-[#0094D3]  rounded gap-[18px] h-[48px] px-2 leading-6 text-base font-normal text-center hover:bg-[#D1F1FF] "
            >
              <img src={logout} alt="gccclogo" width={"20px"} height={"20px"} />
              logout
            </NavLink>

            {/*   <button
              onClick={handleClearLocalStorage}
              className="flex items-center justify-center rounded gap-[px2rem(8)] h-[px2rem(48)] px-2 text-sm font-medium text-center  "
            >
             <img src={SignUp} alt="signup" className="w-5" />  Sign Out
            </button> 
          </div>
        </div>
      </Drawer> */
}

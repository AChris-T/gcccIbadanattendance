/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import UserAbsent from '../UserAbsent/UserAbsent';
import 'react-loading-skeleton/dist/skeleton.css';
import { Box, Button, Modal, Typography } from '@mui/material';
import Lottie from 'lottie-react';
import animationData from '../../assets/Animation.json';
import { motion } from 'framer-motion';
import HandIcon from '../../assets/HandIcon';
import CheckedIcon from '../../assets/CheckedIcon';

const Home = ({ isMarked, setIsMarked }) => {
  const postDataUrl = import.meta.env.VITE_APP_POST_DATA;
  const authUser = JSON.parse(localStorage.getItem('GCCC_ATTENDANCE'));
  const [userTimes, setUserTimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingUserAttendance, setLoadingUserAttendance] = useState(false);
  const [Marked, setMarked] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [isReading, setIsReading] = useState(false);
  const formattedTime = dayjs().format('hh:mm A ');

  dayjs.extend(customParseFormat);

  const current = {
    time: dayjs().format('HH:mm A'),
    day: dayjs().format('dddd'),
    date: dayjs().format('DD'),
    month: dayjs().format('MMM'),
    year: dayjs().format('YYYY'),
  };
  const uniqueKey = `${current.day}-${current.date}-${current.month}-${current.year}`;

  const handleButtonClick = async () => {
    setLoading(true);
    setIsReading(true);
    setTimeout(() => {
      setIsReading(false);
    }, 4000);

    try {
      const formData = new FormData();
      formData.append(
        'Name',
        `${authUser['First Name']} ${authUser['Last Name']}`
      );
      formData.append('Phone', authUser.PhoneNumber);
      formData.append('Email', authUser.Email);
      formData.append('Service', current.day);
      formData.append('Date', new Date());
      formData.append('Time', current.time);
      formData.append('Key', uniqueKey);
      const res = await fetch(postDataUrl, {
        method: 'POST',
        body: formData,
      });
      await res.json();
      toast.success('Your attendance has been recorded');
      setMarked(true);
      setIsMarked(true);
      setOpen(true);
      userAttendance();
      setLoading(false);
    } catch (error) {
      toast.error('Error, Please try again');
      setLoading(false);
    }
  };

  const handleConfirm = () => {
    window.location.href = '/'; // Replace with your actual home page route
  };

  const showAttendanceButton = () => {
    return !Marked;
  };

  const userAttendance = async () => {
    setLoadingUserAttendance(true);

    try {
      let getAllAttend = await fetch(postDataUrl);
      getAllAttend = await getAllAttend.json();
      getAllAttend = getAllAttend.filter(
        (user) =>
          user.Email.toLowerCase() == authUser.Email.toLowerCase() ||
          user.Phone == authUser.Phone
      );
      const alreadyMarked = getAllAttend.find((user) => user.Key == uniqueKey);
      if (alreadyMarked) {
        setMarked(false);
        setIsMarked(false); //note this
      }
      setUserTimes(getAllAttend);
      setLoadingUserAttendance(false);
    } catch (error) {
      setUserTimes([]);
      setLoadingUserAttendance(false);
      setMarked(false);
    }
  };

  useEffect(() => {
    userAttendance();
  }, []);

  return (
    <div className="w-full px-2 mt-[70px] ">
      <div className="flex gap-3 flex-col items-center mb-[70px]">
        <div className="flex flex-col items-center justify-between gap-5 mx-4 ">
          <h1 className=" capitalize md:block text-[14px] ml-2 leading-8 font-normal text-white">
            Hello 👋, {authUser['First Name']}
          </h1>
          <div className="flex items-center justify-center w-full gap-1 ">
            <p className="text-[32px] text-center text-white leading-10 font-semibold">
              Welcome To {current.day} Service!{' '}
            </p>
          </div>
        </div>
        {loadingUserAttendance ? (
          <Lottie
            animationData={animationData}
            loop={true}
            style={{ width: 150, height: 150 }}
          />
        ) : (
          <div className="flex flex-col items-center justify-between gap-4 mx-4 ">
            <div className="flex flex-col items-center gap-1">
              {showAttendanceButton() ? (
                <div className="p-3 bg-[#2E2E44] rounded-full bg- ">
                  <div className="bg-[#3A4D70] rounded-full">
                    <motion.div
                      onClick={handleButtonClick}
                      className="rounded-full bg-[#4C8EFF] p-9 cursor-pointer relative"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{
                        repeat: Infinity,
                        repeatType: 'loop',
                        duration: 1.5,
                        type: 'spring',
                      }}
                    >
                      {/* Outer pulsating circles */}
                      <span className="absolute inset-1 rounded-full  border-4 border-[#0f121b] opacity-90 animate-ping delay-150"></span>
                      <span className="absolute inset-1 rounded-full border-4 border-[#06080e] opacity-90 animate-ping delay-150"></span>

                      {/* Icon */}
                      <HandIcon />
                    </motion.div>
                  </div>
                </div>
              ) : (
                <CheckedIcon />
              )}
              {isReading && (
                <p style={{ marginTop: '10px' }} className="text-white">
                  Reading...
                </p>
              )}
              <h3 className="mt-[37px] text-white">
                {isMarked
                  ? 'Attendance Taken'
                  : 'Tap the button to log your attendance'}
              </h3>
              <p className="text-sm font-semibold text-white">Clock In Time</p>
              <p className="text-white">{formattedTime}</p>
            </div>
            <div className="flex items-center gap-2">{/*  */}</div>
          </div>
        )}
      </div>
      <Modal open={open} className="flex justify-center" onClose={handleClose}>
        <Box className="max-w-sm p-6 m-auto bg-white rounded-md shadow-md">
          <Typography className="my-4">
            Thank you for confirming your attendance
          </Typography>
          <div className="flex justify-end gap-3 mt-5">
            <Button variant="contained" color="primary" onClick={handleConfirm}>
              okay
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Home;

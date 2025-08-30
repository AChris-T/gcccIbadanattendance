/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isoWeek from 'dayjs/plugin/isoWeek';
import { toast } from 'react-toastify';
import Lottie from 'lottie-react';
import animationData from '../../assets/Animation.json';
import { motion } from 'framer-motion';
import HandIcon from '../../assets/HandIcon';
import { ClipLoader } from 'react-spinners';
import UserAbsent from '../UserAbsent/UserAbsent';
import useAuthStore from '../../store/authStore';
import CheckedIcon from '../../assets/CheckedIcon';
import {
  fetchServiceDay,
  submitServiceAttendance,
} from '../../services/dashboardServices';
import { useNavigate } from 'react-router';

dayjs.extend(customParseFormat);
dayjs.extend(isoWeek);

const Home = () => {
  const storeUser = useAuthStore((state) => state.user);
  const navigate = useNavigate()

  const [state, setState] = useState({
    serviceDayId: null,
    status: 'loading',
    isLoading: true,
    isSubmitting: false,
    hasMarkedToday: false,
  });

  const params = new URLSearchParams(location.search);
  const source = params.get('source') || 'online';

  const profile = {
    firstName: storeUser?.first_name,
    lastName: storeUser?.last_name,
    email: storeUser?.email,
  };

  useEffect(() => {
    const attendanceDate = localStorage.getItem('attendance_date');
    if (attendanceDate && dayjs(attendanceDate).isSame(dayjs(), 'day')) {
      setState((prev) => ({ ...prev, hasMarkedToday: true }));
    }
  }, []);

  useEffect(() => {
    const loadServiceDay = async () => {
      setState((prev) => ({ ...prev, isLoading: true }));
      try {
        const response = await fetchServiceDay();
        if (response && response.data?.id) {
          setState((prev) => ({
            ...prev,
            serviceDayId: response.data.id,
            status: 'success',
          }));
        } else {
          setState((prev) => ({ ...prev, status: 'error' }));
        }
      } catch (error) {
        console.error(error);
        setState((prev) => ({ ...prev, status: 'error' }));
      } finally {
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    };
    loadServiceDay();
  }, []);

  const handleButtonClick = async (e) => {
    e.preventDefault();
    if (!state.serviceDayId) {
      return toast.error('Service Day not found, please try again later.');
    }

    setState((prev) => ({ ...prev, isSubmitting: true }));

    try {
      const payload = {
        service_id: state.serviceDayId,
        mode: source,
        status: 'present',
      };

      const response = await submitServiceAttendance(payload);
      toast.success(response?.message || 'Attendance submitted successfully');
      const attendanceDate =
        response?.message?.date?.attendance_date ||
        dayjs().format('YYYY-MM-DD');
      localStorage.setItem('attendance_date', attendanceDate);

      if (dayjs(attendanceDate).isSame(dayjs(), 'day')) {
        setState((prev) => ({ ...prev, hasMarkedToday: true }));
      }
      navigate('/attendance')
    } catch (error) {
      toast.error(error?.message || 'Attendance submission failed');
    } finally {
      setState((prev) => ({ ...prev, isSubmitting: false }));
    }
  };

  return (
    <div className="w-full px-2 min-h-screen flex justify-center items-center">
      <div className="flex gap-3 flex-col items-center mb-5">
        <p className="text-base text-white capitalize my-4">
          Hello 👋, {profile?.firstName ?? 'Friend'}
        </p>

        {state.status === 'loading' ? (
          <Lottie
            animationData={animationData}
            loop
            style={{ width: 150, height: 150 }}
          />
        ) : (
          <div className="flex flex-col items-center gap-4 mx-4">
            {state.status === 'success' ? (
              <div className="flex flex-col items-center justify-center gap-4">
                {state.isLoading ? (
                  <ClipLoader color="#4C8EFF" />
                ) : state.hasMarkedToday ? (
                  <div className="flex flex-col items-center justify-center">
                    <CheckedIcon />
                    <h3 className="text-center text-white">
                      Attendance Already Taken Today
                    </h3>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    {' '}
                    <div className="bg-[#3A4D70] rounded-full animate-pulse delay-150">
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
                        {' '}
                        <span className="absolute inset-1 rounded-full border-4 border-[#202a46] opacity-90 animate-ping delay-1000"></span>{' '}
                        <span className="absolute inset-1 rounded-full border-4 border-[#172346] opacity-90 animate-ping delay-10000"></span>{' '}
                        <HandIcon />{' '}
                      </motion.div>{' '}
                    </div>{' '}
                    <div className="text-center my-3">
                      <p className="my-3 text-sm font-semibold text-white">
                        {' '}
                        Clock In Time{' '}
                      </p>{' '}
                      <p className="text-white">---</p>{' '}
                    </div>{' '}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full md:h-[50dvh] gap-5 mt-20 ">
                <p className="max-w-md text-center text-white">
                  We do not have a church service today, but you can catch up
                  with previous services on YouTube and download audio messages
                  on Telegram.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <a
                    href="https://youtube.com/@gccc_ibadan?si=XRe2Ev_qj9vK8nJz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center px-6 py-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-700"
                  >
                    Watch on YouTube
                  </a>
                  <a
                    href="https://t.me/Pastoropeyemipeter"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
                  >
                    Download on Telegram
                  </a>
                </div>
                <UserAbsent />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

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
import CheckedIcon from '../../assets/CheckedIcon';
import { ClipLoader } from 'react-spinners';

dayjs.extend(customParseFormat);
dayjs.extend(isoWeek);

const allowedDays = ['Tuesday', 'Wednesday', 'Friday', 'Sunday'];

const Home = ({ isMarked, setIsMarked }) => {
  const postDataUrl = import.meta.env.VITE_APP_POST_DATA;
  const authUser = JSON.parse(localStorage.getItem('GCCC_ATTENDANCE'));
  const [state, setState] = useState({
    userTimes: [],
    loading: false,
    loadingUserAttendance: false,
    clockInTime: '--/--',
    marked: false,
    open: false,
    isReading: false,
  });
  const params = new URLSearchParams(location.search);
  const source = params.get('source') || 'physical';
  console.log(source);
  const current = {
    time: dayjs().format('HH:mm A'),
    day: dayjs().format('dddd'),
    date: dayjs().format('DD'),
    month: dayjs().format('MMMM'),
    year: dayjs().format('YYYY'),
    week: Math.floor(dayjs().diff(dayjs().startOf('month'), 'day') / 7) + 1,
  };

  const uniqueKey = `${current.day}-${current.date}-${current.month}-${current.year}`;

  const handleButtonClick = async () => {
    if (state.loading || state.marked) return;
    setState((prev) => ({ ...prev, loading: true, isReading: true }));
    const timeNow = dayjs().format('hh:mm A');
    localStorage.setItem('GCCC_CLOCK_IN_TIME', timeNow);

    try {
      const formData = new FormData();
      formData.append(
        'Name',
        `${authUser['First Name']} ${authUser['Last Name']}`
      );
      formData.append('Phone', authUser.PhoneNumber);
      formData.append('Email', authUser.Email);
      formData.append('Service', current.day);
      formData.append('Month', current.month);
      formData.append('Week', current.week);
      formData.append('Date', new Date());
      formData.append('Time', current.time);
      formData.append('Key', uniqueKey);
      formData.append('Attendee', source);

      const res = await fetch(postDataUrl, { method: 'POST', body: formData });
      await res.json();

      toast.success('Your attendance has been recorded');

      setState((prev) => ({
        ...prev,
        clockInTime: timeNow,
        marked: true,
        open: true,
        loading: false,
        isReading: false,
      }));
      setIsMarked(true);
      userAttendance();
    } catch (error) {
      toast.error('Error, Please try again');
      setState((prev) => ({ ...prev, loading: false, isReading: false }));
    }
  };

  const userAttendance = async () => {
    setState((prev) => ({ ...prev, loadingUserAttendance: true }));
    try {
      let res = await fetch(postDataUrl);
      let data = await res.json();

      const userAtt = data.filter(
        (user) =>
          user.Email.toLowerCase() === authUser.Email.toLowerCase() ||
          user.Phone === authUser.Phone
      );

      const alreadyMarked = userAtt.find((user) => user.Key === uniqueKey);

      if (alreadyMarked) {
        setState((prev) => ({
          ...prev,
          marked: true,
          clockInTime: dayjs().format('hh:mm A'),
        }));
        setIsMarked(true);
      }

      setState((prev) => ({
        ...prev,
        userTimes: userAtt,
        loadingUserAttendance: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        userTimes: [],
        marked: false,
        loadingUserAttendance: false,
      }));
    }
  };

  useEffect(() => {
    userAttendance();
    const storedTime = localStorage.getItem('GCCC_CLOCK_IN_TIME');
    if (storedTime && isMarked) {
      setState((prev) => ({ ...prev, clockInTime: storedTime }));
    }
  }, []);

  return (
    <div className="w-full px-2 mt-[70px]">
      <div className="flex gap-3 flex-col items-center mb-[70px]">
        <div className="flex flex-col items-center gap-5 mx-4">
          {allowedDays.includes(current.day) ? (
            <>
              <p className="capitalize text-[14px] text-white">
                Hello 👋, {authUser['First Name']}
              </p>
              <p className="text-[32px] text-center text-white font-semibold">
                Welcome To {current.day} Service!
              </p>
            </>
          ) : null}
        </div>

        {state.loadingUserAttendance ? (
          <Lottie
            animationData={animationData}
            loop
            style={{ width: 150, height: 150 }}
          />
        ) : (
          <div className="flex flex-col items-center gap-4 mx-4">
            <div className="flex flex-col items-center gap-1">
              {!state.marked ? (
                allowedDays.includes(current.day) ? (
                  <div className="p-3 rounded-full ">
                    {state.isReading ? (
                      <div className="my-20">
                        <ClipLoader color="#4C8EFF" />
                      </div>
                    ) : (
                      <div className="bg-[#3A4D70] rounded-full  animate-pulse delay-150">
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
                          <span className="absolute inset-1 rounded-full  border-4 border-[#202a46] opacity-90 animate-ping delay-1000"></span>
                          <span className="absolute inset-1 rounded-full border-4 border-[#172346] opacity-90 animate-ping delay-10000"></span>{' '}
                          <HandIcon />
                        </motion.div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full md:h-[50dvh] gap-5 mt-20 ">
                    <p className="text-center text-white ">
                      No attendance available for this day.
                    </p>
                    <p className="max-w-md text-center text-white">
                      You can catch up with previous services on YouTube and
                      download audio messages on Telegram.
                    </p>

                    <div className="flex flex-col gap-4 sm:flex-row">
                      <a
                        href="https://www.youtube.com/@Gccc_Ibadan/videos"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center px-6 py-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-700"
                      >
                        Watch on YouTube
                      </a>
                      <a
                        href="https://t.me/gcccibadanmessages"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
                      >
                        Download on Telegram
                      </a>
                    </div>
                  </div>
                )
              ) : (
                <CheckedIcon />
              )}

              {state.isReading && <p className="mt-2 text-white">Reading...</p>}
              {allowedDays.includes(current.day) ? (
                <>
                  <h3 className="mt-5 text-white">
                    {isMarked
                      ? 'Attendance Taken'
                      : 'Tap the button to log your attendance'}
                  </h3>
                  <p className="my-3 text-sm font-semibold text-white">
                    Clock In Time
                  </p>
                  <p className="text-white">{state.clockInTime}</p>
                </>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

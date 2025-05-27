/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { BounceLoader } from 'react-spinners';

export default function Attendance() {
  const postDataUrl = import.meta.env.VITE_APP_POST_DATA;
  const authUser = JSON.parse(localStorage.getItem('GCCC_ATTENDANCE'));

  const [state, setState] = useState({
    users: [],
    filteredUsers: [],
    currentPage: 1,
    itemsPerPage: 4,
    selectedMonth: new Date().toLocaleString('default', { month: 'long' }),
    isLoading: true,
  });

  const getAllDatesForMonth = (month) => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth, today.getDate() - 1);

    const dates = [];
    const currentDate = new Date(firstDay);

    while (currentDate <= lastDay) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
      );
      dates.push(date);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatDisplayDate = (dateString) => {
    const date = new Date(dateString);
    return formatDate(date);
  };

  const totalPages = Math.ceil(state.filteredUsers.length / state.itemsPerPage);
  const startIndex = (state.currentPage - 1) * state.itemsPerPage;
  const endIndex = startIndex + state.itemsPerPage;
  const currentUsers = state.filteredUsers.slice(startIndex, endIndex);

  const getAllUserData = async () => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const response = await fetch(postDataUrl);
      const result = await response.json();
      const emailToMatch = authUser?.Email?.toLowerCase();
      const allowedDays = ['Tuesday', 'Sunday', 'Friday'];

      let matchedUsers = [];
      if (Array.isArray(result)) {
        matchedUsers = result.filter(
          (user) =>
            (user.email?.toLowerCase() === emailToMatch ||
              user.Email?.toLowerCase() === emailToMatch) &&
            allowedDays.includes(user?.Service)
        );
      } else if (result.data && Array.isArray(result.data)) {
        matchedUsers = result.data.filter(
          (user) =>
            (user.email?.toLowerCase() === emailToMatch ||
              user.Email?.toLowerCase() === emailToMatch) &&
            allowedDays.includes(user?.Service)
        );
      }

      const allDates = getAllDatesForMonth(state.selectedMonth);

      const attendanceMap = new Map(
        matchedUsers.map((user) => {
          const date = new Date(user.Date);
          return [formatDate(date), user];
        })
      );

      const today = new Date();
      const todayStr = formatDate(today);
      const todayAttendance = matchedUsers.find(
        (user) => formatDate(new Date(user.Date)) === todayStr
      );
      if (todayAttendance) {
        attendanceMap.set(todayStr, todayAttendance);
      }

      const combinedAttendance = allDates
        .map((date) => {
          const dateStr = formatDate(date);
          const dayOfWeek = date.toLocaleDateString('en-US', {
            weekday: 'long',
          });

          if (attendanceMap.has(dateStr)) {
            return attendanceMap.get(dateStr);
          } else if (allowedDays.includes(dayOfWeek)) {
            return {
              Date: dateStr,
              Service: dayOfWeek,
              Time: '',
              status: 'Absent',
            };
          }
          return null;
        })
        .filter(Boolean)
        .sort((a, b) => new Date(b.Date) - new Date(a.Date));

      if (todayAttendance) {
        combinedAttendance.unshift(todayAttendance);
      }

      setState((prev) => ({
        ...prev,
        users: combinedAttendance,
        filteredUsers: combinedAttendance,
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error fetching user data:', error);
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  useEffect(() => {
    getAllUserData();
  }, []);

  useEffect(() => {
    const filtered = state.users.filter((user) => {
      const userMonth = new Date(user.Date).toLocaleString('default', {
        month: 'long',
      });
      return userMonth === state.selectedMonth;
    });
    setState((prev) => ({
      ...prev,
      filteredUsers: filtered,
      currentPage: 1,
    }));
  }, [state.selectedMonth]);

  function formatTime(timeString) {
    if (!timeString) return '-';

    try {
      let hours, minutes;

      if (timeString.includes('T')) {
        const date = new Date(timeString);
        if (isNaN(date.getTime())) return '-';
        hours = date.getHours();
        minutes = date.getMinutes();
      } else {
        const timeParts = timeString.split(':');
        if (timeParts.length !== 2) return '-';

        hours = parseInt(timeParts[0], 10);
        minutes = parseInt(timeParts[1], 10);

        if (isNaN(hours) || isNaN(minutes)) return '-';
      }

      // Validate hours and minutes
      if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return '-';

      const period = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12 || 12;

      return `${String(hours).padStart(2, '0')}.${String(minutes).padStart(
        2,
        '0'
      )}${period}`;
    } catch (error) {
      console.error('Error formatting time:', error);
      return '-';
    }
  }

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setState((prev) => ({ ...prev, currentPage: newPage }));
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(
      1,
      state.currentPage - Math.floor(maxVisiblePages / 2)
    );
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    buttons.push(
      <button
        key="first"
        onClick={() => handlePageChange(1)}
        disabled={state.currentPage === 1}
        className="w-8 h-8 flex items-center justify-center rounded border border-[#444466] text-white bg-[#23233a] hover:bg-[#2E2E44] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        &#171;
      </button>
    );

    buttons.push(
      <button
        key="prev"
        onClick={() => handlePageChange(state.currentPage - 1)}
        disabled={state.currentPage === 1}
        className="w-8 h-8 flex items-center justify-center rounded border border-[#444466] text-white bg-[#23233a] hover:bg-[#2E2E44] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        &#60;
      </button>
    );

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`w-8 h-8 flex items-center justify-center rounded border border-[#444466] text-white transition-colors ${
            state.currentPage === i
              ? 'bg-[#FF7242] hover:bg-[#FF8B5F]'
              : 'bg-[#23233a] hover:bg-[#2E2E44]'
          }`}
        >
          {i}
        </button>
      );
    }

    buttons.push(
      <button
        key="next"
        onClick={() => handlePageChange(state.currentPage + 1)}
        disabled={state.currentPage === totalPages}
        className="w-8 h-8 flex items-center justify-center rounded border border-[#444466] text-white bg-[#23233a] hover:bg-[#2E2E44] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        &#62;
      </button>
    );

    buttons.push(
      <button
        key="last"
        onClick={() => handlePageChange(totalPages)}
        disabled={state.currentPage === totalPages}
        className="w-8 h-8 flex items-center justify-center rounded border border-[#444466] text-white bg-[#23233a] hover:bg-[#2E2E44] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        &#187;
      </button>
    );

    return buttons;
  };

  return (
    <div className="px-4 mt-16 mb-20 md:mt-40">
      <h2 className="text-2xl font-semibold text-white">Your Attendance</h2>
      <div className="overflow-x-auto max-w-full w-full mt-[20px]">
        <div className="bg-[#2E2E44] w-full p-5 rounded-lg min-w-full">
          <div className="flex flex-col-reverse items-start justify-between w-full gap-4 md:flex-row md:items-center">
            <div className="flex flex-wrap items-center justify-center w-full gap-3 md:justify-start">
              <div className="h-14 py-3  rounded-lg px-2 font-medium text-sm border-[#444466] border bg-[#1E1E2F]">
                <select
                  className="bg-[#1E1E2F] w-full pr-5 text-white  h-full focus:outline-none"
                  value={state.selectedMonth}
                  onChange={(e) =>
                    setState((prev) => ({
                      ...prev,
                      selectedMonth: e.target.value,
                    }))
                  }
                >
                  {Array.from({ length: 12 }, (_, i) => {
                    const month = new Date(0, i).toLocaleString('default', {
                      month: 'long',
                    });
                    return (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="items-center justify-center hidden w-full gap-2 md:flex md:justify-end">
              <h3 className="text-white">Current Streak:</h3>
              <div className="bg-[#FF7242] border-2 border-[#FFC857] rounded-full w-[151px] h-[44px] flex items-center justify-center text-white font-semibold">
                Coming Soon 🔥
              </div>
            </div>
          </div>

          {state.isLoading ? (
            <div className="flex items-center justify-center w-full h-64">
              <div className="text-xl text-white">
                <BounceLoader color={'#4C8EFF'} />
              </div>
            </div>
          ) : currentUsers.length === 0 ? (
            <div className="flex items-center justify-center w-full h-64">
              <div className="text-xl text-white">
                No attendance records found
              </div>
            </div>
          ) : (
            <>
              <div className="w-full h-full mt-8 overflow-x-auto">
                <div className="rounded-lg">
                  <table className="w-full min-w-[1000px] max-w-full text-sm text-left rounded-lg border-[1px] border-[#444466]">
                    <thead className="text-white h-[48px] bg-[#1E1E2F]">
                      <tr>
                        <th className="px-4 pl-[30px] py-2">Date</th>
                        <th className="px-4 py-2">Service</th>
                        <th className="px-4 py-2">Staus</th>
                        <th className="px-4 py-2">Service Time</th>
                        <th className="px-4 py-2">Checked in Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentUsers.map((user) => (
                        <tr key={user.Date} className="text-white">
                          <td className="px-4 text-sm py-7 pl-[30px]">
                            {formatDisplayDate(user.Date)}
                          </td>
                          <td className="px-4 text-sm py-7">
                            {user.Service} Service
                          </td>
                          <td className="px-4 text-sm py-7">
                            <span
                              className={`${
                                user.status === 'Absent'
                                  ? 'text-red-500'
                                  : 'text-green-500'
                              } font-medium`}
                            >
                              {user.status || (
                                <div className="">
                                  Present{' '}
                                  <sub className="text-[12px]">
                                    ({user.Attendee})
                                  </sub>
                                </div>
                              )}
                            </span>
                          </td>
                          <td className="px-4 text-sm py-7">
                            {user.Service === 'Friday'
                              ? '5:30pm'
                              : user.Service === 'Tuesday'
                              ? '5:15pm'
                              : user.Service === 'Sunday'
                              ? '8:00am'
                              : ''}
                          </td>
                          <td className="px-4 w-[250px] text-sm py-7">
                            {user.Time ? formatTime(user.Time) : '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pagination */}
              <div className="flex flex-col items-center justify-between w-full gap-2 mt-4 z-60 md:flex-row">
                <div className="flex items-center gap-2 mb-2 md:mb-0">
                  <span className="text-sm text-white">Show</span>
                  <select
                    className="bg-[#23233a] text-white border border-[#444466] rounded px-2 py-1 cursor-pointer hover:bg-[#2E2E44] transition-colors"
                    value={state.itemsPerPage}
                    onChange={(e) =>
                      setState((prev) => ({
                        ...prev,
                        itemsPerPage: Number(e.target.value),
                        currentPage: 1,
                      }))
                    }
                  >
                    {[4, 10].map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                  <span className="flex text-sm text-white">
                    from {state.filteredUsers.length}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {renderPaginationButtons()}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';

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
          const date = new Date(user.Key);
          return [formatDate(date), user];
        })
      );

      const today = new Date();
      const todayStr = formatDate(today);
      const todayAttendance = matchedUsers.find(
        (user) => formatDate(new Date(user.Key)) === todayStr
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
              Key: dateStr,
              Service: dayOfWeek,
              Time: '',
              status: 'Absent',
            };
          }
          return null;
        })
        .filter(Boolean);

      if (todayAttendance) {
        combinedAttendance.push(todayAttendance);
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
      const userMonth = new Date(user.Key).toLocaleString('default', {
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
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours));
    date.setMinutes(parseInt(minutes));

    const options = { hour: 'numeric', minute: '2-digit', hour12: true };
    const formatted = date.toLocaleTimeString([], options);
    return formatted.toLowerCase().replace(':', '.');
  }

  return (
    <div className="px-4 mt-16 mb-20 md:mt-40">
      <h2 className="text-2xl font-semibold text-white">Your Attendance</h2>
      <div className="overflow-x-auto max-w-full w-full mt-[20px]">
        <div className="bg-[#2E2E44] w-full p-5 rounded-lg min-w-full">
          <div className="flex flex-col-reverse items-start justify-between w-full gap-4 md:flex-row md:items-center">
            <div className="flex flex-wrap items-center justify-center w-full gap-3 md:justify-start">
              <div className="h-14 py-3  rounded-lg px-2 font-medium text-sm border-[#444466] border bg-[#1E1E2F]">
                <select
                  className="bg-[#1E1E2F] pr-5 text-white w-full h-full focus:outline-none"
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
                Loading attendance data...
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
                        <tr key={user.Key} className="text-white">
                          <td className="px-4 text-sm py-7 pl-[30px]">
                            {user.Key}
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
                              {user.status || 'Present'}
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
              <div className="flex flex-col items-center justify-between w-full gap-2 mt-4 md:flex-row">
                <div className="flex items-center gap-2 mb-2 md:mb-0">
                  <span className="text-sm text-white">Show</span>
                  <select
                    className="bg-[#23233a] text-white border border-[#444466] rounded px-2 py-1"
                    value={state.itemsPerPage}
                    onChange={(e) =>
                      setState((prev) => ({
                        ...prev,
                        itemsPerPage: Number(e.target.value),
                        currentPage: 1,
                      }))
                    }
                  >
                    {[4, 10, 20, 50].map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                  <span className="text-sm text-white">
                    from {state.filteredUsers.length}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setState((prev) => ({ ...prev, currentPage: 1 }))
                    }
                    disabled={state.currentPage === 1}
                    className="w-8 h-8 flex items-center justify-center rounded border border-[#444466] text-white bg-[#23233a] disabled:opacity-50"
                  >
                    &#171;
                  </button>
                  <button
                    onClick={() =>
                      setState((prev) => ({
                        ...prev,
                        currentPage: Math.max(prev.currentPage - 1, 1),
                      }))
                    }
                    disabled={state.currentPage === 1}
                    className="w-8 h-8 flex items-center justify-center rounded border border-[#444466] text-white bg-[#23233a] disabled:opacity-50"
                  >
                    &#60;
                  </button>
                  <button
                    onClick={() =>
                      setState((prev) => ({
                        ...prev,
                        currentPage: Math.min(prev.currentPage + 1, totalPages),
                      }))
                    }
                    disabled={state.currentPage === totalPages}
                    className="w-8 h-8 flex items-center justify-center rounded border border-[#444466] text-white bg-[#23233a] disabled:opacity-50"
                  >
                    &#62;
                  </button>
                  <button
                    onClick={() =>
                      setState((prev) => ({
                        ...prev,
                        currentPage: totalPages,
                      }))
                    }
                    disabled={state.currentPage === totalPages}
                    className="w-8 h-8 flex items-center justify-center rounded border border-[#444466] text-white bg-[#23233a] disabled:opacity-50"
                  >
                    &#187;
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

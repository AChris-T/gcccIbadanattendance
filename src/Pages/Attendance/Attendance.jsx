/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { BounceLoader } from 'react-spinners';
import {
  fetchAllService,
  fetchServiceDay,
} from '../../services/dashboardServices';
import dayjs from 'dayjs';

export default function Attendance() {
  const [state, setState] = useState({
    data: [],
    isLoading: true,
    itemsPerPage: 10,
    currentPage: 1,
    filteredUsers: [],
    selectedMonth: new Date().toLocaleString('default', { month: 'long' }),
  });
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchAllService();
        console.log('API response:', response);

        const allData = response?.data || [];
        const filtered = filterDataByMonth(allData, state.selectedMonth);

        setState((prev) => ({
          ...prev,
          data: allData,
          filteredUsers: filtered,
          isLoading: false,
        }));
      } catch (err) {
        console.error('Error fetching attendance:', err);
        setState((prev) => ({ ...prev, data: [], isLoading: false }));
      }
    };

    loadData();
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

  useEffect(() => {
    const filtered = filterDataByMonth(state.data, state.selectedMonth);
    setState((prev) => ({
      ...prev,
      filteredUsers: filtered,
    }));
  }, [state.selectedMonth, state.data]);

  const formatDisplayDate = (date) => dayjs(date).format('DD MMM, YYYY');
  const formatTime = (time) => dayjs(time, 'HH:mm:ss').format('h:mm A');

  const filterDataByMonth = (data, selectedMonth) => {
    if (!selectedMonth || selectedMonth === 'All') return data;

    return data.filter((item) => {
      const attendanceDate = dayjs(item.attendance_date || item.created_at);
      const itemMonth = attendanceDate.format('MMMM');
      return itemMonth === selectedMonth;
    });
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
                  <option value="All">All Months</option>
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

          <div>
            {state.isLoading ? (
              <div className="flex items-center justify-center w-full h-64">
                <div className="text-xl text-white">
                  <BounceLoader color={'#4C8EFF'} />
                </div>
              </div>
            ) : state.filteredUsers.length === 0 ? (
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
                          <th className="px-4 py-2">Status</th>
                          <th className="px-4 py-2">Mode</th>
                          <th className="px-4 py-2">Service Time</th>
                          <th className="px-4 py-2">Checked in Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {state.filteredUsers.map((user, i) => (
                          <tr key={i} className="text-white">
                            <td className="px-4 text-sm py-7 pl-[30px]">
                              {formatDisplayDate(
                                user.attendance_date || user.created_at
                              ) || 'NA'}
                            </td>
                            <td className="px-4 text-sm py-7">
                              {user.service_name}
                            </td>
                            <td className="px-4 text-sm py-7">
                              <span
                                className={`${
                                  user.status === 'Absent'
                                    ? 'text-red-500'
                                    : 'text-green-500'
                                } font-medium capitalize`}
                              >
                                {user.status}
                              </span>
                            </td>
                            <td className="px-4 text-sm capitalize py-7">
                              {user.mode || 'NA'}
                            </td>
                            <td className="px-4 text-sm py-7">
                              {dayjs(
                                user.service_start_time,
                                'HH:mm:ss'
                              ).format('hh:mm a') || 'NA'}
                            </td>

                            <td className="px-4 w-[250px] text-sm py-7">
                              {user.created_at
                                ? dayjs(user.created_at).format('hh:mm a')
                                : '--'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
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
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';

export default function Attendance() {
  const postDataUrl = import.meta.env.VITE_APP_POST_DATA;
  const authUser = JSON.parse(localStorage.getItem('GCCC_ATTENDANCE'));
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  //const [selectedService, setSelectedService] = useState('All');
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toLocaleString('default', { month: 'long' })
  );

  const getAllUserData = async () => {
    try {
      const response = await fetch(postDataUrl);
      const result = await response.json();
      const emailToMatch = authUser?.Email?.toLowerCase();
      const allowedDays = ['Tuesday', 'Sunday', 'Friday'];
      if (Array.isArray(result)) {
        const matchedUsers = result.filter(
          (user) =>
            (user.email?.toLowerCase() === emailToMatch ||
              user.Email?.toLowerCase() === emailToMatch) &&
            allowedDays.includes(user?.Service)
        );
        setUsers(matchedUsers);
        setFilteredUsers(matchedUsers);
      } else if (result.data && Array.isArray(result.data)) {
        const matchedUsers = result.data.filter(
          (user) =>
            (user.email?.toLowerCase() === emailToMatch ||
              user.Email?.toLowerCase() === emailToMatch) &&
            allowedDays.includes(user?.Service)
        );
        setUsers(matchedUsers);
        setFilteredUsers(matchedUsers);
      } else {
        console.error('Unexpected response format:', result);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    getAllUserData();
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) => {
      const userMonth = new Date(user.Key).toLocaleString('default', {
        month: 'long',
      });
      return userMonth === selectedMonth;
    });

    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [selectedMonth, users]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

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
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
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
              {/*  <div className="h-14 py-3 rounded-lg px-2 font-medium text-sm border-[#444466] border bg-[#1E1E2F]">
                <input
                  type="date"
                  className="bg-[#1E1E2F] text-white w-full h-full focus:outline-none"
                />
              </div> */}
            </div>
            <div className="items-center justify-center hidden w-full gap-2 md:flex md:justify-end">
              <h3 className="text-white">Current Streak:</h3>
              <div className="bg-[#FF7242] border-2 border-[#FFC857] rounded-full w-[151px] h-[44px] flex items-center justify-center text-white font-semibold">
                Coming Soon 🔥
              </div>
            </div>
          </div>

          {/* Responsive Scrollable Table */}
          <div className="mt-8 w-full overflow-x-auto lg:h-full h-[400px]">
            <div className="rounded-lg ">
              <table className="w-full min-w-[1000px] max-w-[1240px] text-sm text-left rounded-lg border-[1px] border-[#444466]">
                <thead className="text-white  h-[48px] bg-[#1E1E2F]">
                  <tr className="">
                    <th className="px-4 pl-[30px] py-2">Date</th>
                    <th className="px-4 py-2">Service</th>
                    <th className="px-4 py-2">Service Time</th>
                    <th className="px-4 py-2">Checked in Time</th>
                    {/*                     <th className="px-4 py-2">Email</th>
                     */}{' '}
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="py-10 text-center text-white">
                        Data not found
                      </td>
                    </tr>
                  ) : (
                    currentUsers.map((user) => (
                      <tr key={user.id} className="text-white">
                        <td className="px-4 text-sm py-7 pl-[30px]">
                          {user.Key}
                        </td>
                        <td className="px-4 text-sm py-7">
                          {user.Service} Service
                        </td>
                        <td className="px-4 text-sm py-7">
                          {user.Service === 'Friday'
                            ? '5:30pm'
                            : '' || user.Service === 'Tuesday'
                            ? '5:15pm'
                            : '' || user.Service === 'Sunday'
                            ? '8:00am'
                            : ''}
                        </td>
                        <td className="px-4 w-[250px] text-sm py-7">
                          {formatTime(user.Time)}
                        </td>
                        {/*   <td className="px-4 text-sm w-[250px] py-7">
                        {user.Email}
                      </td> */}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination Controls - styled like the image */}
          <div className="flex flex-col items-center justify-between w-full gap-2 mt-4 md:flex-row">
            <div className="flex items-center gap-2 mb-2 md:mb-0">
              <span className="text-sm text-white">Show</span>
              <select
                className="bg-[#23233a] text-white border border-[#444466] rounded px-2 py-1"
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                {[4, 10, 20, 50].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              <span className="text-sm text-white">
                from {filteredUsers.length}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center rounded border border-[#444466] text-white bg-[#23233a] disabled:opacity-50"
              >
                &#171;
              </button>
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center rounded border border-[#444466] text-white bg-[#23233a] disabled:opacity-50"
              >
                &#60;
              </button>
              {(() => {
                const pages = [];
                if (totalPages <= 5) {
                  for (let i = 1; i <= totalPages; i++) {
                    pages.push(i);
                  }
                } else {
                  if (currentPage <= 3) {
                    pages.push(1, '...', totalPages);
                  } else if (currentPage >= totalPages - 2) {
                    pages.push(
                      1,
                      '...',
                      totalPages - 3,
                      totalPages - 2,
                      totalPages - 1,
                      totalPages
                    );
                  } else {
                    pages.push(
                      1,
                      currentPage - 1,
                      currentPage,
                      currentPage + 1,
                      totalPages
                    );
                  }
                }
                return pages.map((page, idx) =>
                  page === '...' ? (
                    <span
                      key={idx}
                      className="flex items-center justify-center w-8 h-8 text-white"
                    >
                      ...
                    </span>
                  ) : page === currentPage ? (
                    <button
                      key={page}
                      className="w-8 h-8 flex items-center justify-center rounded border border-[#444466] text-white bg-[#23233a] font-bold bg-opacity-80"
                      style={{
                        background: '#23233a',
                        borderColor: '#444466',
                        color: '#fff',
                        fontWeight: 'bold',
                        boxShadow: '0 0 0 2px #fff',
                      }}
                      disabled
                    >
                      {page}
                    </button>
                  ) : (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className="w-8 h-8 flex items-center justify-center rounded border border-[#444466] text-white bg-[#23233a] hover:bg-[#444466]"
                    >
                      {page}
                    </button>
                  )
                );
              })()}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="w-8 h-8 flex items-center justify-center rounded border border-[#444466] text-white bg-[#23233a] disabled:opacity-50"
              >
                &#62;
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="w-8 h-8 flex items-center justify-center rounded border border-[#444466] text-white bg-[#23233a] disabled:opacity-50"
              >
                &#187;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

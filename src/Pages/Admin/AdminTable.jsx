import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import { ALLATTENDANCEMEMBER } from '../../services/dashboardServices';
import { toast } from 'react-toastify';
import { downloadCSV } from '../../Utils/DownloadCVS';

export default function AdminTable() {
  const [state, setState] = useState({
    members: [],
    selectedDate: '',
    search: '',
    currentPage: 1,
    itemsPerPage: 10,
  });

  const filteredData = useMemo(() => {
    if (!state.selectedDate) return [];

    const searchText = state.search.trim().toLowerCase();
    const selectedDateStr = state.selectedDate;

    const absentMembers = state.members.filter((member) => {
      const memberAttendanceDate = member.attendance_date
        ? dayjs(member.attendance_date).format('YYYY-MM-DD')
        : null;
      const isAbsent =
        memberAttendanceDate === selectedDateStr &&
        (member.status === 'absent' || member.status === 'Absent');
    
        if (!isAbsent) return false;

      const firstName = (member.first_name || '').toLowerCase();
      const lastName = (member.last_name || '').toLowerCase();
      const fullName = `${firstName} ${lastName}`.trim();
      const matchName = searchText
        ? firstName.includes(searchText) ||
          lastName.includes(searchText) ||
          fullName.includes(searchText)
        : true;

      return matchName;
    });

    return absentMembers;
  }, [state.members, state.selectedDate, state.search]);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(filteredData.length / state.itemsPerPage));
  }, [filteredData.length, state.itemsPerPage]);

  const paginatedData = useMemo(() => {
    const start = (state.currentPage - 1) * state.itemsPerPage;
    const end = start + state.itemsPerPage;
    return filteredData.slice(start, end);
  }, [filteredData, state.currentPage, state.itemsPerPage]);

  useEffect(() => {
    async function fetchMembers() {
      const res = await ALLATTENDANCEMEMBER();
      setState((prev) => ({ ...prev, members: res.data || [] }));
    }
    fetchMembers();
  }, []);

  useEffect(() => {
    setState((prev) => ({ ...prev, currentPage: 1 }));
  }, [state.selectedDate, state.search, state.itemsPerPage]);

  const handleDownloadCSV = () => {
    if (!state.selectedDate) {
      toast.error('Please select a date first');
      return;
    }
    downloadCSV(filteredData, `absent-members-${state.selectedDate}.csv`);
  };

  const handleDateChange = (e) => {
    setState((prev) => ({ ...prev, selectedDate: e.target.value }));
  };

  const handleItemsPerPageChange = (e) => {
    setState((prev) => ({ ...prev, itemsPerPage: Number(e.target.value) }));
  };

  const handlePageChange = (newPage) => {
    setState((prev) => ({ ...prev, currentPage: newPage }));
  };

  return (
    <div className="p-6 mt-5 border border-gray-600 rounded-lg shadow-md">
      <h2 className="mb-4 text-lg font-semibold text-white">
        Absent Members List
      </h2>

      <div className="flex flex-col justify-between gap-5 mb-4 md:items-center md:flex-row ">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium text-white">
              Select Date
            </label>
            <input
              type="date"
              value={state.selectedDate}
              onChange={handleDateChange}
              className="w-full p-2 border rounded bg-[#23233a] text-white border-[#444466] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Select a date"
            />
          </div>

          {/* <div className="flex flex-col gap-2">
                <label className="block text-sm font-medium text-white">
                  Search by Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  className="w-full p-2 border rounded bg-[#23233a] text-white border-[#444466] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={state.search}
                  onChange={(e) => setState(prev => ({ ...prev, search: e.target.value }))}
                  disabled={!state.selectedDate}
                />
              </div> */}
        </div>

        {/* Download */}
        <button
          onClick={handleDownloadCSV}
          disabled={!state.selectedDate}
          className={`px-4 py-2 mt-4 text-white rounded-md transition-colors ${
            state.selectedDate
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-gray-500 cursor-not-allowed'
          }`}
        >
          Download Absent Members CSV
        </button>
      </div>
      {state.selectedDate ? (
        <>
          <div className="overflow-x-auto border rounded-lg">
            <table className="w-full min-w-[800px] text-sm text-white border-collapse">
              <thead className="">
                <tr>
                  <th className="p-2 border">ID</th>
                  <th className="p-2 border">First Name</th>
                  <th className="p-2 border">Last Name</th>
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">Service</th>
                  <th className="p-2 border">Role</th>
                  <th className="p-2 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((m) => (
                    <tr
                      key={m.id}
                      className="hover:bg-gray-50 hover:text-black"
                    >
                      <td className="p-2 border">{m.id}</td>
                      <td className="p-2 border">{m.first_name}</td>
                      <td className="p-2 border">{m.last_name}</td>
                      <td className="p-2 border">{m.email}</td>
                      <td className="p-2 border">{m.service_name}</td>
                      <td className="p-2 border">{m.role}</td>
                      <td className="p-2 font-semibold text-red-500 border">
                        Absent
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="p-4 text-center text-gray-500">
                      No absent members found for{' '}
                      {dayjs(state.selectedDate).format('MMMM D, YYYY')}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col items-center justify-between w-full gap-3 mt-4 md:flex-row">
            <div className="flex items-center gap-2">
              <span className="text-sm text-white">Show</span>
              <select
                className="bg-[#23233a] text-white border border-[#444466] rounded px-2 py-1 cursor-pointer hover:bg-[#2E2E44] transition-colors"
                value={state.itemsPerPage}
                onChange={handleItemsPerPageChange}
              >
                {[5, 10, 20, 50].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              <span className="text-sm text-white">per page</span>
              <span className="ml-3 text-sm text-white">
                {filteredData.length} total absent members
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                className="px-3 py-1 text-sm text-white bg-[#23233a] border border-[#444466] rounded disabled:opacity-50"
                onClick={() =>
                  handlePageChange(Math.max(1, state.currentPage - 1))
                }
                disabled={state.currentPage === 1}
              >
                Prev
              </button>
              <span className="text-sm text-white">
                Page {state.currentPage} of {totalPages}
              </span>
              <button
                className="px-3 py-1 text-sm text-white bg-[#23233a] border border-[#444466] rounded disabled:opacity-50"
                onClick={() =>
                  handlePageChange(Math.min(totalPages, state.currentPage + 1))
                }
                disabled={state.currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="p-8 text-center text-gray-400">
          <p className="text-lg">Please select a date to view absent members</p>
        </div>
      )}
    </div>
  );
}

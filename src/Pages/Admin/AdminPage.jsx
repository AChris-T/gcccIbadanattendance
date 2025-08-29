import { useEffect, useMemo, useState } from 'react';
import {
  ALLATTENDANCEMEMBER,
  fetchServiceDay,
  markMemberAbsent,
} from '../../services/dashboardServices';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { downloadCSV } from '../../Utils/DownloadCVS';

export default function AdminPage() {
  const [state, setState] = useState({
    serviceDayId: null,
    status: 'loading',
    isLoading: true,
    isSubmitting: false,
  });
  const [members, setMembers] = useState([]);
  const [month, setMonth] = useState('');
  const [date, setDate] = useState('');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const filteredData = useMemo(() => {
    const normalizeDate = (m) => {
      const raw = m?.attendance_date || m?.created_at || m?.createdAt || null;
      if (!raw) return null;
      try {
        const d = new Date(raw);
        return {
          dateObj: d,
          isoDate: d.toISOString().split('T')[0],
          month: d.getMonth() + 1,
        };
      } catch (_) {
        return null;
      }
    };

    const searchText = search.trim().toLowerCase();

    return members.filter((member) => {
      const norm = normalizeDate(member);
      const matchMonth = month
        ? norm
          ? norm.month === Number(month)
          : false
        : true;
      const matchDate = date ? (norm ? norm.isoDate === date : false) : true;

      const firstName = (
        member.first_name ||
        member.firstName ||
        ''
      ).toLowerCase();
      const lastName = (
        member.last_name ||
        member.lastName ||
        ''
      ).toLowerCase();
      const fullName = `${firstName} ${lastName}`.trim();
      const matchName = searchText
        ? firstName.includes(searchText) ||
          lastName.includes(searchText) ||
          fullName.includes(searchText)
        : true;

      return matchMonth && matchDate && matchName;
    });
  }, [members, month, date, search]);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
  }, [filteredData.length, itemsPerPage]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredData.slice(start, end);
  }, [filteredData, currentPage, itemsPerPage]);

  useEffect(() => {
    async function fetchMembers() {
      const res = await ALLATTENDANCEMEMBER();
      setMembers(res.data || []);
    }
    fetchMembers();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [month, date, search, itemsPerPage]);
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
        date: dayjs().format('YYYY-MM-DD'),
      };

      const response = await markMemberAbsent(payload);
      toast.success(response?.message || 'Attendance submitted successfully');
      const attendanceDate =
        response?.message?.date?.attendance_date ||
        dayjs().format('YYYY-MM-DD');
      localStorage.setItem('attendance_date', attendanceDate);

      if (dayjs(attendanceDate).isSame(dayjs(), 'day')) {
        setState((prev) => ({ ...prev, hasMarkedToday: true }));
      }
    } catch (error) {
      toast.error(error?.message || 'Attendance submission failed');
    } finally {
      setState((prev) => ({ ...prev, isSubmitting: false }));
    }
  };
  return (
    <div className="px-8 mt-16 mb-20 md:mt-40">
      <div className="flex flex-col gap-10">
        <h2 className="text-2xl font-semibold text-white">Admin Page</h2>
        <div className="grid grid-cols-1 gap-5 text-white">
          <div className="flex flex-col items-start justify-between gap-5 p-6 border border-gray-600 rounded-md md:items-center md:flex-row ">
            <h3 className="max-w-[600px]">
              All members not marked present will be set as Absent for this
              service. Click below to continue
            </h3>
            <button
              onClick={handleButtonClick}
              className="p-4 rounded-md bg-white hover:text-[#24244e] font-medium  text-[#0f0f1d] border-1 "
            >
              Mark all as absent
            </button>
          </div>
          {/* <div className="flex flex-col items-start justify-between gap-5 p-6 border border-gray-600 rounded-md">
            <h3>Click below to download the full list of members.</h3>
            <button
              onClick={() => downloadCSV(members, 'members.csv')}
              className="p-4 rounded-md bg-white hover:text-[#24244e] font-medium  text-[#0f0f1d] border-1 "
            >
              Download members list
            </button>
          </div> */}
        </div>
      </div>
      <div className="p-6 mt-5 border border-gray-600 rounded-lg shadow-md">
        <h2 className="mb-4 text-lg font-semibold text-white">Members List</h2>
        <div className="flex flex-col justify-between gap-5 mb-4 md:items-center md:flex-row ">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex flex-col gap-2">
              <label className="block text-sm font-medium text-white">
                Search by Name
              </label>
              <input
                type="text"
                placeholder="e.g. John Doe"
                className="w-full p-2 border rounded"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="block text-sm font-medium text-white">
                Filter by Month
              </label>
              <select
                className="w-full p-2 border rounded"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              >
                <option value="">All</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {new Date(0, i).toLocaleString('default', {
                      month: 'long',
                    })}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="block text-sm font-medium text-white">
                Filter by Date
              </label>
              <input
                type="date"
                className="w-full p-2 border rounded"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          {/* Download */}
          <button
            onClick={() => downloadCSV(filteredData, 'members.csv')}
            className="px-4 py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Download CSV
          </button>
        </div>
        {/* Table */}
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
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((m) => (
                  <tr key={m.id} className="hover:bg-gray-50 hover:text-black">
                    <td className="p-2 border">{m.id}</td>
                    <td className="p-2 border">{m.first_name}</td>
                    <td className="p-2 border">{m.last_name}</td>
                    <td className="p-2 border">{m.email}</td>
                    <td className="p-2 border">{m.service_name}</td>
                    <td className="p-2 border">{m.role}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-gray-500">
                    No members found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination Controls */}
        <div className="flex flex-col items-center justify-between w-full gap-3 mt-4 md:flex-row">
          <div className="flex items-center gap-2">
            <span className="text-sm text-white">Show</span>
            <select
              className="bg-[#23233a] text-white border border-[#444466] rounded px-2 py-1 cursor-pointer hover:bg-[#2E2E44] transition-colors"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
            >
              {[5, 10, 20, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <span className="text-sm text-white">per page</span>
            <span className="ml-3 text-sm text-white">
              {filteredData.length} total
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1 text-sm text-white bg-[#23233a] border border-[#444466] rounded disabled:opacity-50"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span className="text-sm text-white">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="px-3 py-1 text-sm text-white bg-[#23233a] border border-[#444466] rounded disabled:opacity-50"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

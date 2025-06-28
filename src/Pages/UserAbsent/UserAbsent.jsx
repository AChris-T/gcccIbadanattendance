/* eslint-disable react/no-unescaped-entities */
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

const UserAbsent = () => {
  const [loader, setLoader] = useState(false);
  const [attendanceData, setAttendanceData] = useState([]);
  const [currentDate, setCurrentDate] = useState('');
  const user = JSON.parse(localStorage.getItem('GCCC_ATTENDANCE'));
  const getAllUsersAttendanceURL = import.meta.env.VITE_APP_POST_DATA;
  const accessEmail =
    import.meta.env.VITE_APP_ACCESS_EMAIL || 'abiodunsamyemi@gmail.com';
  const showDownloadButton = accessEmail.includes(user?.Email);

  useEffect(() => {
    const current = {
      day: dayjs().format('dddd'),
      date: dayjs().format('DD'),
      month: dayjs().format('MMM'),
      year: dayjs().format('YYYY'),
    };
    setCurrentDate(
      `${current.day}, ${current.date} ${current.month} ${current.year}`
    );
  }, []);

  function arrayToCSV(data) {
    if (!data || data.length === 0) {
      toast.error('No data available to download');
      return '';
    }

    const headers = Object.keys(data[0]);
    const csvRows = data.map((row) =>
      headers
        .map((header) => {
          const value = row[header] ?? '';
          return value.toString().includes(',') ? `"${value}"` : value;
        })
        .join(',')
    );
    csvRows.unshift(headers.join(','));
    return csvRows.join('\n');
  }
  function downloadCSV(data, filename) {
    const csvContent = arrayToCSV(data);
    if (!csvContent) return;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || 'data.csv';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
  const fetchAttendanceData = async () => {
    try {
      setLoader(true);
      const response = await fetch(getAllUsersAttendanceURL);
      if (!response.ok) {
        throw new Error('Failed to fetch data from Google Sheets');
      }
      let data = await response.json();
      if (data.data && Array.isArray(data.data)) {
        data = data.data;
      }
      if (!Array.isArray(data)) {
        throw new Error('Invalid data format received from Google Sheets');
      }
      setAttendanceData(data);

      toast.success(
        `Attendance data loaded successfully! ${data.length} records found`
      );
      setLoader(false);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
      toast.error(
        'Failed to fetch attendance data. Please check your connection and try again.'
      );
      setLoader(false);
    }
  };
  const handleDownloadAllData = () => {
    if (attendanceData.length === 0) {
      toast.info('Please fetch attendance data first');
      return;
    }

    const filename = `attendance-data-${dayjs().format(
      'YYYY-MM-DD-HH-mm'
    )}.csv`;
    downloadCSV(attendanceData, filename);
    toast.success(
      `Attendance data (${attendanceData.length} records) downloaded successfully!`
    );
  };

  const handleDownloadTodayData = () => {
    if (attendanceData.length === 0) {
      toast.info('Please fetch attendance data first');
      return;
    }
    const currentTime = {
      day: dayjs().format('dddd'),
      date: dayjs().format('DD'),
      month: dayjs().format('MMM'),
      year: dayjs().format('YYYY'),
    };
    const currentKey = `${currentTime.day}-${currentTime.date}-${currentTime.month}-${currentTime.year}`;

    const todayData = attendanceData.filter((user) => user.Key === currentKey);

    if (todayData.length === 0) {
      toast.info('No attendance data found for today');
      return;
    }

    const filename = `today-attendance-${dayjs().format(
      'YYYY-MM-DD-HH-mm'
    )}.csv`;
    downloadCSV(todayData, filename);
    toast.success(
      `Today's attendance (${todayData.length} records) downloaded successfully!`
    );
  };

  if (!showDownloadButton) {
    return null;
  }

  return (
    <div className="w-full px-4 py-6 bg-[#1a2332] rounded-lg">
      <div className="flex flex-col gap-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-white mb-2">
            Admin Attendance Data Download
          </h2>
          <p className="text-gray-300 text-sm">{currentDate}</p>
        </div>
        {/*   {attendanceData.length > 0 && (
          <div className="text-center">
            <div className="bg-[#2a3441] p-3 rounded inline-block">
              <p className="text-2xl font-bold text-white">
                {attendanceData.length}
              </p>
              <p className="text-gray-300 text-xs">Total Records</p>
            </div>
          </div>
        )} */}
        <div className="flex flex-col gap-3">
          <button
            onClick={fetchAttendanceData}
            disabled={loader}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#0094D3] text-white rounded-lg font-medium hover:bg-[#007bb3] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loader ? (
              <>
                <ClipLoader size={16} color="#ffffff" />
                Loading Data...
              </>
            ) : (
              'Load Attendance Data'
            )}
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <button
              onClick={handleDownloadTodayData}
              disabled={attendanceData.length === 0}
              className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              Download Today's Data
            </button>

            <button
              onClick={handleDownloadAllData}
              disabled={attendanceData.length === 0}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              Download All Data ({attendanceData.length})
            </button>
          </div>
        </div>
        <div className="text-center text-gray-400 text-xs">
          <p>Download attendance data from Google Sheets</p>
        </div>
      </div>
    </div>
  );
};

export default UserAbsent;

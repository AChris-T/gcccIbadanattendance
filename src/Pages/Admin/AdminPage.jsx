import { useEffect, useState } from 'react';
import {
  fetchServiceDay,
  markMemberAbsent,
} from '../../services/dashboardServices';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import AdminTable from './AdminTable';

export default function AdminPage() {
  const [state, setState] = useState({
    serviceDayId: null,
    status: 'loading',
    isLoading: true,
    isSubmitting: false,
  });

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
        </div>
      </div>

      <AdminTable />
    </div>
  );
}

export const VITE_API_URL = import.meta.env.VITE_API_URL;

export const ENDPOINTS = {
  LOGIN: '/login',
  LOGOUT: '/logout',
  PROFILE: '/me',
  serviceDays: '/services/today',
  submitService: '/attendance/mark',
  ALLSERVICE: '/attendance/history',
  MARKABSENT: '/attendance/mark-absentees',
  ALLATTENDANCE: '/attendance',
};

/* eslint-disable react/prop-types */
import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/authStore';

export default function ProtectedRoute({ element, allowedRoles, children }) {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    const returnTo = encodeURIComponent(`${location.pathname}${location.search}`);
    return <Navigate to={`/login?returnTo=${returnTo}`} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" />;
  }

  const content = element ?? children;
  return content;
}

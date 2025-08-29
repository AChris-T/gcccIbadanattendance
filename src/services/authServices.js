import Cookies from 'js-cookie';
import { ENDPOINTS } from '../config/api';
import { authClient } from './authClient';

export async function loginUser(credentials) {
  return authClient(ENDPOINTS.LOGIN, {
    method: 'POST',
    body: credentials,
    auth: false,
  });
}
export async function fetchProfile() {
  return authClient(ENDPOINTS.PROFILE, {
    method: 'GET',
    auth: true,
  });   
}
export async function logoutUser() {
  try {
    await authClient(ENDPOINTS.LOGOUT, { method: 'POST' });
  } catch (err) {
    console.warn('Logout request failed:', err.message);
  } finally {
    Cookies.remove('GCCCIBADAN');
  }
}

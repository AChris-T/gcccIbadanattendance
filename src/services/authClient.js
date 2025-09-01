import axios from 'axios';
import Cookies from 'js-cookie';
import { VITE_API_URL } from '../config/api';

export async function authClient(
  endpoint,
  { method = 'GET', body, auth = true } = {}
) {
  const headers = { 'Content-Type': 'application/json' };

  if (auth) {
    const token = Cookies.get('GCCCIBADAN');
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await axios({
      url: `${VITE_API_URL}${endpoint}`,
      method,
      headers,
      data: body || undefined,
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data?.message ||
          `Request failed with status ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error('No response received from server');
    } else {
      throw new Error(error.message);
    }
  }
}

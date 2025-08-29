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

  const config = {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  };

  const res = await fetch(`${VITE_API_URL}${endpoint}`, config);

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed with status ${res.status}`);
  }

  const contentType = res.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return res.json();
  } else {
    return res.text();
  }
}

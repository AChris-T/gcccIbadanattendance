import { create } from 'zustand';
import Cookies from 'js-cookie';

const useAuthStore = create((set) => ({
  user: null,
  token: Cookies.get('GCCCIBADAN') || null,
  isAuthenticated: !!Cookies.get('GCCCIBADAN'),

  login: (user, token) => {
    Cookies.set('GCCCIBADAN', token, { expires: 7 });
    set({ user, token, isAuthenticated: true });
  },

  setUser: (user) => {
    set({ user });
  },

  setAuthFromToken: () => {
    const token = Cookies.get('GCCCIBADAN') || null;
    set({ token, isAuthenticated: !!token });
  },

  logout: () => {
    Cookies.remove('GCCCIBADAN');
    set({ user: null, token: null, isAuthenticated: false });
  },
}));

export default useAuthStore;

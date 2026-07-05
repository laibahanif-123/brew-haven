import { create } from 'zustand';

const userInfo = JSON.parse(localStorage.getItem('userInfo')) || null;

export const useAuthStore = create((set) => ({
  isAuthenticated: !!localStorage.getItem('token'),
  userInfo: userInfo,
  login: (userData) => {
    if (userData) {
      localStorage.setItem('userInfo', JSON.stringify(userData));
    }
    set({ isAuthenticated: true, userInfo: userData });
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    set({ isAuthenticated: false, userInfo: null });
  },
}));

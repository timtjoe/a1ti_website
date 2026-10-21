import { create } from 'zustand';

export const useUserStore = create((set) => ({
  users: [],
  loading: false,
  error: null,
  setUsers: (users) => set({ users }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));

import { create } from 'zustand';

export const useCourseStore = create((set) => ({
  courses: [],
  setCourses: (courses) => set({ courses }),
}));

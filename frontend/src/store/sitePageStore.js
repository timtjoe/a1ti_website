import { create } from 'zustand';

export const useSitePageStore = create((set) => ({
  pages: {},
  setPage: (path, page) =>
    set((state) => ({ pages: { ...state.pages, [path]: page } })),
}));

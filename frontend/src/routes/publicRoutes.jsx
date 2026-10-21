// src/routes/publicRoutes.js
import HomePage from '@/pages/HomePage';
import UserPage from '@/pages/UserPage';

export const publicRoutes = [
  {
    index: true,
    element: <HomePage />,
  },
  {
    path: 'users',
    element: <UserPage />,
  },
];

export default publicRoutes;

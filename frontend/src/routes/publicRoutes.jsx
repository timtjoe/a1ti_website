// src/routes/publicRoutes.js
import HomePage from '@/pages/HomePage';
import UserPage from '@/pages/UserPage';
import CoursesPage from '@/pages/CoursesPage';
import CourseDetailPage from '@/pages/CourseDetailPage';
import LeadershipPage from '@/pages/LeadershipPage';
import DownloadPage from '@/pages/DownloadPage';
import SitePage from '@/pages/SitePage';

export const publicRoutes = [
  {
    index: true,
    element: <HomePage />,
  },
  {
    path: 'users',
    element: <UserPage />,
  },
  {
    path: 'academic/courses',
    element: <CoursesPage />,
  },
  {
    path: 'academic/courses/:courseSlug',
    element: <CourseDetailPage />,
  },
  {
    path: 'about/leadership',
    element: <LeadershipPage />,
  },
  {
    path: 'academic/instructors',
    element: <LeadershipPage />,
  },
  {
    path: 'download',
    element: <DownloadPage />,
  },
  {
    path: '*',
    element: <SitePage />,
  },
];

export default publicRoutes;

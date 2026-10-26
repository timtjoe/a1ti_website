// src/routes/appRoutes.js
import RootLayout from '@/components/Layout';
import publicRoutes from './publicRoutes';

const fullScreenStyle = {
  width: '100%',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  alignContent: 'center',
  padding: '2rem',
  textAlign: 'center',
};

const ErrorElement = () => (
  <div style={fullScreenStyle}>
    <h2 style={{ color: '#ef4444' }}>Unexpected Routing Failure</h2>
    <p>Something went wrong with the application state.</p>
  </div>
);

const HydrateFallback = () => (
  <div style={fullScreenStyle}>
    <p style={{ color: '#94a3b8' }}>Loading runtime environments...</p>
  </div>
);

export const appRoutes = [
  {
    element: <RootLayout />,
    errorElement: <ErrorElement />,
    hydrateFallbackElement: <HydrateFallback />,
    children: publicRoutes,
  },
];

export default appRoutes;

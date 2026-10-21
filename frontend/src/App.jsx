// src/App.jsx
import { createBrowserRouter, RouterProvider } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import appRoutes from '@/routes/appRoutes';
import { Toaster } from 'sonner';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        if (
          error?.status === 401 ||
          error?.status === 404 ||
          error?.message === 'UNAUTHORIZED_SESSION'
        ) {
          return false;
        }
        return failureCount < 1;
      },
    },
  },
});

const router = createBrowserRouter(appRoutes);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        toastOptions={{
          unstyled: true,
          className: 'dark',
        }}
      />
    </QueryClientProvider>
  );
}

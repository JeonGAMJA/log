import { useState } from 'react';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PostList from './pages/PostList';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Landing from './pages/Landing';

const router = createBrowserRouter([{ path: '/', element: <Landing />, children: [] }]);

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;

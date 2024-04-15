import { useState } from 'react';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PostList from './pages/PostList';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Landing from './pages/Landing';
import Register from './pages/Register';
import Login from './pages/Login';
import PostDetail from './pages/PostDetail';

const Layout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      { path: '/signup', element: <Register /> },
      { path: '/login', element: <Login /> },
      {
        path: '/mylog',
        element: <PostList />,
        children: [{ path: '/mylog/:logid', element: <PostDetail /> }],
      },
    ],
  },
]);

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;

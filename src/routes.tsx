import { createBrowserRouter } from 'react-router-dom';
import App from './pages/App.tsx';
import NotFound from './pages/not-found.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

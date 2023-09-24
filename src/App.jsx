import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import router from './router';

const App = () => {
  return (
    <Suspense
      fallback={<span className="loading loading-bars loading-lg"></span>}
    >
      <RouterProvider router={router} />
      <ToastContainer position="bottom-right" />
    </Suspense>
  );
};

export default App;

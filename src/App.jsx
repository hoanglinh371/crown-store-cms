import React, { Suspense } from 'react';

import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';

import Spinner from './components/spinner';
import router from './router';

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <RouterProvider router={router()} />
      <Toaster richColors position="top-right" />
    </Suspense>
  );
}

export default App;

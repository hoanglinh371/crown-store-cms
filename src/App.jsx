import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';

import router from './router';

const App = () => {
  return (
    <Suspense
    // fallback={<span className="loading loading-spinner loading-lg"></span>}
    >
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;

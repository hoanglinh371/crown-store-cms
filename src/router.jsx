import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import MainLayout from './layouts/main-layout';
import AuthLayout from './layouts/auth-layout';

const DashBoard = lazy(() => import('./pages/dashboard'));
const ProductsPage = lazy(() => import('./pages/products'));
const CategoriesPage = lazy(() => import('./pages/categories'));
const BrandsPage = lazy(() => import('./pages/brands'));
const UsersPage = lazy(() => import('./pages/users'));
const ProductDetail = lazy(() => import('./pages/product-detail'));
const LoginPage = lazy(() => import('./pages/login'));
const Orders = lazy(() => import('./pages/orders'));
const OrderDetail = lazy(() => import('./pages/order-detail'));

const Material = lazy(() => import('./pages/settings/material'));
const Color = lazy(() => import('./pages/settings/color'));
const Size = lazy(() => import('./pages/settings/size'));

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<MainLayout />}>
//       <Route index element={<DashBoard />} />
//       <Route path="/products" element={<ProductsPage />}>
//         <Route path="/products/:id" element={<ProductDetail />} />
//       </Route>

//       <Route path="/categories" element={<CategoriesPage />} />
//       <Route path="/brands" element={<BrandsPage />} />
//       <Route path="/users" element={<UsersPage />} />
//       <Route path="/settings/materials" element={<Material />} />
//       <Route path="/settings/colors" element={<Color />} />
//       <Route path="/settings/sizes" element={<Size />} />
//     </Route>,
//   ),
// );

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <DashBoard />,
      },
      {
        path: '/products',
        element: <ProductsPage />,
      },
      {
        path: '/products/:id',
        element: <ProductDetail />,
      },
      {
        path: '/categories',
        element: <CategoriesPage />,
      },
      {
        path: '/brands',
        element: <BrandsPage />,
      },
      {
        path: '/users',
        element: <UsersPage />,
      },
      {
        path: '/settings/materials',
        element: <Material />,
      },
      {
        path: '/settings/colors',
        element: <Color />,
      },
      {
        path: '/settings/sizes',
        element: <Size />,
      },
      {
        path: '/orders',
        element: <Orders />,
      },
      {
        path: '/orders/:id',
        element: <OrderDetail />,
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: '/auth/login',
        element: <LoginPage />,
      },
    ],
  },
]);

export default router;

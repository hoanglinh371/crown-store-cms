import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import MainLayout from './layouts/main-layout';
import AuthLayout from './layouts/auth-layout';

const DashBoard = lazy(() => import('./pages/dashboard'));
const ProductsPage = lazy(() => import('./pages/products'));
const CategoriesPage = lazy(() => import('./pages/categories'));
const BrandsPage = lazy(() => import('./pages/brands'));
const UsersPage = lazy(() => import('./pages/users'));
const ProductDetail = lazy(() => import('./pages/product-detail'));
const LoginPage = lazy(() => import('./pages/login'));
const Material = lazy(() => import('./pages/settings/material'));
const Color = lazy(() => import('./pages/settings/color'));
const Size = lazy(() => import('./pages/settings/size'));
const OrdersPage = lazy(() => import('./pages/orders'));
const OrderDetailPage = lazy(() => import('./pages/order-detail'));

const isAuthenticated = true;

const router = createBrowserRouter([
  {
    path: '/',
    element: isAuthenticated ? <MainLayout /> : <Navigate to="/auth/login" />,
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
        path: '/orders',
        element: <OrdersPage />,
      },
      {
        path: '/orders/:id',
        element: <OrderDetailPage />,
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
    ],
  },
  {
    path: '/auth',
    element: isAuthenticated ? <Navigate to="/" /> : <AuthLayout />,
    children: [
      {
        path: '/auth/login',
        element: <LoginPage />,
      },
    ],
  },
]);

export default router;

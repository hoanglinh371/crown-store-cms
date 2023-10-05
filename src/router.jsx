import { lazy, useContext } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import MainLayout from './layouts/main-layout';
import AuthLayout from './layouts/auth-layout';

import { UserContext } from './contexts/user.context';

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

export default function Router() {
  const { isAuthenticated } = useContext(UserContext);

  console.log(isAuthenticated);

  return createBrowserRouter([
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
          element: <Orders />,
        },
        {
          path: '/orders/:id',
          element: <OrderDetail />,
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
}

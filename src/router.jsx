import { lazy } from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import MainLayout from './layouts/main-layout';
const DashBoard = lazy(() => import('./pages/dashboard'));
const ProductsPage = lazy(() => import('./pages/products'));
const CategoriesPage = lazy(() => import('./pages/categories'));
const UsersPage = lazy(() => import('./pages/users'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<DashBoard />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/categories" element={<CategoriesPage />} />
      <Route path="/users" element={<UsersPage />} />
    </Route>,
  ),
);

export default router;

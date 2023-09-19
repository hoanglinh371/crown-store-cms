import { lazy } from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import MainLayout from './layouts/main-layout';
import AuthLayout from './layouts/auth-layout';

const DashBoard = lazy(() => import('./pages/dashboard'));
const ProductsPage = lazy(() => import('./pages/products'));
const CategoriesPage = lazy(() => import('./pages/categories'));
const UsersPage = lazy(() => import('./pages/users'));
const LoginPage = lazy(() => import('./pages/login'));

const Material = lazy(() => import('./pages/settings/material'));
const Color = lazy(() => import('./pages/settings/color'));
const Size = lazy(() => import('./pages/settings/size'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<DashBoard />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/categories" element={<CategoriesPage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/settings/materials" element={<Material />} />
      <Route path="/settings/colors" element={<Color />} />
      <Route path="/settings/sizes" element={<Size />} />
    </Route>,
  ),
);

export default router;

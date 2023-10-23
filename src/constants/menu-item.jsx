import { Link } from 'react-router-dom';

/* eslint-disable  */
export const menuItems = [
  {
    key: '/',
    label: <Link to="/">Dashboard</Link>,
  },
  {
    key: '/products',
    label: <Link to="/products">Products</Link>,
  },
  {
    key: '/categories',
    label: <Link to="/categories">Categories</Link>,
  },
  {
    key: '/brands',
    label: <Link to="/brands">Brands</Link>,
  },
  {
    key: '/users',
    label: <Link to="/users">Users</Link>,
  },
  {
    key: '/orders',
    label: <Link to="/orders">Orders</Link>,
  },
  {
    label: 'Setting',
    children: [
      {
        key: '/settings/materials',
        label: <Link to="/settings/materials">Materials</Link>,
      },
      {
        key: '/settings/colors',
        label: <Link to="/settings/colors">Colors</Link>,
      },
      {
        key: '/settings/sizes',
        label: <Link to="/settings/sizes">Sizes</Link>,
      },
    ],
  },
];

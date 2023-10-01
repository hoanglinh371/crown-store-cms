export const menuItems = [
  {
    path: '/',
    title: 'Dashboard',
  },
  {
    path: '/products',
    title: 'Products',
  },
  {
    path: '/categories',
    title: 'Categories',
  },
  {
    path: '/brands',
    title: 'Brands',
  },
  {
    path: '/users',
    title: 'Users',
  },
  {
    path: '/orders',
    title: 'Orders',
  },
  {
    title: 'Setting',
    children: [
      {
        path: '/settings/materials',
        title: 'Materials',
      },
      {
        path: '/settings/colors',
        title: 'Colors',
      },
      {
        path: '/settings/sizes',
        title: 'Sizes',
      },
    ],
  },
];

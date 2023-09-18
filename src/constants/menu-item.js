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
    path: '/users',
    title: 'Users',
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

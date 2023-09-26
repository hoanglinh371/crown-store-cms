import instance from './axios';

export const getProducts = async () => {
  const data = await instance.get('/products');
  return data.data;
};

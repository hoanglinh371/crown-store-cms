import instance from './axios';

export const getCategory = async () => {
  const data = await instance.get('/categories');
  return data.data;
};

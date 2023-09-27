import instance from './axios';

export const getBrand = async () => {
  const data = await instance.get('/brands');
  return data.data;
};

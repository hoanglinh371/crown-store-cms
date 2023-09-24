import instance from './axios';

export const getMaterials = async () => {
  const data = await instance.get('/materials');
  return data.data;
};

import instance from './axios';

export const getColors = async () => {
  const data = await instance.get('/colors');
  return data.data;
};

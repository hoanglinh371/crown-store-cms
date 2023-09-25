import instance from './axios';

export const getSizes = async () => {
  const data = await instance.get('/sizes');
  return data.data;
};

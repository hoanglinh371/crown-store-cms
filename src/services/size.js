import instance from './axios';

export const getSizes = async () => {
  const response = await instance.get('/sizes');
  return response;
};

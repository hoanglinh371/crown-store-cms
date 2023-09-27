import instance from './axios';

export const getSizes = async (params) => {
  const response = await instance.get('/sizes', params);
  return response;
};

import instance from './axios';

export const getUsers = async (params) => {
  const response = await instance.get('/users', { params });
  return response;
};

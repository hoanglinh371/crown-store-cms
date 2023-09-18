import instance from './axios';

export const getUsers = async () => {
  const data = await instance.get('/users');
  return data.data;
};

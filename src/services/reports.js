import instance from './axios';

export const getReports = async () => {
  const response = await instance.get('/reports');
  return response;
};

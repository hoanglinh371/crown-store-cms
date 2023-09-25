import instance from './axios';

export const getColors = async () => {
  const data = await instance.get('/colors');
  return data.data;
};

export const createColor = async (data) => {
  const response = await instance.post('/colors', data);
  return response.data;
};

export const updateColor = async (data, id) => {
  const response = await instance.patch(`/colors/${id}`);
  return response.data;
};

import instance from './axios';

export const getColors = async (params) => {
  const response = await instance.get('/colors', { params });
  return response;
};

export const createColor = async (data) => {
  const response = await instance.post('/colors', data);
  return response;
};

export const updateColor = async (data, id) => {
  const response = await instance.patch(`/colors/${id}`, data);
  return response;
};

export const delColor = async (id) => {
  const response = await instance.delete(`/colors/${id}`);
  return response;
};

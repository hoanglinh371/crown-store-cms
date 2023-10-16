import instance from './axios';

export const getSizes = async (params) => {
  const response = await instance.get('/sizes', { params });
  return response;
};

export const createSize = async (data) => {
  const response = await instance.post('/sizes', data);
  return response;
};

export const updateSize = async (data, id) => {
  const response = await instance.patch(`/sizes/${id}`, data);
  return response;
};

export const delSize = async (id) => {
  const response = await instance.delete(`/sizes/${id}`);
  return response;
};

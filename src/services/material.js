import instance from './axios';

export const getMaterials = async (params) => {
  const response = await instance.get('/materials', { params });
  return response;
};

export const createMaterial = async (data) => {
  const response = await instance.post('/materials', data);
  return response;
};

export const updateMaterial = async (data, id) => {
  const response = await instance.patch(`/materials/${id}`, data);
  return response;
};

export const delMaterial = async (id) => {
  const response = await instance.delete(`/materials/${id}`);
  return response;
};

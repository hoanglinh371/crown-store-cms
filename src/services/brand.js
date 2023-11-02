import instance from './axios';

export const getBrands = async (params) => {
  const response = await instance.get('/brands', { params });
  return response;
};

export const createBrand = async (data) => {
  const response = await instance.post('/brands', data);
  return response;
};

export const updateBrand = async (data, id) => {
  const response = await instance.patch(`/brands/${id}`, data);
  return response;
};

export const deleteBrand = async (id) => {
  const response = await instance.delete(`/brands/${id}`);
  return response;
};

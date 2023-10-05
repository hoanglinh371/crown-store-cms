import instance from './axios';

export const getOrders = async (params) => {
  const response = await instance.get('/orders', { params });
  return response;
};

export const getOrdersDetail = async (id) => {
  const response = await instance.get(`/orders/${id}`);
  return response;
};

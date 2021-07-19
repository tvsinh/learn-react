import axiosClient from './axiosClient';

const ordersApi = {
  getAll(params) {
    const url = '/orders';
    return axiosClient.get(url, { params });
  },

  async get(id) {
    const url = `/orders?user.id=${id}`;
    // return await axiosClient.get(url);
    const orderMe = await axiosClient.get(url);
    return orderMe;
  },
  add(data) {
    const url = '/orders';
    return axiosClient.post(url, data);
  },

  update(data) {
    const url = `/orders/${data.id}`;
    return axiosClient.put(url, data);
  },

  remove(id) {
    const url = `/orders/${id}`;
    return axiosClient.delete(url);
  },
};
export default ordersApi;

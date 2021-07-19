import axiosClient from './axiosClient';

const todosApi = {
  getAll(params) {
    const url = '/todos';
    return axiosClient.get(url, { params });
  },

  get(id) {
    const url = `/todos/${id}`;
    return axiosClient.get(url);
  },
  async add(data) {
    const url = '/todos';
    const response = await axiosClient.post(url, data);
    return response;
  },

  update(data) {
    const url = `/todos/${data.id}`;
    return axiosClient.put(url, data);
  },

  remove(id) {
    const url = `/todos/${id}`;
    return axiosClient.delete(url);
  },
};
export default todosApi;

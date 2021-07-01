import axiosClient from './axiosClient';

const categoryApi = {
  getAll(params) {
    const url = '/categories';
    return axiosClient.get(url, { params });
  },

  get(id) {
    const url = `/categories/${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = '/categories';
    return axiosClient.post(url, data);
  },

  update(data) {
    const url = `/categories/${data.id}`;
    return axiosClient.patch(url, data);
  },

  remove(id) {
    const url = `/categories/${id}`;
    return axiosClient.delete(url);
  },
  callApi(url, params, method) {
    //params is an object contain all queryParams
    return axiosClient({
      method: method,
      url: url,
      data: params,
    });
  },

  //còn nếu k muốn thì dùng async await:
  async callApi(url, params, method) {
    //params is an object contain all queryParams
    try {
      const { data } = axiosClient({
        method: method,
        url: url,
        data: params,
      });
      return data
    }
    catch (err) {
      return err.response.data
    }
  },
}
export default categoryApi;

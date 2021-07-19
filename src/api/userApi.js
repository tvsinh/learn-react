import axiosClient from './axiosClient';
import StorageKeys from 'constants/storage-keys';
const token = localStorage.getItem(StorageKeys.TOKEN);
const userApi = {
  register(data) {
    const url = '/auth/local/register';
    return axiosClient.post(url, data);
  },
  login(data) {
    const url = '/auth/local';
    return axiosClient.post(url, data);
  },
  getInfor() {
    const url = '/users/me';
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  updateUser(data) {
    const url = `/users/${data.id}`;
    return axiosClient.put(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default userApi;

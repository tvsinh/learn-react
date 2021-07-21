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
  async getInfor() {
    const url = '/users/me';
    const userMe = await axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return userMe;
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

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from 'api/userApi';
import StorageKeys from 'constants/storage-keys';

export const register = createAsyncThunk('user/register', async (payload) => {
  const data = await userApi.register(payload);

  localStorage.setItem(StorageKeys.TOKEN, data.jwt);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));
  console.log('register', data.user);
  return data.user;
});

export const login = createAsyncThunk('user/login', async (payload) => {
  const data = await userApi.login(payload);

  localStorage.setItem(StorageKeys.TOKEN, data.jwt);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));
  console.log('login', data);
  return data.user;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
    showDialogLogin: false,
  },
  reducers: {
    showDialog(state) {
      state.showDialogLogin = true;
    },

    hideDialog(state) {
      state.showDialogLogin = false;
    },
    logout(state) {
      // clear local storage
      localStorage.removeItem(StorageKeys.USER);
      localStorage.removeItem(StorageKeys.TOKEN);

      state.current = {};
    },
    setUser(state) {
      state.current = JSON.parse(localStorage.getItem(StorageKeys.USER));
    },
  },
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
    [login.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  },
});

const { actions, reducer } = userSlice;
export const { logout, showDialog, hideDialog, setUser } = actions;
export default reducer;

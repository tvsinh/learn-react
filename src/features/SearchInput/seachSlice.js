import { createSlice } from '@reduxjs/toolkit';
const searchSlice = createSlice({
  name: 'search',
  initialState: {
    value: '',
  },
  reducers: {
    searchValue(state, action) {
      const searchInput = action.payload;
      state.value = searchInput;
    },
  },
});

const { actions, reducer } = searchSlice;
export const { searchValue } = actions;
export default reducer;

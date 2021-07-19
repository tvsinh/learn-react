import { createSlice } from '@reduxjs/toolkit';
const orderSlice = createSlice({
  name: 'order',
  initialState: {
    step: 0,
    inforShipping: {
      fullName: '',
      email: '',
      address: '',
    },
    delivery: '',
    payment: '',
    totalCart: 0,
  },
  reducers: {
    setStep(state, action) {
      if (action.payload < 1) {
        state.step = 0;
      }
      state.step = action.payload;
    },
    setShipping(state, action) {
      state.inforShipping.fullName = action.payload.fullName;
      state.inforShipping.email = action.payload.email;
      state.inforShipping.address = action.payload.address;
      localStorage.setItem('inforShipping', JSON.stringify(state.inforShipping));
    },
    setDeliveryPayment(state, action) {
      state.delivery = action.payload.valueDelivery;
      state.payment = action.payload.valuePayment;
    },
    setTotalCart(state, action) {
      state.totalCart = action.payload;
    },
  },
});
const { actions, reducer } = orderSlice;
export const { location, setStep, setShipping, setDeliveryPayment, setTotalCart } = actions;
export default reducer;

import { createSlice } from '@reduxjs/toolkit';
const orderSlice = createSlice({
  name: 'order',
  initialState: {
    step: 0,
    backTo: false,
    edit: false,
    inforShipping: {
      fullName: '',
      email: '',
      address: '',
    },
    delivery: '',
    deliveryPrice: 0,
    payment: '',
    totalOrder: 0,
  },
  reducers: {
    setStep(state, action) {
      if (action.payload < 1) {
        state.step = 0;
      }
      state.step = action.payload;
    },
    setBackTo(state, action) {
      state.backTo = action.payload;
    },
    setEdit(state, action) {
      state.edit = action.payload;
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
      state.deliveryPrice = action.payload.deliveryPrice;
    },
    setTotalOrder(state, action) {
      state.totalOrder = action.payload;
    },
  },
});
const { actions, reducer } = orderSlice;
export const {
  location,
  setStep,
  setBackTo,
  setEdit,
  setShipping,
  setDeliveryPayment,
  setTotalOrder,
} = actions;
export default reducer;

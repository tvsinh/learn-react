import userReducer from '../features/Auth/userSlice';
import cartReducer from '../features/Cart/cartSlice';
import orderReducer from '../features/CheckOut/orderSlice';
const { configureStore } = require('@reduxjs/toolkit');

const rootReducer = {
  user: userReducer,
  cart: cartReducer,
  order: orderReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;

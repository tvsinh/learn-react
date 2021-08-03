import StorageKeys from 'constants/storage-keys';

const { createSlice } = require('@reduxjs/toolkit');

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: JSON.parse(localStorage.getItem(StorageKeys.CARTITEMS)) || [],
    focusSearch: false,
  },
  reducers: {
    addToCart(state, action) {
      // newItem = { id, product, quantity }
      const newItem = action.payload;
      const index = state.cartItems.findIndex((x) => x.id === newItem.id);

      if (index >= 0) {
        // increase quantity
        state.cartItems[index].quantity += Number(newItem.quantity);
      } else {
        // add to cart
        state.cartItems.push(newItem);
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

    setQuantity(state, action) {
      const { id, quantity } = action.payload;
      // check if product is available in cart
      const index = state.cartItems.findIndex((x) => x.id === id);
      if (index >= 0) {
        state.cartItems[index].quantity = quantity;
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      }
    },

    removeFromCart(state, action) {
      const { idNeedToRemove } = action.payload;
      state.cartItems = state.cartItems.filter((x) => x.id !== idNeedToRemove);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    removeCartItems(state) {
      localStorage.removeItem(StorageKeys.CARTITEMS);
      state.cartItems = [];
    },
    setFocusSearch(state, action) {
      state.focusSearch = action.payload;
    },
  },
});

const { actions, reducer } = cartSlice;
export const { addToCart, setQuantity, removeFromCart, removeCartItems, setFocusSearch } = actions; // named export
export default reducer; // default export

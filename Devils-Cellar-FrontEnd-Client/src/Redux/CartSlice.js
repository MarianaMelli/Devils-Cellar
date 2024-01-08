import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart(state, action) {
      state.includes(action.payload) ? state : state.push(action.payload);
    },
    removeFromCart(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },
    reduceQty(state, action) {
      const product = state.find((item) => item.id === action.payload);
      product.qty > 1 && product.stock >= 1
        ? (product.qty = product.qty - 1)
        : (product.qty = 1);
    },
    increaseQty(state, action) {
      const product = state.find((item) => item.id === action.payload);
      product.qty < product.stock
        ? (product.qty = product.qty + 1)
        : product.qty;
    },
    emptyCart(state,action){
      state = [];
      return state;
    }
  },
});

const { actions, reducer } = CartSlice;
export const { addToCart, removeFromCart, reduceQty, increaseQty, emptyCart } = actions;
export default reducer;

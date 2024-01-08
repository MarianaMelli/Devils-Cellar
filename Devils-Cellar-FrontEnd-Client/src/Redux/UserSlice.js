import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    getLoggedUser(state, action) {
      return action.payload;
    },
    logout(state, action) {
      state = null;
      return state;
    },
    updateUser(state, action){
      state = {...state, ...action.payload};
      return state;
    },
   
  },
});

const { actions, reducer } = UserSlice;
export const { getLoggedUser, logout,updateUser, updateOrders } = actions;
export default reducer;

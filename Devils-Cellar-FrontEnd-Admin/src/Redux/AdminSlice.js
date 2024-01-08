import { createSlice } from "@reduxjs/toolkit";

const AdminSlice = createSlice({
  name: "admin",
  initialState: null,
  reducers: {
    getLoggedAdmin(state, action) {
      return action.payload;
    },
    logout(state, action) {
      state = null;
      return state;
    },
    updateAdmin(state, action) {
      state = { ...state, ...action.payload };
      return state;
    },
  },
});

const { actions, reducer } = AdminSlice;
export const { getLoggedAdmin, logout, updateAdmin } = actions;
export default reducer;

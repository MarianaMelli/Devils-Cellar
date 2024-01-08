import { createSlice } from "@reduxjs/toolkit";

const PageSlice = createSlice({
  name: "page",
  initialState: { ageVerification: true, resetDB: true, databaseToast: false },
  reducers: {
    toggleAgeVerification(state, action) {
      state.ageVerification = !state.ageVerification;
    },
    toggleResetDB(state, action) {
      state.resetDB = !state.resetDB;
    },
    toggleDatabaseToast(state, action) {
      state.databaseToast = !state.databaseToast;
    },
  },
});

const { actions, reducer } = PageSlice;
export const { toggleAgeVerification, toggleResetDB, toggleDatabaseToast } =
  actions;
export default reducer;

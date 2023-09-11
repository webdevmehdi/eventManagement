import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: "alert",
  initialState: {
    message: "",
  },
  reducers: {
    success(state, action) {
      state.message = action.payload;
      return state;
    },
    failure(state, action) {
      state.message = action.payload;
      return state;
    },
    clear(state, action) {
      state.message = "";
    },
  },
});

export const { success, failure, clear } = alertSlice.actions;
export default alertSlice.reducer;

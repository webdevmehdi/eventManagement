import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../Utils/axios/axios";
import eventSlice from "./eventSlice";
export const authenticationReducer = createAsyncThunk(
  "authentication",
  async (authenticationObject) => {
    const response = await axios
      .post(`/api/auth/signIn`, authenticationObject, {
        withCredentials: true,
      })
      .then((response) => {
        return response.data;
      });
    return response;
  }
);

const authentcationSlice = createSlice({
  name: "authentication",
  initialState: {
    username: "",
    accessToken: "",
    isLoggedIn: false,
  },
  reducers: {
    authenticate:(state, action)=> {
     
    },
    logout : (state,action)=>{
      state= action.payload
    }
  },
  extraReducers: {
    [authenticationReducer.pending]: (state, action) => {
      state.status = "loading";
    },
    [authenticationReducer.fulfilled]: (state, action) => {
      state.status = "success";
      state.accessToken = action.payload.access_token;
      state.username = action.payload.username;
      state.isLoggedIn = true;
    },
    [authenticationReducer.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});
export const { authenticate,logout } = authentcationSlice.actions;

export default authentcationSlice.reducer;

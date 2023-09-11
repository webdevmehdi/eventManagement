import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setupInterceptor } from "../Hooks/ApiEventService/apiActions";
import axios from "axios";
import { failure } from "../features/alertSlice";
import { updateEvents } from "../features/eventSlice";
import { success } from "../features/alertSlice";
const creerEvenement = createAsyncThunk(
  "evenement/createEvent",
  async (eventObj, { getState, dispatch, rejectWithValue }) => {
    let stateStore = getState();
    const axiosPrivate = setupInterceptor(
      stateStore.authentication.accessToken,
      dispatch
    );
    let userEmail = stateStore.authentication.username;
    try {
      let response = await axiosPrivate
        .post(`http://localhost:8081/addevent/${userEmail}`, eventObj, {
          withCredentials: true,
        })
        .then((response) => {
          dispatch(updateEvents(response.data));
          dispatch(success("Evenement Ajouté"));
          return response.data;
        })
        .catch((error) => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            dispatch(failure(error.response.data));

            console.log(error.response.status);
            console.log(error.response.headers);
            rejectWithValue(error.response.data);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
            rejectWithValue(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
            rejectWithValue(error.message);
          }
          rejectWithValue(error);
          console.log(error.config);
        });
      return response;
    } catch (error) {
      // rejectWithValue(error);
      console.log(error);
      console.log(error?.response.data);
      console.log(error?.request);
      dispatch(error(error.response));
      rejectWithValue(error.response);
      return error.response;
    }
  }
);

const evenementSlice = createSlice({
  name: "events",
  initialState: {},
  extraReducers(builder) {
    builder
      .addCase(creerEvenement.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(creerEvenement.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(creerEvenement.rejected, (state, action) => {
        state.status = "failed";

        console.log(action.error);
      });
  },
});

export { creerEvenement };

export default evenementSlice.reducer;

/* const updateUser = createAsyncThunk('users/update', async (user, thunkApi) => {
  const { id, ...userData } = user
  const response = await fetch(`https://reqres.in/api/users/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${thunkApi.extra.jwt}`,
    },
    body: JSON.stringify(userData),
  })
  if (response.status === 400) {
    // Return the known error for future handling
    return thunkApi.rejectWithValue((await response.json()))
  }
  return (await response.json()) 
}) */

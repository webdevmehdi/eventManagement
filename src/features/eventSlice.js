import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setupInterceptor } from "../Hooks/ApiEventService/apiActions";
import { failure } from "../features/alertSlice";
import { excludeById } from "../Utils/utils";
import axios from "axios";

const getEvents = createAsyncThunk(
  "events/getEvents",
  async (arg, { getState, dispatch, rejectWithValue }) => {
    let stateStore = getState();
    const axiosPrivate = setupInterceptor(
      stateStore.authentication.accessToken,
      dispatch
    );
    let username = stateStore.authentication.username;
    // const controller = new AbortController();
    try {
      const response = await axiosPrivate
        .get(`http://localhost:8081/geteventsByUserEmail/${username}`, {
          withCredentials: true,
          // signal: controller.signal
        })
        .then((response) => {
          return response;
        });
      return response?.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const refreshToken = createAsyncThunk(
  "refreshToken/refresh",
  async (arg, thunkApi) => {
    let stateStore = getState();
    const axiosPrivate = setupInterceptor(
      stateStore.authentication.accessToken,
      dispatch
    );

    try {
      const response = await axios
        .get(`http://localhost:8081/api/refresh`, {
          withCredentials: true,
        })
        .then((response) => {
          return response;
        })
        .catch((error) => {});

      return response?.data;
    } catch (error) {}
  }
);
const getEvent = createAsyncThunk(
  "event/getEvent",
  async (idSeance, { getState, dispatch, rejectWithValue }) => {
    let stateStore = getState();
    const axiosPrivate = setupInterceptor(
      stateStore.authentication.accessToken,
      dispatch
    );
    try {
      const evenement = await axiosPrivate
        .get(`http://localhost:8081/retrouverEventById/${idSeance}`, {
          withCredentials: true,
        })
        .then((response) => response.data);
      console.log(evenement);
      return evenement;
    } catch (err) {
      //adding console error would prevent from re-dispatching any actions
      // should try to add controller.abort() to try to test when to cancel pending request after logging out
      rejectWithValue(err.response.data);
      console.log(err);
    }
  }
);

const eventsSlice = createSlice({
  name: "events",
  initialState: {
    evenements: [],
    selectedEvent: {},
  },
  reducers: {
    updateEvents(state, action) {
      console.log(action);
      state.evenements.push(action.payload);
    },
    deleteEvent(state, action) {
      const newEvents = state.evenements.filter(evenement => evenement.id != action.payload.idSeance)
      state.evenements = newEvents;
      return state;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getEvents.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.status = "success";

        state.evenements = action.payload;
        return state;
      })
      .addCase(getEvents.rejected, (state, action) => {
        if (action.payload) {
          state.status = "failed";
        }
      })
      .addCase(getEvent.pending, (state, action) => {
        if (action.payload) {
          state.status = "loading";
        }
      })
      .addCase(getEvent.fulfilled, (state, action) => {
        state.selectedEvent = action.payload;
      })
      .addCase(getEvent.rejected, (state, action) => {
        if (action.payload) {
          state.status = "failed";
        }
      });

    /*  .addCase(creerEvenement.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(creerEvenement.fulfilled, (state, action) => {
        state.status = "success";
        state.evenements.push(action.payload);
      })
      .addCase(creerEvenement.rejected, (state, action) => {
        state.status = "failed";
      }); */
  },
});
export const { updateEvents, deleteEvent } = eventsSlice.actions;
export { getEvents, getEvent };

export default eventsSlice.reducer;

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

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setupInterceptor } from "../Hooks/ApiEventService/apiActions";
import axios from "axios";

const addCategory = createAsyncThunk(
  "categories/getCategories",
  async ({ nom, formData }, thunkAPI) => {
    const axiosPrivate = setupInterceptor(
      stateStore.authentication.accessToken,
      dispatch
    );
    try {
      const response = await axiosPrivate.post(
        `http://localhost:8081/ajouterCategorie/${nom}`,
        formData
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

const librarySlice = createSlice({
  name: "library",
  initialState: {
    categories: [
      {
        nom: "",
        categoryImage: null,
      },
    ],
    book: {
      name: "",
      bookFile: "",
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addCategory.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.status = "success";
        state = action.payload;
        return state;
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});
export { addCategory };
export default librarySlice.reducer;

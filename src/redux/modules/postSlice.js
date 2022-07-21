import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../../shared/api";

export const createCollection = createAsyncThunk(
  "CREATE_LIST",
  async (formData) => {
    const response = await axios
      .post(`${serverUrl}/api/images`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => response.data)
      .catch((err) => err);
  }
);

const postSlice = createSlice({
  name: "Post",
  initialState: [],
  reducers: {},
  extraReducers: {
    [createCollection.fulfilled]: (state, { payload }) => [...payload],
  },
});

export default postSlice.reducer;

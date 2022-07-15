import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../../shared/api";

// 액션함수+데이터명으로 axios 요청 작성
// export const loadAllLists

// export const createUser = createAsyncThunk("CREATE_USER",
// async() => {
//   const response = await axios.post(`${serverUrl}`,)
//   console.log(response.data);
//   return response.data;
// }
// )

export const createCollection = createAsyncThunk(
  "CREATE_LIST",
  async (formData) => {
    console.log(formData);
    const response = await axios.post(`${serverUrl}/api/images`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(response.data);
    return response.data;
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

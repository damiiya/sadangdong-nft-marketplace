import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { serverUrl } from "../../shared/api";

const token = sessionStorage.getItem("auth_token");

export const createAccount = createAsyncThunk(
  "ACCOUNT_INFO",
  async (ACCOUNT) => {
    const account = ACCOUNT.toLowerCase();
    return await axios({
      method: "post",
      url: `${serverUrl}/api/account/auth`,
      headers: {
        authorization: account,
      },
    })
      .then((response) => {
        sessionStorage.setItem("auth_token", account);
        console.log(response.data);
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
);

const userSlice = createSlice({
  name: "userSlice",
  initialState: {},
  reducers: [],
  extraReducers: {
    [createAccount.fulfilled]: (state, action) => {
      state.account = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { Account } = userSlice.actions;

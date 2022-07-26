import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { serverUrl } from "../../shared/api";

const token = sessionStorage.getItem("auth_token");

// 유저 계정 생성하기
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
        sessionStorage.setItem(
          "user_profile",
          response.data.data.profile_image
        );
        sessionStorage.setItem("user_nickname", response.data.data.name);
        console.log(response.data.data);
        window.location.href = "";
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
);

// 유저 컬렉션 정보 가져오기
export const loadAccountCollection = createAsyncThunk(
  "LOAD_ACCOUNT_COLLECTION",
  async (value) => {
    return await axios
      .get(`${serverUrl}/api/${value.addressId}?tab=collection`, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `${token}`,
        },
      })
      .then((response) => {
        console.log(response.data.data);
        return response.data.data;
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
);

// 유저 정보 수정하기
export const editAccount = createAsyncThunk("EDIT_ACCOUNT", async (value) => {
  return await axios
    .put(`${serverUrl}/api/account/setting`, value.formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: `${token}`,
      },
    })
    .then((response) => {
      console.log(response.data);
      value.navigate(`/account/${token}`);
      sessionStorage.setItem("user_profile", response.data.data.profile_image);
    })
    .catch((error) => {
      console.log(error.message);
    });
});

const userSlice = createSlice({
  name: "userSlice",
  initialState: {},
  reducers: [],
  extraReducers: {
    [createAccount.fulfilled]: (state, action) => {
      state.account = action.payload;
    },
    [loadAccountCollection.fulfilled]: (state, action) => {
      state.collection = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { Account } = userSlice.actions;

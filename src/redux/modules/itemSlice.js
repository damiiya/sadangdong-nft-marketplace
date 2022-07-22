import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { serverUrl } from "../../shared/api";
import axios from "axios";

const token = sessionStorage.getItem("auth_token");

// 아이템 생성페이지 컬렉션 리스트 가져오기
export const getCollectionSelect = createAsyncThunk(
  "COLLECTION_SELECT",
  async () => {
    console.log(token);
    try {
      const response = await axios({
        method: "get",
        url: `${serverUrl}/api/items/minting`,
        headers: {
          authorization: `${token}`,
        },
      });
      console.log(response);
      if (response.data.data.length == 0) {
        alert("컬렉션을 먼저 생성해주세요!");
        window.location.href = "/createcollection";
      }
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

// 민팅한 아이템 포스팅하기
export const postMintedItem = createAsyncThunk(
  "POST_MINTED_ITEM",
  async (formData) => {
    return await axios
      .post(`${serverUrl}/api/items/minting`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        window.location.href = "/";
      });
  }
);

const itemSlice = createSlice({
  name: "itemSlice",
  initialState: {
    collectionName: [{}],
  },
  reducers: {},
  extraReducers: {
    [getCollectionSelect.fulfilled]: (state, action) => {
      state.collectionName = action.payload;
      console.log("succeed collection select!");
      console.log(state.collectionName);
    },
    // [postMintedItem.fulfilled]: (state, action) => {
    //   console.log("succeed!");
    // },
  },
});

export default itemSlice.reducer;

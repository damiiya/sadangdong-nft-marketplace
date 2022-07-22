import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { serverUrl } from "../../shared/api";

const token = sessionStorage.getItem("auth_token");

// 컬렉션 생성하기
export const createCollection = createAsyncThunk(
  "CREATE_LIST",
  async (formData) => {
    const response = await axios
      .post(`${serverUrl}/api/collections`, formData, {
        headers: {
          authorization: token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.log(error.message);
      });
  }
);

// 컬렉션 가져오기
export const loadCollection = createAsyncThunk(
  "LOAD_COLLECTION_LIST",
  async () => {
    return await axios
      .get(`${serverUrl}/api/explore?tab=collection`)
      .then((response) => {
        console.log(response.data.data);
        return response.data.data;
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
);

// 컬렉션 수정하기
export const editCollection = createAsyncThunk(
  "EDIT_COLLECTION",
  async (param) => {
    console.log(param);
    console.log(param.formData);
    console.log(param.collectionId);
    const response = await axios
      .put(
        `${serverUrl}/api/collections/${param.collectionId}`,
        param.formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
);

// 컬렉션 삭제하기
export const deleteCollection = createAsyncThunk(
  "Delete_COLLECTION",
  async (collectionId) => {
    return await axios
      .delete(`${serverUrl}/api/collections/${collectionId}`, {
        headers: { authorization: `${token}` },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
);

// 컬렉션 상세페이지 가져오기
export const loadCollectionDetail = createAsyncThunk(
  "LOAD_COLLECTION_DETAIL",
  async (collectionId) => {
    return await axios
      .get(`${serverUrl}/api/collections/${collectionId}`)
      .then((response) => {
        console.log(response.data);
        return response.data.data;
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
);

const collectionSlice = createSlice({
  name: "Collection",
  initialState: {},
  reducers: {},
  extraReducers: {
    [loadCollection.fulfilled]: (state, action) => {
      state.collection = action.payload;
    },
    [loadCollectionDetail.fulfilled]: (state, action) => {
      state.collectionDetail = action.payload;
    },
  },
});

export default collectionSlice.reducer;

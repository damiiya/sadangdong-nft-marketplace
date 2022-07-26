import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { serverUrl } from "../../shared/api";

const token = sessionStorage.getItem("auth_token");

// 컬렉션 생성하기
export const createCollection = createAsyncThunk(
  "CREATE_LIST",
  async (value) => {
    const response = await axios
      .post(`${serverUrl}/api/collections`, value.formData, {
        headers: {
          authorization: token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        value.navigate(`/collection/${value.fileInfo.name}`);
        return response.data;
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
);

// 컬렉션 첫번째 목록 가져오기
export const loadFirstCollection = createAsyncThunk(
  "LOAD_COLLECTION_FIRST_LIST",
  async (setCollectionData) => {
    return await axios
      .get(`${serverUrl}/api/explore?tab=collection&_page=1&_limit=12`)
      .then((response) => {
        setCollectionData(response.data.data);
        return response.data.data;
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
);

// 컬렉션 첫번째 이후 목록 가져오기
export const loadAfterFirstCollection = createAsyncThunk(
  "LOAD_COLLECTION_AFTER_FIRST_LIST",
  async (value) => {
    return await axios
      .get(
        `${serverUrl}/api/explore?tab=collection&_page=${value.collectionPage}&_limit=12`
      )
      .then((response) => {
        value.setCollectionData([
          ...value.collectionData,
          ...response.data.data,
        ]);

        if (response.data.data.length === 0 || response.data.data.length < 12) {
          value.setCollectionHasMore(false);
        }
        value.setCollectionPage(value.collectionPage + 1);
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
  async (value) => {
    const response = await axios
      .put(
        `${serverUrl}/api/collections/${value.collectionId}`,
        value.formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `${token}`,
          },
        }
      )
      .then((response) => {
        value.navigate(`/collection/${value.fileInfo.name}`);
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
  async (value) => {
    return await axios
      .delete(`${serverUrl}/api/collections/${value.collectionId}`, {
        headers: { authorization: `${token}` },
      })
      .then((response) => {
        value.navigate("/list");
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
);

// 컬렉션 상세페이지 가져오기
export const loadCollectionDetail = createAsyncThunk(
  "LOAD_COLLECTION_DETAIL",
  async (keyword) => {
    return await axios
      .get(`${serverUrl}/api/collections/${keyword}`, {
        headers: { auth_token: `${token}` },
      })
      .then((response) => {
        return response.data.data;
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
);

// 컬렉션 검색하기
export const loadCollectionSearch = createAsyncThunk(
  "LOAD_COLLECTION_Search",
  async (keyword) => {
    return await axios
      .get(`${serverUrl}/api/search?tab=collection&name=${keyword}`)
      .then((response) => {
        console.log(response.data);
        return response.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
);

// 컬렉션 검색 첫번째 목록 가져오기
export const loadSearchFirstCollection = createAsyncThunk(
  "LOAD_COLLECTION_FIRST_LIST",
  async (value) => {
    return await axios
      .get(
        `${serverUrl}/api/search?tab=colleciton&name=${value.keyword}&_page=1&_limit=12`
      )
      .then((response) => {
        console.log(response);
        value.setCollectionData(response.data.data);
        return response.data.data;
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
);

// 컬렉션 검색 첫번째 이후 목록 가져오기
export const loadSearchAfterFirstCollection = createAsyncThunk(
  "LOAD_COLLECTION_AFTER_FIRST_LIST",
  async (value) => {
    return await axios
      .get(
        `${serverUrl}/api/search?tab=colleciton&name=${value.keyword}&_page=${value.page}&_limit=12`
      )
      .then((response) => {
        value.setCollectionData([
          ...value.collectionData,
          ...response.data.data,
        ]);

        if (response.data.data.length === 0 || response.data.data.length < 12) {
          value.sethasMore(false);
        }
        value.setpage(value.page + 1);
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
    [loadCollectionDetail.fulfilled]: (state, action) => {
      state.collectionDetail = action.payload;
    },
    [loadCollectionSearch.fulfilled]: (state, action) => {
      console.log(action);
      state.collectionSearch = action.payload;
    },
  },
});

export default collectionSlice.reducer;

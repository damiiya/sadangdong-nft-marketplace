import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { serverUrl } from "../../shared/api";

const token = sessionStorage.getItem("auth_token");

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
      .catch((err) => err);
    // console.log(response.data);
    // return response.data;
  }
);

export const loadCollection = createAsyncThunk(
  "LOAD_COLLECTION_LIST",
  async () => {
    return await axios
      .get(`${serverUrl}/api/explore?tab=collection`)
      .then((response) => {
        console.log(response.data);
        return response.data.data;
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
);
// `${serverUrl}/api/explore?tab=collection`

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
        console.log(response.data);
        value.navigate(`/collection/${value.fileInfo.name}`);
        return response.data;
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
);
// `${serverUrl}/api/collections/${params}`
export const deleteCollection = createAsyncThunk(
  "Delete_COLLECTION",
  async (value) => {
    return await axios
      .delete(`${serverUrl}/api/collections/${value.collectionId}`, {
        headers: { authorization: `${token}` },
      })
      .then((response) => {
        console.log(response.data);
        value.navigate("/list");
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
);

export const loadCollectionDetail = createAsyncThunk(
  "LOAD_COLLECTION_DETAIL",
  async (keyword) => {
    return await axios
      .get(`${serverUrl}/api/collections/${keyword}`, {
        headers: { auth_token: `${token}` },
      })
      .then((response) => {
        console.log(response.data);
        return response.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
);

// `${serverUrl}/api/collections/${collectionId}`

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

const collectionSlice = createSlice({
  name: "Collection",
  initialState: {},
  reducers: {},
  extraReducers: {
    // [createCollection.fulfilled]: (state, { payload }) => [...payload],
    [loadCollection.fulfilled]: (state, action) => {
      state.collection = action.payload;
    },
    [loadCollectionDetail.fulfilled]: (state, action) => {
      console.log(action);
      state.collectionDetail = action.payload;
    },
    [loadCollectionSearch.fulfilled]: (state, action) => {
      console.log(action);
      state.collectionSearch = action.payload;
    },
  },
});

export default collectionSlice.reducer;

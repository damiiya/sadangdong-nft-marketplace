import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../../shared/api";

// 액션함수+데이터명으로 axios 요청 작성
// export const loadAllLists

// export const createUser = createAsyncThunk("CREATE_USER",
// async() => {
//   const response = await axios.post(${serverUrl},)
//   console.log(response.data);
//   return response.data;
// }
// )

const token = localStorage.getItem("auth_token");

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
        return response.data;
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
);
// `${serverUrl}/api/explore?tab=collection`

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
// `${serverUrl}/api/collections/${params}`
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

// export const deleteCollection = createAsyncThunk(
//   "Delete_COLLECTION",
//   async (collectionId) => {
//     return await axios({
//       method: "delete",
//       url: `${serverUrl}/api/collections/${collectionId}`,
//       headers: {
//         authorization: `${token}`,
//       },
//     })
//       .then((response) => console.log(response))
//       .catch((error) => console.log(error));
//   }
// );

export const loadCollectionDetail = createAsyncThunk(
  "LOAD_COLLECTION_DETAIL",
  async (collectionId) => {
    return await axios
      .get(`${serverUrl}/api/collections/${collectionId}`, {
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
  },
});

export default collectionSlice.reducer;

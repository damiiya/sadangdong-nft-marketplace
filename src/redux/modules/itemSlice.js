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
        url: `${serverUrl}/api/items/collections`,
        headers: {
          authorization: `${token}`,
        },
      });
      if (!token) {
        alert("로그인이 필요합니다!!");
        window.location.href = "/";
      } else if (response.data.data.length == 0) {
        alert("컬렉션을 먼저 생성해주세요!");
        window.location.href = "/createcollection";
      }
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.log(error.message);
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
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
);

// 아이템 첫번째 목록 가져오기
export const loadFirstItem = createAsyncThunk(
  "LOAD_Item_FIRST_LIST",
  async (setItemData) => {
    return await axios
      .get(`${serverUrl}/api/explore?tab=item&_page=1&_limit=12`)
      .then((response) => {
        setItemData(response.data.data);
        console.log(response.data.data);
        return response.data.data;
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
);

// 아이템 첫번째 이후 목록 가져오기
export const loadAfterFirstItem = createAsyncThunk(
  "LOAD_Item_AFTER_FIRST_LIST",
  async (value) => {
    return await axios
      .get(
        `${serverUrl}/api/explore?tab=item&_page=${value.itemPage}&_limit=12`
      )
      .then((response) => {
        value.setItemData([...value.itemData, ...response.data.data]);

        if (response.data.data.length === 0 || response.data.data.length < 12) {
          value.setItemnHasMore(false);
        }
        value.setItemPage(value.itemPage + 1);
        return response.data.data;
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
);

// 아이템 리스트 가져오기
export const loadItemList = createAsyncThunk("LOAD_ITEM_LIST", async () => {
  return await axios
    .get(`${serverUrl}/api/explore?tab=item`)
    .then((response) => {
      console.log(response.data.data);
      return response.data.data;
    })
    .catch((error) => {
      console.log(error.message);
    });
});

// 아이템 상세페이지 정보 가져오기
export const loadItemDetail = createAsyncThunk(
  "LOAD_ITEM_DETAIL",
  async (token_id) => {
    return await axios
      .get(`${serverUrl}/api/items/${token_id}`)
      .then((response) => {
        console.log(response.data.data);
        return response.data.data;
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
);

// 아이템 수정하기
export const editItem = createAsyncThunk("EDIT_ITEM", async (args) => {
  const response = await axios
    .put(`${serverUrl}/api/items/${args.token_id}`, args.itemInfo, {
      headers: {
        "Content-Type": "application/json",
        authorization: `${token}`,
      },
    })
    .then((response) => {
      console.log(response.data);
      alert("아이템을 수정하였습니다!");
      window.location.href = `/items/${args.token_id}`;
    })
    .catch((error) => {
      console.log(error.message);
    });
});

// 아이템 삭제하기
export const deleteItem = createAsyncThunk("Delete_ITEM", async (token_id) => {
  return await axios
    .delete(`${serverUrl}/api/items/${token_id}`, {
      headers: { authorization: `${token}` },
    })
    .then((response) => {
      console.log(response.data);
      alert("아이템을 삭제하였습니다!");
      window.location.href = "/";
    })
    .catch((error) => {
      console.log(error.message);
    });
});

// 아이템 경매 등록하기
// 경매중인 아이템 가져오기

const itemSlice = createSlice({
  name: "itemSlice",
  initialState: {
    collectionName: [{}],
  },
  reducers: {},
  extraReducers: {
    [getCollectionSelect.fulfilled]: (state, action) => {
      state.collectionName = action.payload;
    },
    [loadItemList.fulfilled]: (state, action) => {
      state.itemList = action.payload;
    },
    [loadItemDetail.fulfilled]: (state, action) => {
      state.itemDetail = action.payload;
    },
  },
});

export default itemSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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

// 유저 테스트용 요청 보내기
export const testUser = createAsyncThunk("TEST_USER", async (account) => {
  return await axios({
    method: "get",
    url: `${serverUrl}/api/json/getETH`,
    headers: {
      authorization: account,
    },
  })
    .then((response) => {
      console.log(response.data);
      alert(response.data.statusMsg);
    })
    .catch((error) => {
      console.log(error.message);
      alert(error.message);
    });
});

// 유저페이지 유저 정보 가져오기
export const loadAccountInfo = createAsyncThunk(
  "LOAD_ACCOUNT_INFO",
  async (walletAddress) => {
    return await axios
      .get(`${serverUrl}/api/account/info/${walletAddress}`, {
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

// 컬렉션페이지 유저 정보 가져오기
export const loadAccountInfoCollection = createAsyncThunk(
  "LOAD_ACCOUNT_INFO_COLLECTION",
  async (collectionId) => {
    return await axios
      .get(`${serverUrl}/api/collections/${collectionId}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        return response.data.data;
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
);

// 유저 경매중인 아이템 첫번째 목록 가져오기
export const loadAccountFirstAuctionItem = createAsyncThunk(
  "LOAD_ACCOUNT_AUCTION_ITEM_FIRST_LIST",
  async (value) => {
    return await axios
      .get(
        `${serverUrl}/api/account/${value.walletAddress}?tab=auction&_page=1&_limit=12`,
        {
          headers: { authorization: `${token}` },
        }
      )
      .then((response) => {
        console.log(response);
        value.setAuctionData(response.data.data);

        if (response.data.data.length === 0 || response.data.data.length < 12) {
          value.setAuctionHasMore(false);
        }
        return response.data.data;
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
);

// 유저 경매중인 아이템 첫번째 이후 목록 가져오기
export const loadAccountAfterFirstAuctionItem = createAsyncThunk(
  "LOAD_ACCOUNT_AUCTION_ITEM_AFTER_FIRST_LIST",
  async (value) => {
    return await axios
      .get(
        `${serverUrl}/api/account/${value.walletAddress}?tab=auction&_page=${value.auctionPage}&_limit=12`,
        {
          headers: { authorization: `${token}` },
        }
      )
      .then((response) => {
        value.setAuctionData([...value.auctionData, ...response.data.data]);

        if (response.data.data.length === 0 || response.data.data.length < 12) {
          value.setAuctionHasMore(false);
        }
        value.setAuctionPage(value.auctionPage + 1);
        return response.data.data;
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
);

// 유저 아이템 첫번째 목록 가져오기
export const loadAccountFirstItem = createAsyncThunk(
  "LOAD_ACCOUNT_ITEM_FIRST_LIST",
  async (value) => {
    return await axios
      .get(
        `${serverUrl}/api/account/${value.walletAddress}?tab=item&_page=1&_limit=12`,
        {
          headers: { authorization: `${token}` },
        }
      )
      .then((response) => {
        console.log(response);
        value.setItemData(response.data.data);

        if (response.data.data.length === 0 || response.data.data.length < 12) {
          value.setItemHasMore(false);
        }
        return response.data.data;
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
);

// 유저 아이템 첫번째 이후 목록 가져오기
export const loadAccountAfterFirstItem = createAsyncThunk(
  "LOAD_ACCOUNT_ITEM_AFTER_FIRST_LIST",
  async (value) => {
    return await axios
      .get(
        `${serverUrl}/api/account/${value.walletAddress}?tab=item&_page=${value.itemPage}&_limit=12`,
        {
          headers: { authorization: `${token}` },
        }
      )
      .then((response) => {
        value.setItemData([...value.itemData, ...response.data.data]);

        if (response.data.data.length === 0 || response.data.data.length < 12) {
          value.setItemHasMore(false);
        }
        value.setItemPage(value.itemPage + 1);
        return response.data.data;
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
);

// 유저 컬렉션 정보 가져오기
export const loadAccountCollection = createAsyncThunk(
  "LOAD_ACCOUNT_COLLECTION",
  async (walletAddress) => {
    return await axios
      .get(`${serverUrl}/api/account/${walletAddress}?tab=collection`, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
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
    [loadAccountCollection.fulfilled]: (state, action) => {
      state.collection = action.payload;
    },
    [loadAccountInfo.fulfilled]: (state, action) => {
      state.account = action.payload;
      console.log(state.account);
    },
    [loadAccountInfoCollection.fulfilled]: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { Account } = userSlice.actions;

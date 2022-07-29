import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { serverUrl } from "../../shared/api";
import axios from "axios";

const token = sessionStorage.getItem("auth_token");

// 아이템 생성페이지 컬렉션 리스트 받아오기
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
        `${serverUrl}/api/explore?tab=item&_page=${value.itemPage}&_limit=12`,
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

// 아이템 리스트 가져오기
export const loadItemList = createAsyncThunk("LOAD_ITEM_LIST", async () => {
  return await axios
    .get(`${serverUrl}/api/explore?tab=item`, {
      headers: { authorization: `${token}` },
    })
    .then((response) => {
      console.log(response.data.data);
      return response.data.data;
    })
    .catch((error) => {
      console.log(error.message);
    });
});

// 아이템 상세페이지 정보 받아오기
export const loadItemDetail = createAsyncThunk(
  "LOAD_ITEM_DETAIL",
  async (token_id) => {
    return await axios
      .get(`${serverUrl}/api/items/${token_id}`, {
        headers: { authorization: `${token}` },
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

// 아이템 수정하기
export const editItem = createAsyncThunk("EDIT_ITEM", async (args) => {
  console.log(args.itemInfo);
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
      window.location.href = `/detail/item/${args.token_id}`;
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
export const applyAuction = createAsyncThunk("APPLY_AUCTION", async (args) => {
  const priceData = { price: args.price };
  return await axios
    .post(`${serverUrl}/api/auction/${args.token_id}`, priceData, {
      headers: {
        "Content-Type": "application/json",
        authorization: `${token}`,
      },
    })
    .then((response) => {
      console.log(response.data);
      alert("경매가 시작되었습니다!");
      window.location.href = `/detail/item/${args.token_id}`;
    })
    .catch((error) => {
      console.log(error.message);
    });
});

// 경매중인 아이템 첫번째 리스트 받아오기
export const loadFirstAuctionList = createAsyncThunk(
  "LOAD_FIRST_AUCTION_LIST",
  async (setAuctionData) => {
    return await axios
      .get(`${serverUrl}/api/explore?tab=auction&_page=1&_limit=12`, {
        headers: { authorization: `${token}` },
      })
      .then((response) => {
        console.log(response.data.data);
        setAuctionData(response.data.data);
        return response.data.data;
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
);

// 경매중인 아이템 첫번째 이후 리스트 받아오기
export const loadAfterAuctionList = createAsyncThunk(
  "LOAD_AFTER_FIRST_AUCTION_LIST",
  async (value) => {
    return await axios
      .get(
        `${serverUrl}/api/explore?tab=auction&_page=${value.auctionPage}&_limit=12`,
        {
          headers: { authorization: `${token}` },
        }
      )
      .then((response) => {
        value.setAuctionData([...value.auctionData, ...response.data.data]);

        if (response.data.data.length === 0 || response.data.data.length < 12) {
          value.setAuctionHaeMore(false);
        }
        value.setAuctionPage(value.auctionPage + 1);
        return response.data.data;
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
);

// 경매중인 아이템 상세페이지 정보 받아오기
export const AuctionDetail = createAsyncThunk(
  "AUCTION_DETAIL",
  async (token_id) => {
    return await axios
      .get(`${serverUrl}/api/items/${token_id}`, {
        headers: { authorization: `${token}` },
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

// 아이템 검색 첫번째 목록 가져오기
export const loadSearchFirstItem = createAsyncThunk(
  "LOAD_ITEM_FIRST_LIST",
  async (value) => {
    return await axios
      .get(
        `${serverUrl}/api/search?tab=item&name=${value.keyword}&_page=1&_limit=12`,
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

// 아이템 검색 첫번째 이후 목록 가져오기
export const loadSearchAfterFirstItem = createAsyncThunk(
  "LOAD_ITEM_AFTER_FIRST_LIST",
  async (value) => {
    return await axios
      .get(
        `${serverUrl}/api/search?tab=item&name=${value.keyword}&_page=${value.itemPage}&_limit=12`,
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

// 경매중인 아이템 검색 첫번째 목록 가져오기
export const loadSearchFirstAuctionItem = createAsyncThunk(
  "LOAD_SEARCH_AUCTION_ITEM_FIRST_LIST",
  async (value) => {
    return await axios
      .get(
        `${serverUrl}/api/search?tab=auction&name=${value.keyword}&_page=1&_limit=12`,
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

// 경매중인 아이템 검색 첫번째 이후 목록 가져오기
export const loadSearchAfterFirstAuctionItem = createAsyncThunk(
  "LOAD_SEARCH_AUCTION_ITEM_AFTER_FIRST_LIST",
  async (value) => {
    return await axios
      .get(
        `${serverUrl}/api/search?tab=auction&name=${value.keyword}&_page=${value.auctionPage}&_limit=12`,
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
// 컬렉션 상세페이지 아이템 전체 목록 가져오기
export const loadCollectionDetailItem = createAsyncThunk(
  "LOAD_COLLECTION_DETAIL_ITEM_LIST",
  async (collectionId) => {
    return await axios
      .get(`${serverUrl}/api/collections/info/${collectionId}?tab=item`, {
        headers: { authorization: `${token}` },
      })
      .then((response) => {
        console.log(response);
        return response.data.data;
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
);

// 컬렉션 상세페이지 아이템 첫번째 목록 가져오기
export const loadFirstCollectionDetailItem = createAsyncThunk(
  "LOAD_COLLECTION_DETAIL_FIRST_LIST",
  async (value) => {
    return await axios
      .get(
        `${serverUrl}/api/collections/info/${value.collectionId}?tab=item&_page=1&_limit=12`,
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

// 컬렉션 상세페이지 아이템 첫번째 이후 목록 가져오기
export const loadAfterFirstCollectionDetailItem = createAsyncThunk(
  "LOAD_COLLECTION_DETAIL_AFTER_FIRST_LIST",
  async (value) => {
    return await axios
      .get(
        `${serverUrl}/api/collections/info/${value.collectionId}?tab=item&_page=${value.itemPage}&_limit=12`,
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

// 컬렉션 상세페이지 경매진행중 전체목록 가져오기
export const loadCollectionDetailAuction = createAsyncThunk(
  "LOAD_COLLECTION_DETAIL_AUCTION_LIST",
  async (collectionId) => {
    return await axios
      .get(`${serverUrl}/api/collections/info/${collectionId}?tab=auction`, {
        headers: { authorization: `${token}` },
      })
      .then((response) => {
        console.log(response);
        return response.data.data;
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
);

// 컬렉션 상세페이지 경매진행중 첫번째 목록 가져오기
export const loadFirstCollectionDetailAuctionItem = createAsyncThunk(
  "LOAD_COLLECTION_DETAIL_AUCTION_ITEM_FIRST_LIST",
  async (value) => {
    return await axios
      .get(
        `${serverUrl}/api/collections/info/${value.collectionId}?tab=auction&_page=1&_limit=12`,
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

// 컬렉션 상세페이지 경매진행중 첫번째 이후 목록 가져오기
export const loadAfterFirstCollectionDetailAuctionItem = createAsyncThunk(
  "LOAD_COLLECTION_DETAIL_AUCTION_ITEM_AFTER_FIRST_LIST",
  async (value) => {
    return await axios
      .get(
        `${serverUrl}/api/collections/info/${value.collectionId}?tab=auction&_page=${value.collectionPage}&_limit=12`,
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
    [loadCollectionDetailItem.fulfilled]: (state, action) => {
      state.collectionitem = action.payload;
    },
    [loadCollectionDetailAuction.fulfilled]: (state, action) => {
      state.collectionauction = action.payload;
    },
  },
});

export default itemSlice.reducer;

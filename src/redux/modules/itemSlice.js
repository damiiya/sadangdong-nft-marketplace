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
        // window.location.href = "/";
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
        console.log(response.data);
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

// 아이템 좋아요 요청 보내기
export const likeItem = createAsyncThunk("LIKE_ITEM", async (args) => {
  const response = await axios
    .put(`${serverUrl}/api/favorites/${args.token_id}`, args.like, {
      headers: {
        // "Content-Type": "application/json",
        authorization: `${token}`,
      },
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error.message);
    });
});

// 메인 페이지 요청 보내기
export const loadMain = createAsyncThunk("LOAD_MAIN", async () => {
  return await axios
    .get(`${serverUrl}/api/main`, {
      headers: {
        authorization: `${token}`,
      },
    })
    .then((response) => {
      console.log(response.data.data);
      console.log("메인페이지 불러오기");
      return response.data.data;
    })
    .catch((error) => {
      console.log(error.message);
    });
});

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

// 나의 활동페이지 찜한 아이템 목록 가져오기
export const loadMyLikeItem = createAsyncThunk(
  "LOAD_MY_LIKE_ITEM",
  async (token) => {
    return await axios
      .get(`${serverUrl}/api/account/${token}?tab=favorites`, {
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

// 나의 활동페이지 경매진행목록 받아오기
export const loadMyBiddingItem = createAsyncThunk(
  "LOAD_MY_BIDDING_ITEM",
  async (token) => {
    return await axios
      .get(`${serverUrl}/api/account/${token}?tab=progress`, {
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

// 나의 활동페이지 경매완료목록 받아오기
export const loadMyBiddingResult = createAsyncThunk(
  "LOAD_MY_BIDDING_RESULT",
  async (token) => {
    return await axios
      .get(`${serverUrl}/api/account/${token}?tab=complete`, {
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

// 나의 활동페이지 거래 처리하기
export const buyNft = createAsyncThunk("BUY_NFT", async (args) => {
  console.log(args.auction_id);
  console.log(args.price);
  const priceData = { price: args.price };
  return await axios
    .post(`${serverUrl}/api/sell/${args.auction_id}`, priceData, {
      headers: {
        "Content-Type": "application/json",
        authorization: `${token}`,
      },
    })
    .then((response) => {
      console.log(response.data);
      alert(response.data.statusMsg);
      window.location.href = `/account/myactivity/${token}`;
    })
    .catch((error) => {
      console.log(error.message);
    });
});

// 나의 활동페이지 구입한 아이템 받아오기
export const loadBoughtNft = createAsyncThunk(
  "LOAD_BOUGHT_NFT",
  async (token) => {
    return await axios
      .get(`${serverUrl}/api/account/${token}?tab=activity`, {
        headers: { authorization: `${token}` },
      })
      .then((response) => {
        console.log(response.data);
        return response.data;
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
      state.biddingList = action.payload.offers;
    },
    [loadMain.fulfilled]: (state, action) => {
      state.mainAuction = action.payload.auction_item;
      state.mainSeller = action.payload.ranking;
    },
    [loadCollectionDetailItem.fulfilled]: (state, action) => {
      state.collectionitem = action.payload;
    },
    [loadCollectionDetailAuction.fulfilled]: (state, action) => {
      state.collectionauction = action.payload;
    },
    [loadMyLikeItem.fulfilled]: (state, action) => {
      state.myLikeItem = action.payload;
    },
    [loadMyBiddingItem.fulfilled]: (state, action) => {
      state.myBiddingItem = action.payload;
    },
    [loadMyBiddingResult.fulfilled]: (state, action) => {
      state.myBiddingResult = action.payload;
    },
    [loadBoughtNft.fulfilled]: (state, action) => {
      state.myNft = action.payload;
    },
  },
});

export default itemSlice.reducer;

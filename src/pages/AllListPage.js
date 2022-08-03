// ** 처리한 사항은 [v]표시로 바꿔주세요!
// []카드 컴포넌트가 없는 경우 보이는 빈화면 '아직 아이템이 생성되지 않았습니다'로 바꿔줘야함(재은님께 빈화면 페이지 요청!)

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  loadFirstCollection,
  loadAfterFirstCollection,
} from "../redux/modules/collectionSlice";
import {
  loadFirstItem,
  loadAfterFirstItem,
  loadFirstAuctionList,
  loadAfterAuctionList,
} from "../redux/modules/itemSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import CardCollection from "../components/card/CardCollection";
import CardItem from "../components/card/CardItem";
import CardAuction from "../components/card/CardAuction";
import { Spinner } from "../elements/Spinner";

const AllListPage = () => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState(0);

  // 컬렉션
  const [collectionData, setCollectionData] = useState([]);
  const [collectionHasMore, setCollectionHasMore] = useState(true);
  const [collectionPage, setCollectionPage] = useState(2);

  // 아이템
  const [itemData, setItemData] = useState([]);
  const [itemHasMore, setItemHasMore] = useState(true);
  const [itemPage, setItemPage] = useState(2);

  // 경매 진행 중인 아이템
  const [auctionData, setAuctionData] = useState([]);
  const [auctionHasMore, setAuctionHasMore] = useState(true);
  const [auctionPage, setAuctionPage] = useState(2);

  useEffect(() => {
    dispatch(loadFirstCollection(setCollectionData));
    dispatch(loadFirstItem(setItemData));
    dispatch(loadFirstAuctionList(setAuctionData));
  }, []);

  const collectionFetchData = () => {
    dispatch(
      loadAfterFirstCollection({
        collectionPage,
        collectionData,
        setCollectionData,
        setCollectionHasMore,
        setCollectionPage,
      })
    );
  };

  const itemFetchData = () => {
    dispatch(
      loadAfterFirstItem({
        itemPage,
        itemData,
        setItemData,
        setItemHasMore,
        setItemPage,
      })
    );
  };

  const auctionFetchData = () => {
    dispatch(
      loadAfterAuctionList({
        auctionPage,
        auctionData,
        setAuctionData,
        setAuctionHasMore,
        setAuctionPage,
      })
    );
  };

  if (!collectionData) {
    return null;
  }

  return (
    <div className="Container">
      <div className="CategoryWrapper">
        {category === 0 ? (
          <button
            className="SelectedBigButton"
            onClick={() => {
              setCategory(0);
            }}
          >
            컬렉션
          </button>
        ) : (
          <button
            className="UnSelectedBigButton"
            onClick={() => {
              setCategory(0);
            }}
          >
            컬렉션
          </button>
        )}

        {category === 1 ? (
          <button
            className="SelectedBigButton"
            onClick={() => {
              setCategory(1);
            }}
          >
            아이템
          </button>
        ) : (
          <button
            className="UnSelectedBigButton"
            onClick={() => {
              setCategory(1);
            }}
          >
            아이템
          </button>
        )}
        {category === 2 ? (
          <button
            className="SelectedBigButton"
            onClick={() => {
              setCategory(2);
            }}
          >
            경매 진행중
          </button>
        ) : (
          <button
            className="UnSelectedBigButton"
            onClick={() => {
              setCategory(2);
            }}
          >
            경매 진행중
          </button>
        )}
      </div>

      {category === 0 && (
        <InfiniteScroll
          dataLength={collectionData.length}
          next={collectionFetchData}
          hasMore={collectionHasMore}
          loader={<Spinner />}
          style={{ overflowY: "hidden" }}
        >
          <div className="CardWrapper">
            <CardCollection data={collectionData} />
          </div>
        </InfiniteScroll>
      )}
      {category === 1 && (
        <InfiniteScroll
          dataLength={itemData.length}
          next={itemFetchData}
          hasMore={itemHasMore}
          loader={<Spinner />}
          style={{ overflowY: "hidden" }}
        >
          <div className="CardWrapper">
            <CardItem data={itemData} />
          </div>
        </InfiniteScroll>
      )}
      {category === 2 && (
        <InfiniteScroll
          dataLength={auctionData.length}
          next={auctionFetchData}
          hasMore={auctionHasMore}
          loader={<Spinner />}
          style={{ overflowY: "hidden" }}
        >
          <div className="CardWrapper">
            <CardAuction data={auctionData} />
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default AllListPage;

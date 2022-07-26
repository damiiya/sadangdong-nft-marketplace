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
import CardCollection from "../components/Card/CardCollection";
import CardItem from "../components/Card/CardItem";
import CardAuction from "../components/Card/CardAuction";

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
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
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
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
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
          auctionHasMore={auctionHasMore}
          loader={<h4>Loding...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
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

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadFirstCollection,
  loadAfterFirstCollection,
} from "../redux/modules/collectionSlice";
import { loadFirstItem, loadAfterFirstItem } from "../redux/modules/itemSlice";
import {
  loadFirstAuctionList,
  loadAfterAuctionList,
} from "../redux/modules/itemSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import CardAuction from "../components/card/CardAuction";
import CardCollection from "../components/card/CardCollection";
import CardItem from "../components/card/CardItem";

const AllListPage = () => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState(0);
  const [collectionData, setCollectionData] = useState([]);
  const [collectionHasMore, setCollectionHasMore] = useState(true);
  const [collectionPage, setCollectionPage] = useState(2);
  const [itemData, setItemData] = useState([]);
  const [itemHasMore, setItemnHasMore] = useState(true);
  const [itemPage, setItemPage] = useState(2);

  // 아이템

  // 경매 진행 중인 아이템
  const [auctionData, setAuctionData] = useState([]);
  const [auctionhasMore, setAuctionhasMore] = useState(true);
  const [auctionpage, setAuctionpage] = useState(2);

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
        setItemnHasMore,
        setItemPage,
      })
    );
  };
  const auctionFetchData = () => {
    dispatch(
      loadAfterAuctionList({
        auctionpage,
        auctionData,
        setAuctionData,
        setAuctionhasMore,
        setAuctionpage,
      })
    );
  };

  if (!collectionData) {
    return null;
  }

  return (
    <div className="Container">
      <div
        className="CategoryWrapper"
        // onClick={handleSelect}
      >
        {category === 0 ? (
          <button
            className="SelectedBigButton"
            // value={0}
            onClick={() => {
              setCategory(0);
            }}
          >
            컬렉션
          </button>
        ) : (
          <button
            className="UnSelectedBigButton"
            // value={0}
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
            // value={1}
            onClick={() => {
              setCategory(1);
            }}
          >
            아이템
          </button>
        ) : (
          <button
            className="UnSelectedBigButton"
            // value={1}
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
            // value={2}
            onClick={() => {
              setCategory(2);
            }}
          >
            경매 진행중
          </button>
        ) : (
          <button
            className="UnSelectedBigButton"
            // value={2}
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
          dataLength={collectionData.length} //This is important field to render the next data
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
          dataLength={itemData.length} //This is important field to render the next data
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
          auctionhasMore={auctionhasMore}
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

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadFirstCollection,
  loadAfterFirstCollection,
} from "../redux/modules/collectionSlice";
import {
  loadItemList,
  loadFirstAuctionList,
  loadAfterAuctionList,
} from "../redux/modules/itemSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import CardAuction from "../components/CardAuction";
import CardCollection from "../components/CardCollection";
import CardItem from "../components/CardItem";

const AllListPage = () => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState(0);
  const itemList = useSelector((state) => state.item.itemList);

  // 컬렉션
  const [collectionData, setCollectionData] = useState([]);
  const [hasMore, sethasMore] = useState(true);
  const [page, setpage] = useState(2);

  // 아이템

  // 경매 진행 중인 아이템
  const [auctionData, setAuctionData] = useState([]);
  const [auctionhasMore, setAuctionhasMore] = useState(true);
  const [auctionpage, setAuctionpage] = useState(2);

  useEffect(() => {
    dispatch(loadFirstCollection(setCollectionData));
    dispatch(loadFirstAuctionList(setAuctionData));
  }, []);

  const collectionFetchData = () => {
    dispatch(
      loadAfterFirstCollection({
        page,
        collectionData,
        setCollectionData,
        sethasMore,
        setpage,
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

  useEffect(() => {
    dispatch(loadItemList());
  }, []);

  if (!collectionData) {
    return null;
  }
  console.log(collectionData);

  return (
    <div className="Container">
      <div className="CategoryWrapper">
        <button
          className="SelectedBigButton"
          onClick={() => {
            setCategory(0);
          }}
        >
          컬렉션
        </button>
        <button
          className="UnSelectedBigButton"
          onClick={() => {
            setCategory(1);
          }}
        >
          아이템
        </button>
        <button
          className="UnSelectedBigButton"
          onClick={() => {
            setCategory(2);
          }}
        >
          경매 진행중
        </button>
      </div>

      {category === 0 && (
        <InfiniteScroll
          dataLength={collectionData.length} //This is important field to render the next data
          next={collectionFetchData}
          hasMore={hasMore}
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

      {category === 1 && <CardItem data={itemList} />}

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

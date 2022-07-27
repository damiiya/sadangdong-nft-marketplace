import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import CardAuction from "../components/card/CardAuction";
import CardCollection from "../components/card/CardCollection";
import CardItem from "../components/card/CardItem";
import {
  loadSearchFirstCollection,
  loadSearchAfterFirstCollection,
} from "../redux/modules/collectionSlice";
import {
  loadSearchFirstItem,
  loadSearchAfterFirstItem,
  loadSearchFirstAuctionItem,
  loadSearchAfterFirstAuctionItem,
} from "../redux/modules/itemSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import searchfailed from "../assets/icon/searchfailed.png";

const SearchListPage = () => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState(0);
  const params = useParams();
  const keyword = params.keyword;

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
    dispatch(
      loadSearchFirstCollection({
        keyword,
        setCollectionData,
        setCollectionHasMore,
      })
    );
    dispatch(
      loadSearchFirstItem({
        keyword,
        setItemData,
        setItemHasMore,
      })
    );
    dispatch(
      loadSearchFirstAuctionItem({
        keyword,
        setAuctionData,
        setAuctionHasMore,
      })
    );
  }, []);

  const collectionFetchData = () => {
    dispatch(
      loadSearchAfterFirstCollection({
        keyword,
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
      loadSearchAfterFirstItem({
        keyword,
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
      loadSearchAfterFirstAuctionItem({
        auctionPage,
        auctionData,
        setAuctionData,
        setAuctionHasMore,
        setAuctionPage,
      })
    );
  };
  console.log(collectionData);
  if (!collectionData) {
    return null;
  }

  return (
    <div className="Container">
      {category === 0 && collectionData.length === 0 && null}
      {category === 0 && collectionData.length > 0 && (
        <div className="SearchText">'{keyword}'에 대한 검색 결과입니다.</div>
      )}

      {category === 1 && itemData.length === 0 && null}
      {category === 1 && itemData.length > 0 && (
        <div className="SearchText">'{keyword}'에 대한 검색 결과입니다.</div>
      )}

      {category === 2 && auctionData.length === 0 && null}
      {category === 2 && auctionData.length > 0 && (
        <div className="SearchText">'{keyword}'에 대한 검색 결과입니다.</div>
      )}

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
      {category === 0 && collectionData.length === 0 && (
        <div className="SearchFailedContainer">
          <div className="SearchFailedWrapper">
            <img className="SearchFailed" src={searchfailed} />
            <span className="SearchFailedText">
              '{keyword}'와 일치하는 검색 결과가 없습니다.
            </span>
          </div>
        </div>
      )}
      {category === 0 && (
        <InfiniteScroll
          dataLength={collectionData.length}
          next={collectionFetchData}
          hasMore={collectionHasMore}
        >
          <div className="CardWrapper">
            <CardCollection data={collectionData} />
          </div>
        </InfiniteScroll>
      )}

      {category === 1 && itemData.length === 0 && (
        <div className="SearchFailedContainer">
          <div className="SearchFailedWrapper">
            <img className="SearchFailed" src={searchfailed} />
            <span className="SearchFailedText">
              '{keyword}'와 일치하는 검색 결과가 없습니다.
            </span>
          </div>
        </div>
      )}
      {category === 1 && (
        <InfiniteScroll
          dataLength={itemData.length}
          next={itemFetchData}
          hasMore={itemHasMore}
        >
          <div className="CardWrapper">
            <CardItem data={itemData} />
          </div>
        </InfiniteScroll>
      )}
      {category === 2 && auctionData.length === 0 && (
        <div className="SearchFailedContainer">
          <div className="SearchFailedWrapper">
            <img className="SearchFailed" src={searchfailed} />
            <div>
              <span className="SearchFailedText">
                '{keyword}'와 일치하는 검색 결과가 없습니다.
              </span>
            </div>
          </div>
        </div>
      )}
      {category === 2 && (
        <InfiniteScroll
          dataLength={auctionData.length}
          next={auctionFetchData}
          auctionHasMore={auctionHasMore}
        >
          <div className="CardWrapper">
            <CardAuction data={auctionData} />
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default SearchListPage;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CardAuction from "../components/CardAuction";
import CardCollection from "../components/CardCollection";
import CardItem from "../components/CardItem";
import {
  loadSearchFirstCollection,
  loadSearchAfterFirstCollection,
} from "../redux/modules/collectionSlice";
import InfiniteScroll from "react-infinite-scroll-component";

const SearchListPage = () => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState(0);
  const params = useParams();
  const keyword = params.keyword;

  const [collectionData, setCollectionData] = useState([]);
  const [hasMore, sethasMore] = useState(true);
  const [page, setpage] = useState(2);

  useEffect(() => {
    dispatch(loadSearchFirstCollection({ setCollectionData, keyword }));
  }, []);

  const collectionFetchData = () => {
    dispatch(
      loadSearchAfterFirstCollection({
        keyword,
        page,
        collectionData,
        setCollectionData,
        sethasMore,
        setpage,
      })
    );
  };

  if (!collectionData) {
    return null;
  }

  return (
    <div className="Container">
      <div className="SearchText">'{keyword}'에 대한 검색 결과입니다.</div>
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
      {category === 1 && <CardItem />}
      {category === 2 && <CardAuction />}
    </div>
  );
};

export default SearchListPage;

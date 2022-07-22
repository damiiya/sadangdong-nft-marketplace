import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CardAuction from "../components/CardAuction";
import CardCollection from "../components/CardCollection";
import CardItem from "../components/CardItem";
import { loadCollectionSearch } from "../redux/modules/collectionSlice";

const SearchListPage = () => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState(0);
  const params = useParams();
  const keyword = params.keyword;

  const collectionSearch = useSelector(
    (state) => state.collection.collectionSearch
  );

  useEffect(() => {
    dispatch(loadCollectionSearch(keyword));
  }, [keyword]);

  console.log(collectionSearch);

  if (!collectionSearch) {
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
      <div className="CardWrapper">
        {category === 0 && <CardCollection data={collectionSearch} />}
        {category === 1 && <CardItem />}
        {category === 2 && <CardAuction />}
      </div>
    </div>
  );
};

export default SearchListPage;

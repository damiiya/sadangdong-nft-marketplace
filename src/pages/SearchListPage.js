import React, { useState } from "react";
import CardAuction from "../components/CardAuction";
import CardCollection from "../components/CardCollection";
import CardItem from "../components/CardItem";

const SearchListPage = () => {
  const [category, setCategory] = useState(0);

  return (
    <div className="Container">
      <div className="SearchText">'search'에 대한 검색 결과입니다.</div>
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
        {category === 0 && <CardCollection />}
        {category === 1 && <CardItem />}
        {category === 2 && <CardAuction />}
      </div>
    </div>
  );
};

export default SearchListPage;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { loadCollection } from "../redux/modules/collectionSlice";
import { loadItemList } from "../redux/modules/itemSlice";
import CardAuction from "../components/CardAuction";
import CardCollection from "../components/CardCollection";
import CardItem from "../components/CardItem";

const AllListPage = () => {
  const [category, setCategory] = useState(0);
  const dispatch = useDispatch();

  const collectionList = useSelector((state) => state.collection.collection);
  const itemList = useSelector((state) => state.item.itemList);

  useEffect(() => {
    dispatch(loadCollection());
    dispatch(loadItemList());
  }, []);

  if (!collectionList) {
    return null;
  }

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
      <div className="CardWrapper">
        {category === 0 && <CardCollection data={collectionList} />}
        {category === 1 && <CardItem data={itemList} />}
        {category === 2 && <CardAuction />}
      </div>
    </div>
  );
};

export default AllListPage;

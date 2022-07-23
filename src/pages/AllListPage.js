import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import InfiniteScroll from "react-infinite-scroll-component";

import { loadCollection } from "../redux/modules/collectionSlice";
import { loadItemList } from "../redux/modules/itemSlice";
import CardAuction from "../components/CardAuction";
import CardCollection from "../components/CardCollection";
import CardItem from "../components/CardItem";

const AllListPage = () => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState(0);
  const [item, setItem] = useState(null);
  const collectionList = useSelector((state) => state.collection.collection);
  const itemList = useSelector((state) => state.item.itemList);

  // const handleSelect = (e) => {
  //   setItem(e.target.value);
  // };

  useEffect(() => {
    dispatch(loadCollection());
    dispatch(loadItemList());
  }, []);

  if (!collectionList) {
    return null;
  }

  return (
    <div className="Container">
      <div
        className="CategoryWrapper"
        // onClick={handleSelect}
      >
        <button
          className="SelectedBigButton"
          // value={0}
          onClick={() => {
            setCategory(0);
          }}
        >
          컬렉션
        </button>
        <button
          className="UnSelectedBigButton"
          // value={1}
          onClick={() => {
            setCategory(1);
          }}
        >
          아이템
        </button>
        <button
          className="UnSelectedBigButton"
          // value={2}
          onClick={() => {
            setCategory(2);
          }}
        >
          경매 진행중
        </button>
      </div>
      <div className="CardWrapper">
        {/* <CardCollection value={0} data={collectionList} />
        <CardItem value={1} data={itemList} />
        <CardAuction value={2} /> */}
        {category === 0 && <CardCollection value={0} data={collectionList} />}
        {category === 1 && <CardItem value={1} data={itemList} />}
        {category === 2 && <CardAuction value={2} />}
      </div>
    </div>
  );
};

export default AllListPage;

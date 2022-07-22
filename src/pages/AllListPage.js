import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import { loadCollection } from "../redux/modules/collectionSlice";
import CardAuction from "../components/CardAuction";
import CardCollection from "../components/CardCollection";
import CardItem from "../components/CardItem";

const AllListPage = () => {
  const [category, setCategory] = useState(0);
  const dispatch = useDispatch();
  const [items, setItems] = useState("");

  const fetchData = () => {};

  useEffect(() => {
    dispatch(loadCollection());
  }, []);

  const collectionList = useSelector((state) => state.collection.collection);
  console.log(collectionList);
  if (!collectionList) {
    return null;
  }
  console.log(collectionList);

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
        {
          category === 0 && (
            //   <InfiniteScroll
            //   dataLength={items.length} //This is important field to render the next data
            //   next={fetchData}
            //   hasMore={true}
            //   loader={<h4>Loading...</h4>}
            //   endMessage={
            //     <p style={{ textAlign: 'center' }}>
            //       <b>Yay! You have seen it all</b>
            //     </p>
            //   }

            // >
            <CardCollection data={collectionList} />
          )
          // </InfiniteScroll>
        }
        {category === 1 && <CardItem />}
        {category === 2 && <CardAuction />}
      </div>
    </div>
  );
};

export default AllListPage;

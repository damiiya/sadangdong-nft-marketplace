import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import InfiniteScroll from "react-infinite-scroll-component";

import { loadCollection } from "../redux/modules/collectionSlice";
import { loadItemList } from "../redux/modules/itemSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import { serverUrl } from "../shared/api";
import CardAuction from "../components/CardAuction";
import CardCollection from "../components/CardCollection";
import CardItem from "../components/CardItem";
import axios from "axios";

const AllListPage = () => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState(0);
  const [item, setItem] = useState(null);
  const collectionList = useSelector((state) => state.collection.collection);
  const itemList = useSelector((state) => state.item.itemList);

  // const handleSelect = (e) => {
  //   setItem(e.target.value);
  // };
  const [collectionData, setCollectionData] = useState([]);
  const [hasMore, sethasMore] = useState(true);
  const [page, setpage] = useState(2);

  // useEffect(() => {
  //   dispatch(loadCollection());
  // }, []);
  // `http://localhost:5001/collections?_page=1&_limit=12`
  // `${serverUrl}/api/explore?tab=collection&_page=1&_limit=12`
  useEffect(() => {
    const loadFirstCollection = async () => {
      const response = await axios(
        `${serverUrl}/api/explore?tab=collection&_page=1&_limit=12`
      )
        .then((response) => {
          console.log(response.data);
          setCollectionData(response.data.data);
          return response.data.data;
        })
        .catch((error) => {
          console.log(error.message);
        });
    };
    loadFirstCollection();
  }, []);

  const fetchCollection = async () => {
    const response = await axios
      .get(`${serverUrl}/api/explore?tab=collection&_page=${page}&_limit=12`)
      .then((response) => {
        console.log(response.data);
        return response.data.data;
      })
      .catch((error) => {
        console.log(error.message);
      });
    return response;
  };

  const fetchData = async () => {
    const commentsFormServer = await fetchCollection();

    setCollectionData([...collectionData, ...commentsFormServer]);
    if (commentsFormServer.length === 0 || commentsFormServer.length < 12) {
      sethasMore(false);
    }
    setpage(page + 1);
  };

  useEffect(() => {
    dispatch(loadCollection());
    dispatch(loadItemList());
  }, []);

  // if (!collectionList) {
  //   return null;
  // }

  if (!collectionData) {
    return null;
  }
  console.log(collectionData);

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
        {/* {category === 0 && <CardCollection value={0} data={collectionList} />}
        {category === 1 && <CardItem value={1} data={itemList} />}
        {category === 2 && <CardAuction value={2} />} */}
      </div>

      {category === 0 && (
        <InfiniteScroll
          dataLength={collectionData.length} //This is important field to render the next data
          next={fetchData}
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
      {category === 2 && <CardAuction />}
    </div>
  );
};

export default AllListPage;

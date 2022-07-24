import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadFirstCollection,
  loadAfterFirstCollection,
} from "../redux/modules/collectionSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import { serverUrl } from "../shared/api";
import CardAuction from "../components/CardAuction";
import CardCollection from "../components/CardCollection";
import CardItem from "../components/CardItem";
import axios from "axios";

const AllListPage = () => {
  const [category, setCategory] = useState(0);
  const dispatch = useDispatch();
  const [collectionData, setCollectionData] = useState([]);
  const [hasMore, sethasMore] = useState(true);
  const [page, setpage] = useState(2);

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
      {category === 1 && <CardItem />}
      {category === 2 && <CardAuction />}
    </div>
  );
};

export default AllListPage;

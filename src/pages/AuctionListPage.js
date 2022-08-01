import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import CardAuction from "../components/card/CardAuction";
import {
  loadFirstAuctionList,
  loadAfterAuctionList,
} from "../redux/modules/itemSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../elements/Spinner";

const AuctionListPage = () => {
  const dispatch = useDispatch();
  const [auctionData, setAuctionData] = useState([]);
  const [auctionHasMore, setAuctionHasMore] = useState(true);
  const [auctionPage, setAuctionPage] = useState(2);

  useEffect(() => {
    dispatch(loadFirstAuctionList(setAuctionData));
  }, []);

  const auctionFetchData = () => {
    dispatch(
      loadAfterAuctionList({
        auctionPage,
        auctionData,
        setAuctionData,
        setAuctionHasMore,
        setAuctionPage,
      })
    );
  };

  if (!auctionData) {
    return <Spinner />;
  }

  return (
    <div className="Container">
      <div className="AuctionListText">경매 진행중인 아이템</div>
      <InfiniteScroll
        dataLength={auctionData.length}
        next={auctionFetchData}
        auctionHasMore={auctionHasMore}
        loader={<Spinner />}
      >
        <div className="CardWrapper">
          <CardAuction data={auctionData} />
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default AuctionListPage;

import React, { useState, useEffect } from "react";
import { loadCollectionDetail } from "../redux/modules/collectionSlice";
import {
  loadFirstCollectionDetailItem,
  loadAfterFirstCollectionDetailItem,
  loadFirstCollectionDetailAuctionItem,
  loadAfterFirstCollectionDetailAuctionItem,
} from "../redux/modules/itemSlice";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import share from "../assets/icon/share.png";
import pencil from "../assets/icon/pencil.png";
import CardAuction from "../components/card/CardAuction";
import CardItem from "../components/card/CardItem";
import InfiniteScroll from "react-infinite-scroll-component";

import { useParams } from "react-router-dom";

const CollectionPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const collectionId = params.collectionId;

  const collectionDetail = useSelector(
    (state) => state.collection.collectionDetail
  );
  const [category, setCategory] = useState(0);

  // 경매 진행 중인 아이템
  const [auctionData, setAuctionData] = useState([]);
  const [auctionHasMore, setAuctionHasMore] = useState(true);
  const [auctionPage, setAuctionPage] = useState(2);

  // 아이템
  const [itemData, setItemData] = useState([]);
  const [itemHasMore, setItemHasMore] = useState(true);
  const [itemPage, setItemPage] = useState(2);

  useEffect(() => {
    dispatch(loadCollectionDetail(collectionId));
    dispatch(
      loadFirstCollectionDetailItem({
        collectionId,
        setItemData,
        setItemHasMore,
      })
    );
    dispatch(
      loadFirstCollectionDetailAuctionItem({
        collectionId,
        setAuctionData,
        setAuctionHasMore,
      })
    );
  }, []);

  const auctionFetchData = () => {
    dispatch(
      loadAfterFirstCollectionDetailAuctionItem({
        collectionId,
        auctionPage,
        auctionData,
        setAuctionData,
        setAuctionHasMore,
        setAuctionPage,
      })
    );
  };

  const itemFetchData = () => {
    dispatch(
      loadAfterFirstCollectionDetailItem({
        collectionId,
        itemPage,
        itemData,
        setItemData,
        setItemHasMore,
        setItemPage,
      })
    );
  };
  console.log(collectionDetail);
  if (!collectionDetail) {
    return null;
  }

  return (
    <div className="MainContainer">
      <div
        className="MainBanner"
        style={{
          backgroundImage: `url(
            ${collectionDetail && collectionDetail.banner_image}
          )`,
        }}
      >
        <div className="UserImageWrap">
          <Avatar
            alt="User Name"
            src={collectionDetail.profile_image}
            sx={{ width: 152, height: 152 }}
          />
        </div>
      </div>
      <div className="CollectionInfoContainer">
        <div className="CollectionInfoWrap">
          <div className="CollectionInfo">
            <span className="InfoTap">Items</span>
            <span className="InfoValue">15</span>
          </div>
          <div className="CollectionInfo">
            <span className="InfoTap">Owners</span>
            <span className="InfoValue">10</span>
          </div>
          <div className="CollectionInfo">
            <span className="InfoTap">Floor Price</span>
            <span className="InfoValue">999.99</span>
          </div>
        </div>
      </div>
      <div className="CollectionTitleWrapper">
        <div className="CollectionTitleWrap">
          <span className="CollectionTitleLetter">
            {collectionDetail && collectionDetail.name}
          </span>
          <span className="CollectionUerLetter">
            by {collectionDetail.user_name}
          </span>
        </div>
        <div className="CollectionButtonBundle">
          <button className="CollectionTitleButton">
            <img className="ButtonIcon" src={share} />
            share
          </button>
          <button className="CollectionTitleButton">
            <img className="ButtonIcon" src={pencil} />
            <a href={`/editcollection/${collectionId}`}>Collection Edit</a>
          </button>
        </div>
      </div>
      <div className="CollectionDescriptionWrapper">
        {collectionDetail && collectionDetail.description}
      </div>
      <div className="CategoryContainer">
        <div className="CategoryWrapper">
          <button
            className="SelectedSmallButton"
            onClick={() => {
              setCategory(0);
            }}
          >
            경매 진행중인 아이템
          </button>
          <button
            className="UnSelectedSmallButton"
            onClick={() => {
              setCategory(1);
            }}
          >
            아이템
          </button>
        </div>

        {category === 0 && auctionData.length > 0 ? (
          <InfiniteScroll
            dataLength={auctionData.length}
            next={auctionFetchData}
            auctionHasMore={auctionHasMore}
            loader={<h4>Loding...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <div className="CardWrapper">
              <CardAuction data={auctionData} />
            </div>
          </InfiniteScroll>
        ) : null}

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
      </div>
    </div>
  );
};

export default CollectionPage;

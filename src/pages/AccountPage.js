import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  loadAccountCollection,
  loadAccountFirstItem,
  loadAccountAfterFirstItem,
  loadAccountFirstAuctionItem,
  loadAccountAfterFirstAuctionItem,
} from "../redux/modules/userSlice";

import InfiniteScroll from "react-infinite-scroll-component";
import { Avatar } from "@mui/material";
import share from "../assets/icon/share.png";
import pencil from "../assets/icon/pencil.png";
import CardAuction from "../components/card/CardAuction";
import CardCollection from "../components/card/CardCollection";
import CardItem from "../components/card/CardItem";
import cart2 from "../assets/icon/cart2.png";

const AccountPage = () => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState(0);
  const token = sessionStorage.getItem("auth_token");
  const params = useParams();
  const walletAddress = params.token_id;
  const copyLinkRef = useRef();
  const userCollectionData = useSelector((state) => state.user.collection);

  // 아이템
  const [itemData, setItemData] = useState([]);
  const [itemHasMore, setItemHasMore] = useState(true);
  const [itemPage, setItemPage] = useState(2);

  // 경매 진행 중인 아이템
  const [auctionData, setAuctionData] = useState([]);
  const [auctionHasMore, setAuctionHasMore] = useState(true);
  const [auctionPage, setAuctionPage] = useState(2);

  useEffect(() => {
    dispatch(
      loadAccountFirstAuctionItem({
        walletAddress,
        setAuctionData,
        setAuctionHasMore,
      })
    );
    dispatch(
      loadAccountFirstItem({ walletAddress, setItemData, setItemHasMore })
    );
    dispatch(loadAccountCollection(walletAddress));
  }, []);

  // 아이템 추가 데이터 가져오기
  const itemFetchData = () => {
    dispatch(
      loadAccountAfterFirstItem({
        walletAddress,
        itemPage,
        itemData,
        setItemData,
        setItemHasMore,
        setItemPage,
      })
    );
  };

  // 실시간 경매 추가 데이터 가져오기
  const auctionFetchData = () => {
    dispatch(
      loadAccountAfterFirstAuctionItem({
        auctionPage,
        auctionData,
        setAuctionData,
        setAuctionHasMore,
        setAuctionPage,
      })
    );
  };

  // Url 복사 함수
  function copyTextUrl() {
    copyLinkRef.current.focus();
    copyLinkRef.current.select();

    navigator.clipboard.writeText(copyLinkRef.current.value).then(() => {
      alert("링크를 복사했습니다.");
    });
  }

  if (!userCollectionData) {
    return null;
  }

  return (
    <div className="MainContainer">
      <div className="AuthorBanner">
        <div className="AuthorImageWrap">
          <div className="AuthorImage">
            <Avatar
              alt="User Name"
              src={
                userCollectionData.data && userCollectionData.data.profile_image
              }
              sx={{ width: 152, height: 152 }}
            />
          </div>
          <div className="NameWrap">
            <span className="AuthorName">
              @{userCollectionData.data && userCollectionData.data.name}
            </span>
            {/* {token === walletAddress && (
              <a href={`/account/edit/${token}`}>
                <img className="Icon" src={pencil} />
              </a>
            )} */}
          </div>
        </div>
      </div>
      <div className="CategoryContainer">
        <div className="SmallCategoryWrapper">
          <div className="CategoryWrap">
            {category === 0 ? (
              <button
                className="SelectedSmallButton"
                onClick={() => {
                  setCategory(0);
                }}
              >
                경매 진행중인 아이템
              </button>
            ) : (
              <button
                className="UnSelectedSmallButton"
                onClick={() => {
                  setCategory(0);
                }}
              >
                경매 진행중인 아이템
              </button>
            )}
            {category === 1 ? (
              <button
                className="SelectedSmallButton"
                onClick={() => {
                  setCategory(1);
                }}
              >
                아이템
              </button>
            ) : (
              <button
                className="UnSelectedSmallButton"
                onClick={() => {
                  setCategory(1);
                }}
              >
                아이템
              </button>
            )}
            {category === 2 ? (
              <button
                className="SelectedSmallButton"
                onClick={() => {
                  setCategory(2);
                }}
              >
                컬렉션
              </button>
            ) : (
              <button
                className="UnSelectedSmallButton"
                onClick={() => {
                  setCategory(2);
                }}
              >
                컬렉션
              </button>
            )}
          </div>
          <div className="ShareCartWrap">
            <div className="ShareWrap">
              <input
                style={{ visibility: "hidden" }}
                type="text"
                ref={copyLinkRef}
                value={`http:localhost3000/account/${walletAddress}`}
              ></input>
              <button className="CollectionTitleButton" onClick={copyTextUrl}>
                <img className="ButtonIcon" src={share} />
                share
              </button>
            </div>
          </div>
        </div>

        {category === 0 && auctionData.length > 0 ? (
          <InfiniteScroll
            dataLength={auctionData.length}
            next={auctionFetchData}
            auctionHasMore={auctionHasMore}
            loader={<h4>Loding...</h4>}
          >
            <div className="CardWrapper">
              <CardAuction data={auctionData} />
            </div>
          </InfiniteScroll>
        ) : null}

        {category === 1 && itemData.length > 0 ? (
          <InfiniteScroll
            dataLength={itemData.length}
            next={itemFetchData}
            hasMore={itemHasMore}
            loader={<h4>Loading...</h4>}
          >
            <div className="CardWrapper">
              <CardItem data={itemData} />
            </div>
          </InfiniteScroll>
        ) : null}

        {category === 2 && (
          <div className="CardWrapper">
            <CardCollection data={userCollectionData.information} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountPage;

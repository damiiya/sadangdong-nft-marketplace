// ** 처리한 사항은 [v]표시로 바꿔주세요!
// []카드 컴포넌트가 없는 경우 보이는 빈화면 '아직 아이템이 생성되지 않았습니다'로 바꿔줘야함(재은님께 빈화면 페이지 요청!)

import React, { useState, useEffect, useRef } from "react";
import { clientUrl } from "../shared/api";
import { loadAccountInfoCollection } from "../redux/modules/userSlice";
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
// import EmptyView from "../elements/EmptyView";
import { useParams } from "react-router-dom";
import { Spinner } from "../elements/Spinner";

const CollectionPage = () => {
  const token = sessionStorage.getItem("auth_token");
  const copyLinkRef = useRef();
  const dispatch = useDispatch();
  const params = useParams();
  const collectionId = params.collectionId;

  const userInfo = useSelector((state) => state.user.userInfo);
  const [category, setCategory] = useState(0);

  // 경매 진행 중인 아이템
  const [auctionData, setAuctionData] = useState([]);
  const [auctionHasMore, setAuctionHasMore] = useState(true);
  const [auctionPage, setAuctionPage] = useState(2);

  // 아이템
  const [itemData, setItemData] = useState([]);
  const [itemHasMore, setItemHasMore] = useState(true);
  const [itemPage, setItemPage] = useState(2);

  // 무한스크롤 초기데이터 가져오기
  useEffect(() => {
    dispatch(loadAccountInfoCollection(collectionId));
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

  // 경매 아이템 추가데이터 가져오기
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

  // 아이템 추가데이터 가져오기
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

  // Url 복사 함수
  const copyTextUrl = () => {
    copyLinkRef.current.focus();
    copyLinkRef.current.select();

    navigator.clipboard.writeText(copyLinkRef.current.value).then(() => {
      alert("링크를 복사했습니다.");
    });
  };

  if (!userInfo) {
    return null;
  }

  return (
    <div className="CollectionContainer">
      <div
        className="MainBanner"
        style={{
          backgroundImage: `url(
            ${userInfo && userInfo.banner_image}
          )`,
        }}
      >
        <div className="UserImageWrap">
          <Avatar
            alt="User Name"
            src={userInfo.profile_image}
            sx={{ width: 152, height: 152 }}
          />
        </div>
      </div>
      <div className="CollectionInfoContainer">
        <div className="CollectionInfoWrap">
          <div className="CollectionInfo">
            <span className="InfoTap">Items</span>
            <span className="InfoValue">{userInfo.item_count}</span>
          </div>
          <div className="CollectionInfo">
            <span className="InfoTap">Owners</span>
            <span className="InfoValue">{userInfo.buyuser_count}</span>
          </div>
          <div className="CollectionInfo">
            <span className="InfoTap">Floor Price</span>
            <span className="InfoValue">{userInfo.least_offer}</span>
          </div>
        </div>
      </div>
      <div className="CollectionTitleWrapper">
        <div className="CollectionTitleWrap">
          <span className="CollectionTitleLetter">
            {userInfo && userInfo.name}
          </span>
          <span className="CollectionUerLetter">by {userInfo.user_name}</span>
        </div>
        <div className="CollectionButtonBundle">
          <input
            style={{ visibility: "hidden", width: "0", height: "0" }}
            type="text"
            ref={copyLinkRef}
            value={`${clientUrl}/detail/collection/${collectionId}`}
          ></input>
          <button className="CollectionTitleButton" onClick={copyTextUrl}>
            <img className="ButtonIcon" src={share} />
            Share
          </button>
          {token === userInfo.address && (
            <button className="CollectionTitleButton">
              <img className="ButtonIcon" src={pencil} />
              <a href={`/editcollection/${collectionId}`}>Collection Edit</a>
            </button>
          )}
        </div>
      </div>
      <div className="CollectionDescriptionWrapper">
        {userInfo && userInfo.description}
      </div>
      <div className="CategoryContainer">
        <div className="CategoryWrapper">
          {category === 0 && (
            <>
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
            </>
          )}

          {category === 1 && (
            <>
              <button
                className="UnSelectedSmallButton"
                onClick={() => {
                  setCategory(0);
                }}
              >
                경매 진행중인 아이템
              </button>
              <button
                className="SelectedSmallButton"
                onClick={() => {
                  setCategory(1);
                }}
              >
                아이템
              </button>
            </>
          )}
        </div>

        {category === 0 && itemData.length > 0 ? (
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
        ) : null}

        {category === 1 && itemData.length > 0 ? (
          <InfiniteScroll
            dataLength={itemData.length}
            next={itemFetchData}
            hasMore={itemHasMore}
          >
            <div className="CardWrapper">
              <CardItem data={itemData} />
            </div>
          </InfiniteScroll>
        ) : null}
      </div>
    </div>
  );
};

export default CollectionPage;

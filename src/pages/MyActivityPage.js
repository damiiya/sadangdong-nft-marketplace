import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import { loadAccountInfo } from "../redux/modules/userSlice";
import { loadMyBiddingItem, loadMyLikeItem } from "../redux/modules/itemSlice";
import pencil from "../assets/icon/pencil.png";
import CardItem from "../components/card/CardItem";
import Spinner from "../elements/Spinner";
import BiddingList from "../components/list/BiddingList";

function MyActivityPage() {
  const dispatch = useDispatch();
  const [isLoad, setIsLoad] = useState();
  const [category, setCategory] = useState(0);
  const [selected, setSelected] = useState("0");
  const token = sessionStorage.getItem("auth_token");
  const userInfo = useSelector((state) => state.user.account);
  const myLikeItemInfo = useSelector((state) => state.item.mylikeitem);
  const mybiddingItem = useSelector((state) => state.item.mybiddingItem);

  useEffect(() => {
    dispatch(loadAccountInfo(token));
    dispatch(loadMyLikeItem(token));
    dispatch(loadMyBiddingItem(token));
  }, []);

  useEffect(() => {
    if (mybiddingItem) {
      setIsLoad(true);
    }
  });

  if (!userInfo) return null;
  if (!isLoad) return <Spinner />;

  return (
    <div className="MainContainer">
      <div className="AuthorBanner">
        <div className="AuthorImageWrap">
          <div className="AuthorImage">
            <Avatar
              alt="User Name"
              src={userInfo.profile_image}
              sx={{ width: 152, height: 152 }}
            />
          </div>
          <div className="NameWrap">
            <span className="AuthorName">@ {userInfo.name}</span>

            <a href={`/account/edit/${token}`}>
              <img className="Icon" src={pencil} />
            </a>
          </div>
        </div>
      </div>
      <div className="MyActivityCategoryContainer">
        <div className="SmallCategoryWrapper">
          <div className="CategoryWrap">
            {category === 0 ? (
              <button
                className="SelectedSmallButton"
                onClick={() => {
                  setCategory(0);
                }}
              >
                내가 참여한 경매목록
              </button>
            ) : (
              <button
                className="UnSelectedSmallButton"
                onClick={() => {
                  setCategory(0);
                }}
              >
                내가 참여한 경매목록
              </button>
            )}
            {category === 1 ? (
              <button
                className="SelectedSmallButton"
                onClick={() => {
                  setCategory(1);
                }}
              >
                내가 구입한 아이템
              </button>
            ) : (
              <button
                className="UnSelectedSmallButton"
                onClick={() => {
                  setCategory(1);
                }}
              >
                내가 구입한 아이템
              </button>
            )}
            {category === 2 ? (
              <button
                className="SelectedSmallButton"
                onClick={() => {
                  setCategory(2);
                }}
              >
                찜한 아이템
              </button>
            ) : (
              <button
                className="UnSelectedSmallButton"
                onClick={() => {
                  setCategory(2);
                }}
              >
                찜한 아이템
              </button>
            )}
          </div>
        </div>
      </div>
      {category === 0 && (
        <div className="AuctionSelectBoxWrapper">
          <select
            className="AuctionSelectBox"
            onChange={(event) => setSelected(event.target.value)}
          >
            <option value={0}>경매 진행 목록</option>
            <option value={1}>경매 완료 목록</option>
          </select>
        </div>
      )}

      {category === 0 && selected === "0" && (
        <div className="MyAuctionPageContentContainer">
          <div className="MyAuctionPageContentTitleWrapper">
            <span className="ContentTitleImage">이미지</span>
            <span className="ContentTitleItem">아이템명</span>
            <span className="ContentTitleAuctionStart">경매 시작 시간</span>
            <span className="ContentTitleAuctionEnd">경매 종료 시간</span>

            <span className="ContentTitleAuctionHighestBid">
              현재 최고 입찰가
            </span>
            <span className="ContentTitleAuctionMyBid">입찰가격</span>
          </div>
          {mybiddingItem.map((list, i) => (
            <div className="MyAuctionPageContentWrapper" key={i}>
              <div className="MyAuctionPageContentImageWrapper">
                <img className="MyBiddingImage" src={list.image} />
              </div>
              <span className="ContentItemName">{list.name}</span>
              <span className="ContentAuctionStart">{list.started_at}</span>
              <span className="ContentAuctionEnd">{list.ended_at}</span>
              <span className="ContentHighestBid">{list.bidding_price}</span>
              <div className="ContentMyBid">{list.user_offer}</div>
            </div>
          ))}
        </div>
      )}

      {category === 0 && selected === "1" && (
        <div className="MyAuctionPageContentContainer">
          <div className="MyAuctionPageContentTitleWrapper">
            <span className="ContentTitleImage">이미지</span>
            <span className="ContentTitleItem">아이템명</span>
            <span className="ContentTitleAuctionStart">경매 시작 시간</span>
            <span className="ContentTitleAuctionEnd">경매 종료 시간</span>
            <span className="ContentTitleAuctionWinningBid">최종 낙찰가</span>
            <span className="ContentTitleAuctionMyFinalBid">입찰가</span>
            <span className="ContentTitleAuctionMyBidResult">입찰결과</span>
          </div>
          <BiddingList />
        </div>
      )}
      {/* {category === 1 && (
        <div className="CardWrapper"><CardItem data={itemData} /></div>
      )} */}

      {category === 2 && myLikeItemInfo.length > 0 && (
        <div className="MyActivityCardWrapper">
          <CardItem data={myLikeItemInfo} />
        </div>
      )}
    </div>
  );
}

export default MyActivityPage;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import { loadAccountInfo } from "../redux/modules/userSlice";
import {
  loadMyLikeItem,
  loadMyBiddingItem,
  loadMyBiddingResult,
  loadBoughtNft,
} from "../redux/modules/itemSlice";
import pencil from "../assets/icon/pencil.png";
import Spinner from "../elements/Spinner";
import CardItem from "../components/card/CardItem";
import MyBids from "../components/list/MyBids";
import BidsList from "../components/list/BidsList";

const MyActivityPage = () => {
  const dispatch = useDispatch();
  const [isLoad, setIsLoad] = useState(false);
  const [category, setCategory] = useState(0);
  const [selected, setSelected] = useState("0");
  const token = sessionStorage.getItem("auth_token");
  const userInfo = useSelector((state) => state.user.account);
  const myBiddingItem = useSelector((state) => state.item.myBiddingItem);
  const myBiddingResult = useSelector((state) => state.item.myBiddingResult);
  const myLikeItemInfo = useSelector((state) => state.item.myLikeItem);
  const myNft = useSelector((state) => state.item.myNft);

  useEffect(() => {
    dispatch(loadAccountInfo(token));
    dispatch(loadMyLikeItem(token));
    dispatch(loadMyBiddingItem(token));
    dispatch(loadMyBiddingResult(token));
    dispatch(loadBoughtNft(token));
  }, []);

  useEffect(() => {
    if (
      userInfo &&
      myBiddingItem &&
      myBiddingResult &&
      myLikeItemInfo &&
      myNft
    ) {
      setIsLoad(true);
    }
  });

  if (!isLoad) {
    return <Spinner />;
  }

  return (
    <div className="MainContainer">
      <div className="AuthorBanner">
        <div className="AuthorImageWrap">
          <div className="AuthorImage">
            <Avatar
              alt="User Name"
              src={userInfo && userInfo.profile_image}
              sx={{ width: 152, height: 152 }}
            />
          </div>
          <div className="NameWrap">
            <span className="AuthorName">@ {userInfo && userInfo.name}</span>

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

      {category === 0 && selected === "0" && myBiddingItem.length > 0 && (
        <BidsList myBiddingItem={myBiddingItem} />
      )}

      {category === 0 && selected === "1" && myBiddingResult.length > 0 && (
        <MyBids data={myBiddingResult} />
      )}

      {category === 1 && myNft.length > 0 && (
        <div className="MyActivityCardWrapper">
          <CardItem data={myNft} />
        </div>
      )}

      {category === 2 && myLikeItemInfo.length > 0 && (
        <div className="MyActivityCardWrapper">
          <CardItem data={myLikeItemInfo} />
        </div>
      )}
    </div>
  );
};

export default MyActivityPage;

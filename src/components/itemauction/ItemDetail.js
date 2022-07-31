import React, { useRef, useState, useEffect } from "react";
import { clientUrl } from "../../shared/api";

import { useParams } from "react-router-dom";
import { Avatar } from "@mui/material";
import heartoff from "../../assets/icon/heartoff.png";
import hearton from "../../assets/icon/hearton.png";
import IosShareIcon from "@mui/icons-material/IosShare";
import EditIcon from "@mui/icons-material/Edit";
import { likeItem } from "../../redux/modules/itemSlice";
import { useDispatch } from "react-redux";

const ItemDetail = (props) => {
  console.log(props.data);
  const token = sessionStorage.getItem("auth_token");
  const user = props.data.address;
  const params = useParams();
  const token_id = params.token_id;

  const dispatch = useDispatch();

  const [like, setLike] = useState(props.data.favorites);
  const [likeCount, setLikeCount] = useState(props.data.favorites_count);

  const handleLike = () => {
    console.log(like);
    if (token) {
      setLike((like) => !like);
      setLikeCount((likeCount) => (like ? likeCount - 1 : likeCount + 1));
      dispatch(likeItem({ token_id: token_id, like: like }));
    }
  };

  useEffect(() => {
    if (props.data.favorites == 1) {
      setLike(true);
      setLikeCount(props.data.favorites_count);
    }
  }, []);

  const copyLinkRef = useRef();

  // Url 복사 함수
  const copyTextUrl = () => {
    copyLinkRef.current.focus();
    copyLinkRef.current.select();

    navigator.clipboard.writeText(copyLinkRef.current.value).then(() => {
      alert("링크를 복사했습니다.");
    });
  };

  return (
    <>
      <div className="ItemContainer">
        <div className="ItemWrapper">
          <div className="ItemImageDiv">
            <img className="ItemImage" src={props.data.image} />
          </div>
          <div className="ItemInfoContainer">
            <div className="SellInfo">
              <div className="HeartWrap">
                <img
                  className="Heart"
                  src={like ? hearton : heartoff}
                  onClick={handleLike}
                />
                <span className="HeartCount">
                  {likeCount == 1 ? likeCount : likeCount}
                </span>
              </div>
              <div className="SellItemNameWrapper">
                <span className="ItemDetailName">{props.data.name}</span>
              </div>
              <div className="SellCollectionInfo">
                <span className="SellCollectionSpan">Collection</span>
                <span className="ItemCollectionName">
                  {props.data.collection_name}
                </span>
              </div>
              <div className="SellCollectionInfo">
                <span className="SellCollectionSpan">owned by</span>
                <span className="ItemCollectionName">
                  {/* {props.data.owner} */}
                </span>
              </div>
            </div>
            <div className="ItemDescriptionTittle">
              <span className="SellDescriptionSpan">Description</span>
              <div className="AvatarWrapper">
                <Avatar
                  className="SellDescriptionAvatar"
                  alt="User Name"
                  src={props.data.profile_image}
                />
                <span className="SellUserName">by {props.data.user_name}</span>
              </div>
            </div>
            <div className="ItemDescriptionContent">
              <p>{props.data.description}</p>
            </div>
            <div className="ItemButtons">
              <div className="ShareButtonAndIcon">
                <button className="ShareButton" onClick={copyTextUrl}>
                  Share
                </button>
                <IosShareIcon className="ShareIcon" />
              </div>
              <input
                style={{ visibility: "hidden", width: "0", height: "0" }}
                type="text"
                ref={copyLinkRef}
                value={`${clientUrl}/detail/item/${token_id}`}
              ></input>
              {token === user ? (
                <>
                  <a href={`/edititem/${token_id}`}>
                    <div className="EditButtonAndIcon">
                      <button className="ItemEditButton">Item Edit</button>
                      <EditIcon className="EditIcon" />
                    </div>
                  </a>
                  <a href={`/account/sell/${token_id}`}>
                    <button className="AuctionRegistration">
                      경매 등록하기
                    </button>
                  </a>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// !유저 && 토큰 ? 안보임 : 옥션 프로그레스 ? 안보임: 보임
export default ItemDetail;

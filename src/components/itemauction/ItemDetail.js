import React, { useRef, useState, useEffect } from "react";
import { clientUrl } from "../../shared/api";

import { Link, useNavigate, useParams } from "react-router-dom";
import { Avatar } from "@mui/material";
import heartoff from "../../assets/icon/heartoff.png";
import hearton from "../../assets/icon/hearton.png";
import IosShareIcon from "@mui/icons-material/IosShare";
import EditIcon from "@mui/icons-material/Edit";
import { likeItem } from "../../redux/modules/itemSlice";
import { useDispatch } from "react-redux";

const ItemDetail = (props) => {
  const token = sessionStorage.getItem("auth_token");
  const params = useParams();
  const token_id = params.token_id;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [like, setLike] = useState(props.data.favorites);
  const [likeCount, setLikeCount] = useState(props.data.favorites_count);

  const handleLike = () => {
    if (token) {
      setLike((like) => !like);
      setLikeCount((likeCount) => (like ? likeCount - 1 : likeCount + 1));
      dispatch(likeItem({ token_id: token_id, like: like }));
    }
  };

  const handleSubmit = () => {
    const UTC_date = new Date();
    const now_date = new Date();
    now_date.setHours(UTC_date.getHours() + 9);
    if (props.data.transaction_at < now_date.toISOString()) {
      navigate(`/account/sell/${token_id}`);
    } else {
      alert("경매처리가 진행중입니다!");
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
                <Link to={`/detail/collection/${props.data.collection_name}`}>
                  <span className="ItemCollectionName HoverColor">
                    {props.data.collection_name}
                  </span>
                </Link>
              </div>
              <div className="SellCollectionInfo">
                <span className="SellCollectionSpan">owned by</span>
                <Link to={`/account/${props.data.owner}`}>
                  <span className="ItemCollectionName HoverColor">
                    {props.data.owner_name}
                  </span>
                </Link>
              </div>
            </div>
            <div className="ItemDescriptionTittle">
              <span className="SellDescriptionSpan">Description</span>
              <Link to={`/account/${props.data.address}`}>
                <div className="AvatarWrapper">
                  <Avatar
                    className="SellDescriptionAvatar"
                    alt="User Name"
                    src={props.data.profile_image}
                  />
                  <span className="SellUserName HoverColor">
                    by {props.data.user_name}
                  </span>
                </div>
              </Link>
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
              {token === props.data.owner ? (
                <>
                  <a href={`/edititem/${token_id}`}>
                    <div className="EditButtonAndIcon">
                      <button className="ItemEditButton">Item Edit</button>
                      <EditIcon className="EditIcon" />
                    </div>
                  </a>
                  <button
                    className="AuctionRegistration"
                    onClick={handleSubmit}
                  >
                    경매 등록하기
                  </button>
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

export default ItemDetail;

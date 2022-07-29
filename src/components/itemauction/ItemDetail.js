import React, { useRef } from "react";
import { clientUrl } from "../../shared/api";
import { useParams } from "react-router-dom";
import { Avatar } from "@mui/material";
import heart from "../../assets/icon/heart.png";
import IosShareIcon from "@mui/icons-material/IosShare";
import EditIcon from "@mui/icons-material/Edit";

const ItemDetail = (props) => {
  const token = sessionStorage.getItem("auth_token");
  const user = props.data.address;
  const params = useParams();
  const token_id = params.token_id;
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
                <img className="Heart" src={heart} />
                <span className="HeartCount">{props.data.favorites_count}</span>
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

export default ItemDetail;

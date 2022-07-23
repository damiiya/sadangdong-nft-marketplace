import React from "react";
import { useParams } from "react-router-dom";
import { Avatar } from "@mui/material";
import heart from "../assets/icon/heart.png";
import IosShareIcon from "@mui/icons-material/IosShare";
import EditIcon from "@mui/icons-material/Edit";

const ItemDetail = (props) => {
  const token = sessionStorage.getItem("auth_token");
  const user = props.data[0].address;
  const params = useParams();
  const token_id = params.token_id;

  return (
    <>
      <div className="ItemContainer">
        <div className="ItemWrapper">
          <div className="ItemImageDiv">
            <img className="ItemImage" src={props.data[0].image} />
          </div>
          <div className="ItemInfoContainer">
            <div className="SellInfo">
              <div className="HeartWrap">
                <img className="Heart" src={heart} />
                <span className="HeartCount">
                  {props.data[0].favorites_count}
                </span>
              </div>
              <div className="SellItemNameWrapper">
                <span className="ItemDetailName">{props.data[0].name}</span>
              </div>
              <div className="SellCollectionInfo">
                <span className="SellCollectionSpan">Collection</span>
                <span className="ItemCollectionName">
                  {props.data[0].collection_name}
                </span>
              </div>
            </div>
            <div className="ItemDescriptionTittle">
              <span className="SellDescriptionSpan">Description</span>
              <div className="AvatarWrapper">
                <Avatar
                  className="SellDescriptionAvatar"
                  alt="User Name"
                  src={props.data[0].profile_image}
                />
                <span className="SellUserName">
                  by {props.data[0].user_name}
                </span>
              </div>
            </div>
            <div className="ItemDescriptionContent">
              <p>{props.data[0].description}</p>
            </div>
            <div className="ItemButtons">
              <div className="ShareButtonAndIcon">
                <button className="ShareButton">Share</button>
                <IosShareIcon className="ShareIcon" />
              </div>
              {token === user ? (
                <>
                  <a href={`/edititem/${token_id}`}>
                    <div className="EditButtonAndIcon">
                      <button className="ItemEditButton">Items Edit</button>
                      <EditIcon className="EditIcon" />
                    </div>
                  </a>
                  <button className="AuctionRegistration">경매 등록하기</button>
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

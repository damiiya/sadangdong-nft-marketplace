import React, { useState } from "react";
import { Avatar } from "@mui/material";
import heart from "../assets/icon/heart.png";
import IosShareIcon from "@mui/icons-material/IosShare";
import EditIcon from "@mui/icons-material/Edit";

const ItemDetail = (props) => {
  const [checkUser, SetCheckUser] = useState(true);

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
                <span className="HeartCount">{props.data.favoritesCount}</span>
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
              <div className="SellOwnerInfo">
                <span className="SellOwnerSpan">Owner</span>
                <span className="SellOwnerName"> 10 Owner name</span>
              </div>
            </div>
            <div className="ItemDescriptionTittle">
              <span className="SellDescriptionSpan">Description</span>
              <div className="AvatarWrapper">
                <Avatar
                  className="SellDescriptionAvatar"
                  alt="User Name"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSHxLdpyffNGzkCT6HRbqlPMdjlT5PzWRqzw&usqp=CAU"
                />
                <span className="SellUserName">by {props.data.owner}</span>
              </div>
            </div>
            <div className="ItemDescriptionContent">
              <p>{props.data.description}</p>
            </div>
            <div className="ItemButtons">
              <div className="ShareButtonAndIcon">
                <button className="ShareButton">Share</button>
                <IosShareIcon className="ShareIcon" />
              </div>
              <div className="EditButtonAndIcon">
                <button className="ItemEditButton">Items Edit</button>
                <EditIcon className="EditIcon" />
              </div>
              {checkUser ? (
                <button className="AuctionRegistration">경매 등록하기</button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemDetail;

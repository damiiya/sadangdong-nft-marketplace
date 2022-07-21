import React, { useState } from "react";
import { Avatar } from "@mui/material";
import heart from "../assets/icon/heart.png";
import IosShareIcon from "@mui/icons-material/IosShare";
import EditIcon from "@mui/icons-material/Edit";

const ItemDetail = () => {
  const [checkUser, SetCheckUser] = useState(true);

  return (
    <>
      <div className="ItemContainer">
        <div className="ItemWrapper">
          <div className="ItemImageDiv">
            <img
              className="ItemImage"
              src="https://www.cosmorning.com/data/photos/20210153/art_16095743571912_f2a3fc.jpg"
            />
          </div>
          <div className="ItemInfoContainer">
            <div className="SellInfo">
              <div className="HeartWrap">
                <img className="Heart" src={heart} />
                <span className="HeartCount">9,999</span>
              </div>
              <div className="SellItemNameWrapper">
                <span className="ItemDetailName">Item Name</span>
              </div>
              <div className="SellCollectionInfo">
                <span className="SellCollectionSpan">Collection</span>
                <span className="ItemCollectionName"> Collection name</span>
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
                <span className="SellUserName">by username</span>
              </div>
            </div>
            <div className="ItemDescriptionContent">
              <p>Magnum 75 #11 by Bruno Barbey. Paris, France. 1966</p>
              <p>Danish actor Anna Karina</p>
              <p>
                The Magnum 75 collection is the inaugural NFT collection by
                Magnum
              </p>
              <p>
                Photos. Created in 2022, the collection brings together works
                by76
              </p>
              <p>photographers taken across seven decades.</p>
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

import React, { useState } from "react";
import { Avatar } from "@mui/material";
import share from "../assets/icon/share.png";
import pencil from "../assets/icon/pencil.png";
import CardAuction from "../components/CardAuction";
import CardItem from "../components/CardItem";

const CollectionPage = () => {
  const [category, setCategory] = useState(0);

  return (
    <div className="MainContainer">
      <div className="MainBanner">
        <div className="UserImageWrap">
          <Avatar
            alt="User Name"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSHxLdpyffNGzkCT6HRbqlPMdjlT5PzWRqzw&usqp=CAU"
            sx={{ width: 152, height: 152 }}
          />
        </div>
      </div>
      <div className="CollectionInfoContainer">
        <div className="CollectionInfoWrap">
          <div className="CollectionInfo">
            <span className="InfoTap">Items</span>
            <span className="InfoValue">15</span>
          </div>
          <div className="CollectionInfo">
            <span className="InfoTap">Owners</span>
            <span className="InfoValue">10</span>
          </div>
          <div className="CollectionInfo">
            <span className="InfoTap">Floor Price</span>
            <span className="InfoValue">999.99</span>
          </div>
        </div>
      </div>
      <div className="CollectionTitleWrapper">
        <div className="CollectionTitleWrap">
          <span className="CollectionTitleLetter">Collection name</span>
          <span className="CollectionUerLetter">by User name</span>
        </div>
        <div className="CollectionButtonBundle">
          <button className="CollectionTitleButton">
            <img className="ButtonIcon" src={share} />
            share
          </button>
          <button className="CollectionTitleButton">
            <img className="ButtonIcon" src={pencil} />
            Collection Edit
          </button>
        </div>
      </div>
      <div className="CollectionDescriptionWrapper">
        Magnum 75 #11 by Bruno Barbey. Paris, France. 1966 Danish actor Anna
        Karina The Magnum 75 collection ...
      </div>
      <div className="CategoryContainer">
        <div className="CategoryWrapper">
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
        </div>
        <div className="CardWrapper">
          {category === 0 && <CardAuction />}
          {category === 1 && <CardItem />}
        </div>
      </div>
    </div>
  );
};

export default CollectionPage;

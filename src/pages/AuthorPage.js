import React, { useState } from "react";
import { Avatar } from "@mui/material";
import share from "../assets/icon/share.png";
import CardAuction from "../components/CardAuction";
import CardCollection from "../components/CardCollection";
import CardItem from "../components/CardItem";

const AuthorPage = () => {
  const [category, setCategory] = useState(0);

  return (
    <div className="MainContainer">
      <div className="AuthorBanner">
        <div className="AuthorImageWrap">
          <div className="AuthorImage">
            <Avatar
              alt="User Name"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSHxLdpyffNGzkCT6HRbqlPMdjlT5PzWRqzw&usqp=CAU"
              sx={{ width: 152, height: 152 }}
            />
          </div>
          <span className="AuthorName">@username</span>
        </div>
      </div>
      <div className="CategoryContainer">
        <div className="SmallCategoryWrapper">
          <div className="CategoryWrap">
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
            <button
              className="UnSelectedSmallButton"
              onClick={() => {
                setCategory(2);
              }}
            >
              컬렉션
            </button>
          </div>
          <div className="ShareWrap">
            <button className="CollectionTitleButton">
              <img className="ButtonIcon" src={share} />
              share
            </button>
          </div>
        </div>
        <div className="CardWrapper">
          {category === 0 && <CardAuction />}
          {category === 1 && <CardItem />}
          {category === 2 && <CardCollection />}
        </div>
      </div>
    </div>
  );
};

export default AuthorPage;

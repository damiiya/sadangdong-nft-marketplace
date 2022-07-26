import React, { useState } from "react";
import { Avatar } from "@mui/material";
import share from "../assets/icon/share.png";
import pencil from "../assets/icon/pencil.png";
import CardAuction from "../components/card/CardAuction";
import CardCollection from "../components/card/CardCollection";
import CardItem from "../components/card/CardItem";

const AccountPage = () => {
  const [category, setCategory] = useState(0);
  const token = sessionStorage.getItem("auth_token");
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
          <div className="NameWrap">
            <span className="AuthorName">@username</span>
            <a href={`/account/edit/${token}`}>
              <img className="Icon" src={pencil} />
            </a>
          </div>
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

export default AccountPage;

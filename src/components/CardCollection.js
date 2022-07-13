import React from "react";
import { Avatar } from "@mui/material";

const CardCollection = () => {
  return (
    <div className="CardCollectionContainer">
      <div className="CardCollectionImageWrapper">
        <img
          className="CardCollectionImage"
          src="https://htmlcolorcodes.com/assets/images/colors/light-gray-color-solid-background-1920x1080.png"
        />
      </div>
      <div className="CardCollectionContentWrapper">
        <Avatar
          alt="username"
          src=""
          sx={{ width: 64, height: 64 }}
          style={{
            border: "solid 1px #e5e5e5",
          }}
        />
        <span className="CardName">Collection Name</span>
        <span className="CardUserName">by User name</span>
        <span className="CardCollectionDescription">
          컬렉션에 대한 설명을 적어주세요. 최대 2줄까지 작성이 가능합니다.
        </span>
      </div>
    </div>
  );
};

export default CardCollection;

import React from "react";
import heart from "../assets/icon/heart.png";

const CardItem = () => {
  return (
    <div className="CardItemContainer">
      <div className="CardImageWrapper">
        <img
          className="CardCollectionImage"
          src="https://htmlcolorcodes.com/assets/images/colors/light-gray-color-solid-background-1920x1080.png"
        />
      </div>
      <div className="CardItemWrapper">
        <span className="CardName">Item Name</span>
        <span className="CardUserName">by User name</span>
        <div className="HeartWrap">
          <img className="Heart" src={heart} />
          <span className="HeartCount">9,999</span>
        </div>
      </div>
    </div>
  );
};

export default CardItem;

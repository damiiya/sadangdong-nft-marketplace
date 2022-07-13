import React from "react";
import heart from "../assets/icon/heart.png";
import time from "../assets/icon/time.png";

const CardAuction = () => {
  return (
    <div className="CardAuctionContainer">
      <div className="CardImageWrapper">
        <img
          className="CardCollectionImage"
          src="https://htmlcolorcodes.com/assets/images/colors/light-gray-color-solid-background-1920x1080.png"
        />
      </div>
      <div className="CardItemWrapper">
        <div className="CardAuctionTime">
          <div className="TimeWrap">
            <img src={time} />
            <span className="TimeLimit">경매 남은 시간 22:59:59</span>
          </div>
        </div>
        <span className="CardName">Item Name</span>
        <span className="CardUserName">by User name</span>
        <div className="HeartWrap">
          <img className="Heart" src={heart} />
          <span className="HeartCount">9,999</span>
        </div>
        <div className="CurrentCardAuction">
          <div className="CurrentAuctionWrap">
            <span className="CurrentAuction">현재 입찰가</span>
            <span className="CurrentAuctionValue">99.99</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardAuction;

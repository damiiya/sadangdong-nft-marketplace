import React from "react";
import heartwhite from "../../assets/icon/heartwhite.png";
import timewhite from "../../assets/icon/timewhite.png";

const MainCard = () => {
  return (
    <div className="CardAuctionContainerMain">
      <div className="CardImageWrapper">
        <img
          className="CardCollectionImage"
          src="https://htmlcolorcodes.com/assets/images/colors/light-gray-color-solid-background-1920x1080.png"
        />
      </div>
      <div className="CardItemWrapper">
        <div className="CardAuctionTime">
          <div className="TimeWrap">
            <img src={timewhite} />
            <span className="TimeLimitMain">경매 남은 시간 22:59:59</span>
          </div>
        </div>
        <span className="CardNameMain">Item Name</span>
        <span className="CardUserNameMain">by User name</span>
        <div className="HeartWrap">
          <img className="Heart" src={heartwhite} />
          <span className="HeartCountMain">9,999</span>
        </div>
        <div className="CurrentCardAuction">
          <div className="CurrentAuctionWrap">
            <span className="CurrentAuctionMain">현재 입찰가</span>
            <span className="CurrentAuctionValueMain">99.99 ETH</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainCard;

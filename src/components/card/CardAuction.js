import React from "react";
import heart from "../../assets/icon/heart.png";
import time from "../../assets/icon/time.png";

const CardAuction = (props) => {
  return (
    <>
      {props.data.map((val, i) => (
        <div className="CardAuctionContainer" key={i}>
          <div className="CardImageWrapper">
            <img className="CardCollectionImage" src={val.image} />
          </div>
          <div className="CardItemWrapper">
            <div className="CardAuctionTime">
              <div className="TimeWrap">
                <img src={time} />
                <span className="TimeLimit">경매 종료 시간 {val.ended_at}</span>
              </div>
            </div>
            <span className="CardName">{val.name}</span>
            <span className="CardUserName">by {val.user_name}</span>
            <div className="HeartWrap">
              <img className="Heart" src={heart} />
              <span className="HeartCount">{val.count}</span>
            </div>
            <div className="CurrentCardAuction">
              <div className="CurrentAuctionWrap">
                <span className="CurrentAuction">현재 입찰가</span>
                <span className="CurrentAuctionValue">{val.price}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CardAuction;

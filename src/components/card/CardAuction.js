import React from "react";
import heart from "../../assets/icon/heart.png";
import time from "../../assets/icon/time.png";

const CardAuction = (props) => {
  return (
    <>
      {props.data.map((val, i) => (
        <div className="CardAuctionContainer" key={i}>
          <div className="CardImageWrapper">
            <a
              className="CardItemNameRouting"
              href={`/detail/item/${val.token_id}`}
            >
              <img className="CardCollectionImage" src={val.image} />
            </a>
          </div>
          <div className="CardItemWrapper">
            <div className="CardAuctionTime">
              <div className="TimeWrap">
                <img src={time} />
                <span className="TimeLimit">경매 종료 시간 {val.ended_at}</span>
              </div>
            </div>
            <a
              className="CardItemNameRouting"
              href={`/detail/item/${val.token_id}`}
            >
              <span className="CardName">{val.name}</span>
            </a>
            <a className="CardItemUserRouting" href={`/account/${val.address}`}>
              <span className="CardUserName">by {val.user_name}</span>
            </a>
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

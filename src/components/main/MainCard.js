import React from "react";
import { Link } from "react-router-dom";
import mainheart from "../../assets/icon/mainheart.png";
import maintime from "../../assets/icon/maintime.png";

const MainCard = (props) => {
  return (
    <div className="CardAuctionContainerMain">
      <div className="CardImageWrapper">
        <Link to={`/detail/item/${props.token_id}`}>
          <img className="CardCollectionImage" src={props.image} />
        </Link>
      </div>
      <div className="CardItemWrapper">
        <div className="CardAuctionTime">
          <div className="TimeWrap">
            <img src={maintime} />
            <span className="TimeLimitMain">
              경매 종료 시간 {props.ended_at}
            </span>
          </div>
        </div>
        <span className="CardNameMain">{props.name}</span>
        <span className="CardUserNameMain">by {props.user_name}</span>
        <div className="HeartWrap">
          <img className="Heart" src={mainheart} />
          <span className="HeartCountMain">{props.count}</span>
        </div>
        <div className="CurrentCardAuction">
          <div className="CurrentAuctionWrap">
            <span className="CurrentAuctionMain">현재 입찰가</span>
            <span className="CurrentAuctionValueMain">{props.price} ETH</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainCard;

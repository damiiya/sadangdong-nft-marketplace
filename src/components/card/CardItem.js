import React from "react";
import heart from "../../assets/icon/heart.png";
import { Link } from "react-router-dom";

const CardItem = (props) => {
  return (
    <>
      {props.data.map((val, i) => (
        <div key={val.token_id} className="CardItemContainer">
          <div className="CardImageWrapper">
            <Link to={`/detail/item/${val.token_id}`}>
              <img className="CardCollectionImage" src={val.image} />
            </Link>
          </div>
          <div className="CardItemWrapper">
            <span className="CardName">{val.name}</span>
            <Link to={`/account/${val.address}`}>
              <span className="CardUserName">by {val.user_name}</span>
            </Link>
            <div className="HeartWrap">
              <img className="Heart" src={heart} />
              <span className="HeartCount">{val.count}</span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CardItem;

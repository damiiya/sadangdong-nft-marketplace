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
            <Link
              className="CardName HoverColor"
              to={`/detail/item/${val.token_id}`}
            >
              <span>{val.name}</span>
            </Link>
            <Link
              className="CardUserName HoverColor"
              to={`/account/${val.address}`}
            >
              <span>by {val.user_name}</span>
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

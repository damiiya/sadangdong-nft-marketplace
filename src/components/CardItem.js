import React from "react";
import { Link } from "react-router-dom";
import heart from "../assets/icon/heart.png";

const CardItem = (props) => {
  return (
    <>
      {props.data.map((val, i) => (
        <Link to={`/item/${val.token_id}`}>
          <div key={val.id} className="CardItemContainer">
            <div className="CardImageWrapper">
              <img className="CardCollectionImage" src={val.image} />
            </div>
            <div className="CardItemWrapper">
              <span className="CardName">{val.name}</span>
              <span className="CardUserName">by {val.user_name}</span>
              <div className="HeartWrap">
                <img className="Heart" src={heart} />
                <span className="HeartCount">{val.likeCount}</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};

export default CardItem;

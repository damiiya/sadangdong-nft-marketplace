import React from "react";
import { Link } from "react-router-dom";
import heart from "../../assets/icon/heart.png";

const CardItem = (props) => {
  return (
    <>
      {props.data.map((val, i) => (
        <div key={val.token_id} className="CardItemContainer">
          <div className="CardImageWrapper">
            <a href={`/detail/item/${val.token_id}`}>
              <img className="CardCollectionImage" src={val.image} />
            </a>
          </div>
          <div className="CardItemWrapper">
            <a
              className="CardItemNameRouting"
              href={`/detail/item/${val.token_id}`}
            >
              <span className="CardName">{val.name}</span>
            </a>
            <a className="CardItemUserRouting" href={`/account/${val.address}`}>
              <span className="CardUserName">by {val.user_name}</span>
              <div className="HeartWrap">
                <img className="Heart" src={heart} />
                <span className="HeartCount">{val.count}</span>
              </div>

            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CardItem;

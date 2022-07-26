import React, { useState, useEffect } from "react";
import heart from "../../assets/icon/heart.png";
import time from "../../assets/icon/time.png";

const CardAuction = (props) => {
  const clock = props.data.ended_at.split(":");
  const hour = clock[0];
  const minute = clock[1];
  const second = clock[2];
  const [hours, setHours] = useState(hour);
  const [minutes, setMinutes] = useState(minute);
  const [seconds, setSeconds] = useState(second);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (parseInt(seconds) > 0) {
        setSeconds(parseInt(seconds) - 1);
      }
      if (parseInt(seconds) === 0) {
        setMinutes(parseInt(minutes) - 1);
        setSeconds(59);
      }
      if (parseInt(minutes) === 0) {
        if (parseInt(hours) === 0) {
          clearInterval(countdown);
        } else {
          setHours(parseInt(hours) - 1);
          setMinutes(59);
        }
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [hours, minutes, seconds]);

  return (
    <>
      {props.data.map((val, i) => (
        <div className="CardAuctionContainer">
          <div className="CardImageWrapper">
            <img className="CardCollectionImage" src={val.image} />
          </div>
          <div className="CardItemWrapper">
            <div className="CardAuctionTime">
              <div className="TimeWrap">
                <img src={time} />
                <span className="TimeLimit">
                  경매 남은 시간 {hours < 10 ? `${hours}` : hours}:
                  {minutes < 10 ? `0${minutes}` : minutes}:
                  {seconds < 10 ? `0${seconds}` : seconds}
                </span>
              </div>
            </div>
            <span className="CardName">{val.name}</span>
            <span className="CardUserName">by {val.user_name}</span>
            <div className="HeartWrap">
              <img className="Heart" src={heart} />
              <span className="HeartCount">{val.favorites_count}</span>
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

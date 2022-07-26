import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const JoinAuction = (props) => {
  const params = useParams();
  const token_id = params.token_id;

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
      <div className="ItemBottomLine"></div>
      <div className="ItemBottomContainer">
        <div className="ItemBottomWrapper">
          <div className="AuctionContent">
            <div className="AuctionWrapper">
              <div className="PriceContent">
                <div className="PriceTittle">Price</div>
                <div className="PriceNumber">
                  {props.data.auction_price} ETH
                </div>
              </div>
              <div className="AuctionLine"></div>
              <div className="AuctionTimeContent">
                <div className="AuctionTimeSpan">경매 남은 시간</div>
                <div className="AuctionTime">
                  {hours < 10 ? `${hours}` : hours}:
                  {minutes < 10 ? `0${minutes}` : minutes}:
                  {seconds < 10 ? `0${seconds}` : seconds}
                </div>
              </div>
            </div>
            <div className="AuctionJoinContent">
              <a href={`/detail/item/${token_id}`}>
                <button className="AuctionJoinButton">경매 참여하기</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JoinAuction;

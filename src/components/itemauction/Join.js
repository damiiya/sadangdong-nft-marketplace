// ** 처리한 사항은 [v]표시로 바꿔주세요!
// []시간이 가끔 0이 하나 더 붙는 오류 처리해주기
// []가능하면 전체 카드컴포에 실시간 남은 시간 표시해주기

import React, { useState, useEffect } from "react";

const Join = (props) => {
  const clock = props.data.remained_at.split(":");
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
              <div className="AuctionTimeContent">
                <p className="AuctionTimeSpan">경매 남은 시간</p>
                <div className="AuctionLine"></div>
                <p className="AuctionTime">
                  {hours < 10 ? `${hours}` : hours}:
                  {minutes < 10 ? `0${minutes}` : minutes}:
                  {seconds < 10 ? `0${seconds}` : seconds}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Join;

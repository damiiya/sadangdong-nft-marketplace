// ** 처리한 사항은 [v]표시로 바꿔주세요!
// []리스트 내 컨텐츠들의 길이에 따라 위치가 변하는 것 고정시켜야함

import React from "react";

const BidsList = (props) => {
  return (
    <div className="activity-container">
      <div className="activity-table1">
        <span className="table1-row">이미지</span>
        <span id="row-title1" className="table1-row">
          아이템명
        </span>
        <span id="row-title2" className="table1-row">
          경매 시작 시간
        </span>
        <span id="row-title2" className="table1-row">
          경매 종료 시간
        </span>
        <span id="row-title3" className="table1-row">
          현재 최고 입찰가
        </span>
        <span id="row-title4" className="table1-row">
          입찰가격
        </span>
      </div>
      {props.myBiddingItem.map((list, i) => (
        <div className="activity-table2" key={i}>
          <div className="table1-row">
            <img className="act-img" src={list.image} />
          </div>
          <span id="row-title1" className="table1-row">
            {list.name}
          </span>
          <span id="row-title2" className="table1-row">
            {list.started_at}
          </span>
          <span id="row-title2" className="table1-row">
            {list.ended_at}
          </span>
          <span id="row-title3" className="table1-row">
            {list.bidding_price}
          </span>
          <div id="row-title4" className="table1-row">
            <div id="btnA-2" className="activity-btn">
              {list.user_offer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BidsList;

// ** 처리한 사항은 [v]표시로 바꿔주세요!
// []리스트 내 컨텐츠들의 길이에 따라 위치가 변하는 것 고정시켜야함

import React from "react";
import BidResult from "./BidResult";

const MyBids = (props) => {
  console.log(props);
  return (
    <>
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
            최종 낙찰가
          </span>
          <span id="row-title3" className="table1-row">
            나의 입찰가
          </span>
          <span id="row-title4" className="table1-row">
            입찰결과
          </span>
        </div>
        {props.data.map((list, i) => (
          <div key={i}>
            <BidResult
              image={list.image}
              name={list.name}
              started_at={list.started_at}
              ended_at={list.ended_at}
              bidding_price={list.bidding_price}
              user_offer={list.user_offer}
              message={list.message}
              id={list.id}
              token_id={list.token_id}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default MyBids;

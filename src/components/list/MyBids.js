import React from "react";
import BidResult from "./BidResult";

const MyBids = (props) => {
  console.log(props);
  return (
    <>
      <div className="MyAuctionPageContentContainer">
        <div className="MyAuctionPageContentTitleWrapper">
          <span className="ContentTitleImage">이미지</span>
          <span className="ContentTitleItem">아이템명</span>
          <span className="ContentTitleAuctionStart">경매 시작 시간</span>
          <span className="ContentTitleAuctionEnd">경매 종료 시간</span>
          <span className="ContentTitleAuctionWinningBid">최종 낙찰가</span>
          <span className="ContentTitleAuctionMyFinalBid">입찰가</span>
          <span className="ContentTitleAuctionMyBidResult">입찰결과</span>
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

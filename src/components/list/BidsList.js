import React from "react";

const BidsList = (props) => {
  return (
    <div className="MyAuctionPageContentContainer">
      <div className="MyAuctionPageContentTitleWrapper">
        <span className="ContentTitleImage">이미지</span>
        <span className="ContentTitleItem">아이템명</span>
        <span className="ContentTitleAuctionStart">경매 시작 시간</span>
        <span className="ContentTitleAuctionEnd">경매 종료 시간</span>
        <span className="ContentTitleAuctionHighestBid">현재 최고 입찰가</span>
        <span className="ContentTitleAuctionMyBid">입찰가격</span>
      </div>
      {props.myBiddingItem.map((list, i) => (
        <div className="MyAuctionPageContentWrapper" key={i}>
          <div className="MyAuctionPageContentImageWrapper">
            <img className="MyBiddingImage" src={list.image} />
          </div>
          <span className="ContentItemName">{list.name}</span>
          <span className="ContentAuctionStart">{list.started_at}</span>
          <span className="ContentAuctionEnd">{list.ended_at}</span>
          <span className="ContentHighestBid">{list.bidding_price}</span>
          <div className="ContentMyBid">{list.user_offer}</div>
        </div>
      ))}
    </div>
  );
};

export default BidsList;

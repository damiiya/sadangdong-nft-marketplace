import React from "react";

const BiddingList = () => {
  return (
    <>
      <div className="MyAuctionPageContentWrapper">
        <div className="MyAuctionPageContentImageWrapper">
          <img />
        </div>
        <span className="ContentItemName">Item name#1</span>
        <span className="ContentAuctionStart">2022.06.30.23:59:59</span>
        <span className="ContentAuctionEnd">2022.06.30.23:59:59</span>
        <span className="ContentWinningBid">99.999</span>
        <span className="ContentMyBidding">99.999</span>
        <div className="ContentMyBidSuccessResult">경매에 성공하셨습니다!</div>
      </div>
      <div className="MyAuctionPageContentWrapper">
        <div className="MyAuctionPageContentImageWrapper">
          <img />
        </div>
        <span className="ContentItemName">Item name#1</span>
        <span className="ContentAuctionStart">2022.06.30.23:59:59</span>
        <span className="ContentAuctionEnd">2022.06.30.23:59:59</span>
        <span className="ContentWinningBid">99.999</span>
        <span className="ContentMyBidding">99.999</span>
        <div className="ContentMyBidFailureResult">
          아쉽지만 유찰되었습니다.
        </div>
      </div>
    </>
  );
};

export default BiddingList;

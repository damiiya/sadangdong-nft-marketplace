import React from "react";

export default function MyAuctionPage() {
  return (
    <>
      <div className="MyAuctionPageContainer">
        <div className="MyAuctionPageMenuWrapper">
          <div className="MyAuctionPageMenuTitle_1">경매 진행중</div>
          <div className="MyAuctionPageMenuTitle_2">경매완료</div>
        </div>
        <div className="MyAuctionPageContentWrapper">
          <div className="MyAuctionPageContentTitleWrapper">
            <span className="MyAuctionPageContentTitleImage">이미지</span>
            <span className="ContentTitleItem">아이템명</span>
            <span className="ContentTitleAuctionStart">경매 시작 시간</span>
            <span className="ContentTitleAuctionEnd">경매 종료 시간</span>
            <span className="ContentTitleAuctionHighestBid">
              현재 최고 입찰가
            </span>
            <span className="ContentTitleAuctionMyBid">입찰가격</span>
          </div>
        </div>
      </div>
    </>
  );
}

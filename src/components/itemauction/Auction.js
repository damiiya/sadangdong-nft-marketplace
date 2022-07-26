import React from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import Chat from "./Chat";
import ItemDetail from "./ItemDetail";

const Auction = (props) => {
  console.log(props.data.auction_id);
  return (
    <>
      <div className="AuctionBottomContainer">
        <div className="AuctionBottomAllContainer">
          <div className="AuctionBottomLeftWrapper" />
          <div className="AuctionBottomRightWrapper">
            <div className="AuctionBottomRightContent">
              <div className="AuctionPriceContent">
                <div className="AuctionHighestPriceWrapper">
                  <div className="AuctionHighestPriceSpanIcon">
                    <span className="AuctionHighestPriceSpan">현재 최고가</span>
                    <RefreshIcon className="AuctionHighestPriceRefreshIcon" />
                  </div>
                  <div className="AuctionHighestPrice">999.99 ETH</div>
                </div>
                <div className="AuctionStartingPriceWrapper">
                  <div className="AuctionStartingPriceSpan">시작가</div>
                  <div className="AuctionStartingPrice">999.99 ETH</div>
                </div>
              </div>
              <div className="AuctionOfferPrice">가격제시</div>
              <div className="AuctionBidWrapper">
                <input className="ItemAuctionPriceInput" placeholder="0.00" />
                <span className="AuctionBidInputEth">ETH</span>
                <button className="AuctionBidButton">입찰</button>
              </div>
              <section className="AuctionChattingPriceListTittle">
                <span className="AuctionChattingTittle">채팅창</span>
                <span className="AuctionPriceListTittle">
                  제시된 가격 리스트
                </span>
              </section>
              <div className="AuctionChattingPriceListContainer">
                <Chat data={props} />
                <div className="AuctionPriceListContainer">
                  <div className="AuctionPriceContainer">
                    <div>
                      <span className="AuctionOfferPrcieDateTime">
                        2022.06.30 11:30:33
                      </span>
                    </div>

                    <div className="AuctionOfferPriceUserNameBid">
                      <span className="AuctionOfferUserName">
                        by Username1줄까지..
                      </span>
                      <span className="AuctionOfferPriceHistory">
                        999.99 ETH
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auction;

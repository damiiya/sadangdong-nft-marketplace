import React from "react";
import ItemDetail from "../components/Item&Auction/ItemDetail";
import RefreshIcon from "@mui/icons-material/Refresh";
import uparrow from "../assets/icon/uparrow.png";

const AuctionPage = () => {
  return (
    <>
      <ItemDetail />
      <div className="AuctionBottomContainer">
        <div className="AuctionBottomAllContainer">
          <div className="AuctionBottomLeftWrapper"></div>
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
                <div className="AuctionChattingContainer">
                  <div className="AuctionChattingInputWrapper">
                    <div className="AuctionChattingInputBackGround">
                      <input
                        className="AuctionChattingInput"
                        placeholder="입력해주세요."
                      ></input>
                      <img className="UpArrowImg" src={uparrow} />
                    </div>
                  </div>
                </div>
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

export default AuctionPage;

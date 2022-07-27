import React from "react";

const Offer = (props) => {
  return (
    <div className="AuctionPriceListContainer">
      <div className="AuctionPriceContainer">
        <div>
          <span className="AuctionOfferPrcieDateTime">2022.06.30 11:30:33</span>
        </div>
        <div className="AuctionOfferPriceUserNameBid">
          <span className="AuctionOfferUserName">by Username1줄까지..</span>
          <span className="AuctionOfferPriceHistory">999.99 ETH</span>
        </div>
      </div>
    </div>
  );
};

export default Offer;

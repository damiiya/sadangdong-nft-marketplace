import React from "react";

const Offer = (props) => {
  return (
    <div className="AuctionPriceListContainer">
      <div className="AuctionPriceContainer">
        <div>
          <span className="AuctionOfferPrcieDateTime">{props.date}</span>
        </div>
        <div className="AuctionOfferPriceUserNameBid">
          <span className="AuctionOfferUserName">by {props.name}</span>
          <span className="AuctionOfferPriceHistory">{props.price} ETH</span>
        </div>
      </div>
    </div>
  );
};

export default Offer;

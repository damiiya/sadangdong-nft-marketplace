import React from "react";

export const Offer = (props) => {
  return (
    <div className="AuctionPriceListContainer">
      <div className="AuctionPriceContainer">
        <div>
          <span className="AuctionOfferPrcieDateTime">{props.created_at}</span>
        </div>
        <div className="AuctionOfferPriceUserNameBid">
          <span className="AuctionOfferUserName">by {props.name}</span>
          <span className="AuctionOfferPriceHistory">{props.price} ETH</span>
        </div>
      </div>
    </div>
  );
};

export const PreOffer = (props) => {
  return (
    <div className="AuctionPriceListContainer">
      <div className="AuctionPriceContainer">
        <div>
          <span className="AuctionOfferPrcieDateTime">{props.created_at}</span>
        </div>
        <div className="AuctionOfferPriceUserNameBid">
          <span className="AuctionOfferUserName">by {props.name}</span>
          <span className="AuctionOfferPriceHistory">{props.price} ETH</span>
        </div>
      </div>
    </div>
  );
};

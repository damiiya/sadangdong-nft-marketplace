import React from "react";
import CardAuction from "../components/card/CardAuction";

const AuctionListPage = () => {
  return (
    <div className="Container">
      <div className="AuctionListText">경매 진행중인 아이템</div>
      <div className="CardWrapper">
        <CardAuction />
        <CardAuction />
        <CardAuction />
        <CardAuction />
        <CardAuction />
        <CardAuction />
        <CardAuction />
        <CardAuction />
      </div>
    </div>
  );
};

export default AuctionListPage;

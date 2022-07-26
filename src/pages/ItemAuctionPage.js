import React from "react";
import ItemDetail from "../components/Item&Auction/ItemDetail";

const ItemAuctionPage = () => {
  const [checkUser, SetCheckUser] = React.useState(false);
  return (
    <>
      <ItemDetail />
      <div className="ItemBottomLine"></div>
      <div className="ItemBottomContainer">
        <div className="ItemBottomWrapper">
          <div className="AuctionContent">
            <div className="AuctionWrapper">
              <div className="PriceContent">
                <div className="PriceTittle">Price</div>
                <div className="PriceNumber">999.99 ETH</div>
              </div>
              <div className="AuctionLine"></div>
              <div className="AuctionTimeContent">
                <div className="AuctionTimeSpan">경매 남은 시간</div>
                <div className="AuctionTime">22:59:59</div>
              </div>
            </div>
            <div className="AuctionJoinContent">
              {!checkUser ? (
                <button className="AuctionJoinButton">경매 참여하기</button>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className="ActivityContent">
            <div className="ActivityTittle">Activity</div>
            <div className="ActivityInfoContainer">
              <div className="ActivityDateUserName">
                <span className="ActivityDateTime">2022.06.30 11:30:33</span>
                <span className="ActivityUserName">by Username</span>
              </div>
              <span className="ActivityPrice">999.999 ETH</span>
            </div>
            <div className="ActivityInfoContainer">
              <div className="ActivityDateUserName">
                <span className="ActivityDateTime">2022.06.30 11:30:33</span>
                <span className="ActivityUserName">by Username</span>
              </div>
              <span className="ActivityPrice">999.999 ETH</span>
            </div>
            <div className="ActivityInfoContainer">
              <div className="ActivityDateUserName">
                <span className="ActivityDateTime">2022.06.30 11:30:33</span>
                <span className="ActivityUserName">by Username</span>
              </div>
              <span className="ActivityPrice">999.999 ETH</span>
            </div>
            <div className="ActivityInfoContainer">
              <div className="ActivityDateUserName">
                <span className="ActivityDateTime">2022.06.30 11:30:33</span>
                <span className="ActivityUserName">by Username</span>
              </div>
              <span className="ActivityPrice">999.999 ETH</span>
            </div>
            <div className="ActivityInfoContainer">
              <div className="ActivityDateUserName">
                <span className="ActivityDateTime">2022.06.30 11:30:33</span>
                <span className="ActivityUserName">by Username</span>
              </div>
              <span className="ActivityPrice">999.999 ETH</span>
            </div>
            <div className="ActivityInfoContainer">
              <div className="ActivityDateUserName">
                <span className="ActivityDateTime">2022.06.30 11:30:33</span>
                <span className="ActivityUserName">by Username</span>
              </div>
              <span className="ActivityPrice">999.999 ETH</span>
            </div>
            <div className="ActivityInfoContainer">
              <div className="ActivityDateUserName">
                <span className="ActivityDateTime">2022.06.30 11:30:33</span>
                <span className="ActivityUserName">by Username</span>
              </div>
              <span className="ActivityPrice">999.999 ETH</span>
            </div>
            <div className="ActivityInfoContainer">
              <div className="ActivityDateUserName">
                <span className="ActivityDateTime">2022.06.30 11:30:33</span>
                <span className="ActivityUserName">by Username</span>
              </div>
              <span className="ActivityPrice">999.999 ETH</span>
            </div>
            <div className="ActivityInfoContainer">
              <div className="ActivityDateUserName">
                <span className="ActivityDateTime">2022.06.30 11:30:33</span>
                <span className="ActivityUserName">by Username</span>
              </div>
              <span className="ActivityPrice">999.999 ETH</span>
            </div>
            <div className="ActivityInfoContainer">
              <div className="ActivityDateUserName">
                <span className="ActivityDateTime">2022.06.30 11:30:33</span>
                <span className="ActivityUserName">by Username</span>
              </div>
              <span className="ActivityPrice">999.999 ETH</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemAuctionPage;

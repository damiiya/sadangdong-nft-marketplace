import React from "react";
import { useNavigate } from "react-router-dom";
import MainCard from "../components/MainCard";
import TeamInfo from "../components/TeamInfo";
import { Avatar } from "@mui/material";
import s1 from "../assets/seller/s1.png";
import s2 from "../assets/seller/s2.png";
import s3 from "../assets/seller/s3.png";
import s4 from "../assets/seller/s4.png";
import s5 from "../assets/seller/s5.png";
import i1 from "../assets/itemsample/i1.png";
import i2 from "../assets/itemsample/i2.png";
import i3 from "../assets/itemsample/i3.png";
import i4 from "../assets/itemsample/i4.png";
import i5 from "../assets/itemsample/i5.png";
import i6 from "../assets/itemsample/i6.png";
import viewarrow from "../assets/icon/viewarrow.png";

import Marquee from "react-fast-marquee";
import { useSelector } from "react-redux";

const MainPage = () => {
  const navigate = useNavigate();
  const toAuction = () => {
    navigate("/auctionlist");
  };
  const accountId = useSelector((state) => state.user.account);
  console.log(accountId);
  console.log(useSelector((state) => state.user));
  return (
    <div className="MainContainer">
      <div className="MainBanner1">
        <Marquee gradient={false}>
          <img className="MainItemSample" src={i1} />
          <img className="MainItemSample" src={i2} />
          <img className="MainItemSample" src={i3} />
          <img className="MainItemSample" src={i4} />
          <img className="MainItemSample" src={i5} />
          <img className="MainItemSample" src={i6} />
        </Marquee>
      </div>
      <div className="MainBanner2">
        <Marquee gradient={false} direction="right">
          <img className="MainItemSample" src={i1} />
          <img className="MainItemSample" src={i2} />
          <img className="MainItemSample" src={i3} />
          <img className="MainItemSample" src={i4} />
          <img className="MainItemSample" src={i5} />
          <img className="MainItemSample" src={i6} />
        </Marquee>
      </div>
      <div className="MainLetterWrap">
        <Marquee speed="150" gradient={false}>
          <span className="MainLetter">
            사실은 오래전부터 당신만을 위한 동물을 준비해왔다우
          </span>
          <span className="MainLetter">
            사실은 오래전부터 당신만을 위한 동물을 준비해왔다우
          </span>
        </Marquee>
      </div>
      <Marquee speed="400" gradient={false}>
        <span className="MainLetterDescription">
          예쁘고 귀엽고 사랑스러운 동물들을 찾아 여기까지 왔다는걸 알고 있어.
          언젠가 당신이 동물들을 찾지 않을까하고 오래전부터 우리는 생각했었어.
          그래서 말이야.. 사실은 오래전부터 당신만을 위한 동물을 준비했다우!
        </span>
        <span className="MainLetterDescription">
          예쁘고 귀엽고 사랑스러운 동물들을 찾아 여기까지 왔다는걸 알고 있어.
          언젠가 당신이 동물들을 찾지 않을까하고 오래전부터 우리는 생각했었어.
          그래서 말이야.. 사실은 오래전부터 당신만을 위한 동물을 준비했다우!
        </span>
      </Marquee>

      <div className="TitleWrapper">
        <span className="TitleLetter">경매 진행중 아이템</span>
        <div className="ButtonWrap" onClick={toAuction}>
          <span className="View">View All</span>
          <img className="Arrow" src={viewarrow}></img>
        </div>
      </div>
      <div className="MainCardWrapper">
        <MainCard />
        <MainCard />
        <MainCard />
        <MainCard />
      </div>
      <div className="MainContainer" style={{ backgroundColor: "#60D329" }}>
        <div className="TitleWrapper" style={{ justifyContent: "center" }}>
          <span className="TitleLetter" style={{ marginTop: "120px" }}>
            Weekly Top seller
          </span>
        </div>
        <div className="MainWrapper">
          <div className="UserWrapper">
            <Avatar
              alt="User Name"
              src={s1}
              sx={{ width: 200, height: 200 }}
              style={{ border: "2px solid #111111" }}
            />
            <div className="Ranking">1</div>
            <span className="UserName">Seller Name</span>
          </div>
          <div className="UserWrapper">
            <Avatar
              alt="User Name"
              src={s2}
              sx={{ width: 200, height: 200 }}
              style={{ border: "2px solid #111111" }}
            />
            <div className="Ranking">2</div>
            <span className="UserName">Seller Name</span>
          </div>
          <div className="UserWrapper">
            <Avatar
              alt="User Name"
              src={s3}
              sx={{ width: 200, height: 200 }}
              style={{ border: "2px solid #111111" }}
            />
            <div className="Ranking">3</div>
            <span className="UserName">Seller Name</span>
          </div>
          <div className="UserWrapper">
            <Avatar
              alt="User Name"
              src={s4}
              sx={{ width: 200, height: 200 }}
              style={{ border: "2px solid #111111" }}
            />
            <div className="Ranking">4</div>
            <span className="UserName">Seller Name</span>
          </div>
          <div className="UserWrapper">
            <Avatar
              alt="User Name"
              src={s5}
              sx={{ width: 200, height: 200 }}
              style={{ border: "2px solid #111111" }}
            />
            <div className="Ranking">5</div>
            <span className="UserName">Seller Name</span>
          </div>
        </div>
      </div>
      <TeamInfo />
    </div>
  );
};

export default MainPage;

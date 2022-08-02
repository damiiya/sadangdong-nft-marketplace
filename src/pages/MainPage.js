import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MainCard from "../components/main/MainCard";
import TeamInfo from "../components/main/TeamInfo";
import { Avatar } from "@mui/material";
import i1 from "../assets/itemsample/i1.png";
import i2 from "../assets/itemsample/i2.png";
import i3 from "../assets/itemsample/i3.png";
import i4 from "../assets/itemsample/i4.png";
import i5 from "../assets/itemsample/i5.png";
import i6 from "../assets/itemsample/i6.png";
import viewarrow from "../assets/icon/viewarrow.png";
import { loadMain } from "../redux/modules/itemSlice";

import Marquee from "react-fast-marquee";

const MainPage = () => {
  const dispatch = useDispatch();
  const [isLoad, setIsLoad] = useState(false);
  const mainAuction = useSelector((state) => state.item.mainAuction);
  const mainSeller = useSelector((state) => state.item.mainSeller);

  useEffect(() => {
    dispatch(loadMain());
  }, []);

  useEffect(() => {
    if (mainAuction && mainSeller) {
      setIsLoad(true);
    }
  }, [mainAuction, mainSeller]);

  if (!isLoad) {
    return null;
  }

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
        <Marquee speed="100" gradient={false}>
          <span className="MainLetter">
            사실은 오래전부터 당신만을 위한 동물을 준비해왔다우
          </span>
          <span className="MainLetter">
            사실은 오래전부터 당신만을 위한 동물을 준비해왔다우
          </span>
        </Marquee>
      </div>
      <Marquee speed="300" gradient={false}>
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
        <Link to={"/list/auctionlist"}>
          <div className="ButtonWrap">
            <span className="View">View All</span>
            <img className="Arrow" src={viewarrow}></img>
          </div>
        </Link>
      </div>
      <div className="MainCardWrapper">
        {mainAuction.map((list, i) => (
          <div key={i}>
            <MainCard
              image={list.image}
              ended_at={list.ended_at}
              name={list.name}
              user_name={list.user_name}
              count={list.count}
              price={list.price}
              token_id={list.token_id}
            />
          </div>
        ))}
      </div>
      <div className="MainContainer2">
        <div className="TitleWrapper" style={{ justifyContent: "center" }}>
          <span className="TitleLetter" style={{ marginTop: "120px" }}>
            Weekly Top seller🏆
          </span>
        </div>

        <div className="MainWrapper">
          {mainSeller.map((list, i) => (
            <Link to={`/account/${list.address}`}>
              <div className="UserWrapper">
                <Avatar
                  alt="User Name"
                  src={list.profile_image}
                  sx={{ width: 200, height: 200 }}
                  style={{ border: "2px solid #111111" }}
                />
                <div className="Ranking">{i + 1}</div>
                <span className="UserName">{list.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <TeamInfo />
    </div>
  );
};

export default MainPage;

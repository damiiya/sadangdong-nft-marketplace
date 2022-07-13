import React from "react";
import t1 from "../assets/team/t1.png";
import t2 from "../assets/team/t2.png";
import t3 from "../assets/team/t3.png";
import t4 from "../assets/team/t4.png";
import t5 from "../assets/team/t5.png";
import t6 from "../assets/team/t6.png";

const TeamInfo = () => {
  return (
    <div className="MainContainer">
      <div className="TeamBackground">
        <div className="TitleWrapper" style={{ justifyContent: "center" }}>
          <span className="TitleLetter">Team</span>
        </div>
        <div className="MainWrapper">
          <div className="UserWrapper">
            <div className="TeamImageWrap">
              <img src={t1} />
              <div className="TeamImageBack" />
            </div>
            <span className="UserName">임형섭</span>
            <span className="TeamPosition">Frontend</span>
          </div>
          <div className="UserWrapper">
            <div className="TeamImageWrap">
              <img src={t2} />
              <div
                className="TeamImageBack"
                style={{ backgroundColor: "#ecd5af" }}
              />
            </div>
            <span className="UserName">이담</span>
            <span className="TeamPosition">Frontend</span>
          </div>
          <div className="UserWrapper">
            <div className="TeamImageWrap">
              <img src={t3} />
              <div
                className="TeamImageBack"
                style={{ backgroundColor: "#dbccdb" }}
              />
            </div>
            <span className="UserName">이은총</span>
            <span className="TeamPosition">Backend</span>
          </div>
          <div className="UserWrapper">
            <div className="TeamImageWrap">
              <img src={t4} />
              <div
                className="TeamImageBack"
                style={{ backgroundColor: "#d1d1d1" }}
              />
            </div>
            <span className="UserName">임정현</span>
            <span className="TeamPosition">Backend</span>
          </div>
          <div className="UserWrapper">
            <div className="TeamImageWrap">
              <img src={t5} />
              <div
                className="TeamImageBack"
                style={{ backgroundColor: "#efcfdb" }}
              />
            </div>
            <span className="UserName">이재석</span>
            <span className="TeamPosition">Backend</span>
          </div>
          <div className="UserWrapper">
            <div className="TeamImageWrap">
              <img src={t6} />
              <div
                className="TeamImageBack"
                style={{ backgroundColor: "#f7e3d6" }}
              />
            </div>
            <span className="UserName">배재은</span>
            <span className="TeamPosition">Designer</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamInfo;

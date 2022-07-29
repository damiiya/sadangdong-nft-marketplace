import React from "react";
import team from "../../assets/team/team.svg";

const TeamInfo = () => {
  return (
    <div className="MainContainer">
      <div className="TeamBackground">
        <div className="TitleWrapperTeam">
          <span className="TitleLetterTeam">Team</span>
        </div>
        <img className="TeamWrap" src={team} />
      </div>
    </div>
  );
};

export default TeamInfo;

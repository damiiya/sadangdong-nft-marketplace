import React from "react";
import { useNavigate } from "react-router-dom";
import { RejectedItem } from "../components/AdminListItem";

const RejectedAdminPage = () => {
  const navigate = useNavigate();

  const toAdmin = () => {
    navigate("/admin");
  };

  const toApproved = () => {
    navigate("/approved");
  };

  const toRejected = () => {
    navigate("/rejected");
  };

  return (
    <div className="AdminContainer">
      <div className="AdminSidebar">
        <div className="AdminList">
          <span className="UnSelectedList" onClick={toAdmin}>
            승인대기중 아이템
          </span>
          <span className="UnSelectedList" onClick={toApproved}>
            승인된 아이템
          </span>
          <span className="SelectedList" onClick={toRejected}>
            거절된 아이템
          </span>
        </div>
      </div>
      <div className="AdminContentWrap">
        <div className="AdminContentTable">
          <span className="TableList" style={{ margin: "0 85px 0 45px" }}>
            Image
          </span>
          <span className="TableList" style={{ margin: "0 220px 0 0" }}>
            Date
          </span>
          <span className="TableList" style={{ margin: "0 90px 0 0" }}>
            User name
          </span>
          <span className="TableList" style={{ margin: "0 520px 0 0" }}>
            Item name
          </span>
          <span className="TableList">Approve</span>
        </div>
        <div className="AdminContent">
          <RejectedItem />
          <RejectedItem />
          <RejectedItem />
          <RejectedItem />
          <RejectedItem />
          <RejectedItem />
        </div>
      </div>
    </div>
  );
};

export default RejectedAdminPage;

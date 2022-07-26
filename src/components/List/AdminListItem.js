import React from "react";
import admin from "../../assets/admin.jpeg";

const AdminListItem = () => {
  return (
    <div className="AdminListWrap">
      <div className="AdminImageWrap" style={{ flexGrow: "1" }}>
        <div className="AdminImage">
          <img className="AdminImg" src={admin} />
        </div>
      </div>
      <span className="AdminListItem" style={{ flexGrow: "1" }}>
        2022.06.30 23:59:59
      </span>
      <span className="AdminListItem" style={{ flexGrow: "1" }}>
        User name
      </span>
      <span className="AdminListItem" style={{ flexGrow: "6" }}>
        Item name #1
      </span>
      <div className="AdminButtonWrap" style={{ flexGrow: "1" }}>
        <button className="AdminButton">승인</button>
        <button className="AdminButton">거절</button>
      </div>
    </div>
  );
};

const ApprovedItem = () => {
  return (
    <div className="AdminListWrap">
      <div className="AdminImageWrap" style={{ flexGrow: "1" }}>
        <div className="AdminImage">
          <img className="AdminImg" src={admin} />
        </div>
      </div>
      <span className="AdminListItem" style={{ flexGrow: "1" }}>
        2022.06.30 23:59:59
      </span>
      <span className="AdminListItem" style={{ flexGrow: "1" }}>
        User name
      </span>
      <span className="AdminListItem" style={{ flexGrow: "6" }}>
        Item name #1
      </span>
      <div className="AdminButtonWrap" style={{ flexGrow: "1" }}>
        <button className="AdminButtonLong">거절</button>
      </div>
    </div>
  );
};

const RejectedItem = () => {
  return (
    <div className="AdminListWrap">
      <div className="AdminImageWrap" style={{ flexGrow: "1" }}>
        <div className="AdminImage">
          <img className="AdminImg" src={admin} />
        </div>
      </div>
      <span className="AdminListItem" style={{ flexGrow: "1" }}>
        2022.06.30 23:59:59
      </span>
      <span className="AdminListItem" style={{ flexGrow: "1" }}>
        User name
      </span>
      <span className="AdminListItem" style={{ flexGrow: "6" }}>
        Item name #1
      </span>
      <div className="AdminButtonWrap" style={{ flexGrow: "1" }}>
        <button className="AdminButtonLong">승인</button>
      </div>
    </div>
  );
};

export { AdminListItem, ApprovedItem, RejectedItem };

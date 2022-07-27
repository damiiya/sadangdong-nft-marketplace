import React from "react";
import { AdminListItem } from "../components/list/AdminListItem";

const AdminPage = () => {
  return (
    <div className="AdminContainer">
      <div className="AdminSidebar">
        <div className="AdminList">
          <a href="/admin">
            <span className="SelectedList">승인대기중 아이템</span>
          </a>
          <a href="/approved">
            <span className="UnSelectedList">승인된 아이템</span>
          </a>
          <a href="/rejected">
            <span className="UnSelectedList">거절된 아이템</span>
          </a>
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
          <AdminListItem />
          <AdminListItem />
          <AdminListItem />
          <AdminListItem />
          <AdminListItem />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;

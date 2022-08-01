import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { testUser } from "../redux/modules/userSlice";

const UserTest = () => {
  const dispatch = useDispatch();
  const [account, setAccount] = useState("");

  const handleSubmit = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        console.log(accounts);
        dispatch(testUser(account));
      } else {
        alert("메타마스크를 먼저 설치해주세요!");
        window.open("https://metamask.io/download.html");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <a
        href="https://concrete-bulb-957.notion.site/ca96412ca0ed4325a912ae395af9e5c5"
        target="_blank"
      >
        <button className="UserInfo" />
      </a>
      <button className="UserTest" onClick={handleSubmit} />
    </>
  );
};

export default UserTest;

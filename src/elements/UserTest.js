import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { testUser } from "../redux/modules/userSlice";
import { serverUrl_sol } from "../shared/api";

const UserTest = () => {
  const dispatch = useDispatch();
  const [account, setAccount] = useState("");

  const handleSubmit = async () => {
    try {
      if (window.ethereum) {
        console.log(1);
        const chainId = await window.ethereum.request({
          method: "eth_chainId",
        });

        const SDDchainId = 1387;
        const SDD = `0x${SDDchainId.toString(16)}`;
        console.log(chainId);
        console.log(SDD);

        if (chainId === SDD) {
          console.log("네트워크 연결이 가능합니다!");
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          setAccount(accounts[0]);
          console.log(accounts);
          console.log(account);
          dispatch(testUser(accounts[0]));
        } else {
          try {
            await window.ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: SDD }],
            });
            const accounts = await window.ethereum.request({
              method: "eth_requestAccounts",
            });
            setAccount(accounts[0]);
            console.log(accounts);
            dispatch(testUser(accounts[0]));
          } catch (switchError) {
            try {
              await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: SDD,
                    chainName: "Sadangdong",
                    rpcUrls: [`${serverUrl_sol}`],
                  },
                ],
              });
              await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: SDD }],
              });
              const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
              });
              setAccount(accounts[0]);
              console.log(accounts);
              dispatch(testUser(accounts[0]));
            } catch (addError) {
              console.log("연결이 실패했습니다.");
            }
          }
          console.log("연결이 실패했습니다.");
        }
      } else {
        alert("메타마스크를 먼저 설치해주세요!");
        window.open("https://metamask.io/download.html");
      }
    } catch (error) {
      console.error(error);
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

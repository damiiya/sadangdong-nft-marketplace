import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createAccount } from "../redux/modules/userSlice";
import metamaskfox from "../assets/icon/metamaskfox.png";
import Modal from "react-modal";
import { serverUrl_sol } from "../shared/api";

const LoginModal = (props) => {
  const dispatch = useDispatch();
  const { openLoginModal, setOpenLoginModal } = props;
  const [account, setAccount] = useState("");

  const handleConnect = async () => {
    try {
      if (window.ethereum) {
        const chainId = await window.ethereum.request({
          method: "eth_chainId",
        });

        const SDDchainId = 1387;
        const SDD = `0x${SDDchainId.toString(16)}`;

        if (chainId === SDD) {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          setAccount(accounts[0]);
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
            } catch (addError) {}
          }
        }
      } else {
        alert("메타마스크를 먼저 설치해주세요!");
        window.open("https://metamask.io/download.html");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loadHome = () => {
    dispatch(createAccount(account));
  };

  return (
    <>
      {!account ? (
        <Modal
          className="LoginModal"
          overlayClassName="LoginOverLay"
          isOpen={openLoginModal}
          onRequestClose={() => setOpenLoginModal(false)}
        >
          <div className="LoginModalQuestionContainer">
            <span className="LoginModalQuestion">
              메타마스크 지갑을 연결하시겠습니까?
            </span>
          </div>
          <div className="LoginModalButtonContainer">
            <button className="LoginModalButton" onClick={handleConnect}>
              <div className="LoginModalButtonWrapper">
                <img className="LoginMetaMaskImg" src={metamaskfox} />
                <span className="ConnetWalletSpan">
                  메타마스크 지갑 연결하기
                </span>
              </div>
            </button>
          </div>
        </Modal>
      ) : (
        <Modal
          className="LoginModal"
          overlayClassName="LoginOverLay"
          isOpen={openLoginModal}
        >
          <div className="LoginModalQuestionContainer">
            <span className="LoginModalQuestion">지갑이 연결되었습니다!</span>
          </div>

          <div className="LoginModalButtonContainer">
            <button className="LoginModalButton" onClick={loadHome}>
              <div className="LoginModalButtonWrapper">
                <img className="LoginMetaMaskImg" src={metamaskfox} />
                <span className="ConnetWalletSpan">동물들을 보러갈까요?</span>
              </div>
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};
export default LoginModal;

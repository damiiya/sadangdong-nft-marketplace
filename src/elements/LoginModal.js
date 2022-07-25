import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createAccount } from "../redux/modules/userSlice";
import metamaskfox from "../assets/icon/metamaskfox.png";
import Modal from "react-modal";

const LoginModal = (props) => {
  const dispatch = useDispatch();
  const { openLoginModal, setOpenLoginModal } = props;
  const [account, setAccount] = useState("");

  const handleConnect = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        console.log(accounts);
      } else {
        alert("Install Metamask!");
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
      <Modal
        className="LoginModal"
        overlayClassName="LoginOverLay"
        isOpen={openLoginModal}
      >
        {account ? (
          <>
            <div className="LoginModalQuestionContainer">
              <span className="LoginModalQuestion">지갑이 연결되었습니다!</span>
            </div>
            <>
              <div className="LoginModalButtonContainer">
                <button className="LoginModalButton" onClick={loadHome}>
                  <div className="LoginModalButtonWrapper">
                    <img className="LoginMetaMaskImg" src={metamaskfox} />
                    <span className="ConnetWalletSpan">
                      동물들을 보러갈까요?
                    </span>
                  </div>
                </button>
              </div>
            </>
          </>
        ) : (
          <>
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
          </>
        )}
      </Modal>
    </>
  );
};
export default LoginModal;

import React from "react";
import Modal from "react-modal";
import metamaskfox from "../assets/icon/metamaskfox.png";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../lib/connectors";

const LoginModal = (props) => {
  const { chainId, account, active, activate, deactivate } = useWeb3React();
  const { openLoginModal, setOpenLoginModal } = props;
  const handleConnect = () => {
    if (active) {
      deactivate();
      return;
    }

    activate(injected, (error) => {
      if ("/No Ethereum provider was found on window.ethereum/".test(error)) {
        window.open("https://metamask.io/download.html");
      }
    });
    console.log("chainId : ", chainId);
    console.log("account : ", account);
  };

  return (
    <>
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
              <span className="ConnetWalletSpan">메타마스크 지갑 연결하기</span>
            </div>
          </button>
        </div>
      </Modal>
    </>
  );
};

export default LoginModal;

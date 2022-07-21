import React from "react";
import Modal from "react-modal";
import metamaskfox from "../assets/icon/metamaskfox.png";

const LogoutModal = (props) => {
  const { openLogoutModal, setOpenLogoutModal } = props;
  return (
    <>
      <Modal
        className="LoginModal"
        overlayClassName="LoginOverLay"
        isOpen={openLogoutModal}
        onRequestClose={() => setOpenLogoutModal(false)}
      >
        <div className="LoginModalQuestionContainer">
          <span className="LoginModalQuestion">
            메타마스크 지갑 연결을 해제하시겠습니까?
          </span>
        </div>
        <div className="LoginModalButtonContainer">
          <button
            className="LoginModalButton"
            onClick={() => {
              localStorage.removeItem("auth_token");
              setOpenLogoutModal(false);
            }}
          >
            <div className="LoginModalButtonWrapper">
              <img className="LoginMetaMaskImg" src={metamaskfox} />
              <span className="ConnetWalletSpan">메타마스크 지갑 해제하기</span>
            </div>
          </button>
        </div>
      </Modal>
    </>
  );
};

export default LogoutModal;

import React from "react";
import Modal from "react-modal";

function DescriptionModal(props) {
  const { openDescModal, setOpenDescModal } = props;
  return (
    <>
      <Modal
        isOpen={openDescModal}
        onRequestClose={() => setOpenDescModal(false)}
      ></Modal>
    </>
  );
}

export default DescriptionModal;

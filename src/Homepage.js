import React from "react";
import logo from "../src/assets/icon/logo.png";
import banner from "../src/assets/banner.png";
const MobilePage = () => {
  const handleLinkCopy = () => {
    navigator.clipboard.writeText(document.location.href);
    alert("링크가 복사되었습니다!");
  };
  return (
    <div className="mobile-page">
      <img className="mobile-logo" src={banner} />
      <p className="mobile-text">아쉽게도 모바일은 지원하지 않습니다😥</p>
      <p className="mobile-text">PC환경에서 사당동을 이용해주세요!</p>
      <button className="link-copy-button" onClick={handleLinkCopy}>
        링크 복사하기
      </button>
    </div>
  );
};
export default MobilePage;

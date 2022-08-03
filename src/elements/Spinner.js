import React from "react";
import { HashLoader } from "react-spinners";

export const Spinner = () => {
  return (
    <div className="Spinner1">
      <HashLoader />
    </div>
  );
};

export const MintingSpinner = () => {
  return (
    <div className="Spinner2">
      <div className="HashLoader">
        <HashLoader />
      </div>

      <p className="SpinnerText">아이템이 생성되는 중입니다.</p>
      <p className="SpinnerText">잠시만 기다려주세요!!</p>
      <br />
      <p className="SpinnerText SpinnerDesc">
        10초동안 메타마스크 팝업창이 나오지 않을 경우,
      </p>
      <p className="SpinnerText SpinnerDesc">
        🦊메타마스크 APP을 확인해주세요.
      </p>
    </div>
  );
};

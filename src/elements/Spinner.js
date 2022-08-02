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
      <HashLoader />
      <h1>아이템이 생성되는 중입니다.</h1>
      <h1>잠시만 기다려주세요!!</h1>
    </div>
  );
};

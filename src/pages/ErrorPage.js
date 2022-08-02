import React from "react";
import errorimage from "../assets/icon/errorimage.png";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <>
      <div className="ErrorContainer">
        <img className="ErrorImage" src={errorimage} />

        <span className="ErrorSpan">
          죄송합니다. 우리는 이 페이지를 찾을 수 없습니다.
        </span>
        <Link to={"/"}>
          <button className="ErrorPageButton">홈으로 돌아가기</button>
        </Link>
      </div>
    </>
  );
}

export default ErrorPage;

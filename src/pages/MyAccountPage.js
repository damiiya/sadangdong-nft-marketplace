import React, { useState, useRef } from "react";
import uploadimage from "../assets/uploadimage.png";

function MyAccountPage() {
  const [imageSrc, setImageSrc] = useState(null);
  const fileInput = useRef();

  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  return (
    <>
      <div className="MyAccountPageContainer">
        <div className="MyAccountPageWrapper">
          <span className="ProfileEditSpan">프로필수정</span>
          <div className="MyAccountPageImageIdWrapper">
            <div className="ProfileImageTitleWrapper">
              <span className="ProfileImageTitle">프로필 이미지</span>
              <div className="EditProfileImageWrapper">
                {imageSrc && (
                  <img
                    className="ImagePreivew"
                    src={imageSrc}
                    alt="preview-img"
                  />
                )}
              </div>
              <label htmlFor="CreateItemFile">
                <div className="EditProfileImageCircle">
                  <img src={uploadimage} />
                </div>
              </label>
              <input
                type="file"
                id="CreateItemFile"
                ref={fileInput}
                style={{ display: "none" }}
                onChange={(e) => {
                  encodeFileToBase64(e.target.files[0]);
                }}
              />
            </div>
            <div className="UserIdwrapper">
              <span className="UserIdTitle">사용자 아이디</span>

              <input
                className="UserIdInput"
                placeholder="사용자 아이디를 입력해 주세요."
              />
            </div>
          </div>
          <div className="MyAccountPageButtonBundles">
            <button className="MyAccountPageCacelButton">취소</button>
            <button className="MyAccountPageEditButton">프로필 수정하기</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyAccountPage;

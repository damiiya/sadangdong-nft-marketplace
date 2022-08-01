import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editAccount, loadAccountCollection } from "../redux/modules/userSlice";
import uploadimage from "../assets/uploadimage.png";
import Spinner from "../elements/Spinner";

function MyAccountPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imageSrc, setImageSrc] = useState(null);
  const fileInput = useRef();
  const name = useRef();
  const token = sessionStorage.getItem("auth_token");
  const params = useParams();
  const token_id = params.token_id;
  const userInfo = useSelector((state) => state.user.collection);

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

  const handleSubmit = () => {
    let file = fileInput.current.files[0];

    const fileInfo = {
      name: name.current.value,
    };

    const formData = new FormData();
    formData.append("fileInfo", JSON.stringify(fileInfo));
    formData.append("files", file, "profile_Img");

    console.log(formData);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    dispatch(
      editAccount({
        formData: formData,
        navigate: navigate,
      })
    );
  };

  useEffect(() => {
    dispatch(loadAccountCollection(token_id));
  }, []);

  if (!userInfo) {
    return <Spinner />;
  }

  return (
    <>
      <div className="MyAccountPageContainer">
        <div className="MyAccountPageWrapper">
          <span className="ProfileEditSpan">프로필수정</span>
          <div className="MyAccountPageImageIdWrapper">
            <div className="ProfileImageTitleWrapper">
              <span className="ProfileImageTitle">프로필 이미지</span>
              <div className="EditProfileImageWrapper">
                {!imageSrc ? (
                  <img
                    className="ProfieImagePreivew"
                    src={userInfo[0] && userInfo[0].profile_image}
                    alt="preview-img"
                  />
                ) : (
                  <img
                    className="ProfieImagePreivew"
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
                ref={name}
                defaultValue={userInfo[0] && userInfo[0].user_name}
              />
            </div>
          </div>
          <div className="MyAccountPageButtonBundles">
            <a href={`/account/${token}`}>
              <button className="MyAccountPageCacelButton">취소</button>
            </a>

            <button className="MyAccountPageEditButton" onClick={handleSubmit}>
              프로필 수정하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyAccountPage;

// ** 처리한 사항은 [v]표시로 바꿔주세요!
// []모든 인풋값이 입력되지 않았을 때 오류메세지를 alert로 띄워줘야함!
// []전역메세지로 처리가능한지 확인해야함!

import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { createCollection } from "../redux/modules/collectionSlice";
import uploadimage from "../assets/uploadimage.png";
import { useNavigate, useParams } from "react-router-dom";

const CreateCollectionPage = () => {
  const dispatch = useDispatch();
  const fileInputA = useRef();
  const fileInputB = useRef();
  const name = useRef();
  const desc = useRef();
  const commission = useRef();
  const params = useParams();
  const navigate = useNavigate();
  const collectionId = params.collectionId;

  const token = sessionStorage.getItem("auth_token");

  const [imageSrc, setImageSrc] = useState("");

  const encodeBannerImage = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  const [featuredImageSrc, setFeaturedImageSrc] = useState("");
  const encodeFeaturedImage = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setFeaturedImageSrc(reader.result);
        resolve();
      };
    });
  };

  const handleSubmit = () => {
    let file1 = fileInputA.current.files[0];
    let file2 = fileInputB.current.files[0];

    let nameValue = name.current.value;
    let descValue = desc.current.value;
    let commissionValue = commission.current.value;

    const fileInfo = {
      name: name.current.value,
      desc: desc.current.value,
      commission: commission.current.value,
    };

    // 데이터가 모두 입력되었다면 컬렉션 생성가능
    // 데이터가 모두 입력되지 않은 상태에서 Create버튼 클릭시 alert창 호출
    if (file1 && file2 && nameValue && descValue && commissionValue) {
      const formData = new FormData();
      formData.append("fileInfo", JSON.stringify(fileInfo));
      formData.append("files", file1, "bannerImg");
      formData.append("files", file2, "featuredImg");

      dispatch(
        createCollection({
          formData: formData,
          collectionId: collectionId,
          fileInfo: fileInfo,
          navigate: navigate,
        })
      );
    } else {
      alert("모든 정보를 입력해주세요!");
    }
  };
  // 컬렉션 이름 유효성 검사
  // 특수문자 제외 띄어쓰기 포함 8글자 이하
  const checkName = (e) => {
    const regExp = /[^\w\sㄱ-힣]|[\_]/g;
    if (regExp.test(e.currentTarget.value)) {
      alert("특수문자는 입력하실 수 없습니다.");

      e.currentTarget.value = e.currentTarget.value.substring(
        0,
        e.currentTarget.value.length - 1
      );
    }

    if (e.currentTarget.value.length > 8) {
      alert("이름은 8자 이하만 가능합니다!");
      e.currentTarget.value = e.currentTarget.value.substring(
        0,
        e.currentTarget.value.length - 1
      );
    }
  };
  // 컬렉션 설명 유효성 검사
  // 띄어쓰기 포함 200글자 이하
  const checkDesc = (e) => {
    if (e.currentTarget.value.length > 200) {
      alert("설명은 200자 이하만 가능합니다!");
      e.currentTarget.value = e.currentTarget.value.substring(
        0,
        e.currentTarget.value.length - 1
      );
    }
  };

  // Creator Earnings 유효성 검사
  // 숫자만 가능
  const checkNumber = (e) => {
    const regExpNum = /^[0-9]*(\.?\d*)$/;
    if (!regExpNum.test(e.currentTarget.value)) {
      alert("숫자만 입력해주세요");
      e.currentTarget.value = e.currentTarget.value.substring(
        0,
        e.currentTarget.value.length - 1
      );
    }
  };

  if (!token) {
    alert("로그인이 필요합니다!!");
    window.location.href = "/";
  }

  return (
    <>
      <div className="CreateCollectionContainer">
        <div className="CreateCollectionWrapper">
          <span className="CreateCollectionTittle">컬렉션 생성</span>
          <div className="CreateCollectionContent">
            <div className="CreateCollectionBannerImageContainer">
              <span className="CreateCollectionBannerImageTittle">
                Banner Image
              </span>
              <div className="CreateCollectionBannerImageWrapper">
                {imageSrc && (
                  <img
                    className="CollectionImagePreview"
                    src={imageSrc}
                    alt="preview-img"
                  />
                )}
              </div>
              <label htmlFor="CreateItemFile">
                <div className="CreateInputFileCircle">
                  <img src={uploadimage} />
                </div>
              </label>
              <input
                type="file"
                id="CreateItemFile"
                ref={fileInputA}
                style={{ display: "none" }}
                onChange={(e) => {
                  encodeBannerImage(e.target.files[0]);
                }}
              />
            </div>
            <div className="CreateCollectionFeaturedImageContainer">
              <span className="CreateCollectionFeaturedImageTittle">
                Featured Image
              </span>
              <div className="CreateCollectionFeaturedImageWrapper">
                {featuredImageSrc && (
                  <img
                    className="CollectionFeaturedImagePreview"
                    src={featuredImageSrc}
                    alt="preview-img"
                  />
                )}
              </div>
              <label htmlFor="CreateFeaturedImageFile">
                <div className="CreateInputFileCircle">
                  <img src={uploadimage} />
                </div>
              </label>
              <input
                type="file"
                id="CreateFeaturedImageFile"
                ref={fileInputB}
                style={{ display: "none" }}
                onChange={(e) => {
                  encodeFeaturedImage(e.target.files[0]);
                }}
              />
            </div>
            <div className="CreateCollectionTittleInputContainer">
              <span className="CreateCollectionNameTittle">Collection</span>
              <div>
                <input
                  ref={name}
                  type="text"
                  maxLength={9}
                  onChange={(e) => {
                    checkName(e);
                  }}
                  className="CreateCollectionTittleInput"
                  placeholder="컬렉션 이름을 입력해 주세요."
                />
              </div>
            </div>
            <div className="CreateCollectionDescriptionContainer">
              <span className="CreateCollectionDescriptionTittle">
                Description
              </span>
              <div>
                <textarea
                  ref={desc}
                  maxLength={201}
                  onChange={(e) => {
                    checkDesc(e);
                  }}
                  className="CreateCollectionDescriptionTextArea"
                  placeholder="컬렉션 설명글을 작성해 주세요."
                />
              </div>
            </div>
            <div className="CreateCollectionCreatorEarningsContainer">
              <span className="CreateCollectionCreatorEarningsTittle">
                Creator Earnings
              </span>
              <div>
                <input
                  type="text"
                  ref={commission}
                  onChange={(e) => {
                    checkNumber(e);
                  }}
                  className="CreateCollectionCreatorEarningsInput"
                  placeholder="9.99 ETH"
                />
              </div>
            </div>
          </div>
          <div className="CreateItemButtonContainer">
            <button className="CreateItemButton" onClick={handleSubmit}>
              Create
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCollectionPage;

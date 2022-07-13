import React, { useState } from "react";
import uploadimage from "../assets/uploadimage.png";

const EditCollectionPage = () => {
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

  return (
    <>
      <div className="CreateCollectionContainer">
        <div className="CreateCollectionWrapper">
          <span className="CreateCollectionTittle">컬렉션 수정</span>
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
                  className="CreateCollectionCreatorEarningsInput"
                  placeholder="9.99 ETH"
                />
              </div>
            </div>
          </div>
          <div className="CreateItemButtonContainer">
            <button className="EditItemButton">Edit</button>
            <button className="DeleteBuutton">Delete</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCollectionPage;

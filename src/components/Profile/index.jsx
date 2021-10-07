import React, { useState, useEffect } from "react";
import "./index.css";
import {
  pictureUrl,
  setProfilePicture,
  userNameSet,
  userStatusSet,
} from "../../config/firebase";
import avatar from "../../assets/images/avatar.png";

const Profile = ({
  profileSlideAnimation,
  setProfileSlideAnimation,
  currentUserData,
}) => {
  const { userName, profileImage, status } = currentUserData;
  const [inputNameType, setInputNameType] = useState(false);
  const [inputNameValue, setInputNameValue] = useState(userName || "");
  const [inputStatusType, setInputStatusType] = useState(false);
  const [inputStatusValue, setInputStatusValue] = useState(status || "");

  useEffect(() => {
    setInputNameValue(userName || "");
    setInputStatusValue(status || "");
  }, [currentUserData]);

  const pictureUpload = async (e) => {
    try {
      const url = await pictureUrl(e.target.files[0]);
      await setProfilePicture(url);
    } catch (e) {
      console.error(e.message);
    }
  };

  const handleNameInput = async () => {
    try {
      await userNameSet(inputNameValue);
      setInputNameType(false);
    } catch (e) {
      console.error(e.message);
    }
  };

  const handleStatusInput = async () => {
    try {
      await userStatusSet(inputStatusValue);
      setInputStatusType(false);
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <div className={profileSlideAnimation}>
      <div className="profile_header">
        <div className="profile_header_inner">
          <i
            onClick={() =>
              setProfileSlideAnimation("profile_container slide_in")
            }
            className="fas fa-arrow-left"
          ></i>
          <p>Profile</p>
        </div>
      </div>
      <div className="profile_container_body">
        <div className="profile__picture">
          <div
            className="profile__picture_inner"
            style={{ background: `url(${profileImage || avatar})` }}
          >
            <input
              id="file"
              type="file"
              accept="image/*"
              name="image"
              title=" "
              onChange={pictureUpload}
            />
          </div>
        </div>
        <div className="profile_name">
          <p>Your Name</p>
          <div
            className="profile_name_input_btn"
            id={!inputNameType ? "none" : "border_bottom"}
          >
            <input
              type="text"
              name="name"
              value={inputNameValue}
              readOnly={!inputNameType}
              maxLength="25"
              spellCheck="false"
              onChange={(e) => setInputNameValue(e.target.value)}
            />
            {!inputNameType ? (
              <i
                onClick={() => setInputNameType(true)}
                className="fas fa-pen"
              ></i>
            ) : (
              <i
                onClick={() => {
                  handleNameInput();
                }}
                className="fas fa-check"
              ></i>
            )}
          </div>
        </div>
        <div className="profile_about_name">
          <p>
            This is your username. This name will be visible to all Text Now App
            contacts.
          </p>
        </div>
        <div className="profile_status">
          <p>About</p>
          <div
            className="profile_status_input_btn"
            id={!inputStatusType ? "none" : "border_bottom"}
          >
            <input
              type="text"
              name="status"
              value={inputStatusValue}
              readOnly={!inputStatusType}
              maxLength="25"
              spellCheck="false"
              onChange={(e) => setInputStatusValue(e.target.value)}
            />
            {!inputStatusType ? (
              <i
                onClick={() => setInputStatusType(true)}
                className="fas fa-pen"
              ></i>
            ) : (
              <i
                onClick={() => handleStatusInput()}
                className="fas fa-check"
              ></i>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

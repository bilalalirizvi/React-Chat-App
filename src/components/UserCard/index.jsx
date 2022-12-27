import React from "react";
import "./index.css";
import avatar from "../../assets/images/avatar.png";
const UserCard = ({ item, chatOpenStatus, mobileView }) => {
  const {
    userName,
    profileImage = avatar,
    lastMessage = null,
    status = "I'm new here!",
  } = item;
  return (
    <div
      className="single_user_card"
      onClick={() => {
        chatOpenStatus(item);
        mobileView(1);
      }}
    >
      <div className="user_profile_picture">
        <div className="user_profile_picture_wrap">
          <img src={profileImage} alt="Profile" />
        </div>
      </div>
      <div className="user_name_and_last_message">
        <p className="user_name">{userName && userName?.toUpperCase()}</p>
        <p className="user_about">{status}</p>
      </div>
      <div className="user_last_message_time">
        <p>{lastMessage}</p>
      </div>
    </div>
  );
};

export default UserCard;

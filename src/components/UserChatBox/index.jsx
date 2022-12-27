import React, { useState, useEffect, useRef } from "react";
import "./index.css";
import searchIcon from "../../assets/images/searchicon.png";
import dots from "../../assets/images/dots.jpg";
import smilyEmoji from "../../assets/images/smilyemoji.png";
import attachFile from "../../assets/images/attachfile.png";
import mic from "../../assets/images/mic.png";
import send from "../../assets/images/send.png";
import avatar from "../../assets/images/avatar.png";

import {
  sendMessage,
  getMessages,
  getCurrentUserData,
} from "../../config/firebase";

const UserChatBox = ({ userData, currentUserData, mobileView }) => {
  const { userName, profileImage = avatar, userId, online } = userData;
  const [chatroomId, setChatroomId] = useState(""); // Generate Chat Room Id
  const [message, setMessage] = useState(""); // Input Value
  const [chat, setChat] = useState([]); // Get Chat From Database
  const [onlineStatus, setOnlineStatus] = useState({});
  const messagesEndRef = useRef(null);

  // useEffect(() => {
  //   getCurrentUserData(userId).on("value", (snapshot) => {
  //     setOnlineStatus(snapshot.val());
  //   });
  // }, [userId]);

  // 1st Step Create Chat Room With Id
  const getChatroomId = () => {
    const [user1, user2] = [userData?.userId, currentUserData?.userId];
    return user1 < user2 ? user1.concat(user2) : user2.concat(user1);
  };

  // And Save In State
  useEffect(() => {
    setChatroomId(getChatroomId());
  }, [userData, currentUserData]);

  // Message Time
  const time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Send Message detail in database
  const sendMessageInternal = () => {
    sendMessage(
      message,
      chatroomId,
      currentUserData.userId,
      userData.userId,
      time
    );
    setMessage("");
  };

  // Get chat room with both user chat
  useEffect(() => {
    const list = getMessages(chatroomId);
    list.on("child_added", (snapshot) => {
      setChat((_val) => [..._val, snapshot.val()]);
    });
    return () => {
      list.off("child_added");
      setChat([]);
    };
  }, [chatroomId]);

  // scroll caht in bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  return (
    <div className="user_chat_box_container">
      {/* ---------------------------------------------------------------- */}
      <div className="chat_box_header">
        <div className="chat_box_header_wrap">
          <div id="back_arrow">
            {/* this arrow allow to mobile screen will disply block  */}
            <i onClick={() => mobileView(-1)} className="fas fa-arrow-left"></i>
          </div>
          <div className="chat_box_header_boxes">
            <img
              className="chat_box_profile_picture"
              src={profileImage}
              alt="User"
            />
          </div>
          <div className="chat_box_user_name">
            <p>{userName.toUpperCase()}</p>
            <span>{onlineStatus.online ? "online" : ""}</span>
          </div>
          <div className="chat_box_header_boxes icon_circle_focus">
            <img
              className="chat_box_search_icon"
              src={searchIcon}
              alt="Search Icon"
            />
          </div>
          <div className="chat_box_header_boxes icon_circle_focus">
            <img className="dots" src={dots} alt="Menu" />
          </div>
        </div>
      </div>
      {/* ---------------------------------------------------------------- */}
      <div className="chat_box_body">
        {chat.map(({ message, sender, createdAt }, index) => {
          return sender !== currentUserData.userId ? (
            <div className="sender_user_chat" key={index}>
              <div className="chatting_box">
                <p className="chatting_box_text">{message}</p>
                <p className="chatting_box_time">{createdAt}</p>
              </div>
              <div ref={messagesEndRef} />
            </div>
          ) : (
            <div className="current_user_right_chat" key={index}>
              <div className="current_user_right_chatting_box">
                <p className="current_user_right_chatting_box_text">
                  {message}
                </p>
                <p className="current_user_right_chatting_box_time">
                  {createdAt}
                </p>
              </div>
              <div ref={messagesEndRef} />
            </div>
          );
        })}
      </div>
      {/* ---------------------------------------------------------------- */}
      <div className="chat_box_footer">
        <div className="chat_box_footer_wrap">
          <div className="chat_box_footer_boxes">
            <img
              className="chat_box_footer_emoji"
              src={smilyEmoji}
              alt="Emoji"
              title="Emoji"
            />
          </div>
          <div className="chat_box_footer_boxes">
            <img
              className="chat_box_footer_file"
              src={attachFile}
              alt="Emoji"
              title="Attach"
            />
          </div>
          <div className="chat_box_footer_boxes send_text_input">
            <input
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              name="message"
              placeholder="Type a message"
              value={message}
              autoComplete="off"
            />
          </div>
          <div className="chat_box_footer_boxes">
            {!message.length > 0 ? (
              <img
                className="chat_box_footer_mic"
                src={mic}
                alt="Emoji"
                title="Audio Message"
              />
            ) : (
              <img
                onClick={sendMessageInternal}
                className="chat_box_footer_send"
                src={send}
                alt="Send"
                title="Send"
              />
            )}
          </div>
        </div>
      </div>
      {/* ---------------------------------------------------------------- */}
    </div>
  );
};

export default UserChatBox;

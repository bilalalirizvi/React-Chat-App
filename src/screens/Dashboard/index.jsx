import React, { useState, useEffect } from "react";
import "./index.css";
import status from "../../assets/images/status2.png";
import chat from "../../assets/images/chat.png";
import dots from "../../assets/images/dots.jpg";
import searchIcon from "../../assets/images/searchicon.png";
import UserCard from "../../components/UserCard";
import GetStart from "../../components/GetStart";
import UserChatBox from "../../components/UserChatBox";
import {
  authStateChange,
  signOut,
  getUsers,
  getCurrentUserData,
  // currentUser,
  userOnline,
} from "../../config/firebase";
import { useDispatch } from "react-redux";
import { storeUser, removeUser } from "../../store/actions";
import swal from "sweetalert";
import { useHistory } from "react-router";
import Profile from "../../components/Profile";
import avatar from "../../assets/images/avatar.png";

// const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

const Dashboard = () => {
  const [profileSlideAnimation, setProfileSlideAnimation] =
    useState("profile_container");
  const [dotsDropDown, setDotsDropDown] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [userData, setUserData] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [crrUserId, setCrrUserId] = useState("");
  const [currentUserData, setCurrentUserData] = useState({});
  const [zIndex, setZIndex] = useState(-1);
  const [search, setSearch] = useState("");
  const mobileView = (val) => {
    setZIndex(val);
  };
  const chatOpenStatus = (userData) => {
    setChatOpen(true);
    setUserData(userData);
  };
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    authStateChange().onAuthStateChanged((user) => {
      if (user) {
        history.push("/dashboard");
        dispatch(storeUser(user));
        setCrrUserId(user.uid);
        (async function () {
          const get = await getCurrentUserData(user.uid);
          get.on("value", (snapshot) => {
            const user = snapshot.val();
            setCurrentUserData(user);
          });
        })();
      } else {
        signOut();
        userOnline(false, user.uid);
        dispatch(removeUser());
        history.push("/");
      }
    });
  }, [authStateChange]);

  useEffect(() => {
    const users = [];
    const userList = getUsers();
    userList.on("child_added", (snapshot) => {
      users.push(snapshot.val());
    });
    const filtered = users.filter((users) => {
      return users.userId !== crrUserId;
    });
    setAllUsers(filtered);
  }, [currentUserData]);

  const userSignOut = async () => {
    try {
      console.log({ crrUserId });
      await userOnline(false, crrUserId);
      await signOut();
      console.log("Sign-out");
      dispatch(removeUser());
      swal("", "Sign-out successful", "success");
      history.push("/");
    } catch (error) {
      swal("Error!", `${error.message}`, "error");
    }
  };
  return (
    <div className="dashboard_container">
      <Profile
        profileSlideAnimation={profileSlideAnimation}
        setProfileSlideAnimation={setProfileSlideAnimation}
        currentUserData={currentUserData}
      />
      <div className="left_side_section">
        <div className="header">
          <div className="header_wrap">
            <div className="profile_box">
              <div className="header_boxes">
                <img
                  className="profile_picture"
                  src={currentUserData.profileImage || avatar}
                  alt="Profile Pic"
                />
              </div>
            </div>
            <div className="header_boxes circle_focus">
              <img className="status" src={status} alt="chat" title="Status" />
            </div>
            <div className="header_boxes circle_focus">
              <img className="chat" src={chat} alt="chat" title="New Chat" />
            </div>
            <div
              className="header_boxes circle_focus"
              onClick={() => setDotsDropDown(!dotsDropDown)}
            >
              <img className="dots" src={dots} alt="chat" title="Menu" />
              <div
                className="dots_drop_down"
                style={{ display: dotsDropDown ? "block" : "none" }}
              >
                <div className="dots_drop_down_content">New group</div>
                <div className="dots_drop_down_content">Create a room</div>
                <div
                  className="dots_drop_down_content"
                  onClick={() =>
                    setProfileSlideAnimation("profile_container slide_out")
                  }
                >
                  Profile
                </div>
                <div className="dots_drop_down_content">Archived</div>
                <div className="dots_drop_down_content">Starred</div>
                <div className="dots_drop_down_content">Settings</div>
                <div
                  className="dots_drop_down_content"
                  onClick={() => userSignOut()}
                >
                  Log out
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="search_input">
          <input
            type="search"
            placeholder="search or start new chat"
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <img
            className="search_user_input_icon"
            src={searchIcon}
            alt="Search Icon"
          />
        </div>
        <div className="users">
          {/* {allUsers.length > 0 &&
            allUsers.map((item, index) => {
              return (
                <UserCard
                  item={item}
                  key={index}
                  chatOpenStatus={chatOpenStatus}
                  mobileView={mobileView}
                />
              );
            })} */}
          {allUsers.length > 0 &&
            allUsers
              .filter((val) => {
                if (search === "") {
                  return val;
                } else if (
                  val.userName.toLowerCase().includes(search.toLowerCase())
                ) {
                  return val;
                }
              })
              .map((item, index) => {
                return (
                  <UserCard
                    item={item}
                    key={index}
                    chatOpenStatus={chatOpenStatus}
                    mobileView={mobileView}
                  />
                );
              })}
        </div>
      </div>
      <div className="right_side_section" style={{ zIndex: zIndex }}>
        {chatOpen ? (
          <UserChatBox
            userData={userData}
            currentUserData={currentUserData}
            mobileView={mobileView}
          />
        ) : (
          <GetStart />
        )}
      </div>
    </div>
  );
};

export default Dashboard;

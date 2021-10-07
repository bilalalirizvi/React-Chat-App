import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyDejzeUfjpplddIFo0y5NVZkGCl4i_9xJc",
  authDomain: "chatapp1211.firebaseapp.com",
  projectId: "chatapp1211",
  storageBucket: "chatapp1211.appspot.com",
  messagingSenderId: "837168326943",
  appId: "1:837168326943:web:7e6d4ca5283265db1d282a",
};
firebase.initializeApp(firebaseConfig);

// const db = firebase.firestore();
const auth = firebase.auth();
const database = firebase.database();
const storage = firebase.storage();

// USER REGISTER
const userRegister = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password);
};

// USER REGISTER WITH ADDITIONAL DETAIL
const userInfo = (detail) => {
  return database.ref("allUsers/" + detail.userId).set(detail);
};

// USER LOGIN
const userLogin = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};

// GET ALL USERS DATA FOR SHOWING IN CHAT BOX
const getUsers = () => {
  return database.ref("allUsers");
};

// GET CURRENT USER DATA
const getCurrentUserData = (uid) => {
  return database.ref("allUsers/" + uid);
};

// USER IMAGE URL
const pictureUrl = async (file) => {
  const storageRef = storage.ref(`images/${file.name}`);
  await storageRef.put(file);
  const url = await storageRef.getDownloadURL();
  return url;
};

// PROFILE PICTURE
const setProfilePicture = (url) => {
  const userId = auth.currentUser?.uid;
  if (userId && url) {
    const updates = {};
    updates[`allUsers/${userId}/profileImage`] = url;
    return database.ref().update(updates);
  }
};

// USER NAME
const userNameSet = (name) => {
  const userId = auth.currentUser?.uid;
  if (userId && name) {
    const updates = {};
    updates[`allUsers/${userId}/userName`] = name;
    return database.ref().update(updates);
  }
};

// Update user Online
const userOnline = (val, crrUserId) => {
  console.log({ val, crrUserId });
  if (crrUserId && val) {
    console.log("Inner");
    const updates = {};
    updates[`allUsers/${crrUserId}/online`] = val;
    return database.ref().update(updates);
  }
  if (crrUserId && val === false) {
    console.log("Second Inner");
    const updates = {};
    updates[`allUsers/${crrUserId}/online`] = val;
    return database.ref().update(updates);
  }
};

// USER STATUS
const userStatusSet = (status) => {
  const userId = auth.currentUser?.uid;
  if (userId && status) {
    const updates = {};
    updates[`allUsers/${userId}/status`] = status;
    return database.ref().update(updates);
  }
};

// USER SIGNOUT
const signOut = () => {
  return auth.signOut();
};

// STATE CHANGE
const authStateChange = () => {
  return auth;
};

// CHECK CURRENT USER
const currentUser = () => {
  return auth.currentUser?.uid;
};

// Create Room And Push Messages
const sendMessage = (message, chatRoomId, userId, userId2, time) => {
  database.ref(`chatRooms/${chatRoomId}`).push({
    sender: userId,
    createdAt: time,
    message,
    read: {
      [userId]: false,
      [userId2]: false,
    },
  });
};

// Get Messages
const getMessages = (chatRoomId) => {
  return database.ref(`chatRooms/${chatRoomId}`);
};

// EXPORT ALL FUNCTION
export {
  userRegister,
  userLogin,
  userInfo,
  getUsers,
  signOut,
  authStateChange,
  setProfilePicture,
  pictureUrl,
  getCurrentUserData,
  userNameSet,
  userStatusSet,
  currentUser,
  sendMessage,
  getMessages,
  userOnline,
};

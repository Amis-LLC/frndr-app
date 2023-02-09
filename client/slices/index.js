import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalUsers: 0,
  totalHangouts: 0,
  userStatus: "",
  userEmoji: "😎",
  userMap: {}, // {_id : {_id, statusName, firstName, lastName, phoneNumber,email, username, location, statusname, picture}
  hangoutMap: {}, // {_id : {_id, location, statusname, picture, username, user_id}}
  connectionList: {},
  selectID: 0,
  signUpInfo: {
    firstName: "",
    lastName: "",
    phoneNumber: "8165551234",
    email: "",
    userName: "",
    password: "",
  },
  authState: "signIn",
  currentPage: "feed",
  isLoggedIn: false,
  currentUserID: 0,
  badPassword: false,
};

const frndrSlice = createSlice({
  name: "frndr",
  initialState,
  reducers: {
    updateUserInfo(state, action) {
      state.userMap[action.payload._id] = action.payload;
      state.totalUsers = Object.keys(state.userMap).length;
    },
    setUserMap(state, action) {
      state.userMap = {};
      for (const rec of action.payload) {
        state.userMap[rec._id] = rec;
      }
      state.totalUsers = Object.keys(state.userMap).length;
    },
    updateHangout(state, action) {
      state.hangoutMap[action.payload._id] = action.payload;
      state.totalHangouts = Object.keys(state.hangoutMap).length;
    },
    setHangoutMap(state, action) {
      state.hangoutMap = {};
      for (const rec of action.payload) {
        state.hangoutMap[rec._id] = rec;
      }
      state.totalHangouts = Object.keys(state.hangoutMap).length;
    },
    updateConnectionList(state, action) {
      // console.log(action.payload);
      if (action.payload.cl === null)
        delete state.connectionList[action.payload._id];
      else {
        const connectionList = action.payload.cl.split(",");
        state.connectionList[action.payload._id] = connectionList; //maps hangout ID to user IDs
      }
    },
    setConnectionList(state, action) {
      const connectionList = action.payload.connectionList.split(",");
      state.connectionList[action.payload._id] = connectionList; //maps hangout ID to user IDs
    },
    setSignUpInfo(state, action) {
      state.signUpInfo[action.payload.key] = action.payload.data;
    },
    setAuthState(state, action) {
      state.authState = action.payload;
    },
    setThePage(state, action) {
      state.currentPage = action.payload;
    },
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    setCurrentUserId(state, action) {
      if (action.payload._id === undefined) {
        state.badPassword = true;
        state.isLoggedIn = false;
      } else {
        state.currentUserID = action.payload._id;
        state.isLoggedIn = true;
        state.badPassword = false;
      }
    },
  },
});

export const {
  updateUserInfo,
  setUserMap,
  updateHangout,
  setHangoutMap,
  updateConnectionList,
  setConnectionList,
  setSignUpInfo,
  setAuthState,
  setThePage,
  setIsLoggedIn,
  setCurrentUserId,
} = frndrSlice.actions;

export default frndrSlice.reducer;

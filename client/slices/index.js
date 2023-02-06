import { createSlice } from "@reduxjs/toolkit";
import Auth from "../components/Auth";

const initialState = {
  totalUsers: 0,
  totalHangouts: 0,
  userStatus: "",
  userEmoji: "😎",
  userMap: {}, // {_id : {_id, statusName, firstName, lastName, phoneNumber,email, username, location, statusname, picture}
  hangoutMap: {}, // {_id : {_id, location, statusname, picture, username, user_id}}
  connectionList: {},
  currentPage: 'feed'
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
    setThePage(state, action) {
      state.currentPage = action.payload;
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
  setThePage,
} = frndrSlice.actions;

export default frndrSlice.reducer;

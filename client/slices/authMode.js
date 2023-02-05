//////////////////// slice for toggling auth mode (display signIn or signUp page ?)

import { createSlice } from "@reduxjs/toolkit";

export const authModeSlice = createSlice({
  name: "authMode",
  initialState: { authMode: 'signIn'},

  reducers: {
    toggleSignUp: (state) => {
      state.authMode = 'signUp';
    },
    toggleSignIn: (state) => {
      state.authMode = 'signIn';
    },
  }

});

export const { toggleSignUp, toggleSignIn } = authModeSlice.actions;
export default authModeSlice.reducer;


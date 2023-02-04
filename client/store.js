/**
 * ************************************
 *
 * @module  store.js
 * @author
 * @date
 * @description Redux 'single source of truth'
 *
 * ************************************
 */

import { configureStore } from "@reduxjs/toolkit";
// import TBDReducer from "./slices";

const store = configureStore({
  reducer: {
    // name: TBDReducer, //TBD for evan
  },
});

export default store;

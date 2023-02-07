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
import frndrReducer from "./slices";

const store = configureStore({
  reducer: {
    frndr: frndrReducer,
  },
});

export default store;

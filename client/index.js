/**
 * ************************************
 *
 * @module  index.js
 * @author
 * @date
 * @description entry point for application. Hangs React app off of #contents in index.html
 *
 * ************************************
 */

import React from "react";
import { Provider } from "react-redux";
import App from "./App.jsx";
import store from "./store";
import ReactDOM from "react-dom";
// opt-in to webpack hot module
if (module.hot) module.hot.accept();
// package scss style sheets
import styles from "./styles/application.scss";

// Render an <App> component to the #app div in the body
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

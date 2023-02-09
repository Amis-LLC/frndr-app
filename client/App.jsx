/**
 * ************************************
 *
 * @module  App.jsx
 * @author
 * @date
 * @description
 *
 * ************************************
 */
import { hot } from 'react-hot-loader/root';
import React, { Component, useEffect } from 'react';
import WelcomePage from './components/WelcomePage';
import Feed from './components/Feed';
import Auth from './components/Auth';
import Chatroom from './components/Chatroom';
import { useSelector, useDispatch, useState } from 'react-redux';
import { setThePage } from './slices/index';

function App() {
  const currentPage = useSelector((state) => state.frndr.currentPage);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   localStorage.setItem('currentPage', currentPage);
  // }, [currentPage]);

  // useEffect(() => {
  //   const savedPage = localStorage.getItem('currentPage');
  //   if (savedPage) {
  //     dispatch(setThePage(savedPage));
  //   }
  // }, [dispatch]);

  console.log('Props are', currentPage);

  if (currentPage == 'auth') {
    // return <WelcomePage />;
    return <Auth />;
  } else if (currentPage == 'welcome') {
    return <WelcomePage />;
  } else if (currentPage == 'feed') {
    return <Feed />;
  } else if (currentPage == 'chatroom') {
    return <Chatroom />;
  } else {
    return <div>Page not found</div>;
  }
}
export default hot(App);

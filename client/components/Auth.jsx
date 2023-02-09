/**
 * ************************************
 *
 * @module  Auth.jsx
 * @author  chanda
 * @date
 * @description
 *
 * ************************************
 */
import React, { useRef, useState } from 'react';
import Banner from './Banner.jsx';
import Footer from './Footer';
import SignInForm from './SignInForm.jsx';
import SignUpForm from './SignUpForm.jsx';
import getFromServer from '../utilities';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateUserInfo,
  setAuthState,
  setSignUpInfo,
  setCurrentUserId,
  setThePage,
} from '../slices';

// websocket testing ->
import { io } from 'socket.io-client';
const socket = io();

socket.emit('chat message', 'testing the socket connection');
socket.on('chat message', (msg) => {
  console.log('client-side chat message received: ', msg);
});

// websocket testing/

//  user db schema
// {
//   firstName: ' ',
//   lastName: ' ',
//   phone: ' ',
//   email: ' ',
//   username: ' ',
//   password: ' ',
//   picture: './client/images/evan.png'
// };
export default function Auth(props) {
  const [formType, setFormType] = useState('signUp');
  const dispatch = useDispatch();
  const signUpInfo = useSelector((state) => state.frndr.signUpInfo);
  const authState = useSelector((state) => state.frndr.authState);
  const isLoggedIn = useSelector((state) => state.frndr.isLoggedIn);
  const badPassword = useSelector((state) => state.frndr.badPassword);
  const handleChange = (event = null) => {
    event.preventDefault();
    console.log('handleChange', event.target.value);
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormType = () => {
    if (authState === 'signIn') dispatch(setAuthState('signUp'));
    else dispatch(setAuthState('signIn'));
  };

  const handleSignUpSubmit = (event) => {
    event.preventDefault();

    getFromServer(dispatch, updateUserInfo, '/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signUpInfo),
    });
    dispatch(setAuthState('signIn'));
    dispatch(setSignUpInfo({}));
    // dispatch(setThePage("welcome"))
    if (isLoggedIn) dispatch(setThePage('welcome'));
  };

  const handleSignInSubmit = (event) => {
    event.preventDefault();
    const { userName, password } = signUpInfo;
    getFromServer(dispatch, setCurrentUserId, '/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userName, password }),
    });

    dispatch(setSignUpInfo({}));
    // else //ERROR on screen invalid username or password.
    if (isLoggedIn) dispatch(setThePage('welcome'));
  };

  return (
    <div>
      <Banner logo={require('../images/logo_transparent.png')} />
      {authState === 'signIn' ? (
        <SignInForm
          onSubmit={handleSignInSubmit}
          toggleForm={handleFormType}
          badPassword={badPassword}
        />
      ) : (
        <SignUpForm
          onSubmit={handleSignUpSubmit}
          toggleForm={handleFormType}
          onChange={handleChange}
        />
      )}
      <Footer />
    </div>
  );
}

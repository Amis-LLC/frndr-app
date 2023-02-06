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
import React, { useRef, useState } from "react";
import Banner from "./Banner.jsx";
import Footer from "./Footer";
import SignInForm from "./SignInForm.jsx";
import SignUpForm from "./SignUpForm.jsx";
import getFromServer from "../utilities";
import { useSelector, useDispatch } from "react-redux";
import { updateUserInfo } from "../slices";

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
  const [formType, setFormType] = useState("signUp");
  const dispatch = useDispatch();
  const signUpInfo = useSelector((state) => state.frndr.signUpInfo);

  const handleChange = (event = null) => {
    event.preventDefault();
    console.log("handleChange", event.target.value);
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormType = () => {
    setFormType(formType === "signIn" ? "signUp" : "signIn");
    console.log("Form type toggled to: ", formType);
  };

  const handleSignUpSubmit = (event) => {
    event.preventDefault();

    getFromServer(dispatch, updateUserInfo, "/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signUpInfo),
    });
  };

  const handleSignInSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(
        ` Response from the server (Should be username) : ${data.params.username}`
      );
      // Toggle isLoggedIn to true, redirect to App.js or
      // welcomeRedirect(data.params.username);
    } catch (error) {
      console.error(`An error occurred while signing in: ${error}`);
      return error;
    }
  };

  return (
    <div>
      <Banner logo={require("../images/frndr-logo.png")} />
      {formType === "signIn" ? (
        <SignInForm onSumbit={handleSignInSubmit} toggleForm={handleFormType} />
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

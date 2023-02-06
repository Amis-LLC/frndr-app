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
// import Logo from "../images/frndrLogo.png";

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

  const handleFormType = () => {
    setFormType(formType === "signIn" ? "signUp" : "signIn");
    console.log("Form type toggled to: ", formType);
  };

  const handleSignUpSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // form data here ...
        }),
      });
      const data = await response.json();
      console.log(` User got all signed up!! : ${data}`);
      /// redirect to welcome page, what to pass from response body? Or do I add it to state?
    } catch (error) {
      console.error(`An error occurred while adding a user: ${error}`);
      return error;
    }
  };

  const handleSignInSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      const data = await response.json();
      console.log(` You signed in !! : ${data.params.username}`);
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
        <SignInForm onClick={handleSignInSubmit} formEvent={handleFormType} />
      ) : (
        <SignUpForm onClick={handleSignUpSubmit} formEvent={handleFormType} />
      )}
      <Footer />
    </div>
  );
}

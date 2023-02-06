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
  const [formData, setFormData] = useState({
    firstName: ' ',
    lastName: ' ',
    phone: ' ',
    email: ' ',
    userName: ' ',
    password: ' ',
    picture: './client/images/evan.png'
  });


  const handleChange = (event) => {
    event.preventDefault();
    console.log("handleChange", event.target.value)
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }

  const handleFormType = () => {
    setFormType(formType === "signIn" ? "signUp" : "signIn");
    console.log("Form type toggled to: ", formType);
  };

  const handleSignUpSubmit = async (event) => {
    event.preventDefault();
    console.log(formData)
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(` This was returned from router! data : ${data}`);
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
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(` Response from the server (Should be username) : ${data.params.username}`);
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
        <SignUpForm onSumbit={handleSignUpSubmit} toggleForm={handleFormType} onChange={handleChange}/>
      )}
      <Footer />
    </div>
  );
}


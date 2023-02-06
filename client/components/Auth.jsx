import React from "react";
import Banner from "./Banner.jsx";
import TextBox from "./TextBox.jsx";
import Box from "@mui/material/Box";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import Dropdown from "react-dropdown";
import "../styles/react-styles.css";
//  import { useSelector, useDispatch } from 'react-redux';

//  const authMode = useSelector((state) => state.auth.authMode);
//  const dispatch = useDispatch();

// import {
//  handleChangeAuthMode
// } from "../slices";

//changeAuthMode reducer: toggles the authMode between 'signUp' and 'signIn'
// const handleChangeAuthMode = () => {
//   dispatch(changeAuthMode());
// }

//  const handleSignUpSubmit = () => {
//  {
//   firstName: ' ',
//   lastName: ' ',
//   phone: ' ',
//   email: ' ',
//   username: ' ',
//   password: ' '
// };

//    dispatch(signUp());
//    Try
//      - inserts user data into the databse via POST request
//      - toggles the sign in, dispatch(changeAuthMode())
//    Catch
//      - log: `Error signing up: ${err}`
//      - render text 'Sorry, sign up failed' to the page in red? (Stretch feature highlighting the error specifically, i.e. username already exists, etc.)
//  }

export default function (props) {
  //////////  ---> Hard coding for dev / testing
  // const authMode = "signIn";
  const authMode = "signUp";
  //////////  <---

  const handleSignUpSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(`An error occurred while adding a user: ${error}`);
      return error;
    }
  };

  if (authMode === "signIn") {
    return (
      <div>
        <Banner />
        <Box
          className="auth_form_container"
          component={"form"}
          noValidate
          autoComplete="off"
        >
          <FormControl className="auth_form_content">
            {/* <form onSubmit={handleSignUpSubmit}> */}
            <h3>Sign Up</h3>
            <TextBox
              className="user_entry_field"
              labelClass="label"
              label="Username"
              placeholder="Username"
              required={true}
            />
            <TextBox
              className="user_entry_field"
              labelClass="label"
              textClass="text-input"
              type="password"
              label="Password"
              placeholder="Password"
              required={true}
            />
            <button type="submit" className="hangout-button btn-primary">
              Submit
            </button>
            <p>
              {/* //// Stretch feature? */}
              <a href="">I forgot my password!</a>
            </p>
          </FormControl>
        </Box>
      </div>
    );
  }

  const locations = ["Ladue, Missouri"];

  if (authMode === "signUp") {
    return (
      // <div className="auth_form_container">
      <div>
        <Banner />

        <Box
          className="auth_form_container"
          component={"form"}
          noValidate
          autoComplete="off"
        >
          <FormControl className="auth_form_content">
            {/* <form onSubmit={handleSignUpSubmit}> */}
            <h3>Sign Up</h3>
            <TextBox
              className="user_entry_field"
              labelClass="label"
              label="First Name"
              placeholder="Whats your first name"
            />
            <TextBox
              className="user_entry_field"
              labelClass="label"
              label="What's your last name"
              placeholder="Your last name"
            />
            <TextBox
              className="user_entry_field"
              labelClass="label"
              label="What's your phone number?"
              // placeholder="cell phone number"
              isNumber={true}
              required={true}
            />
            <TextBox
              className="user_entry_field"
              labelClass="label"
              label="Email"
              placeholder="Email address"
              required={true}
            />
            <TextBox
              className="user_entry_field"
              labelClass="label"
              label="Username"
              placeholder="Username"
              required={true}
            />
            <TextBox
              className="user_entry_field"
              labelClass="label"
              textClass="text-input"
              type="password"
              label="Password"
              placeholder="Enter a password"
              required={true}
            />

            <Dropdown
              options={locations}
              // onChange={this._onSelect}
              className="drop-down"
              placeholder="Where do you live?"
            />
            {/* ;<select className="drop-down"></select>
          </div> */}

            <button type="submit" className="hangout-button btn-primary">
              Submit
            </button>
            {/* //// Stretch feature? */}
            <span>I already have an account!</span>
            {/* <span onClick={handleChangeAuthMode}>I already have an account!</span> */}
            {/* </form> */}
          </FormControl>
        </Box>
      </div>
    );
  }
}

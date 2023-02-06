/**
 * ************************************
 *
 * @module  SignUpForm.jsx
 * @author  chanda
 * @date
 * @description
 *
 * ************************************
 */
import React from "react";
import Box from "@mui/material/Box";
import Dropdown from "react-dropdown";
import FormControl from "@mui/material/FormControl";
import TextBox from "./TextBox.jsx";

import "../styles/react-styles.css";

const SignUpForm = (props) => {
  const locations = ["Ladue, Missouri"]; //Stretch goal extend to all towns...

  return (
    <div>
      <Box
        className="auth_form_container"
        component={"form"}
        noValidate
        autoComplete="off"
      >
        <FormControl 
          className="auth_form_content" 
          // action={props.onSumbit}
          onSubmit={e => {
            e.preventDefault();
            props.onSubmit();
          }}
        > 
          <h3>Sign Up</h3>
          <TextBox
            className="user_entry_field"
            labelClass="label"
            label="First Name"
            name="firstName"
            placeholder="Whats your first name"
            onChange={props.onChange}
          />
          <TextBox
            className="user_entry_field"
            labelClass="label"
            label="What's your last name"
            name="lastName"
            placeholder="Your last name"
            onChange={props.onChange}
          />
          <TextBox
            className="user_entry_field"
            labelClass="label"
            label="What's your phone number?"
            name="phone"
            // placeholder="cell phone number"
            isNumber={true}
            required={true}
            onChange={props.onChange}
          />
          <TextBox
            className="user_entry_field"
            labelClass="label"
            label="Email"
            name="email"
            placeholder="Email address"
            required={true}
            onChange={props.onChange}
          />
          <TextBox
            className="user_entry_field"
            labelClass="label"
            label="Username"
            name="userName"
            placeholder="Username"
            required={true}
            onChange={props.onChange}
          />
          <TextBox
            className="user_entry_field"
            labelClass="label"
            textClass="text-input"
            type="password"
            label="Password"
            name="password"
            placeholder="Enter a password"
            required={true}
            onChange={props.onChange}          
          />

          <Dropdown
            options={locations}
            // onChange={this._onSelect}
            className="drop-down"
            name="location"
            placeholder="Where do you live?"
            // onChange={props.onChange}
          />
          <input 
            type="submit"
            value="Submit"
            className="hangout-button btn-primary"
          />
        </FormControl>
      </Box>



      <div>
            <button className="auth_toggle_btn" onClick={props.toggleForm}>
              I already have an account!
            </button>
          </div>
    </div>
  );
};

export default SignUpForm;

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
        <FormControl className="auth_form_content">
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
          <button
            type="submit"
            className="hangout-button btn-primary"
            onClick={props.onClick}
          >
            Submit
          </button>
          <div>
            <button className="auth_toggle_btn" onClick={props.formEvent}>
              I already have an account!
            </button>
          </div>
        </FormControl>
      </Box>
    </div>
  );
};

export default SignUpForm;

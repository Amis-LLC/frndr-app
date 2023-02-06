/**
 * ************************************
 *
 * @module  SignInForm.jsx
 * @author  chanda
 * @date
 * @description
 *
 * ************************************
 */
import React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import TextBox from "./TextBox.jsx";

const SignInForm = (props) => {
  return (
    <div>
      <Box
        className="auth_form_container"
        component={"form"}
        noValidate
        autoComplete="off"
      >
        <FormControl className="auth_form_content">
          <h3>Sign In</h3>
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
          <input type="submit"
            value="Submit"
            className="hangout-button btn-primary"
          />
          <button className="auth_toggle_btn" onClick={props.formEvent}>
            No account? Sign Up Here
          </button>
          <p>
            {/* //// Stretch feature? */}
            {/* <a href="">I forgot my password!</a> */}
          </p>
        </FormControl>
      </Box>
    </div>
  );
};

export default SignInForm;

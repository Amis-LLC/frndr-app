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
import { useDispatch } from "react-redux";
import { setSignUpInfo } from "../slices";

const SignInForm = (props) => {
  const dispatch = useDispatch();

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
            name="userName"
            placeholder="Username"
            required={true}
            onChange={(e) =>
              dispatch(setSignUpInfo({ key: "userName", data: e.target.value }))
            }
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
            onChange={(e) =>
              dispatch(setSignUpInfo({ key: "password", data: e.target.value }))
            }
          />
          <input
            type="submit"
            value="Submit"
            className="hangout-button btn-primary"
            onClick={props.onSubmit}
          />
          <button className="auth_toggle_btn" onClick={props.toggleForm}>
            No account? Sign Up Here
          </button>

          {props.badPassword ? (
            <p className="warning">"Invalid Username or Password" </p>
          ) : null}

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

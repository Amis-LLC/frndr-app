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
import React from 'react';
import Box from '@mui/material/Box';
import Dropdown from 'react-dropdown';
import FormControl from '@mui/material/FormControl';
import TextBox from './TextBox.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { setSignUpInfo } from '../slices';
import '../styles/react-styles.css';

const SignUpForm = (props) => {
  const locations = ['Ladue, Missouri']; //Stretch goal extend to all towns...
  const signUpInfo = useSelector((state) => state.frndr.signUpInfo);
  //make sure all required fields are filled out
  const getIsRequired = () => {
    for (const key in signUpInfo) {
      if (signUpInfo[key] === '') return false;
      return true;
    }
  };

  const dispatch = useDispatch();

  //each of the form inputs will update the corresponding key in signUpInfo obj of state
  return (
    <div>
      <Box
        className='auth_form_container'
        component={'form'}
        noValidate
        autoComplete='off'
      >
        <FormControl className='auth_form_content'>
          <h3>Sign Up</h3>
          <TextBox
            className='user_entry_field'
            labelClass='label'
            label='First Name'
            name='firstName'
            placeholder='Whats your first name'
            onChange={(e) =>
              dispatch(
                setSignUpInfo({
                  key: 'firstName',
                  data: e.target.value,
                })
              )
            }
          />
          <TextBox
            className='user_entry_field'
            labelClass='label'
            label='Last Name'
            name='lastName'
            placeholder='Your last name'
            onChange={(e) =>
              dispatch(setSignUpInfo({ key: 'lastName', data: e.target.value }))
            }
          />
          <TextBox
            className='user_entry_field'
            labelClass='label'
            label='Phone Number'
            name='phoneNumber'
            // placeholder="cell phone number"
            isNumber={true}
            required={true}
            onChange={(e) =>
              dispatch(
                setSignUpInfo({
                  key: 'phoneNumber',
                  data: e.target.value,
                })
              )
            }
          />
          <TextBox
            className='user_entry_field'
            labelClass='label'
            label='Email'
            name='email'
            placeholder='Email address'
            required={true}
            onChange={(e) =>
              dispatch(setSignUpInfo({ key: 'email', data: e.target.value }))
            }
          />
          <TextBox
            className='user_entry_field'
            labelClass='label'
            label='Username'
            name='userName'
            placeholder='Username'
            required={true}
            onChange={(e) =>
              dispatch(setSignUpInfo({ key: 'userName', data: e.target.value }))
            }
          />
          <TextBox
            className='user_entry_field'
            labelClass='label'
            textClass='text-input'
            type='password'
            label='Password'
            name='password'
            placeholder='Enter a password'
            required={true}
            onChange={(e) =>
              dispatch(setSignUpInfo({ key: 'password', data: e.target.value }))
            }
          />

          <Dropdown
            options={locations}
            // onChange={this._onSelect}
            className='drop-down'
            name='location'
            placeholder='Where do you live?'
            onChange={(e) =>
              dispatch(setSignUpInfo({ key: 'location', data: e.value }))
            }
          />
          <input
            disabled={getIsRequired() ? false : true}
            type='submit'
            value='Submit'
            className='hangout-button btn-primary'
            onClick={props.onSubmit}
          />

          {!getIsRequired() ? (
            <p className='warning'>"Please enter all the fields above" </p>
          ) : null}
        </FormControl>
      </Box>

      <div>
        <button className='auth_toggle_btn' onClick={props.toggleForm}>
          I already have an account!
        </button>
      </div>
    </div>
  );
};

export default SignUpForm;

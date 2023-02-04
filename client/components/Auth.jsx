/**
 * ************************************
 *
 * @module  Auth.js
 * @author  Chanda Gonet
 * @date    2023-02-04
 * @description Sign In/Up
 *
 * ************************************
 */// 

 import React from 'react';
 //  import { useSelector, useDispatch } from 'react-redux';
 
 
 function Auth (props) {
   // const authMode = useSelector((state) => state.auth.authMode);
   // const dispatch = useDispatch();
 
   // const handleChangeAuthMode = () => {
   //   dispatch(changeAuthMode()); //changeAuthMode lives in the reducer file
   // }
 
   // const handleSignUpSubmit = () => {
   //   dispatch(signUp()); 
   //    Try
   //      - inserts user data into the databse via POST request
   //      - toggles the sign in, dispatch(changeAuthMode())
   //    Catch
   //      - log: `Error signing up: ${err}`
   //      - render text 'Sorry, sign up failed' to the page in red? (Stretch feature highlighting the error specifically, i.e. username already exists, etc.)
   // }
 
   // const handleSignInSubmit = () => {
   //  Try
   //    - find username in db and password in database, compare
   //    - if matched, redirect to welcome page
   //    - if not, render text 'Login failed' to the page in red?
   // }
   //  Catch
   //    - log: `Error signing in: ${err}`
   //    - render text 'Sorry, sign in failed' to the page in red? (Stretch feature highlighting the error specifically, i.e. username already exists, etc.)
 
 
   //////////  ---> Hard coding for dev / testing
   const authMode = 'signIn'; 
   // const authMode = 'signUp';
   //////////  <---
 
   if (authMode === 'signIn'){
     return (
       <div className="auth_form_container">
        <form>
          {/* <form onSubmit={handleSignInSubmit}> */}
           <div className="auth_form_content">
             <h3>Sign In</h3>
             <div>
               <label>Username</label>
               <input
                 // className=""
                 type="text"
                 placeholder="Username"
                 value={formData.username}
                 />
             </div>
             <div>
               <label>Password</label>
               <input
                 // className=""
                 type="password"
                 placeholder="Enter password" 
                 value={formData.password}
                 />
             </div>
             <div>
               <button type="submit" className="btn btn-primary">
                 Submit
               </button>
             </div>
             <p>
               {/* //// Stretch feature? */}
               <a href="">I forgot my password!</a>
             </p>
           </div>
         </form>
       </div>
     )
   }
 }
 
 //   if (authMode === 'signUp'){
 //     return (
 //       // Already registered? onClick={changeAuthMode}
 //       ///// SIGN UP FORM 
 //         // name
 //         // username
 //         // phone
 //         // location
 //         // image?
 //     )
 //   }
 // }
 
 export default Auth;
 
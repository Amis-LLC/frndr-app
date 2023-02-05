import React from 'react';
import WelcomePage from "./components/WelcomePage";
import { useSelector, useDispatch } from 'react-redux';
import { toggleSignUp, toggleSignIn } from "../slices/authMode";

//  User schema for sign-up
    //  {
    //   firstName: ' ',
    //   lastName: ' ',
    //   phone: ' ',
    //   email: ' ',
    //   username: ' ',
    //   password: ' ',
    //   picture: './client/images/evan.png'
    // };

export default function Auth(props) {
  const { dispatch } = useDispatch();

//////////  ---> Hard coding for dev / testing
//const authMode = 'signIn'; 
  const authMode = 'signUp';
//////////  <---

const handleSignUpSubmit = async (event) => {
  event.preventDefault();
  try {
    const response = await fetch('/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });
      const data = await response.json();
      console.log(` User got all signed up!! : ${data}`);
      /// redirect to welcome page, what to pass from response body? Or do I add it to state?
  }   
  catch (error) {
      console.error(`An error occurred while adding a user: ${error}`);
      return (error);
  }
}

const handleSignInSubmit = async (event) => {
  event.preventDefault();
  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });
      const data = await response.json();
      // console.log(` You signed in !! : ${data.params.username}`);
      // Toggle isLoggedIn to true, redirect to App.js or
      // welcomeRedirect(data.params.username);
  }   
  catch (error) {
      console.error(`An error occurred while signing in: ${error}`);
      return (error);
  }
}

const redirectToWelcome = () => {
  // what is this logic? Can we add a slice that toggles wether or not user is logged in?
  // and maybe redirect back to App.js rendering WelcomePage instead?
  // - state.isLoggedIn = true/false ? render Auth or Welcome
};

  if (authMode === 'signIn'){

  return(
    <div className="auth_form_container">
          <form onSubmit={ handleSignInSubmit }>
           <div className="auth_form_content">

             <h3>Sign In</h3>

             <div className="inputElement">
                 <label>Username</label>
                 <input
                   className="inputField"
                   type="text"
                   placeholder="Username"
                   required
                   />
               </div>

             <div className="inputElement">
               <label>Password</label>
               <input
                 className="inputField"
                 type="password"
                 placeholder="Enter password"
                 required 
                 />
             </div>

             <div>
               <button type="submit" className="btn btn-primary">
                 Submit
               </button>
             </div>

             <p>
               <span onClick={ dispatch(toggleSignUp) }>
                 <p>I forgot my password!</p>
               </span>
             </p>
             
           </div>
         </form>
       </div>
    )
  }

  if (authMode === 'signUp'){

    return(
      <div className="auth_form_container">
          <form onSubmit={ handleSignUpSubmit }>
             <div className="auth_form_content">
               <h3>Sign Up</h3>
  
               <div className="inputElement">
                 <label>First name</label>
                 <input
                   className="inputField"
                   type="text"
                   placeholder="Your first name"
                   />
               </div>

               <div className="inputElement">
                 <label>Last Name</label>
                 <input
                   className="inputField"
                   type="text"
                   placeholder="Your last name"
                   />
               </div>
  
               <div className="inputElement">
                 <label>Phone number</label>
                 <input
                   className="inputField"
                   type="text"
                   placeholder="cell phone number"
                   required
                   />
               </div>

               <div className="inputElement">
                 <label>E-mail</label>
                 <input
                   className="inputField"
                   type="text"
                   placeholder="E-mail address"
                   required
                   />
               </div>

               <div className="inputElement">
                 <label>Username</label>
                 <input
                   className="inputField"
                   type="text"
                   placeholder="Username"
                   required
                   />
               </div>
  
               <div className="inputElement">
                 <label>Password</label>
                 <input
                   className="inputField"
                   type="password"
                   placeholder="Enter password" 
                   required
                   />
               </div>

               <div className="inputElement">
                 <label>Location</label>
                 <select>
                    <option value="">Select your city</option>
                    <option value="ladue">Ladue, Missouri</option>
                </select>
               </div>
  
               <div>
                 <button type="submit" className="btn btn-primary">
                   Submit
                 </button>
               </div>
               <p>
               <span onClick={ dispatch(toggleSignIn) }>
                  <p>I already have an account!</p>
                  </span>
               </p>
             </div>
           </form>
         </div>
    )
  }
}


// input > POST > response > redux > welcomepage{userName}




import React, { useRef, useState } from 'react';

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


    const [formType, setFormType] = useState('signIn');

    const handleFormType = () => {
     setFormType(formType === 'signIn' ? 'signUp' : 'signIn');
     console.log('Form type toggled to: ', formType)
    };  

    const handleSignUpSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // form data here ... 
        }),
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
      console.log(` You signed in !! : ${data.params.username}`);
      // Toggle isLoggedIn to true, redirect to App.js or
      // welcomeRedirect(data.params.username);
  }   
  catch (error) {
      console.error(`An error occurred while signing in: ${error}`);
      return (error);
  }
    }


    const SignInForm = () => (
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
           </div>
          </form>
        <div>
          <button class="auth_toggle_btn" onClick={handleFormType}>
            I already have an account!
          </button>
        </div>
      </div>
    )
  

    const SignUpForm = () => (
  
      <div className="auth_form_container">
          <form onSubmit={handleSignUpSubmit}>
             <div className="auth_form_content">
               <h3>Sign Up</h3>
  
               <div className="inputElement">
                 <label>First name</label>
                 <input
                   className="inputField"
                   type="text"
                   placeholder="Your first name"
                  //  ref={firstNameRef}
                   />
               </div>

               <div className="inputElement">
                 <label>Last Name</label>
                 <input
                   className="inputField"
                   type="text"
                   placeholder="Your last name"
                  //  ref={lastNameRef}
                   />
               </div>
  
               <div className="inputElement">
                 <label>Phone number</label>
                 <input
                   className="inputField"
                   type="text"
                   placeholder="cell phone number"
                  //  ref={phoneRef}
                   required
                   />
               </div>

               <div className="inputElement">
                 <label>E-mail</label>
                 <input
                   className="inputField"
                   type="text"
                   placeholder="E-mail address"
                  //  ref={emailRef}
                   required
                   />
               </div>

               <div className="inputElement">
                 <label>Username</label>
                 <input
                   className="inputField"
                   type="text"
                   placeholder="Username"
                  //  ref={userNameRef}
                   required
                   />
               </div>
  
               <div className="inputElement">
                 <label>Password</label>
                 <input
                   className="inputField"
                   type="password"
                   placeholder="Enter password" 
                  //  ref={passwordRef}
                   required
                   />
               </div>

               <div className="inputElement">
                 <label>Location</label>
                 <select>
                    <option value="">Select your city</option>
                    <option value="ladue">Ladue, Missouri</option>
                </select>
                {/* ref={locationRef} */}
               </div>
  
               <div>
                 <button type="submit" className="btn btn-primary">
                   Submit
                 </button>
               </div>

             </div>
           </form>
           <div>
               <button class="auth_toggle_btn" onClick={handleFormType}>
                  I already have an account!
                  </button>
               </div>
         </div>
    )

    return (
      <div>
        {formType === 'signIn' ? <SignInForm /> : <SignUpForm />}
      </div>
    );
}



// input > POST > response > redux > welcomepage{userName}





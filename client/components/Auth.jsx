import React from 'react';


export default function (props) {
//////////  ---> Hard coding for dev / testing
const authMode = 'signUp'; 
// const authMode = 'signUp';
//////////  <---
 


  if (authMode === 'signIn'){

  return(
    <div className="auth_form_container">
        <form>
           <div className="auth_form_content">
             <h3>Sign In</h3>
             <div>
               <label>Username</label>
               <input
                 // className=""
                 type="text"
                 placeholder="Username"
                 />
             </div>
             <div>
               <label>Password</label>
               <input
                 // className=""
                 type="password"
                 placeholder="Enter password" 
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

  if (authMode === 'signUp'){
    return(
      <div className="auth_form_container">
          <form>
             <div className="auth_form_content">
               <h3>Sign Up</h3>
  
               <div>
                 <label>First name</label>
                 <input
                   // className=""
                   type="text"
                   placeholder="Your first name"
                   />
               </div>

               <div>
                 <label>Last Name</label>
                 <input
                   // className=""
                   type="text"
                   placeholder="Your last name"
                   />
               </div>
  
               <div>
                 <label>Username</label>
                 <input
                   // className=""
                   type="text"
                   placeholder="Username"
                   required
                   />
               </div>
  
               <div>
                 <label>Password</label>
                 <input
                   // className=""
                   type="password"
                   placeholder="Enter password" 
                   required
                   />
               </div>
  
               <div>
                 <label>Phone number</label>
                 <input
                   // className=""
                   type="text"
                   placeholder="cell phone number"
                   required
                   />
               </div>

               <div>
                 <label>Location</label>
                 <select>
                    <option value="" disabled selected>Select your city</option>
                    <option value="ladue">Ladue, Missouri</option>
                </select>
               </div>
  
               <div>
                 <button type="submit" className="btn btn-primary">
                   Submit
                 </button>
               </div>
               <p>
                 {/* //// Stretch feature? */}
                 <span onClick={handleChangeAuthMode}>I already have an account!</span>
               </p>
             </div>
           </form>
         </div>
    )
  }


}



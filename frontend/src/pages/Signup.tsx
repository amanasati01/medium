// import React from 'react';
import SignupInputs from "../Components/signupInputs";
import { Quote } from "../Components/Quote";
function Signup() {
  return (
    <>
    <div className="w-screen h-screen grid grid-cols-2">
        <SignupInputs type ='signup'/>
        <div className="invisible lg:visible">
        <Quote/>
        </div>
        </div>
    
    </>
  );
}

export default Signup;

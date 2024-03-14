import { Link,useNavigate } from "react-router-dom";
import React, { ChangeEvent, useState } from 'react';
import { SignUpInput } from "@amanasati09/common-medium";
import { string } from "zod";
import axios from "axios";
import {BACKEND_URL} from '../../config'
import { response } from "express";

interface SignupInputsProps {
    type: string;
  }
function SignupInputs({type}:SignupInputsProps) {
    const navigate = useNavigate();
    const [postInput, setPostInput] = useState<SignUpInput>({
        name: "",
        username: "",
        password: "",
    });
    async function sendRequest() {
        try {
            const res = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, postInput);
            const jwt = res.data; // Assuming the JWT is directly returned as the response data
            if (jwt) {
                localStorage.setItem('token', JSON.stringify(jwt));
                navigate('/blogs');
            } else {
                console.error('JWT token not found in response.');
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    
    const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setPostInput({
            ...postInput,
            name: e.target.value, 
        });
    }
    const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPostInput({
            ...postInput,
            password: e.target.value, 
        });
    }
    const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
        setPostInput({
            ...postInput,
            username: e.target.value, 
        });
    }


    return (
        <>
           
            <div  className="flex items-center justify-center min-[1022px]:w-full w-screen h-full">
                <div className="content-end w-[70%] h-[50%]">
                    <div className="flex items-center flex-col mt-2">
                        <h1 className="font-extrabold text-2xl">{type === 'signin' ? 'Login to an account' : 'Create  an account'}</h1>
                        <h5 className="mt-2">{type === 'signin' ?" Don't have an account ": 'Already have an account'}<Link to={type === 'signin' ?"/signup": '/login'} className="underline text-blue-500">{type === 'signin' ?"Signup": 'Signin'}</Link></h5>
                    </div>
                    {/* {JSON.stringify(postInput)} */}
                    {/* Example usage of LabelInputs */}
                    {type == 'signup' ?<LabelInputs label="Name" placeholder="Enter your Name ..." type = '' onChange={handleChangeName} /> : null}
                    <LabelInputs label="userName" placeholder="Enter your userName ..." type = "" onChange={handleChangeUsername}/>
                    <LabelInputs label="Password" placeholder="Enter your password ..." type = "password" onChange={handleChangePassword} />
                    {/* Additional inputs can be added here */}
                    <button type="button" onClick={sendRequest} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-semibold rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-60 ml-40 mt-5">{type === 'signin' ?"Signin": 'Signup'}</button>
                </div>
              
            </div>
        </>
    );
}
interface labelInputTypes{
    label : string,
    placeholder : string,
    type : string,
    onChange : (e : ChangeEvent<HTMLInputElement>)=>void;
}

function LabelInputs({ label, placeholder, onChange,type }: labelInputTypes) {
    return (
        <>
            <label htmlFor="first_name" className="block mt-2 mb-2 text-xl font-semibold text-gray-900 dark:text-black">{label}</label>
            <input onChange={onChange} type={type || 'text'} id="first_name"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
           
        </>
    );
}

export default SignupInputs;

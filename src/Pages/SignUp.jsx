import React, { useState } from 'react'
import Logo from '../assets/Logo.png'
import SignupImg from '../assets/SignupSuccess.png';

import Ilustr2 from '../assets/illustr2.png'
import { BsEye } from 'react-icons/bs'
import { FaEyeSlash } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { IoLogoFacebook } from "react-icons/io5";
import { isEmail, isValidPassword } from '../utils/regexMatcher';
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { createAccount } from '../Redux/Slices/AuthSlice';
function SignUp() {
    const [passwordInCorrect, setPasswordInCorrect] = useState(true)
    const [inputType, setInputType] = useState("password")
    const navigator = useNavigate()
    const dispatch = useDispatch()

    const [signupSuccess, setSignupSuccess] = useState(false);


    const [signupData, setSignupData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    })

    const changeInputType = () => {
        if (inputType === "text") {
            setInputType("password")
        }
        else {
            setInputType("text")
        }
    }
    function handleUserInput(e) {
        const { name, value } = e.target
        setSignupData({
            ...signupData,
            [name]: value
        })
    }
    async function onSignup(e) {
        e.preventDefault();
        const { firstName, lastName, email, password } = signupData
        if (!firstName || !lastName || !email || !password) {
            toast.error("Please fill all the details")
            return;
        }
        if (!isEmail(email)) {

            toast.error("Invalid Email Id")
            return;
        }
        if (!isValidPassword(password)) {
            toast.error(
                "Minimum password length should be 8 with Uppercase, Lowercase, Number and Special character"
            );
            return;
        }

        // alert(firstName + ' ' + lastName + ' ' + email + ' ' + password)

        const formData = {
            firstName,lastName,email,password
        }
   
        //* dispatch create account action

        console.log(formData)

        const response = await dispatch(createAccount(formData));


        if (response?.payload?.success) {
            // navigator("/login");
            setSignupSuccess(true)
        }

        setSignupData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        })
    }
    return (
        <>
            <div className='font-manrope mt-5  border-b border-gray-200  mb-10 p-1'>
                <div className="ml-10 flex justify-start items-center mb-2">
                    <img src={Logo} alt="Genix Auctions" className="h-12" />
                    <h2 className='font-semibold'>Genix Auctions</h2>
                </div>
            </div>

            {signupSuccess===false ? (<div className="font-manrope flex justify-around gap-5 min-h-screen bg-white">
                <div className="ml-10 max-w-md w-2/3 bg-white p-6 rounded-lg h-[75%]">
                    <div className='text-sm mb-4'>
                        <h4 className="text-lg font-bold mb-2">Sign up</h4>
                        <p className='text-gray-500'>New bidders, as soon as you have submitted your information you will be eligible to bid in the auction.</p>
                    </div>
                    <form onSubmit={onSignup}>

                        <div className="mb-4">
                            <label className="block text-sm text-black font-semibold">First Name</label>
                            <input type="name" name='firstName' id='firstName' className="w-full p-2 border-[1.5px] border-gray-500  rounded mt-1" placeholder="John" value={signupData.firstName} onChange={handleUserInput} />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm text-black font-semibold">Last Name</label>
                            <input type="name" name='lastName' id='lastName' className="w-full p-2 border-[1.5px] border-gray-500  rounded mt-1" placeholder="Doe" value={signupData.lastName} onChange={handleUserInput} />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm text-black font-semibold ">Email Address</label>
                            <input type="email" name='email' id='email' className="w-full p-2 border-[1.5px] border-gray-500  rounded mt-1" placeholder="hello@example.com" value={signupData.email} onChange={handleUserInput} />
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm text-black font-semibold">Password</label>
                            <div className="relative w-full">
                                <input type={inputType} required name='password' id='password' className="w-full p-2 border-[1.5px] border-gray-500  rounded mt-1" placeholder="Enter your password" value={signupData.password} onChange={handleUserInput} />
                                <p className='mt-2 text-xs text-gray-500'>Minimum length should be 8 with atleast one uppercase, lowercase, number and symbol</p>

                                <div onClick={(e) => {
                                    e.preventDefault();
                                    changeInputType();
                                }} >
                                    {
                                        inputType === "password" ? <BsEye className='absolute top-4 right-2 cursor-pointer' /> :
                                            <FaEyeSlash className='absolute top-4 right-2 cursor-pointer' />
                                    }
                                </div>
                            </div>

                            {
                                passwordInCorrect && <p className="text-red-500 text-sm mt-3">Password criteria check</p>
                            }
                        </div>

                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <input type="checkbox" id="keepMeSignedIn" className='rounded' />
                                <label htmlFor="keepMeSignedIn" className="text-gray-700 ml-2">Receive outbid emails</label>
                            </div>
                        </div>
                        <button type='submit' className="w-full py-2 bg-gradient-to-r from-blue-700 to-cyan-400 text-white rounded ">Submit</button>
                    </form>

                    <div>
                        <div className="flex items-center justify-center my-6">
                            <div className="border-t border-gray-500 flex-grow mr-3"></div>
                            <span className="text-gray-700">or sign up with</span>
                            <div className="border-t border-gray-500 flex-grow ml-3"></div>
                        </div>

                        <div className="mt-6 flex justify-center">
                            <button className="mx-2 py-2 px-4 border rounded hover:bg-gray-100 flex items-center gap-2">
                                <FaGoogle /> Google
                            </button>
                            <button className="mx-2 py-2 px-4 border rounded hover:bg-gray-100 flex items-center gap-2">
                                <FaApple /> Apple
                            </button>
                            <button className="mx-2 py-2 px-4 border rounded hover:bg-gray-100 flex items-center gap-2">
                                <IoLogoFacebook /> Facebook
                            </button>
                        </div>

                        <div className="mt-6 text-center">
                            <p>Want to know more?<Link to='/signup' className="text-[#1D4ED8] font-semibold ml-2">Auction rules</Link></p>
                        </div>
                    </div>
                </div>
                <div className="hidden md:block md:w-1/3 h-[75%] bg-white my-10">
                    <img src={Ilustr2} alt="Illustration" className="w-full" />
                </div>
            </div>)
                :
                (<div className='font-manrope'>
                    <h2 className='font-bold text-center text-2xl'>Uncover Deals, Unleash Excitement: <span className='text-[#235BDB]'>Dive into Our Auctions Today!</span></h2>

                    <img src={SignupImg} alt="signupSuccess" className='bg-white mt-5 mx-auto h-[50%] w-[50%]' />


                    <Link to='/login'>
                        <button className="mt-7 mx-[45vw]  px-8 py-2 bg-gradient-to-r from-blue-700 to-cyan-400 text-white rounded">
                            Login
                        </button>
                    </Link>

                </div>)
            }


        </>
    );
}

export default SignUp
import React, { useState } from 'react';
import Logo from '../assets/Logo.png'
import Illustration from '../assets/Illustration.png'
import { BsEye } from 'react-icons/bs'
import { FaEyeSlash } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { IoLogoFacebook } from "react-icons/io5";
import { isEmail, isValidPassword } from '../utils/regexMatcher';
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { loginAccount } from '../Redux/Slices/AuthSlice';


function Login() {

    const [passwordInCorrect, setPasswordInCorrect] = useState(false)
    const [inputType, setInputType] = useState("password")
    const [keep, setKeep] = useState(false)
    // const dispatch = useDispatch()
    const navigator = useNavigate()
    const dispatch = useDispatch()
    let [loginData, setLoginData] = useState({
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
        setLoginData({
            ...loginData,
            [name]: value
        })
    }
    async function onLogin(e) {
        e.preventDefault();
        let { email, password } = loginData
        loginData = {
            ...loginData, keep: keep
        }
        if (!email || !password) {
            toast.error("Please fill all the details")
            return;
        }
        if (!isEmail(email)) {

            toast.error("Invalid Email Id")
            return;
        }
        if (!isValidPassword(password)) {
            toast.error(
                "Minimum password length should be 8 with Uppercase, Lowercase, Number and Symbol"
            );
            return;
        }

        // alert(loginData.email + " " + loginData.password)
        //* dispatch create account action



        const response = await dispatch(loginAccount(loginData));
        if (response?.payload?.success) {
            navigator("/");
        }
        else {
            setPasswordInCorrect(true)
            return;
        }

        setLoginData({
            email: "",
            password: "",

        })
        setKeep(false)
    }
    return (
        <>
            <div className='font-manrope mt-5  border-b border-gray-200  mb-10 p-1'>
                <div className="ml-10 flex justify-start items-center mb-2">
                    <img src={Logo} alt="Genix Auctions" className="h-12" />
                    <h2 className='font-semibold'>Genix Auctions</h2>
                </div>
            </div>
            <div className="font-manrope  flex justify-around gap-5 min-h-screen bg-white">
                <div className="ml-[10vw] max-w-md w-1/3 bg-white p-6 rounded-lg h-[75%]">
                    <div className='text-sm mb-4'>
                        <h4 className="text-lg font-bold mb-2">Login</h4>
                        <p className='text-gray-500'>Welcome back. Enter your credentials to access your account</p>
                    </div>
                    <form onSubmit={onLogin}>

                        <div className="mb-4">
                            <label className="block text-sm text-black font-semibold">Email Address</label>
                            <input type="email" name='email' id='email' className="w-full p-2 border-[1.5px] border-gray-500  rounded mt-1" placeholder="hello@example.com" value={loginData.email} onChange={handleUserInput} />
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm text-black font-semibold">Password</label>

                            <div className="relative w-full">

                                <input type={inputType} required name='password' id='password' className="w-full p-2 border-[1.5px] border-gray-500  rounded mt-1" placeholder="Enter your password" value={loginData.password} onChange={handleUserInput} />
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
                                passwordInCorrect && <p className="text-red-500 text-sm mt-3">Please enter correct email & password</p>
                            }
                        </div>

                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <input type="checkbox" id="keepMeSignedIn" className='rounded' checked={keep} onClick={(e) => setKeep(!keep)} />
                                <label htmlFor="keepMeSignedIn" className="text-gray-700 ml-2">Keep me signed in</label>
                            </div>
                            <Link to="/forgot-password" className="text-blue-500">Forgot Password?</Link>
                        </div>
                        <button type='submit' className="w-full py-2 bg-gradient-to-r from-blue-700 to-cyan-400 text-white rounded ">Continue</button>
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
                            <p>Don’t have an Account? <Link to='/signup' className="text-[#1D4ED8] font-semibold ">Sign up here</Link></p>
                        </div>
                    </div>
                </div>
                <div className="hidden md:block md:w-2/3 h-full bg-blue-100">
                    <img src={Illustration} alt="Illustration" className="w-full h-full" />
                </div>
            </div>
        </>
    );
}

export default Login;

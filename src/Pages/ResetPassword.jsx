import React, { useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { BsEye, BsPersonCircle } from 'react-icons/bs'
import toast from 'react-hot-toast';
import axiosInstance from '../utils/axiosInstance';

function ResetPassword() {
    const navigator = useNavigate();
    const locator = useLocation();
    const temp = locator.pathname.split("/")[2];

    const resetId = temp.slice(0, 40);
    let email = temp.slice(40, temp.length);

    email += ".com"

    const [password, setPassword] = useState("");
    const [inputType, setInputType] = useState("password")

    const changeInputType = () => {
        if (inputType === "text") {
            setInputType("password")
        }
        else {
            setInputType("text")
        }
    }
    async function handleSubmit(e) {
        e.preventDefault();


        try {
            let response = axiosInstance.post(`user/reset/${resetId}`, { password: password });
            console.log(resetId)

            console.log(response)

            toast.promise(response, {
                loading: "Reseting password",
                success: (data) => {
                    return data?.data?.message;
                },
                error: "Failed to reset password"
            });

            response = await response;
            navigator("/login");
        }

        catch (error) {
            //console.log(error)
            toast.error(error?.response?.data?.message);
        }

    }

    return (
        <div>
            <div className="flex flex-col  items-center justify-center h-[100vh]">

                <form noValidate onSubmit={handleSubmit} className="flex flex-col justify-center gap-3 rounded-lg p-4  w-96 shadow-[0_0_10px_black]">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className='font-semibold'>Enter New Password</label>
                        <div className="relative w-full">
                            < input type={inputType} required name='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter your password..' className='bg-transparent px-2 py-1 border w-full' />


                            <div onClick={(e) => {
                                e.preventDefault();
                                changeInputType();
                            }} >
                                <BsEye className='absolute top-2 right-2 cursor-pointer' />
                            </div>
                        </div>
                    </div>

                    <button type='submit' className='w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 mt-2'>
                        Reset Password
                    </button>
                </form>

            </div>
        </div>
    )
}

export default ResetPassword
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';


import Logo from '../assets/Logo2.png'
import Profile from '../assets/profile.jpg'
import { Link, useNavigate } from 'react-router-dom'

import { IoArrowBackCircle } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { TiTick } from "react-icons/ti";

import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

import { getProduct, getAllProducts, newBid, updateProduct } from '../Redux/Slices/productsSlice';
import { logoutAccount } from '../Redux/Slices/AuthSlice';
import ProductCard from '../components/ProductCard';
import toast from 'react-hot-toast';

function ProductPage() {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showForm, setShowForm] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const userData = JSON.parse(localStorage.getItem("data"))
    // const userData = {

    // }
    const username = userData?.email?.split('@')[0];
    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn)
    console.log(isLoggedIn)
    console.log(username)

    const [isOpen, setIsOpen] = useState(false);

    const [maximumBid, setMaximumBid] = useState(0);
    const [freezeTime, setFreezeTime] = useState(false);

    const capitialize = word => word.charAt(0).toUpperCase() + word.slice(1)
    const [product, setProduct] = useState(useSelector((state) => state?.products?.product))


    console.log(productId)
    console.log(product)


    let [bids, setBids] = useState(product?.bids || [])

    // Memoize the reversed bids to avoid recalculating on every render
    const reversedBids = useMemo(() => {
        return bids.length > 0 ? [...bids].reverse() : [];
    }, [bids]);
    console.log(reversedBids)
    const [straightBid, setStraightBid] = useState(product?.currentBid || 0);




    const handleLogout = async (e) => {
        e.preventDefault()
        const res = await dispatch(logoutAccount())
        if (res?.payload?.success) {
            navigate("/")
        }
    }

    const paragraphs = product?.description.split('\n');

    const [winner, setWinner] = useState(reversedBids[0]?.bidderName)

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleBidNowClick = () => {
        if (username === product?.createdBy) {
            toast.error("You cannot bid for your product")
        }
        else {
            setShowForm(true);
        }
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setSubmitSuccess(false);
        setMaximumBid("")
        setStraightBid("")
    };

    const incrementStraightbid = () => setStraightBid((prev) => (prev === '' ? 0 : Number(prev) + 50));
    const decrementStraightbid = () => setStraightBid((prev) => (prev > 50 ? Number(prev) - 50 : 0));

    const incrementMaxbid = () => setMaximumBid((prev) => (prev === '' ? 0 : Number(prev) + 1));
    const decrementMaxbid = () => setMaximumBid((prev) => (prev > 1 ? Number(prev) - 1 : 0));


    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(username === bids[0]?.bidderName)
        // if (username === bids[0]?.bidderName) {
        //     return toast.error('Cannot place consecutive bids');
        // }

        // console.log(product?.startingBid)
        if (product?.startingBid > 0 && straightBid <= product?.startingBid) {
            console.log("reached")
            return toast.error('Bid is lower than floor bid price');
        }

        if (straightBid > 0 && bids[0]?.currentBid > 0 && straightBid <= reversedBids[0]?.currentBid) {
            return toast.error('Bid is lower than current bid price');
        }
        const data = {
            bidderName: username,
            currentBid: straightBid,
            maxBid: maximumBid,
        };

        console.log(data, productId)
        const res = await dispatch(newBid({ data, id: productId }));
        const response = await dispatch(updateProduct({ currentBid: straightBid, id: productId }))

        console.log(res)
        if (res?.payload?.success) {
            setSubmitSuccess(true);
            setFreezeTime(true);
            setTimeout(() => setFreezeTime(false), 5000);

        }
    };


    const formatTimeDifference = (targetDate) => {
        const now = new Date();
        const endDate = new Date(targetDate);
        const difference = endDate - now;

        if (difference <= 0) {
            return 'Ended';
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        return `${days} day${days !== 1 ? 's' : ''} ${hours} hr${hours !== 1 ? 's' : ''} ${minutes} minute${minutes !== 1 ? 's' : ''} ${seconds} second${seconds !== 1 ? 's' : ''}`;
    };
    const [timeRemaining, setTimeRemaining] = useState(formatTimeDifference(product?.endDate));

    async function loadProduct() {
        const res = await dispatch(getProduct(productId));
        if (res?.payload?.success) {
            setProduct(res?.payload?.product)
            setBids(res?.payload?.product?.bids)

            console.log(bids?.[bids?.length - 1])
            setWinner(bids?.[bids?.length - 1]?.bidderName)
            console.log(res?.payload?.product?.bids[bids.length - 1])
            // setStraightBid(res?.payload?.product?.bids)
        }
    }


    useEffect(() => {
        loadProduct()
        const intervalId = setInterval(() => {
            setTimeRemaining(formatTimeDifference(product?.endDate));
        }, 1000);
        const intervalId2 = setInterval(() => {
            loadProduct()
        }, 3000);

        return () => {
            clearInterval(intervalId);
            clearInterval(intervalId2);
        }

    }, [submitSuccess, product?.endDate]);



    return (
        <>
            <div div className="font-manrope flex items-center justify-between p-4 bg-pink-100">
                <Link to="/" className="flex items-center">
                    <img src={Logo} alt="Logo" className="h-10 mr-3 bg-pink-100" />
                    <h1 className="text-xl font-bold">Genix Auctions</h1>
                </Link>

                <nav className="flex items-center justify-center gap-8">
                    <Link to="/auctions" className="hover:text-blue-500">Auctions</Link>
                    <Link to="/bidding" className="hover:text-blue-500">Bidding</Link>
                    <Link to="/about" className="hover:text-blue-500">About Us</Link>

                    {isLoggedIn ? (
                        <div className="mt-2 flex items-center space-x-4">
                            <div className='relative'>
                                <button onClick={toggleDropdown}>
                                    <img src={Profile} alt="Logo" className="h-7 mr-3 bg-pink-100 rounded-full" />
                                </button>
                                {isOpen && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                                        <div className="py-1">
                                            <div className="block px-4 py-2 text-sm text-gray-700">
                                                <div className='text-black font-semibold'>
                                                    {capitialize(userData?.firstName) + ' ' + capitialize(userData?.lastName)}
                                                </div>
                                                <div>
                                                    {userData?.email}
                                                </div>

                                            </div>
                                            {/* <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                View profile
                                            </Link> */}

                                            <Link to="/bids" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                My bids
                                            </Link>
                                            <Link to="/auctions" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                My Auctions
                                            </Link>
                                            <Link to="/notifications" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                Notifications
                                            </Link>

                                            <Link onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                Logout
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className='flex justify-between items-center gap-5'>
                            <Link to='/login' className="text-blue-500">Login</Link>
                            <Link to='/signup'>
                                <button className="px-4 py-2 text-white bg-blue-500 rounded">Get Started</button>
                            </Link>
                        </div>
                    )}
                </nav>
            </div >

            <div className='font-manrope flex justify-around'>
                <Link to='/' className='w-[15vw] mt-5'>
                    <div className='flex items-center  gap-2 text-[#1D4ED8] font-semibold'>
                        <IoArrowBackCircle className='w-7 h-7 ' />
                        Back to catalog
                    </div>
                    <ProductCard key={productId} product={product} hidden={true} reversedBids2={reversedBids} />
                </Link>
                <div className='w-[45vw] mt-5 ml-5'>
                    <h1 className='text-lg mb-2'>Description</h1>
                    <div className="space-y-4 text-sm">
                        {paragraphs?.map((paragraph, index) => (
                            <p key={index} className="text-gray-700">
                                {paragraph.trim()}
                            </p>
                        ))}
                    </div>
                    <h1 className='text-lg mt-7 mb-2'>Reviews</h1>
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <div>
                            <div className="mt-3 flex items-center">
                                <img src={Profile} alt="profile" className="w-10 h-10 rounded-full mr-3" />
                                <div>
                                    <h3 className="text-lg font-medium">Rahul Sharma</h3>
                                    <div className="flex items-center text-yellow-400">
                                        <span className="mr-1">★</span>
                                        <span className="mr-1">★</span>
                                        <span className="mr-1">★</span>
                                    </div>
                                </div>
                            </div>
                            <p className="mt-2 text-gray-700">
                                Best product under budget
                            </p>
                            <p className="text-gray-500 text-sm mt-2">27/7/2024</p>
                        </div>
                        <hr className='my-1 text-black' />
                        <div>
                            <div className="mt-3 flex items-center">
                                <img src={Profile} alt="profile" className="w-10 h-10 rounded-full mr-3" />
                                <div>
                                    <h3 className="text-lg font-medium">Vyshaak singh</h3>
                                    <div className="flex items-center text-yellow-400">
                                        <span className="mr-1">★</span>
                                        <span className="mr-1">★</span>
                                        <span className="mr-1">★</span>
                                        <span className="mr-1">★</span>
                                    </div>
                                </div>
                            </div>
                            <p className="mt-2 text-gray-700">
                                Value for money
                            </p>
                            <p className="text-gray-500 text-sm mt-2">27/7/2024</p>
                        </div>
                    </div>
                </div>
                <div className='w-[19vw] mt-5 ml-5 '>
                    <div className='max-h-64 overflow-y-auto rounded shadow-lg px-4 py-3  border-gray-300'>
                        <ul className="space-y-2 ">
                            {reversedBids?.map((bid, index) => (
                                <li key={bid.currentBid} className="text-black bg-gray-100  py-2 px-1 text-center">
                                    <span className='text-xs mr-2'>-</span>
                                    <span className='text-md '>{bid.bidderName}'s bid ${bid.currentBid}</span>
                                </li>
                            ))}
                            {<li className='py-2 px-1 text-center'>
                                <span className='text-xs mr-2'>-</span>
                                <span className='text-md font-bold text-'>Floor bid is: $ {product?.startingBid}</span>
                            </li>}
                        </ul>
                    </div>

                    {(username !== product?.createdBy) && timeRemaining !== "Ended" &&
                        <button onClick={handleBidNowClick} className="mt-4 ml-[5vw] w-[50%] py-2 bg-gradient-to-r from-blue-700 to-cyan-400 text-white rounded ">Bid Now</button>
                    }
                    {
                        (username === product?.createdBy) && <div className='mx-[5vw] mt-5 bg-red-500 text-white font-bold px-1 py-3 text-sm rounded-md'>You cannot bid for your product</div>
                    }
                    {
                        timeRemaining === "Ended" && <>
                            <div className='mx-[5vw] mt-5 bg-red-500 text-white font-bold px-1 py-3 text-sm rounded-md'>Auction Ended</div>
                            {
                                winner && (winner !== product?.createdBy) && (winner !== "Not Sold!") &&
                                <div className='text-center w-[75%] mx-[2vw] mt-5 bg-gradient-to-r from-cyan-400 to-blue-400 text-white font-bold px-1 py-3 text-sm rounded-md'>
                                    Product Sold to {capitialize(winner)}
                                </div>

                            }
                            {
                                winner && (winner !== product?.createdBy) && (winner === "Not Sold!") &&
                                <div className='text-center w-[75%] mx-[2vw] mt-5 bg-gradient-to-r from-cyan-400 to-blue-400 text-white font-bold px-1 py-3 text-sm rounded-md'>
                                    {capitialize(winner)}
                                </div>
                            }
                        </>
                    }

                    {showForm && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                            <div className="bg-white p-8 rounded shadow-md">
                                <div className="bg-white p-4 rounded shadow-md">
                                    <div className='mb-3'>
                                        <span className="text-md font-bold mb-4 mr-7">Submit Bid | {product?.name}</span>
                                        <button onClick={handleCloseForm}><MdCancel /></button>
                                    </div>

                                    {!submitSuccess ?
                                        (<>
                                            <form onSubmit={handleSubmit}>
                                                <div className="mb-4">
                                                    <label htmlFor="straightBid" className="block text-sm font-medium text-gray-700">
                                                        Straight bid
                                                    </label>
                                                    <div className="mt-1 relative rounded-md shadow-sm">
                                                        <input
                                                            type="text"
                                                            name="straightBid"
                                                            id="straightBid"
                                                            value={straightBid}
                                                            onChange={(e) => setStraightBid(e.target.value)}
                                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                        />
                                                        <span className="absolute inset-y-0 right-4 flex items-center pl-3">
                                                            <button type="button" className="text-gray-500 sm:text-sm mr-5 cursor-pointer">
                                                                <FaPlus className='w-5 h-5' onClick={incrementStraightbid} />
                                                            </button>
                                                            <button type="button" className="text-gray-500 sm:text-sm cursor-pointer">
                                                                <FaMinus className='w-5 h-5' onClick={decrementStraightbid} />
                                                            </button>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="mb-4">
                                                    <label htmlFor="maximumBid" className="block text-sm font-medium text-gray-700">
                                                        Maximum bid
                                                    </label>
                                                    <div className="mt-1 relative rounded-md shadow-sm">
                                                        <input
                                                            type="text"
                                                            name="maximumBid"
                                                            id="maximumBid"
                                                            value={maximumBid}
                                                            onChange={(e) => setMaximumBid(e.target.value)}
                                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                        />
                                                        <span className="absolute inset-y-0 right-4 flex items-center pl-3">
                                                            <button type="button" className="text-gray-500 sm:text-sm mr-5 cursor-pointer">
                                                                <FaPlus className='w-5 h-5' onClick={incrementMaxbid} />
                                                            </button>
                                                            <button type="button" className="text-gray-500 sm:text-sm cursor-pointer">
                                                                <FaMinus className='w-5 h-5' onClick={decrementMaxbid} />
                                                            </button>
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="flex justify-end">
                                                    <button
                                                        type="submit"
                                                        className={`mt-4 p-2 bg-blue-500 text-white rounded ${freezeTime ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                        disabled={freezeTime}
                                                    >
                                                        Submit
                                                    </button>
                                                </div>
                                            </form>
                                            <div className="mt-4">

                                                <p>Minimum Bid: ${product?.startingBid}</p>
                                                <span>Current Bid: $ </span>{
                                                    bids.length > 0 && (
                                                        <span >{bids[0]?.currentBid}</span>
                                                    )
                                                }
                                                <p className='mt-1 text-sm'>Ends in: {timeRemaining}</p>
                                            </div>
                                        </>) :
                                        (<div className='mt-8'>
                                            <TiTick className='mx-auto text-green-500 bg-gray-300 rounded-full w-10 h-10' />
                                            <h3 className='text-center text-lg'>Bid submitted successfully!</h3>
                                            <p className='text-center text-md'>Thank You!</p>
                                        </div>)
                                    }

                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div >
        </>
    );
}

export default ProductPage;

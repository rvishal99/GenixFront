import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
function ProductCard({ product, hidden,reversedBids2 }) {

    let [bids, setBids] = useState(product?.bids || [])
    const reversedBids = useMemo(() => {
        return [...bids].reverse();
    }, [bids]);
    // console.log(reversedBids)

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

        return `${days} day${days !== 1 ? 's' : ''} ${hours} hr${hours !== 1 ? 's' : ''} ${minutes} minute${minutes !== 1 ? 's' : ''} ${seconds} s`;
    };

    const formattedTime = formatTimeDifference(product?.endDate);

    const [timeRemaining, setTimeRemaining] = useState(formattedTime);
    const navigator = useNavigate();
    const dispatch = useDispatch();

    const userData = JSON.parse(localStorage.getItem("data"))
    // const userData = {

    // }
    const username = userData?.email?.split('@')[0];
    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeRemaining(formatTimeDifference(product?.endDate));
        }, 1000);

        return () => clearInterval(intervalId);
    }, [product?.endDate]);

    
    return (
        <div key={product?._id} className="relative mt-5 border border-gray-200 p-4 rounded shadow w-[20vw]">
            {
                (product?.createdBy === username) && <Link to={`/edit-product/${product?._id}`} className="absolute top-0 right-0 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <FaEdit />
                </Link>
            }
            <div className=' mx-auto w-[10vw] h-[20vh] flex items-center justify-center mb-5'>
                <img src={product?.image?.secure_url} alt={product?.name} className=" rounded bg-white" />
            </div>
            <div className="mt-2">
                {
                    timeRemaining !== "Ended" ? <button className='bg-green-600 rounded text-white px-3 py-1 mt-1 cursor-default'>Live Auction</button> : <button className='bg-red-600 rounded text-white px-3 py-1 mt-1 cursor-default'>Auction Ended</button>
                }
                <h3 className="mt-2 font-semibold text-lg">{product?.name}</h3>
                <p className='my-1'>Minimum Bid: ${product?.startingBid}</p>

                {(reversedBids?.length > 0) &&  !(reversedBids2?.length > 0) &&
                    <>
                        <span className='mt-2'>Current Bid: </span>
                        <span >${reversedBids[0]?.currentBid}</span>
                    </>

                }
                {!(reversedBids?.length > 0) && (reversedBids2?.length > 0) &&
                    <>
                        <span className='mt-2'>Current Bid: </span>
                        <span >${reversedBids2[0]?.currentBid}</span>
                    </>

                }
                {
                    timeRemaining !== "Ended" && <p className='mt-1 text-xs w-full'>Ends in: {timeRemaining}</p>
                }
                {
                    timeRemaining !== "Ended" && !hidden && <button className="mt-2 px-4 py-2 w-full text-white bg-gradient-to-r from-[#DB2721] to-[#5AD7FE] rounded" onClick={() => navigator(`/products/${product?._id}`)}>Bid now</button>
                }

            </div>
        </div>
    )
}

export default ProductCard
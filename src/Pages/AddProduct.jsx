import React, { useState } from 'react';
import Logo from '../assets/Logo2.png'
import { toast } from 'react-hot-toast'
import { createNewProduct } from '../Redux/Slices/productsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState('');
    const [startingBid, setStartingBid] = useState('');
    const [endDate, setEndDate] = useState('');
    const dispatch = useDispatch()
    const navigator = useNavigate()

    const userData = JSON.parse(localStorage.getItem("data"))
    // const userData = {
        
    // }

    // console.log(userData)

    const getImage = (e) => {
        e.preventDefault();
        const uploadedImage = e.target.files[0];

        if (uploadedImage) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !description || !startingBid || !endDate) {
            toast.error("Please fill all the details")
            return;
        }

        if (name.length < 3) {
            toast.error("Name Should be atleast of 3 characters")
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("startingBid", startingBid);
        formData.append("endDate", endDate);
        formData.append("image", image);
        formData.append("createdBy", userData?.email?.split('@')[0]);
        
        console.log(userData.email.split('@')[0])


        try {
            const response = await dispatch(createNewProduct(formData));

            if (response?.payload?.success) {

                setName(name)
                setDescription(description)
                setStartingBid(startingBid)
                setEndDate(endDate)
                setImage(image)

                navigator("/");
            }

            toast.success('Product added successfully');
        }
        catch (error) {
            toast.error('Error uploading image or adding product:');
        }
    };
    
    return (
        <div className="add-product">
            <div className='font-manrope mt-5  border-b border-gray-200  mb-10 p-1'>
                <div className="ml-10 flex justify-start items-center mb-2">
                    <img src={Logo} alt="Genix Auctions" className="h-12" />
                    <h2 className='font-semibold'>Genix Auctions</h2>
                </div>
            </div>
            <h1 className='text-center text-2xl font-semibold'>Add New Product</h1>
            <form onSubmit={handleSubmit} className='mx-auto w-[25vw] shadow-xl p-5'>
                <div className="mb-4">
                    <label className="block text-sm text-black font-semibold">Product Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border-[1.5px] border-gray-500  rounded mt-1"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm text-black font-semibold">Product Image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={getImage}
                        className="w-full p-2 border-[1.5px] border-gray-500  rounded mt-1"
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label className="block text-sm text-black font-semibold">Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border-[1.5px] border-gray-500  rounded mt-1"
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label className="block text-sm text-black font-semibold">Starting Bid ($): </label>
                    <input
                        type="number"
                        value={startingBid}
                        onChange={(e) => setStartingBid(e.target.value)}
                        className="w-full p-2 border-[1.5px] border-gray-500  rounded mt-1"
                        required
                        placeholder='$'
                    />
                </div>
                <div className='mb-4'>
                    <label className="block text-sm text-black font-semibold">End Date:</label>
                    <input
                        type="datetime-local"
                        min={new Date().toISOString().slice(0, 16)}
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full p-2 border-[1.5px] border-gray-500  rounded mt-1"
                        required
                    />
                </div>

                <button type="submit" className="ml-[6vw] w-1/2 py-2 bg-gradient-to-r from-blue-700 to-cyan-400 text-white rounded mb-5">Add Product</button>
            </form>
        </div>
    );
}

export default AddProduct;

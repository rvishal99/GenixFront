import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../Redux/Slices/productsSlice';

import Logo from '../assets/Logo2.png'
import Profile from '../assets/profile.jpg'
import { Link, useNavigate } from 'react-router-dom'

function MyProducts() {
    const dispatch = useDispatch();
    const [filteredProducts, setFilteredProducts] = useState([]);

    const [products, setProducts] = useState(useSelector((state) => state.products.productsData));

    console.log(products)
    const userData = JSON.parse(localStorage.getItem("data"))
    const username = userData?.email?.split('@')[0];
    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn)
  const [isOpen, setIsOpen] = useState(false);
  const capitialize = word => word.charAt(0).toUpperCase() + word.slice(1)

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
      };
    async function loadProducts() {
        await dispatch(getAllProducts());
    }
    useEffect(() => {
        loadProducts();

    }, [dispatch]);

    useEffect(() => {
        if (products && username) {
            const userProducts = products.filter(product => product.createdBy === username);
            setFilteredProducts(userProducts);
        }
    }, [products, username]);

    return (

        <>
            <div className="font-manrope flex items-center justify-between p-4 bg-pink-100">
                <Link to="/" className="flex items-center">
                    <img src={Logo} alt="Logo" className="h-10 mr-3 bg-pink-100" />
                    <h1 className="text-xl font-bold">Genix Auctions</h1>
                </Link>

                <nav className="flex items-center justify-center gap-8">
                    <Link to="/add-product" className="hover:text-blue-500">Add Product</Link>
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
            <div>
                <h1>My Products</h1>
                {filteredProducts.length > 0 ? (
                    <ul>
                        {filteredProducts.map(product => (
                            <li key={product.id}>{product.name}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No products found.</p>
                )}
            </div>
        </>
    );
}

export default MyProducts;

import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logoutAccount } from '../Redux/Slices/AuthSlice'
import { useDispatch, useSelector } from 'react-redux'
import Logo from '../assets/Logo2.png'
import Profile from '../assets/profile.jpg'
import Illustr3 from '../assets/ilustr3.png'
import { CgProfile } from "react-icons/cg";
import toast from 'react-hot-toast'
import { getAllProducts } from '../Redux/Slices/productsSlice'
import ProductCard from '../components/ProductCard'
import Footer from '../components/Footer'
function Home() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn)

  // console.log(isLoggedIn)

  const handleLogout = async (e) => {
    e.preventDefault()
    console.log("reached")

    const res = await dispatch(logoutAccount())

    if (res?.payload?.success) {
      navigate("/")
    }

  }

  const userData = JSON.parse(localStorage.getItem("data"))
  // const userData = {
        
  // }
  const username = userData?.email?.split('@')[0];

  // console.log(isLoggedIn)
  // console.log(username)

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const capitialize = word => word.charAt(0).toUpperCase() + word.slice(1)
  const auctions = useSelector((state) => state?.products).productsData


  // console.log(auctions)

  async function loadProducts() {
    await dispatch(getAllProducts());

  }

  useEffect(() => {
    loadProducts()
  }, [])
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

      {!isLoggedIn && <div className="flex flex-col items-center justify-center h-screen bg-white">
        <img src={Illustr3} alt="Home" className='w-[75%]' />
      </div>
      }

      <div className="font-manrope mb-8 container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-4">
          {
            isLoggedIn ? `Welcome ${userData?.firstName} !` : 'Explore Auctions'
          }
        </h2>
        <div className="grid grid-cols-3 lg:grid-cols-4 ">
          {
            auctions.map((product, index) => (
              <ProductCard key={product._id} product={product} hidden={false} />
            ))
          }
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home
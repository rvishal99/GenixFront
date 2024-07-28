import React from 'react';
import Logo from '../assets/Logo.png';
import Footer from '../components/Footer';

function AboutUs() {
    return (
        <>
            <div className='h-[87vh]'>
                <div className='font-manrope mt-5 border-b border-gray-200 mb-10 p-1'>
                    <div className="ml-10 flex justify-start items-center mb-2">
                        <img src={Logo} alt="Genix Auctions" className="h-12" />
                        <h2 className='font-semibold'>Genix Auctions</h2>
                    </div>
                </div>
                <div className="font-manrope ml-10 mr-10 text-cyan-700">
                    <h1 className="text-2xl text-center font-bold ">
                        Welcome to Genix Auctions!
                    </h1>
                    <p className='text-lg mt-10 mx-auto w-[70%] leading-relaxed py-3'>
                        We are a leading online auction platform dedicated to providing a secure and reliable space for buyers and sellers to connect and trade valuable items. Our mission is to revolutionize the auction experience by leveraging cutting-edge technology and delivering exceptional customer service.
                    </p>

                </div>
            </div>
            <Footer />
        </>
    );
}

export default AboutUs;

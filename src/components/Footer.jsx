import React from 'react'
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from 'react-icons/bs'


function Footer() {
  const currDate = new Date();
  const year = currDate.getFullYear();

  return (
    <>
      <footer className='relative mt-10 sm:mt-0 left-0 bottom-0 h-[10vh] text-white flex flex-col sm:flex-row items-center justify-between bg-gray-800 py-2 sm:py-5 sm:px-4 md:px-8 lg:px-16'>
        <section className="text-sm sm:text-lg md:text-lg lg:text-lg">
          Copyright © {year} | All rights reserved by Genix.
        </section>
        <section className="flex items-center justify-center gap-3 sm:gap-5 text-lg text-white">
          <a href="" className="hover:text-yellow-500 transition-all ease-in-out duration-300 ">
            <BsFacebook /> 
          </a>
          <a href="" className="hover:text-yellow-500 transition-all ease-in-out duration-300 ">
            <BsInstagram /> 
          </a>
          <a href="" className="hover:text-yellow-500 transition-all ease-in-out duration-300 ">
            <BsLinkedin /> 
          </a>
          <a href="" className="hover:text-yellow-500 transition-all ease-in-out duration-300 ">
            <BsTwitter /> 
          </a>
        </section>
      </footer>
    </>
  )
}

export default Footer
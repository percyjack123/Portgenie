import React from 'react';
import { Link } from 'react-router-dom';
import design from '../assets/designs.svg'
import SignUp from '../Pages/SignUp';

const Navbar = () => {
  return (
   <nav className='sticky top-5 z-50 backdrop-blur-sm bg-[#ffa56d2f] rounded-xl border-[#F16001] border text-[#F16001] p-2 m-2 mt-5 w-200 text-lg justify-between items-center'>
    <style>{`html { scroll-behavior: smooth; }`}</style>
    <div className='container mx-auto flex justify-between items-center px-8 '>
<div className=' rounded-full p-1 h-6 w-6 scale-700 object-center '><img src={design} alt="" /></div>
        <ul className='flex space-x-6 '>
             <li><a href="#home" className="hover:text-white transition-all duration-200 hover:scale-105 ">Home</a></li>
             <li><a href="#features" className="hover:text-white transition-all duration-200 hover:scale-105 ">Features</a></li>
          <li><a href="#howitworks" className="hover:text-white transition-all duration-200 hover:scale-105 ">How It Works</a></li>
          
          <li><a href="#templates" className="hover:text-white transition-all duration-200 hover:scale-105 ">Templates</a></li>
          <li><a href="#contactus" className="hover:text-white transition-all duration-200 hover:scale-105 ">Contact Us</a></li>
            <li>
                <Link to="/SignUp" className="hover:text-gray-200 duration-150 text-white  hover:bg-[#ffa56d00] bg-[#E85102] p-1 px-3 border border-[#E85102] rounded-lg">Join Now</Link>
            </li>
        </ul>
    </div>
   </nav>
  );
};

export default Navbar;

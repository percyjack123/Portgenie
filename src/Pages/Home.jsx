import { useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import port from '../assets/portfolio.svg'
import Card from '../components/Card.jsx'
import Howitworks from '../components/Howitworks.jsx'
import frame1 from '../assets/Frame22.svg'
import frame2 from '../assets/Frame23.svg'
import frame3 from '../assets/Frame24.svg'
import group from '../assets/Group 5.svg'

const template=[frame1,frame2,frame3];
const Home = () => {
  const [currentTemplate, setCurrentTemplate] = useState(0);

  const nextTemplate = () => {
    setCurrentTemplate((prev) => (prev + 1) % template.length);
  };

  const prevTemplate = () => {
    setCurrentTemplate((prev) => (prev - 1 + template.length) % template.length);
  };
  return (
    <><div className='flex flex-col min-h-screen bg-[#0A0502] items-center'>
      <section id='home'></section>
      <Navbar/>
      <div className='font-bold  text-[#F16001] m-5 text-[55px]' >PortGenie</div>
      <div className='font-semibold text-[#CB8A60] m-4 text-[20px] overflow-hidden'>Build and share your personal portfolio in minutes—no coding needed.</div>
      <div className='m-3'>
        <button className='text-white text-[25px] hover:scale-105 duration-300 bg-linear-to-r from-[#732902] to-[#1B0A03] rounded-xl p-2 px-8 hover:cursor-pointer'>Explore Now</button>
      </div>
      <div className='relative isolate w-full max-w-lg mt-4'>
        <div className='bg-linear-to-r from-[#B53F02] via-[#E85102] to-[#822D01] absolute -inset-1 blur-3xl h-60  w-137 opacity-30'aria-hidden='true'></div>
        <img src={port} alt="image" className='w-full h-100 mt-3  relative' />
      </div>
      <section id='features'></section>
      <section className='font-bold  text-[#F16001] m-6 mt-15 text-[35px]' >Features</section>
      <div className='flex m-9'>
        <Card>
         <div className='flex flex-col items-center justify-center h-full p-2'>
            <h3 className='font-semibold text-white text-2xl mb-10 text-center'>
              Easy Portfolio <span className='text-[#F16001]'>Generation</span>
            </h3>
            
            <p className='text-white text-center px-6'>
              Input your details & get a portfolio instantly.
            </p>
          </div>
        </Card>
        <Card> <div className='flex flex-col items-center justify-center h-full p-2'>
            <h3 className='font-semibold text-white text-2xl mb-10 text-center '>
              Export & <span className='text-[#F16001]'>Share</span>
            </h3>
            
            <p className='text-white text-center px-6'>
              Download as PDF or share your portfolio easily.
            </p>
          </div></Card>
        <Card> <div className='flex flex-col items-center justify-center h-full '>
            <h3 className='font-semibold text-white text-2xl mb-4 text-center'>
              Template & Theme <span className='text-[#F16001]'>Flexibility</span>
            </h3>
            
            <p className='text-white text-center px-6'>
              Choose from stunning layouts in light & dark modes.
            </p>
          </div></Card>
      </div>
      <div className='text-gray-300 font-light mt-8 text-lg italic '>No code.
        No stress.
        Just generate.</div>
        <section id='howitworks'></section>
       <section className='font-bold  text-[#F16001] m-6 mt-15 text-[35px]' >How It Works</section> 
       <Howitworks></Howitworks>
     <section id='templates'></section> 
      <section className='font-bold  text-[#F16001]  mt-15 text-[35px]' >Templates</section> 
      <div className='font-semibold text-gray-400 mt-4 text-[15px] overflow-hidden'>Templates that Speak for You</div>
     <section id="template" className="flex flex-col items-center px-4 py-16"> 
        <div className='flex items-center justify-center w-full max-w-3xl'>
         
          <button onClick={prevTemplate} className='text-white hover:bg-[#ffa56d00] bg-[#E85102] border border-[#E85102] rounded-full cursor-pointer h-12 w-12 shrink-0 flex items-center justify-center mr-2 text-2xl'>
            &lt;
          </button>
          
        
          <div className='w-full overflow-hidden'>
            <img src={template[currentTemplate]} className='p-2 sm:p-9 w-full h-auto relative rounded-3xl' alt="template1" />
          </div>
          
        
          <button onClick={nextTemplate} className='text-white hover:bg-[#ffa56d00] bg-[#E85102] border border-[#E85102] rounded-full cursor-pointer h-12 w-12 shrink-0 flex items-center justify-center ml-2 text-2xl'>
            &gt;
          </button>
        </div>
      </section>
      <div className='text-gray-300 font-light mt-8 text-lg italic overflow-hidden max-w-lg text-center
      '>Choose from hand-crafted portfolio templates, each designed to match a different vibe 
      — from minimal to bold, creative to professional.</div>
         <section id='contactus'></section> 
      <section className='font-bold  text-[#F16001]  mt-20 text-[35px]' >Get in touch with us.</section> 
      <div>
        <img src={group} className=' pt-3 relative' alt="ray" />
       </div>
       <div className='flex text-white  justify-between  '>
        <div>
          <ul className='text-left text-gray-400 px-40 '>
            <li className='text-white text-bold text-lg'>FAQ</li>
            <li><a href="#">How do I start?</a></li>
            <li><a href="#">Is it free?</a></li>
          </ul>
        </div>
        <div>
          <ul className='text-left text-gray-400 px-40'>
            <li className='text-white text-bold text-lg'>Links</li>
            <li className='transition-all duration-300 hover:scale-105'><a href="#home">Home</a></li>
            <li className='transition-all duration-300 hover:scale-105'><a href="#features">Features</a></li>
            <li className='transition-all duration-300 hover:scale-105'><a href="#howitworks">How It Works</a></li>
            <li className='transition-all duration-300 hover:scale-105'><a href="#contactus">Contact Us</a></li>
          </ul>
        </div>
        <div>
          <ul className='text-left text-gray-400 px-40'>
            <li className='text-white text-bold text-lg'>Social </li>
            <li><a href="#">Instagram</a></li>
             <li><a href="#">Gmail</a></li>
            <li><a href="#">Linkedin</a></li>
            <li><a href="#">Phone</a></li>
          </ul>
        </div>
       </div>
       <div className='text-gray-400 mt-20 text-right mx-0 my-1 '>© 2025 PortGenie. All rights reserved.
</div>
      </div> 

    </>
  )
}

export default Home

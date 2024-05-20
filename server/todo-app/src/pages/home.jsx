import logo from '../../public/front-img.png';
import { NavLink } from 'react-router-dom';
import One from '../components/one';
import Two from '../components/two';
import Three from '../components/three';
import React, { useEffect, useRef } from 'react';

const Home = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    const scrollInterval = setInterval(() => {
      // Adjust the amount you want to scroll by changing the value (e.g., 10)
      const scrollAmount = window.innerHeight * 0.8; // Get viewport height
      container.scrollBy({
        top: scrollAmount,
        behavior: 'smooth',
      });
    }, 10000); // Interval in milliseconds (e.g., 1000ms = 1 second)

    // Clean up the interval on component unmount
    return () => clearInterval(scrollInterval);
  }, []);
  return (
    <div ref={containerRef} className='snap-y snap-mandatory overflow-y-scroll overflow-x-hidden h-[100vh]'>
      <section className='h-[100vh] flex justify-center items-center flex-col snap-start'>
        <One />
      </section>
      <section className='h-[100vh] flex justify-center items-center flex-col snap-start'>
        <Two />
      </section>
      <section className='h-[100vh] flex justify-center items-center flex-col snap-start'>
        <Three />
      </section>
    </div>



    // <section className='h-full w-full relative'>
    //     <div className='flex flex-row space-x-[15vw] justify-center items-center mt-[40vh]'>
    //         <div className='flex flex-col'>
    //             <h1 className='text-[40px] font-bold text-[#3e53a8]'>Welcome to Taskify</h1>
    //             <p className='text-[20px] mb-4 text-black'>Schedule your dailies</p>
    //             <button className='bg-[#4a7cfa] rounded-[90px] w-[150px] p-[10px] text-white'><NavLink to='/Signup'>Sign-up</NavLink></button>
    //         </div>
    //         <img className='h-[150px] w-[200px] md:h-[200px] md:w-[300px]' src={logo} alt="logo" />
    //     </div>
    // </section>
  )
}

export default Home;
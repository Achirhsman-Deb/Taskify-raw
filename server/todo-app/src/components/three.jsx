import React from 'react'
import logo from '../../public/front-img.png';
import { NavLink } from 'react-router-dom';

const Three = () => {
  return (
    <div className='bg-[#3260e1] h-full w-full flex justify-center items-center text-xl'>
        <div className='flex flex-row space-x-1 md:space-x-[15vw] justify-center items-center'>
             <div className='flex flex-col'>
                <h1 className='text-[40px] font-bold mb-2 text-[#15204b]'>Let's Taskify</h1>
                 <p className='text-[20px] font-light mb-4 text-black'>and organize your day</p>
                <button className='bg-[#1e429c] rounded-[90px] w-[150px] p-[10px] text-white'><NavLink to='/Signup'>Sign-up</NavLink></button>
            </div>
            <img className='h-[150px] w-[200px] md:h-[200px] md:w-[300px]' src={logo} alt="logo" />
        </div>
    </div>
  )
}

export default Three
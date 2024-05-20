import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authActions } from '../store';
import { useDispatch } from 'react-redux';

const Navbar = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state)=>state.isLoggedIn);
    const logout = () =>{
        sessionStorage.clear("id");
        localStorage.clear();
        dispatch(authActions.logout());
    }
  return (
    <header className='header'>
        <NavLink to="/" className="w-10 h-10 rounded-lg bg-white items-center justify-center flex font-bold shadow-md">
            <p className='text-blue-600'>TY</p>
        </NavLink>
        <nav className='flex text-lg gap-7 font-medium items-center'>
            <NavLink to="/about" className={({ isActive }) => isActive ? 'text-[#4a7cfa]' : 'text-white'}>
                About
            </NavLink>
            {isLoggedIn && <><NavLink to="/TodoMain" className={({ isActive }) => isActive ? 'text-[#4a7cfa]' : 'text-white'}>
                To-do
            </NavLink></>}
            {!isLoggedIn && <><NavLink to="/Login" className={({ isActive }) => isActive ? 'text-blac bg-[#4a7cfa] p-[10px] rounded-[20px]' : 'text-white bg-[#4a7cfa] p-[10px] rounded-[20px]'}>
                Login
            </NavLink></>}
            {isLoggedIn && <><NavLink to="/" className='text-white' onClick={logout}>
                Sign-out
            </NavLink></>}
        </nav>
    </header>
  )
}

export default Navbar;
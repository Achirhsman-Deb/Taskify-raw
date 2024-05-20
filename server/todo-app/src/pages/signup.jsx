import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../store';

const Signup = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [Inputs, setInputs] = useState({
    email: "",
    username: "",
    password: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value })
  };

  const submit = async (e) => {
    e.preventDefault();
    await axios.post(`${window.location.origin}/api/auth/register`, Inputs).then((response) => {
      if(response.data.message === "User Already Exsists"){
        alert(response.data.message);
      }else{
        alert(response.data.message);
        setInputs({
          email: "",
          username: "",
          password: "",
        });
        sessionStorage.setItem("id",response.data.others._id);
        dispatch(authActions.login());
        history("/Login")
      }
    });
  };

  return (
    <section className='h-[100vh] w-full relative flex items-center justify-center bg-gray-900'>
      <div className='flex items-center justify-center flex-col h-[70vh] w-[40vw] rounded-[30px] border-2 border-[#574cf3] bg-transparent text-white'>
        <h1 className='text-4xl font-bold text-white'>Sign-in</h1>
        <div className='mt-[5vh]'>
          Email
          <input
            type="email"
            name='email'
            className='bg-[#dfdfdf] border border-[#302899] text-black text-sm rounded-lg block w-[30vw] p-2.5 mb-[20px]'
            placeholder="abc@gmail.com"
            onChange={change}
            value={Inputs.email}
          />
          Username
          <input
            type="text"
            name='username'
            className='bg-[#dfdfdf] border border-[#302899] text-black text-sm rounded-lg block w-[30vw] p-2.5 mb-[20px]'
            placeholder='Mason'
            onChange={change}
            value={Inputs.username}
          />
          Password
          <input
            type="password"
            name='password'
            className='bg-[#dfdfdf] border border-[#302899] text-black text-sm rounded-lg block w-[30vw] p-2.5'
            placeholder='123@'
            onChange={change}
            value={Inputs.password}
          />
        </div>
        <button className='bg-[#4a7cfa] rounded-[90px] mt-[30px] w-[100px] p-[10px] text-white' onClick={submit}>Sign-in</button>
        <p>Already have an account? <button className='text-[#302899] mt-[20px]'><NavLink to='/Login'>Login</NavLink></button></p>
      </div>
    </section>
  )
}

export default Signup;
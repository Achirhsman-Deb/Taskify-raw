import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../store';


const Login = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [Inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value })
  };

  const submit = async () => {
    await axios.post(`${window.location.origin}/api/auth/login`, Inputs).then((response) => {
      if(response.data.message === "User Already Exsists"){
        alert(response.data.others._id);
      }else{
        alert(response.data.message);
        sessionStorage.setItem("id",response.data.others._id);
        setInputs({
          email: "",
          password: "",
        });
        dispatch(authActions.login());
        history("/TodoMain");
      }
    });
  };

  return (
    <section className='h-[100vh] w-full relative flex items-center justify-center bg-gray-900'>
      <div className='flex items-center justify-center flex-col h-[70vh] w-[40vw] rounded-[30px] border-2 border-[#1e429c] bg-transparent text-white'>
        <h1 className='text-4xl font-bold text-white'>Log-in</h1>
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
        <button className='bg-[#4a7cfa] rounded-[90px] mt-[30px] w-[100px] p-[10px] text-white' onClick={submit}>Log-in</button>
        <p>Need an account? <button className='text-[#302899] mt-[20px]'><NavLink to='/Signup'>SignUp</NavLink></button></p>
      </div>
    </section>
  )
}

export default Login;
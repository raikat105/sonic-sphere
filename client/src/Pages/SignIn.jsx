import React, { useState } from 'react';
import './SignUp.css';
import {Link, useNavigate} from 'react-router-dom';
import music from './music1.avif';
import logo from './logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInFailure, signInSuccess } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id] : e.target.value
    })
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch ('/api/auth/signin', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body : JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/profile');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  }
  console.log(formData);

  return (
    <div className='main-div1'>
      <img src={music} className='img1' />
      <div>
          <div className='main-div2'>
            <img src={logo} className='img2' />
            <h1>
                <span className='logo1'>Sonic</span>
                <span className='logo2'>Sphere</span>
            </h1>
          </div>
        <div className='div1'>
          <h1 className='sign'>Sign In</h1>
          <form className='form1' onSubmit={handleSubmit}>
            <input type='text' placeholder='Username' className='input1' id='username' onChange={handleChange}/>
            <input type='password' placeholder='Password' className='input1' id='password' onChange={handleChange}/>
            <button disabled={loading} className='btn'>{loading ? 'LOADING...' : 'SIGN UP'}</button>
            <p className='con'>else continue with</p>
            <OAuth className='auth'/>
          </form>
        </div>
        <div className='div2'>
          <p>Not having an account? </p>
          <Link to={"/sign-up"} style={{textDecoration: 'none'}}>
            <span className='link1'>Sign Up</span>
          </Link>
        </div>
        {error && <p className='err'>{error}</p>}
      </div>
    </div>
  )
}


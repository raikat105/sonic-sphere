import React, { useState } from 'react';
import './SignUp.css';
import {Link, useNavigate} from 'react-router-dom';
import music from './music.avif';
import logo from './logo.png';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id] : e.target.value
    })
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch ('/api/auth/signup', 
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
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }
  console.log(formData);

  return (
    <div className='main-div1'>
      <div>
          <div className='main-div2'>
            <img src={logo} className='img2' />
            <h1>
                <span className='logo1'>Sonic</span>
                <span className='logo2'>Sphere</span>
            </h1>
          </div>
        <div className='div1'>
          <h1 className='sign'>Sign Up</h1>
          <form className='form1' onSubmit={handleSubmit}>
            <input type='text' placeholder='Username' className='input1' id='username' onChange={handleChange}/>
            <input type='email' placeholder='Email' className='input1' id='email' onChange={handleChange}/>
            <input type='password' placeholder='Password' className='input1' id='password' onChange={handleChange}/>
            <button disabled={loading} className='btn'>{loading ? 'LOADING...' : 'SIGN UP'}</button>
          </form>
        </div>
        <div className='div2'>
          <p>Have an account? </p>
          <Link to={"/sign-in"} >
            <span className='link1'>Sign In</span>
          </Link>
        </div>
        {error && <p className='err'>{error}</p>}
      </div>
      <img src={music} className='img1' />
    </div>
  )
}

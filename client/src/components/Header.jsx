import React from 'react';
import './Header.css';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from './logo.png';

export default function Header() {
  return (
    <header className='header'>
        <div className='head'>
            <Link to='/' style={{textDecoration: 'none'}}>
            <div className='main-div'>
              <img src={logo} className='img' />
              <h1>
                  <span className='logo1'>Sonic</span>
                  <span className='logo2'>Sphere</span>
              </h1>
            </div>
            </Link>
            <form className='form'>
                <input type='text' placeholder='Search For A Song...' className='input'/>
                <FaSearch />
            </form>
        </div>
    </header>
  )
}

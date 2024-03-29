import React from 'react';
import google from './google.png';
import './Header.css';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const  auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);

            const res = await fetch('api/auth/google', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({name: result.user.displayName, email: result.user.email, photo: result.user.photoURL}),
            });
            const data = await res.json();
            dispatch(signInSuccess(data));
            navigate('/profile');
        } catch (error) {
            console.log('Couldnot sign in with Google. Error code: ', error);
        }
    }
  return (
    <img src={google} onClick={handleGoogleClick} className='google'/>
  )
}

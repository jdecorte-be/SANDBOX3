import { useState } from 'react';
import axios from 'axios';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate} from "react-router-dom";
import {Route, Routes, Link, Router} from "react-router-dom";

export const SignUp = () => {
  const [Login, setLogin] = useState('');
  const [Password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const navigate = useNavigate();
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log('uh');
    const formData = new FormData(event.currentTarget);
    const form = {
      Login: formData.get('Login'),
      Password: formData.get('Password'),
      phoneNumber: formData.get('tel'),
    };
    axios
      .post('http://localhost:3001/app/auth/signup', form, {
        headers: {},
      })
      .then((response) => {
        document.cookie = response.data.Authorization;
        console.log(response.data.Authorization);
        navigate('/SignIn');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='flex-container'>
      <div>
      <h1 className='text-center'>SIGNUP</h1>
        <form onSubmit={handleSubmit}>
          <div className="mc-menu">
          <input className="mc-button full"
            required
            type="text"
            name="Login"
            maxLength={15}
            placeholder="Login"
            value={Login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <input className="mc-button full"
            required
            type="Password"
            name="Password"
            maxLength={15}
            placeholder="Password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input className="mc-button full"
            type="tel"
            name="tel"
            maxLength={15}
            placeholder="2FA phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          </div>
            <button className="mc-button full">SUBMIT</button>
        </form>
      </div>
    </div>
  );
};

import { useState } from 'react';
import axios from 'axios';

export const SignUp = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const form = {
      login: formData.get('login'),
      password: formData.get('password'),
      phoneNumber: formData.get('tel'),
    };
    axios
      .post('http://localhost:3001/app/auth/signup', form)
      .then((res) => {
        if (res.data.user.code === '23505') {
          if (res.data.user.detail.includes('login')) {
            console.log('Login already in use.');
          } else {
            console.log('Phone number already in use.');
          }
        }
        if (res.data.status !== 400) {
          console.log(res.data);
          sessionStorage.setItem('currentUser', res.data.user.id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>SIGNUP</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            required
            type="text"
            name="login"
            maxLength={15}
            placeholder="login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <input
            required
            type="password"
            name="password"
            maxLength={15}
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="tel"
            name="tel"
            maxLength={15}
            placeholder="2FA phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <button type="submit">
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
};
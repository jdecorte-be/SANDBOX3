import axios from 'axios';
import { useState } from 'react';

export const SignIn = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const form = {
      login: formData.get('login'),
      password: formData.get('password'),
    };
    axios
      .post('http://localhost:3001/app/auth/signin', form, {
        headers: {},
      })
      .then((response) => {
        console.log('+++', response.data.foundUser);
        console.log('token = ', response.data.cookie);
        sessionStorage.setItem('currentUser', response.data.foundUser.id);
        console.log('---->', sessionStorage.getItem('currentUser'));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>SIGNIN</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="login"
            placeholder="login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">SUBMIT</button>
        </form>
      </div>
    </div>
  );
};

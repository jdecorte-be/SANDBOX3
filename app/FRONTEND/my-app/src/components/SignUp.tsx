import { useState } from 'react';
import axios from 'axios';

export const SignUp = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const form = {
      login: formData.get('login'),
      password: formData.get('password'),
    };
    setLogin('');
    setPassword('');
    axios.post('http://localhost:3001/app/auth/signup', form);
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
          <input type="file" name="avatar" id="avatar" />
          <button type="submit">SUBMIT</button>
        </form>
      </div>
    </div>
  );
};

import axios from 'axios';
import { useState } from 'react';

export const SignIn = ({ onSubmit }: { onSubmit: () => void }) => {
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
      .then((res) => {
        sessionStorage.setItem('currentUser', res.data.foundUser.id);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
      onSubmit();
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

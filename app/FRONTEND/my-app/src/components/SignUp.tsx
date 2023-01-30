/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import { WebsocketContext } from '../contexts/WebsocketContext';

export const SignUp = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const socket = useContext(WebsocketContext);
  useEffect(() => {
    socket.on('register', (user) => {
      // User attempting to register
      console.log('register---> ', user);
    });
    socket.on('signup_error', (data) => {
      // New user and checking for duplicate
      console.log('signup error--> ', data);
      if (parseInt(data.code) === 23505) {
        console.log('Login already in use');
      }
    });
    return () => {
      socket.off('register');
      socket.off('signup_error');
    };
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const form = {
      login: formData.get('login'),
      password: formData.get('password'),
    };
    setLogin('');
    setPassword('');
    socket.emit('register', form);
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
          <input type="file" name="avatar" id="avatar"/>
          <button type="submit">SUBMIT</button>
        </form>
      </div>
    </div>
  );
};

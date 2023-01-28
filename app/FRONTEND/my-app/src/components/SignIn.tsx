/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import { WebsocketContext } from '../contexts/WebsocketContext';

export const SignIn = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const socket = useContext(WebsocketContext);
  useEffect(() => {
    socket.on('login', (user) => {
      // User logged in
      console.log('login---> ', user);
    });
    socket.on('logged', (token) => {
      // User access token
      console.log('logged ---> ', token);
    });
    return () => {
      socket.off('logged');
      socket.off('login');
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
    socket.emit('login', form);
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

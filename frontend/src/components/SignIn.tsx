import axios from 'axios';
import { useState } from 'react';
import { useNavigate} from "react-router-dom";

export const SignIn = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log()
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
        document.cookie = response.data;
        console.log('token = ', response.data);
        sessionStorage.setItem('currentUser', login);
        navigate('/CoPage');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='flex-container'>
      <div>
      <h1 className='text-center'>SIGNIN</h1>
        <form onSubmit={handleSubmit}>
          <div className="mc-menu">
            <input className="mc-button full"
              type="text"
              name="login"
              placeholder="login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
            <input className="mc-button full"
              type="password"
              name="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
            <button className="mc-button full">SUBMIT</button>
        </form>
      </div>
    </div>
  );
};

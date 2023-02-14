import React from 'react';
import {useRef} from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const Search = () => {
    const [Login, setLogin] = React.useState('');
    const [Password, setPassword] = React.useState('');
    const [Tel, setTel] = React.useState('');

    const handleSubmitButton = (event:any) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const form = {
            Login: formData.get('Login'),
            Password: formData.get('Password'),
            Tel: formData.get('Tel'),
        };
        console.log('form = ', form);
      }
    const inputRef = useRef(null);
    return (
      <div className='container'>
        <div>
          <form onSubmit={handleSubmitButton}>
          <input type="text" 
          name="Login"
          placeholder="Login"
          value={Login}
          onChange={(e) => setLogin(e.target.value)}
          />
          <div/>
          <input type="password"
          name="Password"
          placeholder="Password"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
          />
          <div/>
          <input type="text"
          name="Tel"
          placeholder="Tel"
          value={Tel}
          onChange={(e) => setTel(e.target.value)}
          />
          <div/>
          <Button as="input" type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  };

export default Search;
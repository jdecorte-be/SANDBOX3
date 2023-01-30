/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import './App.css';
import { SignUp } from './components/SignUp';
import { SignIn } from './components/SignIn';
import { Code2FA } from './components/Code2FA';
import axios from "axios";
const click = () => {
    axios
        .get('http://localhost:3001/app/auth/who', {
            headers: { Authorization: document.cookie },
        })
        .then((response) => {
            console.log('Login -> ',response.data.login);
        })
        .catch((error) => {
            console.log(error);
        });
}

function App() {
  return (
      <>
        <SignUp />
        <SignIn />
        <Code2FA />
        <button onClick={click}>Who</button>
      </>
  );
}

export default App;

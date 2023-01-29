/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import './App.css';
import { SignUp } from './components/SignUp';
import { SignIn } from './components/SignIn';
import { Code2FA } from './components/Code2FA';

function App() {
  return (
      <>
        <SignUp />
        <SignIn />
        <Code2FA />
      </>
  );
}

export default App;

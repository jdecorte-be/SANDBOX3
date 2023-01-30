/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import './App.css';
import { WebsocketProvider, socket } from './contexts/WebsocketContext';
import { SignUp } from './components/SignUp';
import { SignIn } from './components/SignIn';

function App() {
  return (
    <WebsocketProvider value={socket}>
      <SignIn />
    </WebsocketProvider>
  );
}

export default App;

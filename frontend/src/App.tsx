/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import './App.css';
import { SignUp } from './components/SignUp';
import { SignIn } from './components/SignIn';
import { Code2FA } from './components/Code2FA';
import { FileUpload } from './components/FileUpload';
import { Profile } from './components/Profile';
import axios from 'axios';
import { Leaderboard } from './components/Leaderboard';
import { Gaming } from './components/Canvas';
import { Chat } from './components/Chat/chat';
import { MantineProvider } from '@mantine/styles';
import { NotificationsProvider } from '@mantine/notifications';
import { ApolloProvider } from '@apollo/client';
import { client } from './apollo/apolloProvider';
import { WebsocketProvider, socket } from './contexts/WebsocketContext';

function App() {
  const [userName, setUserName] = useState('');

  const click = () => {
    axios
      .get('http://localhost:3001/app/auth/who', {
        headers: { Authorization: document.cookie },
      })
      .then((response) => {
        setUserName(response.data.login);
        console.log('Login -> ', response.data.login);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  let game = new Gaming(1000, 1000);

  const addLobby = () => {
    game.socket.emit('CreateLobby', (data: any) => {
      console.log(data);
    });
  };
  const joinLobby = () => {
    game.socket.emit('JoinLobby', (data: any) => {
      console.log(data);
    });
  };
  const leaveLobby = () => {
    game.socket.emit('LeaveLobby', (data: any) => {
      console.log(data);
    });
  };
  const printLobby = () => {
    game.socket.emit('LobbyInfo', (data: any) => {
      console.log(data);
    });
  };
  return (
    <MantineProvider withNormalizeCSS withGlobalStyles>
    <NotificationsProvider>
          <ApolloProvider client={client}>
            <WebsocketProvider value={socket}>
                <SignUp />
                <SignIn />
                <button onClick={click}>Who</button>

                <Chat username={userName}></Chat>
            </WebsocketProvider>
          </ApolloProvider>
          </NotificationsProvider>
    </MantineProvider>
      // <FileUpload />
      // <Code2FA />
      // <Profile />
      // <Leaderboard />
      // {<button onClick={addLobby}>Create Lobby</button>}
      // {<button onClick={joinLobby}>Join Lobby</button>}
      // {<button onClick={leaveLobby}>Leave Lobby</button>}
      // {<button onClick={printLobby}>Print Lobby</button>} */}

  );
}
export default App;

/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import './App.css';
import { WebsocketProvider, socket } from './contexts/WebsocketContext';
import { SignUp } from './components/SignUp';
import { SignIn } from './components/SignIn';
import { ApolloProvider } from '@apollo/client';
import { client } from './apollo/apolloProvider';
import { CreateChat } from './components/Chat/createChat';
import { ListChat } from './components/Chat/listChat';
import { Chat } from './components/Chat/chat';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

function App() {
  return (
    <MantineProvider withNormalizeCSS withGlobalStyles>
    <NotificationsProvider>
          <ApolloProvider client={client}>
            <WebsocketProvider value={socket}>

                {/* <SignIn /> */}
                <Chat></Chat>
            </WebsocketProvider>
          </ApolloProvider>
          </NotificationsProvider>
    </MantineProvider>
  );
}

export default App;

/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import './App.css';
import { SignUp } from './components/SignUp';
import { SignIn } from './components/SignIn';
import { Code2FA } from './components/Code2FA';
import axios from "axios";
import {Gaming} from "./components/Canvas";

function App() {
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
    console.log('test');
    let game = new Gaming(1000,1000);

    const addLobby = () => {
        game.socket.emit('CreateLobby', (data:any) => {
            console.log(data);
        });
    }
    const joinLobby = () => {
        game.socket.emit('JoinLobby', (data:any) => {
            console.log(data);
        });
    }
    const leaveLobby = () => {
        game.socket.emit('LeaveLobby', (data:any) => {
            console.log(data);
        });
    }
    const printLobby = () => {
        game.socket.emit('LobbyInfo', (data:any) => {
            console.log(data);
        });
    }
    return (
        <>
            <SignUp />
            <SignIn />
            <Code2FA />
            <button onClick={click}>Who</button>
            <button onClick={addLobby}>Create Lobby</button>
            <button onClick={joinLobby}>Join Lobby</button>
            <button onClick={leaveLobby}>Leave Lobby</button>
            <button onClick={printLobby}>Print Lobby</button>
        </>
    );
}

export default App;
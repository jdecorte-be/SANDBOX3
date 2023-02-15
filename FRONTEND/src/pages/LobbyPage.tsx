import { game } from "./All";
import axios from "axios";
import { useNavigate} from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navb from "../components/NavBar";
import {Route, Routes, Link, Router} from "react-router-dom";

function LobbyPage() {

    const Navigate = useNavigate();
    const click = () => {
        axios.get('http://localhost:3001/app/auth/who', {
            headers: { Authorization: document.cookie },
        }).then((response) => {
            console.log('Login -> ',response.data.login);
        }).catch((error) => {
            console.log(error);
        });
    }
    const addLobby = () => {
            game.socket.emit('CreateLobby').then(() => {
                alert("Lobby Created");
            });
    }
    const addRainbowLobby = () => {
        game.socket.emit('CreateRainbowLobby');
    }
    const joinLobby = () => {
        game.socket.emit('JoinLobby');
    }
    const leaveLobby = () => {
        game.socket.emit('LeaveLobby')
    }
    const printLobby = () => {
        game.socket.emit('LobbyInfo');
    }
    const SpectateLobby = () => {
            game.socket.emit('Spectate');
    }

    game.socket.on('Waiting Room', () => {
        Navigate('/RoomWaiting');
    });
    game.socket.on('Ready', () => {
        Navigate('/Game');
    });
    game.socket.on('SpectateReady', () => {
        Navigate('/Spectate');
    });

    game.socket.on('Test', () => {
        Navigate('/Disconnected');
    });

    return (
        <div>
            <Navb/>
            <div className="flex-container">
                <div className="mc-menu">
                    <div className="mc-button full">
                        <Nav.Link onClick={addLobby} className="title">Create Lobby</Nav.Link>
                    </div>
                    <div className="mc-button full">
                        <Nav.Link as={Link} to="/Settings" className="title">Find Lobby</Nav.Link>
                    </div>
                    <div className="mc-button full">
                        <Nav.Link as={Link} to="/Profile" className="title">Spectate Lobby</Nav.Link>
                    </div>
                </div>
            </div>
        </div>);
}

export default LobbyPage;
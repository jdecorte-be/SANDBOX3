import { game } from "./All";
import axios from "axios";
import { useNavigate} from "react-router-dom";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

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
            game.socket.emit('CreateLobby');
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
            <button onClick={click}>Who</button>
            <button onClick={addLobby}> ADD CLASSIC LOBBY </button>
            <button onClick={addRainbowLobby}> ADD RAINBOW MODE LOBBY </button>
            <button onClick={joinLobby}> JOIN LOBBY </button>
            <button onClick={leaveLobby}> LEAVE LOBBY </button>
            <button onClick={printLobby}> PRINT LOBBY INFO </button>
            <button onClick={SpectateLobby}> SPECTATE </button>
        </div>);
}

export default LobbyPage;
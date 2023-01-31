import { game } from "./All";
import axios from "axios";

function LobbyPage() {

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
    const joinLobby = () => {
        game.socket.emit('JoinLobby');
    }
    const leaveLobby = () => {
        game.socket.emit('LeaveLobby')
    }
    const printLobby = () => {
        game.socket.emit('LobbyInfo');
    }

    return (
        <div>
            <button onClick={click}>Who</button>
            <button onClick={addLobby}> ADD LOBBY </button>
            <button onClick={joinLobby}> JOIN LOBBY </button>
            <button onClick={leaveLobby}> LEAVE LOBBY </button>
            <button onClick={printLobby}> PRINT LOBBY INFO </button>
        </div>);
}

export default LobbyPage;
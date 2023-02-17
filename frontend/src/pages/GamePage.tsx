import { game } from "./CoPage";
import {useNavigate} from "react-router-dom";
import Nav from "../components/NavBar";

function GamePage() {

    const Navigate = useNavigate();

    if (!game.socket)
    {
        return (
            <div>
                <h1>You got Disconnected</h1>
                <button onClick={() => Navigate('/')}>Back to Log</button>
            </div>);
    }

    const onReady = () => {
        game.socket.emit('PlayerReady');
    }
    game.socket.on('GameLost', () => {
        Navigate('/GameLost');
    });
    game.socket.on('GameWon', () => {
            Navigate('/GameWon');
    });

    game.socket.on('GameDraw', () => {
        Navigate('/GameDraw');
    });
    return (
        <div>
            <Nav/>
            {game.Canvas()}
            <button onClick={onReady}>IM FUCKING READY</button>
        </div>);

}

export default GamePage;
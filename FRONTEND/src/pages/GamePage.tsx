import {game} from "./All";
import {useNavigate} from "react-router-dom";

function GamePage() {

    const Navigate = useNavigate();

    const onReady = () => {
        game.socket.emit('PlayerReady');
    }
    game.socket.on('GameLost', () => {
        Navigate('/GameLost');
    });
    game.socket.on('GameWon', () => {
            Navigate('/GameWon');
    });
    game.socket.on('Disconnected', () => {
        Navigate('/Disconnected');
    });

    return (
        <div>
            {game.Canvas()}
            <button onClick={onReady}>IM FUCKING READY</button>
        </div>);

}

export default GamePage;
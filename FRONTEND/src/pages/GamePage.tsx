import {game} from "./All";

function GamePage() {

    const onReady = () => {
        game.socket.emit('PlayerReady');
    }

    return (
        <div>
            {game.Canvas()}
            <button onClick={onReady}>IM FUCKING READY</button>
        </div>);

}

export default GamePage;
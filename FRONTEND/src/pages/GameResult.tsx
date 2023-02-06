import { game } from "./All";

function Disconnected() {
    return (
        <div>
            <h1>You LOST</h1>
            <p>You were disconnected from the server.</p>
        </div>
    );
}


function GameWon() {
    return (
        <div>
            <h1>YOU WON</h1>
        </div>
    );
}

function GameLost() {
    return (
        <div>
            <h1>YOU LOST</h1>
        </div>
    );
}


function GameResult ()
{
    return (
        <div>
            <h1>Game Result</h1>
        </div>
    );
}

export default GameResult;
export {GameWon, GameLost, Disconnected};
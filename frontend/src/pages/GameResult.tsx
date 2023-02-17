import {useNavigate} from "react-router-dom";


function GameWon() {
    const Navigate = useNavigate();
    return (
        <div>
            <h1>YOU WON</h1>
            <button onClick={() => Navigate('/HomePage')}>Back to Main Menu</button>
        </div>
    );
}

function GameLost() {
    const Navigate = useNavigate();
    return (
        <div>
            <h1>YOU LOST</h1>
            <button onClick={() => Navigate('/HomePage')}>Back to Main Menu</button>
        </div>
    );
}

function GameDraw() {
    const Navigate = useNavigate();
    return (
        <div>
            <h1>You Drawed</h1>
            <button onClick={() => Navigate('/HomePage')}>Back to Main Menu</button>
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
export {GameWon, GameLost, GameDraw};
import {Link} from "react-router-dom";
import React from "react";
import {Gaming} from "../components/Canvas";

export var game = new Gaming(1000, 1000);

const MovePage = () => {
    //game.socketInit();
    return (
        <div>
            <Link to="/" className="btn btn-primary">Home</Link><div/>
            <Link to="/Lobby" className="btn btn-primary">Lobby</Link><div/>
            <Link to="/Game" className="btn btn-primary">Game</Link>
        </div>
    );
}

export default MovePage;
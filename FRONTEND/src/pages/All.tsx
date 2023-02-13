import {Link} from "react-router-dom";
import React from "react";
import {Gaming} from "../components/Canvas";
import Nav from "../components/NavBar";

export var game = new Gaming(1000, 1000);

const HomePage = () => {
    game.socketInit();
    return (
        <div>
            <Nav/>
        </div>
    );
}

export default HomePage;
import {Link} from "react-router-dom";
import React from "react";
import {Gaming} from "../components/Canvas";
import Navb from "../components/NavBar";
import Nav from 'react-bootstrap/Nav';

export var game = new Gaming(1000, 1000);

const HomePage = () => {
    game.socketInit();
    return (
        <div>
            <Navb/>
            <div className="flex-container">
                <div className="mc-menu">
                    <div className="mc-button full">
                        <Nav.Link as={Link} to="/Lobby" className="title">Play</Nav.Link>
                    </div>
                    <div className="mc-button full">
                        <Nav.Link as={Link} to="/Settings" className="title">Settings</Nav.Link>
                    </div>
                    <div className="mc-button full">
                        <Nav.Link as={Link} to="/Profile" className="title">Sample</Nav.Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
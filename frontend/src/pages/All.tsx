import {Link} from "react-router-dom";
import React from "react";
import Navb from "../components/NavBar";
import Nav from 'react-bootstrap/Nav';

const HomePage = () => {
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
                        <Nav.Link as={Link} to="/Sample" className="title">Sample</Nav.Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
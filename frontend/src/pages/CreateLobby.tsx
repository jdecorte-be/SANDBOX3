import { game } from "./CoPage";
import axios from "axios";
import { useNavigate} from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navb from "../components/NavBar";
import {Route, Routes, Link, Router} from "react-router-dom";

function CreateLobbyPage(){
    
    const addLobby = () => {
        game.socket.emit('CreateLobby', (response: any) => {
            alert(response);
        });
    }

    const addRainbowLobby = () => {
        game.socket.emit('CreateRainbowLobby', (response: any) =>{
            alert(response);
        });
    }
    const printLobby = () => {
        game.socket.emit('LobbyInfo');
    }

        return (
            <div>
            <Navb/>
            <div className="flex-container">
                <div className="mc-menu">
                    <div className="mc-button full">
                        <Nav.Link onClick={addLobby} className="title">Create classic Lobby</Nav.Link>
                    </div>
                    <div className="mc-button full">
                        <Nav.Link onClick={addRainbowLobby} className="title">Create Rainbow Day Lobby</Nav.Link>
                    </div>
                    <div className="mc-button full">
                        <Nav.Link onClick={printLobby} className="title">Print Lobby</Nav.Link>
                    </div>
                </div>
            </div>
        </div>);
}

export default CreateLobbyPage;
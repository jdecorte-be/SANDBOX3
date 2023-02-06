import React from 'react';
import {Route, Routes} from "react-router-dom";
import HomePage from "../pages/HomePage";
//import Leaderboard from "../pages/Leaderboard";
//import Profile from "../pages/Profile";
//import Game from "../pages/Game";
import LobbyPage from "../pages/LobbyPage";
import GamePage from "../pages/GamePage";
import MovePage from "../pages/All";
import RoomWaiting from "../pages/RoomWaiting";
import SpectatePage from "../pages/Spectate";
import {GameWon} from "../pages/GameResult";
import {GameLost} from "../pages/GameResult";
import {Disconnected} from "../pages/GameResult";

function Pathing(){
    return (
        <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/Lobby' element={<LobbyPage/>}/>
            <Route path='/Game' element={<GamePage/>}/>
            <Route path='/Move' element={<MovePage/>}/>
            <Route path='/RoomWaiting' element={<RoomWaiting/>}/>
            <Route path='/Spectate' element={<SpectatePage/>}/>
            <Route path='/GameWon' element={<GameWon/>}/>
            <Route path='/GameLost' element={<GameLost/>}/>
            <Route path='/Disconnected' element={<Disconnected/>}/>
        </Routes>
    )
}
export default Pathing
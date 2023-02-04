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

function Pathing(){
    return (
        <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/Lobby' element={<LobbyPage/>}/>
            <Route path='/Game' element={<GamePage/>}/>
            <Route path='/Move' element={<MovePage/>}/>
            <Route path='/RoomWaiting' element={<RoomWaiting/>}/>
        </Routes>
    )
}
export default Pathing
import React from 'react';
import {Route, Routes} from "react-router-dom";
import ConnectionPage from "../pages/ConnectionPage";
import LeaderboardPage from "../pages/LeaderboardPage";
//import Profile from "../pages/Profile";
//import Game from "../pages/Game";
import LobbyPage from "../pages/LobbyPage";
import GamePage from "../pages/GamePage";
import MovePage from "../pages/All";
import RoomWaiting from "../pages/RoomWaiting";
import SpectatePage from "../pages/Spectate";
import {GameWon} from "../pages/GameResult";
import {GameLost} from "../pages/GameResult";
import HomePage from '../pages/All';
import ProfilePage from '../pages/ProfilePage';


function Pathing(){
    return (
        <Routes>
            <Route path='/' element={<ConnectionPage/>}/>
            <Route path='/Lobby' element={<LobbyPage/>}/>
            <Route path='/Game' element={<GamePage/>}/>
            <Route path='/HomePage' element={<HomePage/>}/>
            <Route path='/RoomWaiting' element={<RoomWaiting/>}/>
            <Route path='/Spectate' element={<SpectatePage/>}/>
            <Route path='/GameWon' element={<GameWon/>}/>
            <Route path='/GameLost' element={<GameLost/>}/>
            <Route path='/Leaderboard' element={<LeaderboardPage/>}/>
            <Route path='/Profile' element={<ProfilePage/>}/>
        </Routes>
    )
}
export default Pathing
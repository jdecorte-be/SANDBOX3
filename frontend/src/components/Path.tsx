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
import SignUpPage from '../pages/SignUp';
import SignInPage from '../pages/SignIn';
import MenuPage from '../pages/Menu';
import CreateLobbyPage from '../pages/CreateLobby';
import CoPage from "../pages/CoPage";
import SettingsPage from "../pages/SettingsPage";

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
            <Route path='/SignUp' element={<SignUpPage/>}/>
            <Route path='/SignIn' element={<SignInPage/>}/>
            <Route path='/CreateLobby' element={<CreateLobbyPage/>}/>
            <Route path='/CoPage' element={<CoPage/>}/>
            <Route path='/Settings' element={<SettingsPage/>}/>
            <Route path='/Spectate' element={<SpectatePage/>}/>

        </Routes>
    )
}
export default Pathing
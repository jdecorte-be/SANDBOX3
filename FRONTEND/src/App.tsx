/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useRef} from 'react';
import './App.css';
import Pathing from "./components/Path";
import {Link} from "react-router-dom";
import Nav from './components/NavBar';
import {Navbar} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'



function App() {
    return (
        <div>
            <Pathing />
        </div>
    );
}

export default App;
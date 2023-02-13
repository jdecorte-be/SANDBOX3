import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Route, Routes, Link, Router} from "react-router-dom";
import Game from "../pages/GamePage";
import React from "react";
import { FaUserAlt, FaRunning } from 'react-icons/fa'
import { GiPodium, GiGamepadCross, GiRadarSweep } from 'react-icons/gi'
import { BiRun } from 'react-icons/bi'


function ColorSchemesExample() {
  return (
      <Navbar bg="primary" variant="dark">
        <Container fluid>
          <Navbar.Brand as={Link} to ="/HomePage">Ping Pong :)</Navbar.Brand>
          <Nav>
              <Nav.Link as={Link} to='/Game'><GiGamepadCross/></Nav.Link>
              <Nav.Link as={Link} to="/Lobby"><GiRadarSweep/></Nav.Link>
              <Nav.Link as={Link} to="/leaderboard"><GiPodium/></Nav.Link>
              <Nav.Link as={Link} to="/Profile"><FaUserAlt/></Nav.Link>
              <Nav.Link as={Link} to="/"><FaRunning/></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  );
}

export default ColorSchemesExample;
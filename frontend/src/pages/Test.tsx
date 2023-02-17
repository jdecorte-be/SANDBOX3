import React from 'react';
import {useRef} from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Route, Routes, Link, Router} from "react-router-dom";
import SignIn from './SignIn';

const Search = () => {
    return (
      <div className="mc-menu">
        <div className="mc-button full">
          <Nav.Link as={Link} to="/SignIn" className="title">Login</Nav.Link>
        </div>
        <div className="mc-button full">
          <Nav.Link as={Link} to="/SignUp" className="title">SignUp</Nav.Link>
        </div>
      </div>
    );
      //     name="Login"
      //     placeholder="Login"
      //     value={Login}
      //     onChange={(e) => setLogin(e.target.value)}
      //     />
      //     <div/>
      //     <input type="password"
      //     name="Password"
      //     placeholder="Password"
      //     value={Password}
      //     onChange={(e) => setPassword(e.target.value)}
      //     />
      //     <div/>
      //     <input type="text"
      //     name="Tel"
      //     placeholder="Tel"
      //     value={Tel}
      //     onChange={(e) => setTel(e.target.value)}
      //     />
      //     <div/>
      //     <Button as="input" type="submit" value="Submit" />
      //     </form>
      //   </div>
  };

export default Search;
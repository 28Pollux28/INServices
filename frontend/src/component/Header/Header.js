import React from "react";
import logo from "./img/logo.svg";
import coin from "./img/coin.svg"
import pp from "./img/pp.jpg";
import { Container, Nav, Navbar,Button } from "react-bootstrap";
import "./Header.css";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export function NavBarNotConnected() {
  
  return (
    <Navbar
      bg="light"
      expand="lg"
      className="bg-white shadow-sm"
    >
      <Container>
        <Navbar.Brand className="d-flex align-items-center" href="#home">
          <img
            alt=""
            src={logo}
            width="65.2"
            height="59.52"
            className="d-inline-block align-top"
          />{" "}
          <span className="d-inline-block ms-2 fs-3 fw-bold text-dark">INSERVICE</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              className="offers"
              href="frontend\src\view\Login\Login.js"
            >
              Les offres
            </Nav.Link>
            <Nav.Link className="ranking" href="link">
              Classement
            </Nav.Link>
            <Nav.Link className="askings" href="link">
              Les demandes
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link className="connect" href="link">
              Se connecter
            </Nav.Link>
            <Nav.Link className="bg-#4C97C0 rounded-pill" href="link">
              S'inscrire
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export function NavBarConnected() {
  const [tokens, setTokens] = useState(0); // Définition de l'état pour les tokens
  const [nom, setNom] = useState("Parpette"); // Définition de l'état pour le nom et prénom
  const [prenom, setprenom] = useState("Baptiste");


  return (
<Navbar bg="light" expand="lg">
  <Container>
    <Navbar.Brand href="#home" className="d-flex align-items-center">
      <img
        alt=""
        src={logo}
        width="65.2"
        height="59.52"
        className="d-inline-block align-top"
      />{" "}
      <span className="d-inline-block ms-2 fs-3 fw-bold text-dark">INSERVICE</span>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link className="offers" href="frontend\src\view\Login\Login.js">
          Les offres
        </Nav.Link>
        <Nav.Link className="ranking" href="link">
          Classement
        </Nav.Link>
        <Nav.Link className="askings" href="link">
          Les demandes
        </Nav.Link>
        <Nav.Link className="message" href="link">
          Mes Messages
        </Nav.Link>
      </Nav>
      <Nav className="ms-auto">
        <Nav.Link className="info" href="link">
          <div className="d-flex align-items-center gap-2 text-decoration-none">
            <div className="fs-2 fw-bold text-decoration-none"> {tokens}</div>
            <div className="coin-container">
              <img src={coin} alt="" className="w-52 h-52" />
            </div>
            <div className="d-flex flex-row align-items-start">
              <div className="mb-1">
                {nom}
                <br />
                {prenom}
              </div>
            </div>
            <div className="ms-3">
              <img
                src={pp}
                alt="Photo de profil"
                className="rounded-circle"
                style={{ width: '50px', height: '50px' }}
              />
            </div>
          </div>
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
  );
}

export function ConditionalFunction() {

  
  const user = user.get();

  
  return (
    
      user ? <NavBarConnected /> : <NavBarNotConnected />
    
  );
}


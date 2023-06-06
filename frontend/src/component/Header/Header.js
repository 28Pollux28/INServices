import React from "react";
import logo from "./img/logo.svg";
import coin from "./img/coin.svg"
import pp from "./img/pp.jpg";
import { Container, Nav, Navbar } from "react-bootstrap";
import "./Header.css";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export function NavBarNotConnected() {
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const handleOrientationChange = () => {
      setIsLandscape(window.orientation === 90 || window.orientation === -90);
    };

    handleOrientationChange(); // Vérifier l'orientation initiale

    window.addEventListener("orientationchange", handleOrientationChange);

    return () => {
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, []);

  return (
    <Navbar
      bg="light"
      expand="lg"
      className={isLandscape ? "navbar-landscape" : ""}
    >
      <Container>
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={logo}
            width="65.2"
            height="59.52"
            className="d-inline-block align-top"
          />{" "}
          <span className="brand-name">INService</span>
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
            <Nav.Link className="inscription" href="link">
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

  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const handleOrientationChange = () => {
      setIsLandscape(window.orientation === 90 || window.orientation === -90);
    };

    handleOrientationChange(); // Vérifier l'orientation initiale

    window.addEventListener("orientationchange", handleOrientationChange);

    return () => {
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, []);

  return (
    <Navbar
      bg="light"
      expand="lg"
      className={isLandscape ? "navbar-landscape" : ""}
    >
      <Container>
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={logo}
            width="65.2" //Changer les valeurs codées en dur Valeur relative à l
            height="59.52"
            className="d-inline-block align-top"
          />{" "}
          <span className="brand-name">INService</span>
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
            <Nav.Link className="message" href="link">
              Mes Messages
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link className="info" href="link">
              <div className="info-container">
              <div className="tokens">{tokens}</div>
              <div className="coin-container">
                  <img src={coin} alt="" className="coin" />
                </div>
                <div className="info-column">
                  <div className="name">{nom}<br />{prenom}</div>
                </div>
                <div className="image-container">
                  <img src={pp} alt="" className="image" />
                </div>
              </div>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export function NavBarTest() {
  const menuData = [
    {
      path: "/offres",
      name: "Les offres",
    },
    {
      path: "/offres",
      name: "Les offres",
    },
    {
      path: "/ranking",
      name: "Classement",
    },
    {
      path: "/askings",
      name: "Les demandes",
    },
    {
      path: "/connect",
      name: "Se connecter",
    },
    {
      path: "/inscription",
      name: "S'inscrire",
    },
  ];

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand className="brand" href="#home">
          <img
            alt=""
            src={logo}
            width="65.2"
            height="59.52"
            className="d-inline-block align-top"
          />{" "}
          <span className="brand-name">INService</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {menuData.map((item) => (
              <NavLink to={item.path} key={item.name}>
                <div className="list_item">{item.name}</div>
              </NavLink>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

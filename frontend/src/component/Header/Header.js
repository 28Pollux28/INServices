import React from "react";
import logo from "./img/logo.svg";
import karmaCoin from "../../karmaCoin.svg"
import {Container, Nav, Navbar} from "react-bootstrap";
import "./Header.css";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import User from "../../request/service/User";
import LogoutIcon from '@mui/icons-material/Logout';

export function NavBarNotConnected() {

    return (
        <Navbar
            bg="light"
            expand="lg"
            className="bg-white shadow-sm">
            <Container>
                <Navbar.Brand className="d-flex align-items-center" href="#home">
                    <img
                        alt=""
                        src={logo}
                        width="65.2"
                        height="59.52"
                        className="d-inline-block align-top"
                    />{" "}
                    <span className="d-inline-block ms-2 fs-3 fw-bold text-dark">INSERVICES</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
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
                        <Nav.Link className="connect" href="login">
                            Se connecter
                        </Nav.Link>
                        <Nav.Link className="bg-#4C97C0 rounded-pill" href="link">
                            S'inscrire
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>);
}

export function NavBarConnected({user}) {

    const nom = user.surname;
    const prenom = user.name;
    const karmas = user.karmas;


    return (
        <Navbar bg="light" expand="xl">
            <Navbar.Brand href="/" className="d-flex align-items-center ms-2">
                <img
                    alt=""
                    src={logo}
                    width="65.2"
                    height="59.52"
                    className="d-inline-block align-top"
                />{" "}
                <span className="d-inline-block ms-2 fs-3 fw-bold text-dark">INSERVICES</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link className="offers" href="/offers">
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
                <div className="navbar-nav me-xl-2 align-items-center">
                    <Nav className="me-xl-2">
                        <Nav.Link className="info" href="/link">
                            <div className="d-flex align-items-center gap-2 text-decoration-none">
                                <div className="fs-2 fw-bold text-decoration-none"> {karmas}</div>
                                <div className="coin-container">
                                    <img src={karmaCoin} alt="" width="50"/>
                                </div>
                                <div className="d-flex flex-row align-items-start">
                                    <div className="mb-1">
                                        {nom}
                                        <br/>
                                        {prenom}
                                    </div>
                                </div>
                                <div className="ms-3">
                                    <img
                                        src={process.env.REACT_APP_BACKEND_URL + "/assets/users/50/" + user.avatar}
                                        className="rounded-circle"
                                    />
                                </div>
                            </div>
                        </Nav.Link>
                    </Nav>
                    <Nav className="">
                        <Nav.Link className="btn btn-danger rounded-pill" href="/logout">
                            <LogoutIcon className="mx-2"/> <span className="me-2">Se déconnecter</span>
                        </Nav.Link>
                    </Nav>
                </div>
            </Navbar.Collapse>
        </Navbar>);
}

export function ConditionalFunction() {
    const [user, setUser] = useState(null);
    const location = useLocation();
    useEffect(() => {
        User.getMe().then((user) => {
            if (user != null) {
                setUser(user);
            }
        }).catch((error) => {
            setUser(null);
        });
    }, [location]);
    if (user != null) {
        return <NavBarConnected user={user}/>
    } else {
        return <NavBarNotConnected/>
    }

}


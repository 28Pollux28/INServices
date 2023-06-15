import React from 'react';
import {MDBIcon} from 'mdb-react-ui-kit';
import Logo_INSA_Lyon from "../../Logo_INSA_Lyon.svg"
import Logo_INService from "../../Logo_INServices.svg"
import {Link} from "react-router-dom";
import './Footer.css';
import {Col, Container, Row} from "react-bootstrap";



export default function App() {
  return (
    <footer style={{ backgroundColor: '#4C97C0' }} className='page-footer text-center text-lg-start text-muted'>

      <section className='mt-5'>
        <Container className='text-center text-md-start mt-5 d-flex justify-content-center flex-column'>
          <Row className='mt-3'>
            <Col md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4' style={{ color: 'white' }}>
                <MDBIcon icon="gem" className="me-3" />
                <div className="mt-4">
                <img src={Logo_INService} alt="Logo" className="img-fluid" />
              </div>
              </h6>
              <div>
                <p style={{ color: 'white' }}>
                INServices est un site web permettant de mettre en relation des étudiants issu d’un même campus afin de faciliter les échanges de services
                </p>
              </div>
            </Col>

            <Col md="2" lg="2" xl="2" className='mx-auto mb-4'>
            <h6 className='text-uppercase fw-bold mb-4' style={{ color: 'white' }}>Navigation</h6>
              <div className="mb-3">
                <Link className="FLinkStyle" to="/" >
                  Home
                </Link>
              </div>
              <div className="mb-3">
                <Link className="FLinkStyle" to="/profile">
                  Mon Profil
                </Link>
              </div>
              <div className="mb-3">
                <Link className="FLinkStyle" to="/">
                  Les dernières offres
                </Link>
              </div>
              <div className="mb-3">
                <Link Link className="FLinkStyle" to="/classement">
                  Classement des points
                </Link>
              </div>
              <div className="mb-3">
                <Link className="FLinkStyle" to="#">
                  Mes messages
                </Link>
              </div>
            </Col>

            <Col md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4' style={{ color: 'white' }}>En plus</h6>
              <div className="mb-3">
                <Link className="FLinkStyle" to="#">
                  Mentions légales
                </Link>
              </div>
              <div className="mb-3">
                <Link className="FLinkStyle" to="#">
                  CGU
                </Link>
              </div>
              <div className="mb-3">
                <Link className="FLinkStyle" to="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                  RGPD
                </Link>
              </div>
              <div className="mb-3">
                <Link className="FLinkStyle" to="/">
                  Cookies
                </Link>
              </div>
              <div className="mb-3">
                <Link className="FLinkStyle" to="/">
                  Accessibilité
                </Link>
              </div>
            </Col>
            <Col md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4' style={{ color: 'white' }}>Contact</h6>
              <div className="mb-3">
                <MDBIcon icon="envelope" className="m-0" />
                <a style={{ color: 'white', textDecoration: 'none' }} href="mailto:contact@inservices.com">contact@inservices.com</a>
              </div>
              <div className="mt-auto" >
                <img src={Logo_INSA_Lyon} alt="Logo" className="img-fluid" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </footer>
  );
}

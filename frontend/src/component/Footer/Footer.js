import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import Logo_INSA_Lyon from "../../Logo_INSA_Lyon.svg"
import Logo_INService from "../../Logo_INServices.svg"



export default function App() {
  return (
    <MDBFooter style={{ backgroundColor: '#4C97C0' }} className='text-center text-lg-start text-muted'>

      <section className='mt-5'>
        <MDBContainer className='text-center text-md-start mt-5 d-flex justify-content-center flex-column'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4' style={{ color: 'white' }}>
                <MDBIcon icon="gem" className="me-3" />
                <div className="mt-4">
                <img src={Logo_INService} alt="Logo" className="img-fluid" />
              </div>
              </h6>
              <p>
                <a style={{ color: 'white' }}>
                INServices est un site web permettant de mettre en relation des étudiants issu d’un même campus afin de faciliter les échanges de services
                </a>
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
            <h6 className='text-uppercase fw-bold mb-4' style={{ color: 'white' }}>Navigation</h6>
              <p>
                <a style={{ color: 'white' }}>
                  Home
                </a>
              </p>
              <p>
                <a style={{ color: 'white' }}>
                  Mon Profil
                </a>
              </p>
              <p>
                <a style={{ color: 'white' }}>
                  Les dernières offres
                </a>
              </p>
              <p>
                <a style={{ color: 'white' }}>
                  Classement des points
                </a>
              </p>
              <p>
                <a style={{ color: 'white' }}>
                  Mes messages
                </a>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4' style={{ color: 'white' }}>En plus</h6>
              <p>
                <a style={{ color: 'white' }}>
                  Mentions légales
                </a>
              </p>
              <p>
                <a style={{ color: 'white' }}>
                  CGU
                </a>
              </p>
              <p>
                <a style={{ color: 'white' }}>
                  RGPD
                </a>
              </p>
              <p>
                <a style={{ color: 'white' }}>
                  Cookies
                </a>
              </p>
              <p>
                <a style={{ color: 'white' }} >
                  Accessibilité
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4' style={{ color: 'white' }}>Contact</h6>
              <p>
                <MDBIcon icon="envelope" className="m-0" />
                <a style={{ color: 'white', textDecoration: 'none' }} href="mailto:contact@inservices.com">contact@inservices.com</a>
              </p>
              <div className="mt-auto" >
                <img src={Logo_INSA_Lyon} alt="Logo" className="img-fluid" />
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </MDBFooter>
  );
}
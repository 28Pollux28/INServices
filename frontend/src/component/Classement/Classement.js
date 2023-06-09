import React from 'react';
import { Container, Row, Col, Table, Card } from 'react-bootstrap';
import Profil_Picture from "../../profil_picture.svg"



export default function App() {
  const firstPlaceName = "John";
  const secondPlaceName = "Emma";
  const thirdPlaceName = "Michael";
  return (
    <Container>
      <Row>
        <div>
        <h2>Classement</h2>
        </div>
      </Row>
      <Row>
        <div >
        <p>Vous êtes classé : 6ème</p>
        </div>
      </Row>
      <Row>
        <div style={{ width: '600px', margin: '0 auto' }}>
          <Container>
            <Row>

                <Col xs={12} md={4} className="d-flex flex-column p-0" style={{ height: '443px' }}>
                    <div className="d-flex flex-column align-items-center font-weight-bold justify-content-end" style={{ flexGrow: 6 }}>
                        <img src={Profil_Picture} alt="Logo" className="img-fluid" />
                        <span className='d-flex'><b>Baptiste P.</b></span>
                        <span className='d-flex'>30 Karmas</span>
                    </div>
                    <div className="d-flex align-items-center justify-content-center font-weight-bold text-white" style={{ flexGrow: 4, backgroundColor: '#FCC938' }}>
                        <span className="display-4">2</span>
                    </div>
                </Col>

                <Col xs={12} md={4} className="d-flex flex-column p-0" style={{ height: '443px'}}>
                    <div className="d-flex flex-column align-items-center font-weight-bold justify-content-end" style={{ flexGrow: 3 }}>
                        <img src={Profil_Picture} alt="Logo" className="img-fluid" />
                        <span className='d-flex'><b>Valentin L.</b></span>
                        <span className='d-flex'>100 Karmas</span>
                    </div>
                    <div className="d-flex align-items-center justify-content-center font-weight-bold text-white" style={{ flexGrow: 7, backgroundColor: '#ED3B3B' }}>
                        <span className="display-4">1</span>
                    </div>
                </Col>

                <Col xs={12} md={4} className="d-flex flex-column p-0" style={{ height: '443px' }}>
                    <div className="d-flex flex-column align-items-center font-weight-bold justify-content-end" style={{ flexGrow: 8 }}>
                        <img src={Profil_Picture} alt="Logo" className="img-fluid" />
                        <span className='d-flex'><b>Mody Sory S.</b></span>
                        <span className='d-flex'>10 Karmas</span>
                    </div>
                    <div className="d-flex align-items-center justify-content-center font-weight-bold text-white" style={{ flexGrow: 2, backgroundColor: '#2EB79C' }}>
                        <span className="display-4">3</span>
                    </div>
                </Col>

            </Row>
          </Container>
        </div>
      </Row>
      <Row>
        <div >
        <h3>Tableau des classements</h3>
        </div>
        <Table striped bordered>
        <thead>
          <tr>
            <th colSpan="3">Titre du tableau</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Colonne 1</td>
            <td>Colonne 2</td>
            <td>Colonne 3</td>
          </tr>
          <tr>
            <td>Ligne 1, Colonne 1</td>
            <td>Ligne 1, Colonne 2</td>
            <td>Ligne 1, Colonne 3</td>
          </tr>
          <tr>
            <td>Ligne 2, Colonne 1</td>
            <td>Ligne 2, Colonne 2</td>
            <td>Ligne 2, Colonne 3</td>
          </tr>
          <tr>
            <td>Ligne 3, Colonne 1</td>
            <td>Ligne 3, Colonne 2</td>
            <td>Ligne 3, Colonne 3</td>
          </tr>
          <tr>
            <td>Ligne 4, Colonne 1</td>
            <td>Ligne 4, Colonne 2</td>
            <td>Ligne 4, Colonne 3</td>
          </tr>
          <tr>
            <td>Ligne 5, Colonne 1</td>
            <td>Ligne 5, Colonne 2</td>
            <td>Ligne 5, Colonne 3</td>
          </tr>
          <tr>
            <td>Ligne 6, Colonne 1</td>
            <td>Ligne 6, Colonne 2</td>
            <td>Ligne 6, Colonne 3</td>
          </tr>
          <tr>
            <td>Ligne 7, Colonne 1</td>
            <td>Ligne 7, Colonne 2</td>
            <td>Ligne 7, Colonne 3</td>
          </tr>
        </tbody>
      </Table>
      </Row>
    </Container>
  );
}

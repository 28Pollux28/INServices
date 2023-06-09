import React from 'react';
import { Container, Row, Col, Table, Card } from 'react-bootstrap';



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
              <Col xs={12} md={4} style={{ backgroundColor: '#ED3B3B', height: '443px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div class="podium-number text-white display-1 font-weight-bold">
                  <span>1</span>
                </div>
              </Col>

              <Col xs={12} md={4} className="d-flex flex-column" style={{ height: '443px' }}>
                <div className="top-half" style={{ flexGrow: 7 }}>
                  <span>prénom</span>
                </div>
                <div className="bottom-half bg-warning" style={{ flexGrow: 3 }}></div>
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

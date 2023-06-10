import React from 'react';
import { Container, Row, Col, Table, Card } from 'react-bootstrap';
import Profil_Picture from "../../profil_picture.svg"
import classementData from '../../classementData.json';



export default function App() {
  const data = classementData;
  return (
    <Container>
      <Row>
        <div>
        <h2>Classement</h2>
        </div>
      </Row>
      <Row>
        <div >
        <p><br/>Vous êtes classé : {data[4].position}ème</p>
        </div>
      </Row>
      <Row>
        <div style={{ width: '600px', margin: '0 auto' }}>
          <Container>
            <Row>

                <Col xs={12} md={4} className="d-flex flex-column p-0" style={{ height: '443px' }}>
                    <div className="d-flex flex-column align-items-center font-weight-bold justify-content-end" style={{ flexGrow: 6 }}>
                        <img src={Profil_Picture} alt="Logo" className="img-fluid" />
                        <span className='d-flex'><b>{data[1].firstName}{data[1].lastName[0]}.</b></span>
                        <span className='d-flex'>{data[1].nbrKarma} Karmas</span>
                    </div>
                    <div className="d-flex align-items-center justify-content-center font-weight-bold text-white" style={{ flexGrow: 4, backgroundColor: '#FCC938' }}>
                        <span className="display-4">2</span>
                    </div>
                </Col>

                <Col xs={12} md={4} className="d-flex flex-column p-0" style={{ height: '443px'}}>
                    <div className="d-flex flex-column align-items-center font-weight-bold justify-content-end" style={{ flexGrow: 3 }}>
                        <img src={Profil_Picture} alt="Logo" className="img-fluid" />
                        <span className='d-flex'><b>{data[0].firstName}{data[0].lastName[0]}.</b></span>
                        <span className='d-flex'>{data[0].nbrKarma} Karmas</span>
                    </div>
                    <div className="d-flex align-items-center justify-content-center font-weight-bold text-white" style={{ flexGrow: 7, backgroundColor: '#ED3B3B' }}>
                        <span className="display-4">1</span>
                    </div>
                </Col>

                <Col xs={12} md={4} className="d-flex flex-column p-0" >
                    <div className="d-flex flex-column align-items-center font-weight-bold justify-content-end" style={{ flexGrow: 8 }}>
                        <img src={Profil_Picture} alt="Logo" className="img-fluid" />
                        <span className='d-flex'><b>{data[2].firstName}{data[2].lastName[0]}.</b></span>
                        <span className='d-flex'>{data[2].nbrKarma} Karmas</span>
                    </div>
                    <div className="d-flex align-items-center justify-content-center font-weight-bold text-white" style={{ flexGrow: 2, backgroundColor: '#2EB79C' }}>
                        <span className="display-4">3</span>
                    </div>
                </Col>

            </Row>
          </Container>
        </div>
      </Row>
      <Row className="table-responsive">
        <div >
        <h3><br/>Tableau des classements</h3>
        </div>
        <Table striped bordered size="sm">
        <thead>
          <tr>
            <th colSpan="3">Titre du tableau</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><b>Position</b></td>
            <td><b>Utilisateur</b></td>
            <td><b>Nombre de Karma</b></td>
          </tr>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.position}</td>
              <td>{item.firstName} {item.lastName}</td>
              <td>{item.nbrKarma}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      </Row>
    </Container>
  );
}

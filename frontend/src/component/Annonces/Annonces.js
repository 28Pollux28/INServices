import React from 'react';
import Annonce from '../Annonce/Annonce';  // Assure-toi que le chemin vers ton composant Annonce est correct
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';  

const Annonces = ({ annonces }) => {
    return (
        <Container>
        <Row>
            {annonces.map((annonce, index) => (
                <Col key={index} style={{display: 'flex', justifyContent: 'center',marginTop:'10px'}}>
                    <Annonce annonce={annonce} />
                </Col>
            ))}
        </Row>
    </Container>
    );
};

export default Annonces;
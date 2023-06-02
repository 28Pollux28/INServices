import React from 'react';
import Annonce from '../Annonce/Annonce';  // Assure-toi que le chemin vers ton composant Annonce est correct
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Annonces = ({ annonces }) => {
    return (
        <Container>
            <Row xs={1} md={2} lg={3} xl={4}>
                {annonces.filter(annonce => annonce.visible).map((annonce, index) =>
                (
                    <Col key={index} className="d-flex justify-content-center mt-4">
                        <Annonce annonce={annonce} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Annonces;
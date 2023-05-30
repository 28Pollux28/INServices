import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Annonce = ({ annonce }) => {
    return (
        <Card style={{ width: '18rem' , textAlign:'left'}}>
            <Card.Body>
                <Row className="align-items-center" style={{margin:'0'}}>
                    <Col xs={2} style={{ padding: 0 }}>
                        <Card.Img src={annonce.photoProfil} style={{width: '50px'}}/>
                    </Col>
                    <Col style={{ paddingLeft: 10 }}>
                        <Card.Subtitle className="text-muted" style={{ marginLeft: 10 }}>{annonce.firstname} {annonce.lastnamee}</Card.Subtitle>
                    </Col>
                </Row>
                <Card.Title>{annonce.titre}</Card.Title>
                <Card.Img variant="top" src={annonce.image} />
                <Card.Text>
                    {annonce.description}
                </Card.Text>
                <Card.Text>
                Récompense : {annonce.prix}€
                </Card.Text>
                <Button variant="primary">Voir plus</Button>
            </Card.Body>
        </Card>
    );
};

export default Annonce;
    
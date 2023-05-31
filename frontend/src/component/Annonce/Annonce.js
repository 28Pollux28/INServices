import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import KarmaCoin from '../../karmaCoin.svg';

const Annonce = ({ annonce }) => {

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + "... En savoir plus";
        } else {
            return text;
        }
    }

    return (
        <Card style={{ height:'35rem',width: '18rem' , textAlign:'left'}}>
            <Card.Body className="d-flex flex-column">
                <Row className="align-items-center" style={{margin:'0'}}>
                    <Col xs={2} style={{ padding: 0 }}>
                        <Card.Img src={annonce.photoProfil} style={{width: '50px'}} />
                    </Col>
                    <Col style={{ paddingLeft: 10 }}>
                        <Card.Subtitle className="text-muted" style={{ marginLeft: 10 }}>{annonce.firstName} {annonce.lastName}</Card.Subtitle>
                    </Col>
                </Row>
                <Card.Title>{annonce.titreAnnonce}</Card.Title>
                <Card.Img variant="top" src={annonce.imageAnnonce}   />
                <Card.Text style={{ maxHeight: '5rem', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {truncateText(annonce.descriptionAnnonce, 85)}
                </Card.Text>

                <div style={{marginTop: 'auto'}}>
                    <Row className="align-items-center" style={{margin:'0'}}>
                        <Col style={{padding:0}}>
                            <Card.Text>
                            Récompense :
                            </Card.Text>
                        </Col>
                        <Col style={{padding:0, textAlign:'right', marginRight:'15px'}}>
                            <Card.Text>
                            {annonce.recompence}
                            </Card.Text>
                        </Col>
                        <Col xs={2} style={{ padding: 0 }}>
                            <Card.Img src={KarmaCoin} style={{width: '35px'}} />
                        </Col>
                    </Row>

                    <Button variant="primary" style={{marginTop: '10px',display: 'flex',margin:'auto'}}>Contacter</Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default Annonce;

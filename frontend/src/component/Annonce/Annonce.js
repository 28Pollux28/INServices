import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import KarmaCoin from '../../karmaCoin.svg';
import Container from 'react-bootstrap/esm/Container';
import './Annonce.css';

const Annonce = ({ annonce }) => {

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return (<div><span className='mb-0'>{text.substring(0, maxLength) + ' ...'}</span> <a className="link-dark linkStyle" href='##'><span className="fw-semibold fst-italic">{"en savoir plus"}</span></a></div>);
        }
        return text;
    }

    const truncateTitle = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + "...";
        }
        return text;
    }

    return (
        <Card className="text-start" >
            <Card.Body className="d-flex flex-column">
                <div className='h-25'>
                    <Row className="align-items-center m-0 pb-1">
                        <Col className="p-0" xs={2}>
                            <Card.Img className="" src={annonce.photoProfil} />
                        </Col>
                        <Col>
                            <Card.Subtitle className="ms-2 text-muted">{annonce.firstName} {annonce.lastName}</Card.Subtitle>
                        </Col>
                    </Row>
                    <a href='#' className="link-dark linkStyle"><Card.Title className='fw-semibold'>{truncateTitle(annonce.titreAnnonce, 42)}</Card.Title></a>
                </div>
                <div>
                    <Card.Img variant="top" src={annonce.imageAnnonce} />
                    <Card.Text>
                        {truncateText(annonce.descriptionAnnonce, 85)}
                    </Card.Text>

                    <div className="mt-auto">
                        <div className="d-flex m-0">

                            <Card.Text className="mb-0 me-auto align-self-center">
                                Récompense :
                            </Card.Text>

                            <Card.Text className='mb-0 pe-3 align-self-center' >
                                {annonce.recompence}
                            </Card.Text>

                            <Container className="m-0 p-0 imageKarmaCoin" >
                                <Card.Img src={KarmaCoin} />
                            </Container>

                        </div>

                        <Button variant="primary" className="d-flex m-auto mt-1">Contacter</Button>
                    </div>
                </div>
            </Card.Body>
        </Card>


    );
};

export default Annonce;

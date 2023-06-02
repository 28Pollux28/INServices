import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import intro from '../../intro.png';

const Intro = () => {
    const headerContent = {
        title: "Echange ton temps",
        description: "Les bons comptes font les bons amis, ici pas d’histoire d’argent, rendez-vous service uniquement.",
        buttonText: "Rejoins-nous",
        imageUrl: intro,
    };

    return (
        <Row className="align-items-center">
            <Col md={6} >
                <div className='mx-2'>
                    <h1>{headerContent.title}</h1>
                    <p>{headerContent.description}</p>
                </div>
                <Button variant="primary">{headerContent.buttonText}</Button>
            </Col>
            <Col md={6}>
                <img src={headerContent.imageUrl} alt="Header Home" className="img-fluid" />
            </Col>
        </Row>
    );
};

export default Intro;

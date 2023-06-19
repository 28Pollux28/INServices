import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import intro from '../../intro.png';
import {useNavigate} from "react-router-dom";

const Intro = () => {
    const navigate = useNavigate();
    const headerContent = {
        title: "Echange ton temps",
        description: "Les bons comptes font les bons amis, ici pas d’histoire d’argent, rendez-vous service uniquement.",
        buttonText: "Rejoins-nous",
        imageUrl: intro,
    };
    const onButtonCLicked = () => {
        navigate('/register')
    }

    return (
        <Row className="align-items-center w-100">

            <Col md={6} >
                <div className='mx-2'>
                    <h1>{headerContent.title}</h1>
                    <p>{headerContent.description}</p>
                </div>
                <Button variant="primary" onClick={onButtonCLicked}>{headerContent.buttonText}</Button>
            </Col>
            <Col md={6}>
                <img src={headerContent.imageUrl} alt="Header Home" className="img-fluid" />
            </Col>
        </Row>
    );
};

export default Intro;

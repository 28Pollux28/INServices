import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Annonce from '../Annonce/Annonce';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import User from "../../request/service/User";
import Offer from "../../request/service/Offer";

import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import defaultImageAnnonce from '../../defaultImageAnnonce.png';

const data_user = User.get()

const CreerAnnonce = () => {
    const [formState, setFormState] = useState({
        user_name: "Prénom",
        user_surname: "Parpette",
        user_image: "https://picsum.photos/50/50",
        name: "Titre de l'annonce",
        description: "Description de l'annonce",
        price: "XX",
        image: defaultImageAnnonce,
        visible: true,
        status: "available"
    });


    useEffect(() => {
        if (data_user) {
            setFormState({
                user_name: data_user['name'],
                user_surname: data_user['surname'],
                user_image: "https://picsum.photos/50/50",
                name: "Titre de l'annonce" ,
                description: "Description de l'annonce",
                price: "XX",
                image: defaultImageAnnonce,
                visible: true,
                status: "available"
            });
        }
    }, [data_user]);

    if (!data_user) {
        return (
            <Container>
                <span className='mt-5 fw-bold d-inline-block'>Vous devez être connecté pour accéder à cette page</span>
                <p>Vous pouvez vous connecter <a href="/login">ici</a></p>
            </Container>
        )
    }





    const handleInputChange = (event) => {
        setFormState({
            ...formState,
            [event.target.name]: event.target.value,
        });
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setFormState({
                ...formState,
                image: reader.result,
            });
        };

        if (file) {
            reader.readAsDataURL(file);
        } else {
            setFormState({
                ...formState,
                image: "",
            });
        }
    };


    const handleSubmit = () => {
        // Votre programme JavaScript à exécuter lors du clic sur le bouton Submit
        console.log('Le bouton Submit a été cliqué !');
        Offer.add(formState)

        // Vous pouvez ajouter votre code ici pour effectuer une action spécifique
      };

    return (
        //<div className="d-flex justify-content-between">
        <Row className='mx-auto justify-content-center'>
             <Col sm={4} md={5} className="m-4 align-self-center text-start fw-semibold">

                <Form>
                    <Form.Group>
                        <Form.Label>Titre</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            name="description"
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Récompence</Form.Label>
                        <Form.Control
                            type="text"
                            name="price"
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                </Form>

                <Button variant="primary" className="d-flex m-auto mt-3" type="submit" onClick={handleSubmit}>
                    Submit
                </Button>

            </Col>
            <Col sm={5} md={5} lg={4} className="m-4 d-flex flex-column">
                <span className='fw-semibold p-2 align-self-start'>Aperçu:</span>
                <Annonce className='p-2' annonce={formState} previewPage={true} />
            </Col>
        </Row>
    );
};

export default CreerAnnonce;
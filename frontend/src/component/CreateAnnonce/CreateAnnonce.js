import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import User from "../../request/service/User";
import { Navigate, useNavigate } from 'react-router-dom';
import {Col, Form, Row } from "react-bootstrap";
import Annonce from '../Annonce/Annonce';
import Offer from "../../request/service/Offer";
import defaultImageAnnonce from '../../defaultImageAnnonce.png';
import Button from 'react-bootstrap/Button';
const data_user = User.get()

//Construct a login page with Bootstrap React
const CreerAnnonce = () => {
    const navigate = useNavigate();

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
        document.title = 'CreateOffer';
        if (data_user) {
            setFormState({
                user_name: data_user['name'],
                user_surname: data_user['surname'],
                user_image: "https://picsum.photos/50/50",
                name: "Titre de l'annonce",
                description: "Description de l'annonce",
                price: "XX",
                image: defaultImageAnnonce,
                visible: true,
                status: "available"
            });
        }
    }, [data_user]);

    const { register, handleSubmit, setError, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('image', data.image[0]);
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', data.price);

        const success = await Offer.add(formData);
        console.log(success.message);
        if (success.message == "Offer created") {
            navigate('/',{state:{createAnnonce: "success"}});
        };
    }

    if (!data_user) { // already authenticated, redirect to the home
        return <Navigate to={'/login'} replace />;
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

    return (
        <Row className='mx-auto justify-content-center'>
            <Col sm={4} md={5} className="m-4 align-self-center text-start fw-semibold">

                <Form>
                    <Form.Group>
                        <Form.Label>Titre</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            {...register("name", { required: true })}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            {...register("image", { required: true })}
                            onChange={handleFileChange}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            name="description"
                            {...register("description", { required: true })}
                            onChange={handleInputChange}

                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Récompence</Form.Label>
                        <Form.Control
                            type="text"
                            name="price"
                            {...register("price", { required: true })}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Form>
                <Button variant="primary" className="d-flex m-auto mt-3" type="submit" onClick={handleSubmit(onSubmit)}>
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
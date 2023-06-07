import React, {useEffect} from "react";
import { useForm } from "react-hook-form";
import User from "../../request/service/User";
import {Navigate, useNavigate} from 'react-router-dom';
import {Alert, Card, Col, Container, Form, Row, ThemeProvider} from "react-bootstrap";

//Construct a login page with Bootstrap React
const Login = () => {
    useEffect(() => {
        document.title = 'Login';
    }, []);
    const user = User.get();
    const {register, handleSubmit, setError, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const success = await User.login(data['email'], data['password']);

        if (success) {
            navigate('/');
        } else {
            setError('email', {
                type: 'server',
                message: 'Adresse email ou mot de passe incorrect.'
            });
            setError('password', {
                type: 'server',
                message: 'Adresse email ou mot de passe incorrect.'
            });
        }
    };
    if (user) { // already authenticated, redirect to the home
        return <Navigate to={'/'} replace />;
    }
    //use bootstrap react to create a login page
    return (
        <ThemeProvider>
            <Container>
                <Row>
                    <Col></Col>
                    <Col xs={6}>
                        <Card className="mt-3">
                            <Card.Body>
                                <Card.Title>Connexion</Card.Title>
                                <Form>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" {...register("email", { required: true })} />
                                        {errors.email && <Alert variant="danger">
                                            {errors.email.type === 'required' && "L'email est requis"}
                                            {errors.email.type === 'server' && errors.email.message}
                                        </Alert>}
                                    </Form.Group>
                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Mot de passe</Form.Label>
                                        <Form.Control type="password" placeholder="Password" {...register("password", { required: true })} />
                                        {errors.password && <Alert variant="danger">
                                            {errors.password.type === 'required' && "Le mot de passe est requis"}
                                            {errors.password.type === 'server' && errors.password.message}
                                        </Alert>}
                                    </Form.Group>
                                    <button className="btn btn-primary my-3" onClick={handleSubmit(onSubmit)}>Connexion</button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        </ThemeProvider>
    );




}

export default Login;

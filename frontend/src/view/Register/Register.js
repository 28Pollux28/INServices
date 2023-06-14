import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import User from "../../request/service/User";
import {Navigate, useNavigate} from 'react-router-dom';
import {Alert, Card, Col, Container, Form, Row, ThemeProvider} from "react-bootstrap";

//Construct a login page with Bootstrap React
const Register = () => {
    useEffect(() => {
        document.title = 'Register';
    }, []);
    const user = User.get();
    const {register, handleSubmit, watch, setError, formState: {errors}} = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const [success, errors] = await User.register(data);
        if (success) {
            navigate('/');
        } else {
            if (errors.error != null) {
                setError('email', {
                    type: 'server', message: errors.error
                });
                setError('password', {
                    type: 'server', message: errors.error
                });

            } else {
                errors.forEach((error) => {
                    setError(error.FailedField, {
                        type: error.Tag.toString() === 'unique' ? 'unique' : 'server',
                    });
                });

                // setError('email', {
                //     type: 'server', message: 'Adresse email ou mot de passe incorrect.'
                // });
                // setError('password', {
                //     type: 'server', message: 'Adresse email ou mot de passe incorrect.'
                // });
            }
        }
    };
    if (user) { // already authenticated, redirect to the home
        return <Navigate to={'/'} replace/>;
    }
    //use bootstrap react to create a login page
    return (<ThemeProvider>
        <Container>
            <Row>
                <Col></Col>
                <Col xs={6}>
                    <Card className="mt-3">
                        <Card.Body>
                            <Card.Title>Inscription</Card.Title>
                            <Form>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email"
                                                  placeholder="Enter email" {...register("email", {required: true})} />
                                    {errors.email && <Alert variant="danger">
                                        {errors.email.type === 'required' && "L'email est requis"}
                                        {errors.email.type === 'server' && "L'email est invalide"}
                                        {errors.email.type === 'unique' && "L'email est déjà utilisé"}
                                    </Alert>}
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Mot de passe</Form.Label>
                                    <Form.Control type="password"
                                                  placeholder="Password" {...register("password", {
                                        required: true,
                                        validate: value => {
                                            let match = value.toString().match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/g);
                                            return value.length >= 8 && match !== null;
                                        }
                                    })} />
                                    {errors.password && <Alert variant="danger">
                                        {errors.password.type === 'required' && "Le mot de passe est requis"}
                                        {errors.password.type === 'validate' && "Le mot de passe doit contenir au moins 8 caractères, une minuscule, une majuscule, un chiffre et un caractère spécial"}
                                        {errors.password.type === 'server' && "Le mot de passe doit contenir au moins 8 caractères, une minuscule, une majuscule, un chiffre et un caractère spécial"}
                                    </Alert>}
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Confirmer le mot de passe</Form.Label>
                                    <Form.Control type="password"
                                                  placeholder="Password" {...register("password_confirmation", {
                                        required: true,
                                        validate: value => value === watch('password')
                                    })} />
                                    {errors.password_confirmation && <Alert variant="danger">
                                        {errors.password_confirmation.type === 'required' && "Le mot de passe est requis"}
                                        {errors.password_confirmation.type === 'validate' && "Les mots de passe ne correspondent pas"}
                                        {errors.password_confirmation.type === 'server' && "Les mots de passe ne correspondent pas"}
                                    </Alert>}
                                </Form.Group>
                                <Form.Group controlId="formBasicName">
                                    <Form.Label>Nom</Form.Label>
                                    <Form.Control type="text"
                                                  placeholder="Nom" {...register("surname", {required: true})} />
                                    {errors.surname && <Alert variant="danger">
                                        {errors.surname.type === 'required' && "Le nom est requis"}
                                        {errors.surname.type === 'server' && "Le nom est invalide"}
                                    </Alert>}
                                </Form.Group>
                                <Form.Group controlId="formBasicFirstname">
                                    <Form.Label>Prénom</Form.Label>
                                    <Form.Control type="text"
                                                  placeholder="Prénom" {...register("name", {required: true})} />
                                    {errors.name && <Alert variant="danger">
                                        {errors.name.type === 'required' && "Le prénom est requis"}
                                        {errors.name.type === 'server' && "Le prénom est invalide"}
                                    </Alert>}
                                </Form.Group>
                                <Form.Group controlId="formBasicUsername">
                                    <Form.Label>Pseudo</Form.Label>
                                    <Form.Control type="text"
                                                  placeholder="Pseudo" {...register("username", {required: true})} />
                                    {errors.username && <Alert variant="danger">
                                        {errors.username.type === 'required' && "Le pseudo est requis"}
                                        {errors.username.type === 'server' && "Le pseudo est invalide"}
                                        {errors.username.type === 'unique' && "Le pseudo est déjà utilisé"}
                                    </Alert>}
                                </Form.Group>
                                <Form.Group controlId="formBasicPhone">
                                    <Form.Label>Téléphone</Form.Label>
                                    <Form.Control type="text"
                                                  placeholder="Téléphone" {...register("phone", {required: true})} />
                                    {errors.phone && <Alert variant="danger">
                                        {errors.phone.type === 'required' && "Le téléphone est requis"}
                                        {errors.phone.type === 'server' && "Le téléphone est invalide"}
                                        {errors.phone.type === 'unique' && "Le téléphone est déjà utilisé"}
                                    </Alert>}
                                </Form.Group>
                                <button className="btn btn-primary my-3"
                                        onClick={handleSubmit(onSubmit)}>Connexion
                                </button>
                            </Form>
                        </Card.Body>
                    </Card>

                </Col>
                <Col></Col>
            </Row>
        </Container>
    </ThemeProvider>);


}

export default Register;

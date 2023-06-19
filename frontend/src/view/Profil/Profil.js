import React, {useEffect, useState} from "react";
import "./Profile.css";
import User from "../../request/service/User";
import {ButtonGroup, Form} from "react-bootstrap";
import {useForm} from "react-hook-form";
import Button from "react-bootstrap/Button";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {wait} from "@testing-library/user-event/dist/utils";

export default function ProfileSetting({setUpdateNavBar}) {
    const [user, setUser] = useState(null);
    const [image, setImage] = useState(null);
    const [state, updateState] = React.useState();
    const {
        register,
        handleSubmit,
        setError,
        formState: {errors},
        setValue,
    } = useForm();
    const {
        register: registerImage,
        handleSubmit: handleSubmitImage,
        setError: setErrorImage,
        formState: {errors: errorsImage},
        setValue: setValueImage,
        reset: resetImage
    } = useForm({defaultValues: {image: null}});
    const {
        register: registerPassword,
        handleSubmit: handleSubmitPassword,
        setError: setErrorPassword,
        formState: {errors: errorsPassword},
        setValue: setValuePassword,
        reset: resetPassword
    } = useForm();

    useEffect(() => {
        const data_user = User.getMe();
        data_user.then((data) => {
            setUser(data);
            setValue("name", data['name']);
            setValue("surname", data['surname']);
            setValue("username", data['username']);
            setValue("email", data['email']);
            setValue("phone", data['phone']);
            setImage(process.env.REACT_APP_BACKEND_URL + "/assets/users/200/" + data['avatar']);
        });
    }, [state]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = async (data) => {
        let formData = new FormData();
        let flag = false;
        if (data.name !== user.name) {
            formData.append('name', data.name);
            flag = true;
        }
        if (data.surname !== user.surname) {
            formData.append('surname', data.surname);
            flag = true;
        }
        if (data.username !== user.username) {
            formData.append('username', data.username);
            flag = true;
        }
        if (data.email !== user.email) {
            formData.append('email', data.email);
            flag = true;
        }
        if (data.phone !== user.phone) {
            formData.append('phone', data.phone);
            flag = true;
        }
        if (flag) {
            User.editUser(formData).then((data) => {
            });
            await wait(100)
            updateState({});
            setUpdateNavBar({});
        }
    }
    const onSubmitImage = async (data) => {
        let formData = new FormData();
        formData.append('avatar', data.image[0]);
        User.editAvatar(formData).then((data) => {
        });
        resetImage();
        await wait(100)
        updateState({});
        setUpdateNavBar({});
    }

    const onSubmitPassword = async (data) => {
        if (data.password !== data.password_confirmation) {
            setErrorPassword("password_confirmation", {type: "manual", message: "Les mots de passe ne correspondent pas"});
        } else {
            let formData = new FormData();
            formData.append('old_password', data.old_password)
            formData.append('password', data.password);
            formData.append('password_confirmation', data.password_confirmation);
            User.editUser(formData).then((data) => {
            });
            resetPassword();
            await wait(100)
            updateState({});
            setUpdateNavBar({});
        }
    }
    const onImageDelete = async () => {
        setValueImage("image", null);
        setImage(null);
    }

    return (
        <div>
            <div className="container-xl px-4 mt-4">
                <hr className="mt-0 mb-4"/>
                <div className="row">
                    <div className="col-xl-4 d-flex ">
                        <div className="card d-flex flex-column flex-grow-1 mb-4 mb-xl-0">
                            <div className="card-header">Image de Profil</div>
                            <div className="card-body d-flex flex-column flex-grow-1 text-center">
                                {image ? (
                                    <img
                                        style={{objectFit: "cover"}}
                                        src={image}
                                        width="315"
                                        height="315"
                                        alt="Uploaded Profile Picture"
                                        className="img-account-profile align-self-center rounded-circle mb-2"
                                    />
                                ) : (
                                    <img
                                        className="img-account-profile align-self-center rounded-circle mb-2"
                                        src={process.env.REACT_APP_BACKEND_URL + "/assets/users/200/default_avatar.png"}
                                        alt="Default Profile Picture"
                                    />
                                )}
                                <div className="small font-italic text-muted mb-4">
                                    JPG ou PNG de taille maximale 5 MO
                                </div>
                                <Form className="d-inline-flex flex-column flex-grow-1">
                                    <Form.Group className="mb-3">
                                        <Form.Label className="small mb-1">
                                        </Form.Label>
                                        <ButtonGroup>
                                            <Form.Control
                                                type="file"
                                                accept="image/*"
                                                name="image"
                                                {...registerImage("image", {onChange: handleImageUpload})}
                                            />
                                            <Button variant="danger" type="reset"
                                                    onClick={onImageDelete}><DeleteOutlineIcon/></Button>
                                        </ButtonGroup>
                                    </Form.Group>
                                    <div className="mt-auto">
                                        <Button variant="primary" type="submit"
                                                onClick={handleSubmitImage(onSubmitImage)}>Enregistrer</Button>
                                    </div>
                                </Form>

                            </div>
                        </div>
                    </div>
                    <div className="col-xl-8">
                        <div className="card mb-4">
                            <div className="card-header">Information du compte</div>
                            <div className="card-body">
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="small mb-1">
                                            Username
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="username"
                                            placeholder={"Entrez votre username"}
                                            {...register("username", {})}
                                        />
                                    </Form.Group>
                                    <div className="row gx-3 mb-3">
                                        <Form.Group className="col-md-6">
                                            <Form.Label className="small mb-1">
                                                Prénom
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="name"
                                                placeholder="Entrez votre prénom"
                                                {...register("name", {})}
                                            />
                                        </Form.Group>
                                        <Form.Group className="col-md-6">
                                            <Form.Label className="small mb-1">
                                                Nom
                                            </Form.Label>
                                            <Form.Control
                                                name="surname"
                                                type="text"
                                                placeholder="Entrez votre nom"
                                                {...register("surname", {})}
                                            />
                                        </Form.Group>
                                    </div>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="small mb-1">
                                            Adresse Email
                                        </Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Entrez votre adresse email"
                                            {...register("email", {})}
                                        />
                                    </Form.Group>
                                    <div className="row gx-3 mb-3">
                                        <Form.Group className="col-md-6">
                                            <Form.Label className="small mb-1">
                                                Numéro de téléphone
                                            </Form.Label>
                                            <Form.Control
                                                type="tel"
                                                placeholder="Entrez votre numéro de téléphone"
                                                {...register("phone", {})}
                                            />
                                        </Form.Group>
                                    </div>
                                    <button className="btn btn-primary" type="button" onClick={handleSubmit(onSubmit)}>
                                        Sauvegarder les modifications
                                    </button>
                                </Form>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-header">Mot de passe</div>
                            <div className="card-body">
                                <Form>
                                    <div className="row gx-3">
                                        <Form.Group>
                                            <Form.Label className="small mb-1">
                                                Mot de passe actuel
                                            </Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder="Entrez votre mot de passe actuel"
                                                {...registerPassword("old_password", {})}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label className="small mb-1">
                                                Nouveau mot de passe
                                            </Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder="Entrez votre nouveau mot de passe"
                                                {...registerPassword("password", {})}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label className="small mb-1">
                                                Confirmer le nouveau mot de passe
                                            </Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder="Confirmez votre nouveau mot de passe"
                                                {...registerPassword("password_confirmation", {})}
                                            />
                                        </Form.Group>
                                        <div className="mt-3">
                                            <button className="btn btn-primary" type="submit" onClick={handleSubmitPassword(onSubmitPassword)}>
                                                Modifier le mot de passe
                                            </button>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

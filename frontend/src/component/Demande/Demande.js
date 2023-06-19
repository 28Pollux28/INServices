import * as React from 'react';
import {ButtonGroup, Card} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import KarmaCoin from "../../karmaCoin.svg";
import Button from "react-bootstrap/Button";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Offer from "../../request/service/Offer";
import "./Demande.css";

function Demande({demande, forceUpdate, setUpdateNavBar}) {

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return (<><span className='mb-0'>{text.substring(0, maxLength) + '...'}</span> <p><a
                className="link-dark linkStyle" href='#'><span
                className="fw-semibold fst-italic">{"en savoir plus"}</span></a></p></>);
        }
        return text;
    }

    const truncateTitle = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + "...";
        }
        return text;
    }
    const visibilityIcon = () => {
        if (demande.visible) {
            return (
                <Button variant="warning" onClick={toggleVisibility} className="d-flex m-auto mt-1"><VisibilityOffIcon
                    className="mx-auto"/><span className="mx-auto">Cacher</span></Button>)
        } else {
            return (<Button variant="success" onClick={toggleVisibility} className="d-flex m-auto mt-1"><VisibilityIcon
                className="mx-auto"/><span className="mx-auto">Montrer</span></Button>)
        }
    }

    const deleteDemande = async () => {
        const [success, response] = await Offer.deleteOffer(demande.id);
        if (success === true) {
            forceUpdate();
            setUpdateNavBar({});
        } else {
            alert("Erreur lors de la suppression de votre demande\n"+response.error);
        }
    }

    const toggleVisibility = async () => {
        const [success, response] = await Offer.editOffer(demande.id, {"visible": !demande.visible});
        if (success === true) {
            forceUpdate();
        } else {
            alert("Erreur lors de la modification de votre demande\n"+response.error);
        }
    }

    const completeDemande = async () => {
        const [success, response] = await Offer.completeOffer(demande.id);
        // console.log(response);
        if (success === true) {
            forceUpdate();
        } else {
            alert("Erreur lors de l'acceptation de votre demande\n"+response.error);
        }
    }

    const buttonGroup = () => {
        if (demande.status === "available") {
            return (
                <ButtonGroup className="d-flex justify-content-end">
                    <Button variant="danger" onClick={deleteDemande}
                            className="d-flex m-auto mt-1 "><DeleteForeverIcon className="mx-auto"/></Button>
                    {visibilityIcon()}
                    <Button variant="primary"
                            className="d-flex m-auto mt-1 "><EditIcon className="mx-auto"/></Button>
                </ButtonGroup>
            )
        } else if (demande.status === "accepted") {
            return (
                <>
                    <div className="d-flex m-0 mt-1 ">
                        <Card.Text className="mb-0 me-auto align-self-center">
                            Acceptée par :
                        </Card.Text>

                        <Card.Text className='mb-0 pe-3 align-self-center'>
                            {demande.accepted_user.name + " " + demande.accepted_user.surname}
                        </Card.Text>
                    </div>
                    <ButtonGroup className="d-flex ">
                        <Button variant="danger" disabled={true} onClick={deleteDemande}
                                className="d-flex m-auto mt-1 "><DeleteForeverIcon className="mx-auto"/></Button>

                        <Button onClick={completeDemande}
                                className="btn-pay d-flex m-auto mt-1 "><CreditScoreIcon className="mx-auto"/><span
                            className="mx-auto">Compléter</span></Button>
                    </ButtonGroup>
                </>
            )
        } else if (demande.status === "completed") {
            return (
                <>
                    <div className="d-flex m-0 mt-1 ">
                        <Card.Text className="mb-0 me-auto align-self-center">
                            Acceptée par :
                        </Card.Text>

                        <Card.Text className='mb-0 pe-3 align-self-center'>
                            {demande.accepted_user.name + " " + demande.accepted_user.surname}
                        </Card.Text>
                    </div>
                    <ButtonGroup className="d-flex ">
                        <Button disabled={true}
                                className="btn-pay d-flex m-auto mt-1 "><CheckCircleOutlineIcon
                            className="ms-auto me-1"/><span
                            className="ms-1 me-auto">Complétée</span></Button>
                    </ButtonGroup>
                </>
            )
        }
    }

    return (

        <Card className="d-flex text-start">
            <Card.Body className="d-flex flex-column">
                <div className="d-flex flex-column flex-grow-0">
                    <div className='flex-grow-0 mb-2 flex-shrink-0' style={{flexBasis: 'auto', height:'24px'}}>
                        <a href='#' className="link-dark overflow-hidden linkStyle"><Card.Title
                            className='fw-semibold text-truncate'>{truncateTitle(demande.title, 32)}</Card.Title></a>
                    </div>
                    <div className="">
                        <Card.Img className=""
                                  src={process.env.REACT_APP_BACKEND_URL + "/assets/offers/300/" + demande.image}/>
                    </div>
                </div>
                <div className="flex-grow-1 flex-shrink-1">
                    {truncateText(demande.description, 85)}
                </div>

                <div className="">
                    <div className="d-flex m-0">
                        <Card.Text className="mb-0 me-auto align-self-center">
                            Récompense :
                        </Card.Text>

                        <Card.Text className='mb-0 pe-3 align-self-center'>
                            {demande.price}
                        </Card.Text>

                        <Container className="m-0 p-0 imageKarmaCoin">
                            <Card.Img src={KarmaCoin}/>
                        </Container>
                    </div>
                    {buttonGroup()}
                </div>
            </Card.Body>
        </Card>
    )
}

export default Demande;

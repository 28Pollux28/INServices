import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import KarmaCoin from '../../karmaCoin.svg';
import Container from 'react-bootstrap/esm/Container';
import './Annonce.css';
import Offer from "../../request/service/Offer";
import {useNavigate} from "react-router-dom";


const Annonce = ({ annonce, previewPage = false , user, setUpdateState}) => {
    const navigate = useNavigate();
    const user_name = annonce.user_name;
    const user_surname = annonce.user_surname;
    const user_image = 'http://localhost:3000/assets/users/50/' + annonce.user_image;
    const titre = annonce.title;
    const description = annonce.description;
    let imageAnnonce = 'http://localhost:3000/assets/offers/300/' + annonce.image;
    if(previewPage) {
        imageAnnonce = annonce.image;
    }
    const karma = annonce.price;


    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return (<><span className='mb-0'>{text.substring(0, maxLength) + '...'}</span> <p><a className="link-dark linkStyle" href='#'><span className="fw-semibold fst-italic">{"en savoir plus"}</span></a></p></>);
        }
        return text;
    }

    const truncateTitle = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + "...";
        }
        return text;
    }


    const acceptOffer = async () => {
        if (user === null){
            navigate('/login');
            return;
        }
        const response = await Offer.acceptOffer(annonce.id);
        if (response[0] === true) {
            window.alert(response[1].message)
            setUpdateState({})
        } 
        else{
            window.alert(response[1].error)
    }
};
    return (
        <Card className="text-start" >
            <Card.Body className="d-flex flex-column">
                <div className=''>
                    <Row className="align-items-center m-0 pb-1">
                        <Col className="p-0" xs={2}>
                            <Card.Img className="" src={user_image} />
                        </Col>
                        <Col>
                            <Card.Subtitle className="ms-2 text-muted">{user_name} {user_surname}</Card.Subtitle>
                        </Col>
                    </Row>
                    <a href='#' className="link-dark linkStyle"><Card.Title className='fw-semibold text-truncate'>{truncateTitle(titre, 42)}</Card.Title></a>
                </div>
                <div className="d-flex flex-column flex-grow-1">
                    <div className="square-image-container">
                        <Card.Img variant="top" src={imageAnnonce} className="square-image" />
                    </div>
                    <Card.Text>
                        {truncateText(description, 85)}
                    </Card.Text>

                    <div className="mt-auto">
                        <div className="d-flex m-0">

                            <Card.Text className="mb-0 me-auto align-self-center">
                                Récompense :
                            </Card.Text>

                            <Card.Text className='mb-0 pe-3 align-self-center' >
                                {karma}
                            </Card.Text>

                            <Container className="m-0 p-0 imageKarmaCoin" >
                                <Card.Img src={KarmaCoin} />
                            </Container>

                        </div>

                        <div>
                            {!previewPage && user && <Button variant="outline-primary" className="d-flex m-auto mt-1" onClick={acceptOffer} >Accepter l'offre</Button>}
                            {!previewPage && !user && <Button variant="outline-primary" className="d-flex m-auto mt-1" onClick={() => navigate('/login')} >Accepter l'offre</Button>}
                        </div>

                    </div>
                </div>
            </Card.Body>
        </Card>


    );
};

export default Annonce;

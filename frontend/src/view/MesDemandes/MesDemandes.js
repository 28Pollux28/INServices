import Demande from "../../component/Demande/Demande";
import React, {useEffect, useState} from "react";
import Offer from "../../request/service/Offer";
import Col from "react-bootstrap/Col";
import {Container, Row, Spinner} from "react-bootstrap";
import {Link} from "react-router-dom";

const MesDemandes = ({setUpdateNavBar}) => {
    const [myOffersData, setMyOffersData] = useState([]);
    const [fetching, setFetching] = useState(false);
    const [state, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
    useEffect(() => {
        setFetching(true);
        let myOffers = Offer.getMyOffers();
        myOffers.then((value) => {
            // console.log(value);
            setMyOffersData(value);
            setFetching(false);
        });
    }, [state]);

    return (
        <>
            <p className="d-flex align-self-start m-0 mx-2 mt-1"><Link className="link-dark" to="/">Home </Link>><Link
                className="link-dark" to="/profile">Profile </Link>> Mes demandes</p>
            <h3 className="mt-1">Mes Demandes</h3>

            <Container>
                {Array.isArray(myOffersData) && myOffersData.length > 0 &&
                    <Row xs={1} md={2} lg={3} xl={4}> {myOffersData.map((demande) =>
                        <Col key={demande.id} className="d-flex justify-content-center mt-4">
                            <Demande demande={demande} forceUpdate={forceUpdate} setUpdateNavBar={setUpdateNavBar}/>
                        </Col>
                    )}</Row>}
                {!fetching && myOffersData.length === 0 && <p>Vous n'avez pas encore de demandes</p>}
                {!fetching && !Array.isArray(myOffersData) && <p>Une erreur est survenue</p>}
            </Container>
            {fetching && <Spinner animation="border" role="status"></Spinner>}
        </>
    )
}

export default MesDemandes;

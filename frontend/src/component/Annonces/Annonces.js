import React, {useEffect, useState} from 'react';
import Annonce from '../Annonce/Annonce';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Offer from "../../request/service/Offer";
import User from "../../request/service/User";

const Annonces = () => {
    const [annonces, setAnnonces] = useState([]);
    const [user, setUser] = useState(null);
    const [updateState, setUpdateState] = useState();

    useEffect(() => {
        const fetchOffersAndUsers = async () => {
            try {
                const offers = await Offer.getLatest();
                //cache user data in a map
                const users = new Map();
                for (const offer of offers) {
                    if (!users.has(offer.user_id)) {
                        users.set(offer.user_id, await Offer.getPubUser(offer.user_id));
                    }
                    const userData = users.get(offer.user_id);

                    offer.user_name = userData.name;
                    offer.user_surname = userData.surname;
                    offer.user_image = userData.avatar;
                }

                setAnnonces(offers);
            } catch (error) {
                // console.log(error);
            }
        };

        fetchOffersAndUsers();
        if (User.get()) {
            User.getMe().then((value) => {
                if (value != null) {
                    setUser(value);
                }
            }).catch((error) => {
                setUser(null);
            });
        }

    }, [updateState]);

    return (
        <Container>
            <Row xs={1} md={2} lg={3} xl={4}>
                {annonces.filter(annonce => annonce.price).map((annonce, index) => (
                    <Col key={index} className="d-flex justify-content-center mt-4">
                        <Annonce annonce={annonce} user={user} setUpdateState={setUpdateState} previewPage={false}/>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Annonces;

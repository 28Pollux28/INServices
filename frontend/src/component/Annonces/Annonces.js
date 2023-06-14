import React, { useEffect, useState } from 'react';
import Annonce from '../Annonce/Annonce';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Offer from "../../request/service/Offer";

const Annonces = () => {
  const [annonces, setAnnonces] = useState([]);

  useEffect(() => {
    const fetchOffersAndUsers = async () => {
      try {
        const offers = await Offer.getLatest();

        for (const offer of offers) {
          const userData = await Offer.getPubUser(offer.user_id);

          offer.user_name = userData.name;
          offer.user_surname = userData.surname;
          offer.user_image = userData.avatar;
        }

        setAnnonces(offers);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOffersAndUsers();
  }, []);

  return (
    <Container>
      <Row xs={1} md={2} lg={3} xl={4}>
        {annonces.filter(annonce => annonce.price).map((annonce, index) => (
          <Col key={index} className="d-flex justify-content-center mt-4">
            <Annonce annonce={annonce} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Annonces;

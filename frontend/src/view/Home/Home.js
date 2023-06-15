import React from "react";
import { useLocation } from "react-router-dom";
import { Alert } from "react-bootstrap";
import Annonces from "../../component/Annonces/Annonces";
import Intro from '../../component/Intro/Intro';

import annoncesData from '../../annoncesData';




const Home = () => {
    const location = useLocation();
    const data = annoncesData;

    return (
        <>
            {location.state && location.state.verified === "success" && <Alert variant="success" onClose={() => window.history.replaceState({}, document.title)} dismissible>
                Votre email a été vérifié avec succès.
            </Alert>
            }
            {location.state && location.state.verified === "error" && <Alert variant="danger" onClose={() => window.history.replaceState({}, document.title)} dismissible>
                Une erreur est survenue lors de la vérification de votre email.
            </Alert>
            }
            {location.state && location.state.logout === "success" && <Alert variant="success" onClose={() => window.history.replaceState({}, document.title)} dismissible>
                Vous avez été déconnecté avec succès.
            </Alert>
            }
            {location.state && location.state.createAnnonce === "success" && <Alert variant="success" onClose={() => window.history.replaceState({}, document.title)} dismissible>
                Votre offre a bien été crée.
            </Alert>
            }

            <Intro />
            <h1 className="my-2">Les dernière annonces</h1>
            <Annonces annonces={data} />
        </>
    );
}

export default Home;

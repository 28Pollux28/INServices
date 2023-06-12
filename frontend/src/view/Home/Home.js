import React from "react";
import {useLocation} from "react-router-dom";
import {Alert} from "react-bootstrap";


const Home = () => {
    const location = useLocation();
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
            <div>
                <h1>Home</h1>
            </div>
           
        </>
    );
}

export default Home;

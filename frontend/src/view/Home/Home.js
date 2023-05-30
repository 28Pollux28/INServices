import React from "react";
import {useLocation} from "react-router-dom";
import {Alert} from "react-bootstrap";
import Annonces from "../../component/Annonces/Annonces";
import Intro from '../../component/Intro/Intro';




const Home = () => {
    const location = useLocation();


    const data=[
        { firstname : "Baptiste",lastnamee:"Parpette", photoProfil:"https://picsum.photos/50/50" ,titre: "Annonce 1", description: "Description 1", prix: 10, image: "https://picsum.photos/300/300" },
        { firstname : "Baptiste",lastnamee:"Parpette", photoProfil:"https://picsum.photos/50/50" ,titre: "Annonce 2", description: "Description 2", prix: 20, image: "https://picsum.photos/300/300" },
        { firstname : "Baptiste",lastnamee:"Parpette", photoProfil:"https://picsum.photos/50/50" ,titre: "Annonce 3", description: "Description 3", prix: 30, image: "https://picsum.photos/300/300" },
        { firstname : "Baptiste",lastnamee:"Parpette", photoProfil:"https://picsum.photos/50/50" ,titre: "Annonce 4", description: "Description 4", prix: 40, image: "https://picsum.photos/300/300" },
        { firstname : "Baptiste",lastnamee:"Parpette", photoProfil:"https://picsum.photos/50/50" ,titre: "Annonce 5", description: "Description 5", prix: 50, image: "https://picsum.photos/300/300" },
        { firstname : "Baptiste",lastnamee:"Parpette", photoProfil:"https://picsum.photos/50/50" ,titre: "Annonce 6", description: "Description 6", prix: 60, image: "https://picsum.photos/300/300" },
        ]

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


            
            <Intro/>
            <h1>Les dernière annonces</h1>
            <Annonces annonces={data}/>
        </>
    );
}

export default Home;

import React from "react";
import { useLocation } from "react-router-dom";
import { Alert } from "react-bootstrap";
import CreateAnnonce from "../../component/CreateAnnonce/CreateAnnonce";




const CreateAnnoncePage = () => {

    return (
        <>

            <h1 className="my-2">Création d'une offre</h1>
            <CreateAnnonce/>
        </>
    );
}

export default CreateAnnoncePage;

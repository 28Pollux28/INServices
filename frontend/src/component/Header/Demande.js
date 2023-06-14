import * as React from 'react';
import supprimer from "../../supprimer.png"
import cacher from "../../cacher.png"
import reglages from "../../reglages.png"
import {Card} from "react-bootstrap";

function Demande() {
    return (
        <div class="card" style={{width: "18rem"}}>
            <div class="card-body">
                <img src="..." class="rounded float-start" alt="..."></img>
                <p class="text-start ms-4">Prénom Nom</p>
                <p class="text-start ms-4">Année Département</p>

                <h5 class="card-title">Titre de la demande</h5>
                <p class="card-text">Contenu de la demande</p>
            </div>
            <img src="..." class="rounded mx-auto d-block" alt="..."></img>

            <p class="card-text"><small class="text-body-secondary">Récompense</small></p>
            <div class="btn-group" role="group" aria-label="Outils-demande">
                <button type="button" class="btn btn-danger">
                    <img src={supprimer} width="20" />
                </button>
                <button type="button" class="btn btn-warning">
                    <img src={cacher} width="20" />
                </button>
                <button type="button" class="btn btn-success">
                    <img src={reglages} width="20" />
                </button>
            </div>
        </div>
    )
}

export default Demande
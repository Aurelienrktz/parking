import React, { useState } from "react";
import s from "./information.module.css"
function Information({voitureAff,Liberer}) {

    return (
        <div className={s.container}>
            <h1>Information </h1>
            <h2>Numero Parking : <span>Parking {voitureAff.num}</span></h2>
            <h2>Immatriculation Voiture : <span>{voitureAff.voiture}</span></h2>
            <h2>Proprietaire : <span>{voitureAff.proprietaire}</span></h2>
            <button onClick={()=>Liberer(voitureAff.num)}>Terminer</button>
        </div>
    );
}
export default Information;
import React, { useState,useEffect } from "react";
import s from "./information.module.css"
function Formulaire({AjouterVoiture,numero,voitures}) {
    const[voiture,setVoiture]=useState({
        nom:"",
        immatr:"",
    })
    
    function handleSubmit(e) {
        e.preventDefault();
    
        const jour = String(new Date().getDate()).padStart(2, "0");
        const mois = String(new Date().getMonth() + 1).padStart(2, "0");
        const annee = new Date().getFullYear();
        const heure = String(new Date().getHours()).padStart(2, "0");
    
        const date = `${annee}-${mois}-${jour} ${heure}:00`;
    
        // Appelle la fonction du parent
        AjouterVoiture(
          voitures.length+1,
          voiture.immatr,
          "Parking",
          date,
          Number(numero),
          voiture.nom
        );
        
        setVoiture({ nom: " ", immatr: " "}); // reset
    }

    useEffect(()=>{

    },[])

    return (
        <form  id="ajout" name="ajout" className={s.container2} onSubmit={handleSubmit}>
            <h1>Enregistrement Parking N°{numero}</h1>
            <label htmlFor="nom" id="label1">Nom du propriétaire :</label>
            <input 
            id="nom"
            type="text" 
            name="nom" 
            onChange={(e) => setVoiture({ ...voiture, nom: e.target.value })} 
            />
            <label htmlFor="immatriculation" id="label2">Immatriculation de la voiture : </label>
            <input onChange={(e)=>setVoiture({...voiture,immatr:e.target.value})} type="text" name="immatriculation" id="immatriculation" />
            <button type="Submit" >AJOUTER</button>
        </form>
    );
}
export default Formulaire;
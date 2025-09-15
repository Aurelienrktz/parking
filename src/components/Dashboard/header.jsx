import React from 'react';
import s from './header.module.css'
const Header = ({voitures,setAfficher2,afficher}) => {

    const ListeParking=voitures.filter(value => value.statut=="en cours" && value.service=="Parking");
    const ListeLavage=voitures.filter(value => value.statut=="en cours" && value.service=="Lavage");
    //LISTE DE LA SEMAINE
    const ListeSemaine=voitures.filter(value=> {
        const datevoiture=new Date(value.dateEntree)
        const dateActu=new Date();
        const dateSemaine= new Date(dateActu-dateActu);
        if(datevoiture>=dateSemaine && datevoiture<=dateActu){
            return value;
        }
    })
    return (
      <div className={s.container}>

        <section>
          <div style={{ backgroundColor: "#7995FF" }}>
            <img src="/image/car.png" alt="logo voiture" />
          </div>
          <div>
            <h1>{ListeParking.length}</h1>
            <h2>Voitures gardée en parking</h2>
          </div>
        </section>
        <section>
          <div style={{ backgroundColor: "#79D891" }}>
            <img src="/image/car.png" alt="logo voiture" />
          </div>
          <div>
            <h1>{ListeLavage.length}</h1>
            <h2>Voitures en cours de lavage</h2>
          </div>
        </section>
        <section>
          <div style={{ backgroundColor: "#FFC36B" }}>
            <img src="/image/trend.png" alt="logo statistique" />
          </div>
          <div>
            <h1>{ListeSemaine.length}</h1>
            <h2>Voitures durant la semaine</h2>
          </div>
        </section>
      </div>
    );
}

export default Header;

import React,{useState,useContext,useEffect} from 'react';
import { AfficherBar, VoituresContexte } from '../MyContexte';
import Information from "./Parking/information";
import Formulaire from "./Parking/formulaire";
import s from './styles/parking.module.css';

const Parking = ({AjouterVoiture,voitures}) => {
    const [parking,setParking]=useState([
        {
            num:1,
            voiture:"",
            proprietaire:"",
        },
        {
            num:2,
            voiture:"",
            proprietaire:"",
        },
        {
            num:3,
            voiture:"",
            proprietaire:"",
        },
        {
            num:4,
            voiture:"",
            proprietaire:"",
        },
        {
            num:5,
            voiture:"",
            proprietaire:"",
        },
        {
            num:6,
            voiture:"",
            proprietaire:"",
        },
        {
            num:7,
            voiture:"",
            proprietaire:"",
        },
        {
            num:8,
            voiture:"",
            proprietaire:"",
        },
        {
            num:9,
            voiture:"",
            proprietaire:"",
        },
        {
            num:10,
            voiture:"",
            proprietaire:"",
        },
    ])

    function Liberer(id){
        setParking((prev)=>{
            const nouveau=prev.map(value=>{
                return value.num===id?{...value, voiture:"",proprietaire:""}:value
                
            })
            return nouveau
        })
    }
    
    const [voitureAff,setVoitureAff]=useState({
        num:0,
        proprietaire:"",
        voiture:"",
    })
    const [ind,setInd]=useState(0);
    const[info,setInfo]=useState(false)
    const[form,setForm]=useState(false)
    
    function AfficheInfo(num,nom,prop){
        if(!info){
            setInfo(true)
        }
        if(form){
            setForm(false)
        }
        setVoitureAff({
            num:num,
            proprietaire:prop,
            voiture:nom,
        })
    }
    function Afficheform(indX){
        if(!form){
            setForm(true)
        }
        if(info){
            setInfo(false)
        }
        setInd(indX)
    }
    
    useEffect(() => {
        handleParking();
    }, [voitures]); // ajouter parking si nécessaire pour la comparaison
    
    function handleParking() {
        const ListeParking=voitures.filter(value => value.service==="Parking" && value.statut==="en cours")
        const newParking = parking.map(p => {
            const voitureOccupee = ListeParking.find(v => v.numPark === p.num);
          return {
            ...p,
            voiture: voitureOccupee ? voitureOccupee.plaque : "",
            proprietaire: voitureOccupee ? voitureOccupee.proprietaire: ""
          };
        });
      
        // Vérifie si le tableau a réellement changé
        const isEqual = newParking.every((p, i) => p.voiture === parking[i].voiture);
      
        if (!isEqual) {
          setParking(newParking);
        }

      }

    return (
        <div className={s.container}>
            <img src="/image/Parking-amico (1).png" alt="" />
            <h1>Gestion de Parking</h1>
            <div className={s.parkinC}>
                {
                    parking.map((value,index)=>{
                        return (
                        <div key={index} style={{backgroundColor:value.voiture===""?"#25ff37":"#ff2525"}}>
                            <h1>N°{value.num}</h1>
                            <h6>{value.voiture===""?"Vide":value.voiture}</h6>
                            <button onClick={()=>Afficheform(value.num)} style={{display:value.voiture!==""?"none":"block"}}>Ajouter</button>
                            <button onClick={()=>AfficheInfo(value.num,value.voiture,value.proprietaire)}  style={{display:value.voiture!==""?"block":"none"}}>Voir</button>
                        </div>
                        )
                    })
                }
            </div>
            {info===true && <Information voitureAff={voitureAff} Liberer={Liberer} />}
            {form===true && <Formulaire parking={parking} voitures={voitures} numero={ind} AjouterVoiture={AjouterVoiture} />}
        </div>
    );
}

export default Parking;
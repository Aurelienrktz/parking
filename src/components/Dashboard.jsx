import React, { useContext, useEffect } from "react";
import Header from "./Dashboard/header";
import Chart from "./Dashboard/chart";
import Tableaux from "./Dashboard/tableaux";
import { VoituresContexte } from "../MyContexte";
import s from "./styles/dashboard.module.css";

const Dashboard = ({ setAfficher2, afficher, setVoitures }) => {
  const Listevoiture = useContext(VoituresContexte);
  return (
    <div className={s.container}>
      <Header
        voitures={Listevoiture}
        afficher={afficher}
        setAfficher2={setAfficher2}
      />
      <img
        className={s.illustration}
        src="/image/Visual data-pana.png"
        alt="illustration dashboard"
      />
      <Chart voitures={Listevoiture} />
      <Tableaux voitures={Listevoiture} setVoitures={setVoitures} />
    </div>
  );
};

export default Dashboard;

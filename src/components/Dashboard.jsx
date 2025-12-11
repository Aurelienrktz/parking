import { Link } from "react-router-dom";
import s from "./styles/header.module.css";
import { useNavigate } from "react-router-dom";
import Header from "./Dashboard/header";
import Chart from "./Dashboard/chart";
import Tableaux from "./Dashboard/tableaux";

const Dashboard = ({ voitures, setVoitures }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Redirection vers login
    navigate("/connexion");
  };
  return (
    <div>
      <Header voitures={voitures} />
      <Chart />
      <Tableaux voitures={voitures} setVoitures={setVoitures} />
    </div>
  );
};

export default Dashboard;

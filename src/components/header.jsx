import { Link } from "react-router-dom";
import s from "./styles/header.module.css";

const Header = ({ afficher, cacher }) => {
  return (
    <div className={s.header} style={{ left: afficher ? "0px" : "-300px" }}>
      <img
        src="/image/street paid parking-rafiki.png"
        alt="illustration parking"
      />
      <div className={s.navbar}>
        <div>
          <img src="/image/dashboard (5).png" alt="Logo dashboard" />
          <Link onClick={cacher} to="/">
            Dashboard
          </Link>
        </div>
        <div>
          <img src="/image/parking-area (1).png" alt="Logo parking" />
          <Link onClick={cacher} to="/parking">
            Parking
          </Link>
        </div>
        <div>
          <img src="/image/car-wash (1).png" alt="Logo lavage" />
          <Link onClick={cacher} to="/lavage">
            Lavage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;

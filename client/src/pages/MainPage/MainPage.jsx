import "./MainPage.css";
import { useNavigate } from "react-router-dom";

import CatsFon from "../../images/CatsFon.svg";
import BirdsFon from "../../images/BirdsFon.svg";
import DogsFon from "../../images/DogsFon.svg";
import LikeIcon from "../../images/LikeIcon.svg";
import ProfileIcon from "../../images/ProfileIcon.svg";
import BasketIcon from "../../images/BasketIcon.svg";

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <div className="layout">
      <header className="header">
        <div className="header__content">
          <span>хедер</span>

          <div className="header__icons">
            <img src={LikeIcon} alt="cat" className="header_icons" />
            <img src={BasketIcon} alt="cat" className="header_icons" />
            <img src={ProfileIcon} alt="cat" className="header_icons" />
          </div>
        </div>
      </header>

      <main className="main">
        <img
          src={CatsFon}
          alt="cat"
          className="main_image cat"
          onClick={() => navigate("/catalog/cats/food")}
        />

        <img
          src={BirdsFon}
          alt="bird"
          className="main_image bird"
          onClick={() => navigate("/catalog/birds/food")}
        />

        <img
          src={DogsFon}
          alt="dog"
          className="main_image dog"
          onClick={() => navigate("/catalog/dogs/food")}
        />
      </main>

      <footer className="footer">
        <span>футер</span>
      </footer>
    </div>
  );
}

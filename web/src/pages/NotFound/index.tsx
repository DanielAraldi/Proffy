import { Link } from "react-router-dom";

import landingImg from "../../assets/images/landing.svg";

import "./styles.css";

function NotFound() {
  return (
    <div id="page-message">
      <div id="page-message-content" className="container">
        <div className="message-container">
          <h1>404</h1>
          <h2>Oops, acho que está página não existe!</h2>
        </div>

        <Link to="/" className="landing" title="Voltar">
          <img
            src={landingImg}
            alt="Plataforma de estudos"
            className="hero-image"
          />
        </Link>
      </div>
    </div>
  );
}

export default NotFound;

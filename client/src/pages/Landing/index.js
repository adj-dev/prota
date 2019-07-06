import React from "react";
import logo from "../../assets/img/logo.png";
import Auth from "../../components/Auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import "./style.css";

// <noscript><link rel="stylesheet" href="assets/css/noscript.css" /></noscript>

export default function Landing() {
  return (
    <div>
      <section className="splash-welcome" id="welcome">
        <div className="welcome-message">
          <span>Welcome to Pr</span>
          <img className="splash-logo" alt="o" src={logo} />
          <span>ta</span>
        </div>
        <Auth />
        <a className="about-button" href="#about">
          More Info
          <FontAwesomeIcon icon={faArrowDown} />
        </a>
      </section>
      <section className="splash-section" id="about">
        <div>About</div>
      </section>
    </div>
  );
}

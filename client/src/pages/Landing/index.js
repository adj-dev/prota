import React from "react";
import logo from "../../assets/img/logo.png";
import Auth from "../../components/Auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import "./style.css";

export default function Landing() {
  function scrollToAbout() {
    let to = document.getElementById("about").offsetTop;
    window.scrollTo({
      top: to,
      left: 0,
      behavior: "smooth"
    });
  }

  return (
    <div>
      <section className="splash-welcome" id="welcome">
        <div className="welcome-message">
          <span>Welcome</span>
          <span>to</span>
          <span>
            <div className="brand-name">
              <span>Pr</span>
              <img className="splash-logo" alt="o" src={logo} />
              <span>ta</span>
            </div>
          </span>
        </div>
        <Auth />
        <ReactCSSTransitionGroup
          transitionName="about-button-animation"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnter={false}
          transitionLeave={false}
        >
          <div key={1} className="about-button" onClick={scrollToAbout}>
            More Info
            <FontAwesomeIcon icon={faArrowDown} />
          </div>
        </ReactCSSTransitionGroup>
      </section>
      <section className="splash-section" id="about">
        <div>About</div>
      </section>
    </div>
  );
}

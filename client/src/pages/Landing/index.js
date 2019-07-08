import React from "react";
import logo from "../../assets/img/logo.png";
import Auth from "../../components/Auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import "./style.css";
import TeamCard from "./TeamCard";

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
        <div className="about-content-container">
          <div className="splash-title">What is Prota?</div>
          <div className="about-info-container">
            Prota is a tool for independent development teams to track progress
            and productivity.
            <br />
            <br />
            Designed for simplicity, Prota helps developers stay in sync, hit
            deadlines, and reach goals with minimal overhead.
            <br />
            <br />
            Work smarter, not harder!
          </div>
        </div>
        <div className="team-container">
          <div className="team-title">Made with ❤️by</div>
          <div className="team-cards-container">
            <TeamCard
              name="Andrew Johnson"
              imageUrl="https://avatars0.githubusercontent.com/u/46357543"
              githubUrl="https://github.com/adj-dev"
            />
            <TeamCard
              name="Nhu Richie"
              imageUrl="https://avatars0.githubusercontent.com/u/49073152"
              githubUrl="https://github.com/nhurichie"
            />
            <TeamCard
              name="John Blake"
              imageUrl="https://avatars0.githubusercontent.com/u/14286088"
              githubUrl="https://github.com/johniblake"
            />
            <TeamCard
              name="Adam Schubert"
              imageUrl="https://avatars3.githubusercontent.com/u/149580"
              githubUrl="https://github.com/leavinit"
            />
            <TeamCard
              name="Kieran Anthony"
              imageUrl="https://avatars0.githubusercontent.com/u/12010449"
              githubUrl="https://github.com/zekkxx"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

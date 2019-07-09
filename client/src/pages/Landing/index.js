import React from "react";
import logo from "../../assets/img/logo.png";
import Auth from "../../components/Auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import CreateNewProject from "../../assets/img/create-newproject.png";
import ProjectTasks from "../../assets/img/projects-tasks.png";
import SprintsTasks from "../../assets/img/sprints-tasks.png";

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

  function scrollToFAQ() {
    let to = document.getElementById("faq").offsetTop;
    window.scrollTo({
      top: to,
      left: 0,
      behavior: "smooth"
    });
  }

  function scrollToTop() {
    let to = document.getElementById("welcome").offsetTop;
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
          <div className="splash-title">
            <h1>What is Prota?</h1>
          </div>
          <div className="about-info-container">
            Prota is a tool for independent development teams to track progress
            and productivity.
            Designed for simplicity, Prota helps developers stay in sync, hit
            deadlines, and reach goals with minimal overhead.
            <div>Work smarter, not harder!</div>
          </div>
        </div>
        <div className="team-container">
          <div className="team-title">Made with <span role="img" aria-label="love">❤️</span> by the Prota Team</div>
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
        <div className="welcome-button-center" onClick={scrollToFAQ}>
            Features
            <FontAwesomeIcon icon={faArrowDown} />
        </div>
      </section>

      <section className="faq-section" id="faq">
          <div className="faq-container">

            <div className="faq-info">
              <div className="faq-image">
                <img src={CreateNewProject} alt="Creating a new project" />
              </div>
              <div className="faq-text">
               <h1>Get Organized</h1> 
                <hr />
                Plan and structure work in a way that’s best for you. Create projects, assign owners, and contributors.
              </div>  
            </div>

            <div className="faq-info-r">
              <div className="faq-text">
                <h1>Stay on Track</h1>
                <hr />
                Follow projects and tasks through every stage. You know where work stands and can keep everyone aligned on goals. Share details and assign tasks. All in one place.
               </div>
               <div className="faq-image">
                <img src={ProjectTasks} alt="Looking at project tasks" />
              </div>
            </div>

            <div className="faq-info">
              <div className="faq-image">
              <img src={SprintsTasks} alt="Looking at sprint tasks"/>
              </div>
              <div className="faq-text">
              <h1>Hit Deadlines</h1>
              <hr />
                Create visual project plans to see your every step. Stay on track, whilst eliminating any roadblocks along the way. See how your team can structure work to turn all your goals into workable plans.
              </div>
            </div>
          </div>
          <div className="welcome-button-right text-black" onClick={scrollToTop}>
            Back to Top &nbsp;
            <FontAwesomeIcon icon={faArrowUp} />
          </div>
        </section>
    </div>
  );
}

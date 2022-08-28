import React from "react";
import mainImage from "../assets/images/landing-image.svg";
import vectorImage from "../assets/images/line.svg";
import { Link } from "react-router-dom";
import { Logo } from "../components";
import { Endpoints } from "../models/routes";

const Landing: React.FC = () => {
  return (
    <div className="landingContainer">
      <nav>
        <Logo />
        <Link to={Endpoints.Register}>
          <button className="button button--landingHeader">
            Login/Register
          </button>
        </Link>
      </nav>
      <div className="detailsContainer">
        <div className="details">
          <h1>
            Learn
            <br /> new words <br />
            for each language
          </h1>
          <p>We help you prepare for exams and quizes</p>
          <Link to={Endpoints.Register}>
            <button className="button button--landingDetails ">
              Start Learning
            </button>
          </Link>
        </div>
        <img src={mainImage} alt="mainImage" />
      </div>

      <img className="landingLine" src={vectorImage} alt="vectorLine" />
    </div>
  );
};

export default Landing;

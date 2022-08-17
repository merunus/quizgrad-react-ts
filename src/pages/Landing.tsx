import React from "react";
import mainImage from "../assets/images/LandingImg.svg";
import mainLogo from "../assets/images/LogoFull.svg";
import vectorImage from "../assets/images/Line.svg";
import { Link } from "react-router-dom";
import { Logo } from "../components";

const Landing: React.FC = () => {
  return (
    <div className="landingContainer">
      <nav>
        <Logo />
        <Link to="/register">
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
          <Link to="/register">
            <button className="button button--landingDetails ">
              Start Learning
            </button>
          </Link>
        </div>
        <img src={mainImage} alt="" />
      </div>

      <img className="landingLine" src={vectorImage} alt="" />
    </div>
  );
};

export default Landing;

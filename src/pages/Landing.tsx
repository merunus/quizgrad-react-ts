import React from "react";
import mainImage from "../assets/images/landing-image.svg";
import vectorImage from "../assets/images/line.svg";
import { Link } from "react-router-dom";
import { Logo } from "../components";
import { Endpoints } from "../models/routes";
import { motion } from "framer-motion";

const textAnimations = {
  hidden: {
    x: -100,
    opacity: 0,
  },
  visible: (custom: number) => ({
    x: 0,
    opacity: 1,
    transition: { delay: custom * 0.1 },
  }),
};

const Landing: React.FC = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      className="landingContainer"
    >
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
          <motion.h1 custom={1} variants={textAnimations}>
            Learn
            <br /> new words <br />
            for each language
          </motion.h1>
          <motion.p variants={textAnimations} custom={2}>
            We help you prepare for exams and quizes
          </motion.p>
          <Link to={Endpoints.Register}>
            <motion.button
              variants={textAnimations}
              custom={3}
              className="button button--landingDetails "
            >
              Start Learning
            </motion.button>
          </Link>
        </div>
        <img src={mainImage} alt="mainImage" />
      </div>

      <img className="landingLine" src={vectorImage} alt="vectorLine" />
    </motion.div>
  );
};

export default Landing;

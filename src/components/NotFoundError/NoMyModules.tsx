import React from "react";
import { Link } from "react-router-dom";
import { Endpoints } from "../../models/routes";

const NoMyModules: React.FC = () => {
  return (
    <section className="notFoundContainer">
      <div className="notFoundContainer__link">
        <h1>You don't have any modules</h1>
        <Link
          style={{ display: "block" }}
          to={Endpoints.CreateModule}
          className="button--createFormBtn button--noModules"
        >
          Create Module
        </Link>
      </div>
    </section>
  );
};

export default NoMyModules;

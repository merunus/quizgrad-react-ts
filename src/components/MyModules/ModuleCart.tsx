import React from "react";
import { Link } from "react-router-dom";
import { IoLanguageOutline } from "react-icons/io5";
import { TModuleCartProps } from "../AllModules/ModuleCart";
import { Endpoints } from "../../models/routes";

// My Module Cart
const ModuleCart: React.FC<TModuleCartProps> = ({
  _id,
  title,
  language,
  words,
}) => {
  return (
    <article className="myModuleCartContainer">
      <Link to={`${Endpoints.SingleModule}/${_id}`}>
        <header className="myModuleCartContainer__header">
          <h1>{title}</h1>
        </header>
        <div className="myModuleCartContainer__bottom">
          <span>
            <IoLanguageOutline />
            <h2>{language}</h2>
          </span>
          <p>
            {words.length} term{words.length > 1 && "s"}
          </p>
        </div>
      </Link>
    </article>
  );
};

export default ModuleCart;

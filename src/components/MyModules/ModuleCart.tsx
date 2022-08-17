import React from "react";
import { Link } from "react-router-dom";
import { IoLanguageOutline } from "react-icons/io5";
import { TModuleCartProps } from "../AllModules/ModuleCart";

// My Module Cart
const ModuleCart: React.FC<TModuleCartProps> = ({
  _id,
  title,
  language,
  user,
  words,
}) => {
  return (
    <article className="myModuleCartContainer">
      <Link to={`/module/${_id}`}>
        <header className="myModuleCartContainer__header">
          <h1>{title}</h1>
        </header>
        <div className="myModuleCartContainer__bottom">
          <span>
            <IoLanguageOutline />
            <h2>{language}</h2>
          </span>
          <p>
            {words.length} termin{words.length > 1 && "s"}
          </p>
        </div>
      </Link>
    </article>
  );
};

export default ModuleCart;

import React from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { TWord } from "../../redux/module/types";
import { IoLanguageOutline } from "react-icons/io5";
import { AiFillEye } from "react-icons/ai";

export type TUser = {
  _id: string;
  userName: string;
  email: string;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TModuleCartProps = {
  _id: string;
  title: string;
  user: TUser;
  language: string;
  words: TWord[];
  viewsCount?: number;
  children?: JSX.Element | JSX.Element[];
};

// All Module Cart
const ModuleCart: React.FC<TModuleCartProps> = ({
  _id,
  title,
  language,
  user,
  viewsCount,
  words,
}) => {
  return (
    <Link to={`/module/${_id}`} className="moduleCartContainer">
      <header className="moduleCartContainer__header">
        <h1>{title}</h1>
        <h2>
          <IoLanguageOutline />
          {language}
        </h2>
      </header>

      <div className="moduleCartContainer__info">
        <span>
          <BsFillPersonFill />
          {user?.userName}
        </span>

        <p>
          {words.length} word{words.length > 1 && "s"}
        </p>
        <p>
          <AiFillEye />
          {viewsCount}
        </p>
      </div>
    </Link>
  );
};

export default ModuleCart;

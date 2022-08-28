import React from "react";
import { selectFilterData } from "../../redux/filter/selectors";
import notFoundImage from "../../assets/images/nomodules.svg";
import { useAppSelector } from "../../redux/store";

const NoModules: React.FC = () => {
  const { searchValue } = useAppSelector(selectFilterData);

  return (
    <section className="notFoundContainer">
      <h1>
        No modules found
        <br /> with title <span>{searchValue}</span>
      </h1>
      <img src={notFoundImage} alt="notfound" />
    </section>
  );
};

export default NoModules;

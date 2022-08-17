import React from "react";
import { useSelector } from "react-redux";
import { selectFilterData } from "../../redux/filter/selectors";
import notFoundImage from "../../assets/images/nomodules.svg"

const NoModules: React.FC = () => {
  const { searchValue } = useSelector(selectFilterData);

  return (
    <section className="notFoundContainer">
      <h1>
        No modules found
        <br /> with title <span>{searchValue}</span>
      </h1>
      <img src={notFoundImage} alt="" />
    </section>
  );
};

export default NoModules;

import React, { useEffect } from "react";
import { AllModulesContainer } from "../../components/AllModules";
import AllModulesSearch from "../../components/AllModules/AllModulesSearch";

const AllModules: React.FC = () => {
  return (
    <>
      <AllModulesSearch />
      <AllModulesContainer />
    </>
  );
};

export default AllModules;

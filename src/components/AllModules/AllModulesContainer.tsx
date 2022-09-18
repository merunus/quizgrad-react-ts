import React, { useEffect, useState } from "react";
import { selectModuleData } from "../../redux/module/selectors";
import { fetchAllModules } from "../../redux/module/slice";
import { TModule } from "../../redux/module/types";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import ModuleCart from "./ModuleCart";
import ModuleCartSkeleton from "./ModuleCartSkeleton";
import { BsFillGridFill, BsList } from "react-icons/bs";
import { selectFilterData } from "../../redux/filter/selectors";
import { NoModules } from "../NotFoundError";
const AllModulesContainer: React.FC = () => {
  const { totalModules, modules, isLoading } = useAppSelector(selectModuleData);
  const { searchValue } = useAppSelector(selectFilterData);
  const [isGrid, setIsGrid] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!searchValue) dispatch(fetchAllModules());
  }, [dispatch, searchValue]);

  const skeletons = [...new Array(totalModules)].map((_, index) => (
    <ModuleCartSkeleton key={index} />
  ));

  const allModules = modules.map((module: TModule) => {
    return <ModuleCart key={module._id} {...module} />;
  });

  return (
    <section className="allModulesContainer">
      <div className="allModulesContainer__header">
        <div className="allModulesContainer__btnContainer">
          <button
            className={isGrid ? "activeView" : ""}
            onClick={() => {
              setIsGrid(true);
            }}
          >
            <BsFillGridFill />
          </button>
          <button
            className={!isGrid ? "activeView" : ""}
            onClick={() => setIsGrid(false)}
          >
            <BsList />
          </button>
        </div>
        <h5>
          {totalModules} Module{totalModules > 1 && "s"} Found
        </h5>
        <hr />
      </div>

      {modules.length >= 1 ? (
        <div
          className={
            isGrid ? "modules modules--gridView" : "modules modules--listView"
          }
        >
          {allModules}
        </div>
      ) : isLoading ? (
        <div
          className={
            isGrid ? "modules modules--gridView" : "modules modules--listView"
          }
        >
          {skeletons}
        </div>
      ) : (
        <NoModules />
      )}
    </section>
  );
};

export default AllModulesContainer;

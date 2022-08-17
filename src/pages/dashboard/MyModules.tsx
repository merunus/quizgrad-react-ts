import React, { useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectUserData } from "../../redux/user/selectors";
import {
  ModuleCart,
  ModuleCartSkeleton,
  MyModulesSearch,
} from "../../components/MyModules";
import { useAppDispatch } from "../../redux/store";
import { fetchMyModules } from "../../redux/module/slice";
import { selectModuleData } from "../../redux/module/selectors";
import { TModule } from "../../redux/module/types";
import { selectFilterData } from "../../redux/filter/selectors";
import { NoModules, NoMyModules } from "../../components/NotFoundError";

const MyModules: React.FC = () => {
  const { searchValue } = useSelector(selectFilterData);
  const { user } = useSelector(selectUserData);
  const { totalMyModules, myModules, isLoading } =
    useSelector(selectModuleData);
  const dispatch = useAppDispatch();
  const { userName, _id } = user;

  useEffect(() => {
    if (!searchValue) dispatch(fetchMyModules(_id));
  }, [searchValue]);

  const skeletons = [...new Array(totalMyModules)].map((_, index) => (
    <ModuleCartSkeleton key={index} />
  ));

  const modulesMy = myModules.map((module: TModule) => {
    return <ModuleCart key={module._id} {...module} />;
  });

  return (
    <section className="myModulesWrapper">
      <header className="myModulesWrapper__header">
        <FaUserCircle />
        <h2>{userName}</h2>
      </header>
      <div className="myModulesContainer">
        <div className="myModulesContainer__top">
          <h4>My Modules</h4>
          <MyModulesSearch />
        </div>
        <div className="myModulesContainer__myModAmount">
          <p>
            {totalMyModules} Module{totalMyModules > 1 && "s"} Found
          </p>
          <hr />
        </div>

        {modulesMy.length >= 1 ? (
          <div className="myModulesContainer__myModules">{modulesMy}</div>
        ) : isLoading ? (
          <div className="myModulesContainer__myModules">{skeletons}</div>
        ) : modulesMy.length < 1 && searchValue === "" ? (
          <NoMyModules />
        ) : (
          <NoModules />
        )}
      </div>
    </section>
  );
};

export default MyModules;
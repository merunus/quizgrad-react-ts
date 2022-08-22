import React from "react";
import { TModule } from "../../redux/module/types";
import SMWordCart from "./SMWordCart";
import { selectUserData } from "../../redux/user/selectors";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ModuleCartSkeleton } from "../MyModules";
import SingleWordSkeleton from "./skeletons/SingleWordSkeleton";
import { selectModuleData } from "../../redux/module/selectors";
const BottomContainer: React.FC<TModule> = ({
  title,
  _id,
  language,
  viewsCount,
  words,
  created,
  moduleId,
  moduleCreator,
}) => {
  const { isLoading } = useSelector(selectModuleData);
  const { user } = useSelector(selectUserData);
  const isEditable = moduleCreator?.email === user?.email;
  return (
    <section className="singleModuleBottomContainer">
      <header className="singleModuleBottomContainer__header">
        <h1>Words in module ({words?.length})</h1>
      </header>
      <div className="wordsListContainer">
        {isLoading
          ? words?.map(() => {
              return <SingleWordSkeleton />;
            })
          : words?.map((word, index) => {
              return (
                <SMWordCart
                  isEditable={isEditable}
                  isDeletable={words?.length > 2 ? true : false}
                  moduleId={moduleId}
                  key={index}
                  {...word}
                />
              );
            })}
      </div>
      <div>
        {words?.length > 5 && isEditable &&(
          <Link to={`/create-module/${_id}`}>
            <button
              style={{ marginTop: "25px" }}
              className="button button--createFormBtnBottom"
            >
              Add or Delete words
            </button>
          </Link>
        )}
      </div>
    </section>
  );
};

export default BottomContainer;

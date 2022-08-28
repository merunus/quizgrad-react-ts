import React from "react";
import { TModule } from "../../redux/module/types";
import SMWordCart from "./SMWordCart";
import { selectUserData } from "../../redux/user/selectors";
import { Link } from "react-router-dom";
import SingleWordSkeleton from "./skeletons/SingleWordSkeleton";
import { selectModuleData } from "../../redux/module/selectors";
import { useAppSelector } from "../../redux/store";
import { Endpoints } from "../../models/routes";
const BottomContainer: React.FC<TModule> = ({
  _id,
  words,
  moduleId,
  moduleCreator,
}) => {
  const { isLoading } = useAppSelector(selectModuleData);
  const { user } = useAppSelector(selectUserData);
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
        {words?.length > 5 && isEditable && (
          <Link to={`${Endpoints.UpdateModule}/${_id}`}>
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

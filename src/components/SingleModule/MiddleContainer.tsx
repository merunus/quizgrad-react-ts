import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Endpoints } from "../../models/routes";
import { TModule } from "../../redux/module/types";
import { useAppSelector } from "../../redux/store";
import { selectUserData } from "../../redux/user/selectors";
import customAxios from "../../utils/customAxios";

const MiddleContainer: React.FC<TModule> = ({
  _id,
  created,
  moduleCreator,
}) => {
  const { user } = useAppSelector(selectUserData);
  const navigate = useNavigate();
  const isEditable = moduleCreator?.email === user?.email;

  const handleDeleteModule = async () => {
    if (window.confirm("Are you sure you want to delete this module?")) {
      await customAxios.delete(`/modules/delete/${_id}`);
      navigate(Endpoints.Home);
    }
  };

  return (
    <section className="singleModuleMiddleContainer">
      <div className="singleModuleMiddleContainer__infoWrapper">
        <FaUserCircle />
        <div className="singleModuleMiddleContainer__infoCont">
          <div className="singleModuleMiddleContainer__info">
            <h5>Author :</h5>
            <p>{moduleCreator?.userName}</p>
          </div>
          <div className="singleModuleMiddleContainer__info">
            <h5>Created :</h5>
            <p>{created}</p>
          </div>
        </div>
      </div>

      {isEditable && (
        <div className="singleModuleMiddleContainer__buttons">
          <button
            style={{ display: "block" }}
            onClick={handleDeleteModule}
            className="button button--deleteModuleBtn button--editSingleModule"
          >
            Delete Module
          </button>
          <Link to={`${Endpoints.UpdateModule}/${_id}`}>
            <button
              style={{ display: "block" }}
              className="button button--createFormBtn button--editSingleModule"
            >
              Edit Module
            </button>
          </Link>
        </div>
      )}
    </section>
  );
};


export default MiddleContainer;

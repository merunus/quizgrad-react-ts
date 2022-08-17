import React from "react";
import { FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectModuleData } from "../../redux/module/selectors";
import { toggleSidebar } from "../../redux/module/slice";
import { useAppDispatch } from "../../redux/store";
import Logo from "../Logo";
import SidebarLinks from "../SidebarLinks";

const SmallSidebar: React.FC = () => {
  const { isSidebarOpen } = useSelector(selectModuleData);
  const dispatch = useAppDispatch();
  const toggle = () => {
    dispatch(toggleSidebar());
  };

  return (
    <aside className="smallSidebarWrapper">
      <div
        className={
          isSidebarOpen
            ? "smallSidebarContainer showSmallSidebar"
            : "smallSidebarContainer"
        }
      >
        <div className="smallSidebarContainer__content">
          <button onClick={toggle} className="button button--closeSmallSidebar">
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <SidebarLinks toggleSidebar={toggle} />
        </div>
      </div>
    </aside>
  );
};

export default SmallSidebar;

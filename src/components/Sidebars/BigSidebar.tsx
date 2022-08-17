import React from "react";
import { useSelector } from "react-redux";
import { selectModuleData } from "../../redux/module/selectors";
import Logo from "../Logo";
import SidebarLinks from "../SidebarLinks";

const BigSidebar: React.FC = () => {
  const { isSidebarOpen } = useSelector(selectModuleData);

  return (
    <aside className="bigSidebarWrapper">
      <div
        className={
          isSidebarOpen
            ? "bigSidebarContainer showBigSidebar"
            : "bigSidebarContainer"
        }
      >
        <div className="bigSidebarContainer__content">
          <header>
            <Logo />
          </header>
          <SidebarLinks />
        </div>
      </div>
    </aside>
  );
};

export default BigSidebar;

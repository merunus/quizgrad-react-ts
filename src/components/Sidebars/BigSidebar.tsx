import React from "react";
import { selectModuleData } from "../../redux/module/selectors";
import { useAppSelector } from "../../redux/store";
import Logo from "../Logo";
import SidebarLinks from "../SidebarLinks";

const BigSidebar: React.FC = () => {
  const { isSidebarOpen } = useAppSelector(selectModuleData);

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

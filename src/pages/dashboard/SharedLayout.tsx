import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { BigSidebar, Navbar, SmallSidebar } from "../../components";
import { clearSearchValue } from "../../redux/filter/slice";
import { useAppDispatch } from "../../redux/store";

const SharedLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname !== "/all-modules") {
      dispatch(clearSearchValue());
    }
  }, [dispatch, location]);

  return (
    <section className="sharedLayotWrapper">
      <main className="dashboard">
        <SmallSidebar />
        <BigSidebar />
        <div>
          <Navbar />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
    </section>
  );
};

export default SharedLayout;

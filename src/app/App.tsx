import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "../scss/app.scss";
import "react-toastify/dist/ReactToastify.css";
import { SkeletonTheme } from "react-loading-skeleton";
import AppRoutes from "./AppRoutes";

const App: React.FC = () => {
  return (
    <SkeletonTheme baseColor="#F3F3F3" highlightColor="#ECEBEB">
      <BrowserRouter>
        <AppRoutes />
        <ToastContainer position="top-center" />
      </BrowserRouter>
    </SkeletonTheme>
  );
};

export default App;

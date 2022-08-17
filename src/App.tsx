import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import "./scss/app.scss";
import "react-toastify/dist/ReactToastify.css";
import {
  AllModules,
  CreateModule,
  Profile,
  SharedLayout,
  SingleModule,
  MyModules,
  Quiz,
} from "./pages/dashboard";
import ProtectedRoute from "./pages/ProtectedRoute";
import { SkeletonTheme } from "react-loading-skeleton";
const App: React.FC = () => {
  return (
    <SkeletonTheme baseColor="#F3F3F3" highlightColor="#ECEBEB">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <SharedLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<MyModules />} />
            <Route path="/all-modules" element={<AllModules />} />
            <Route path="/create-module" element={<CreateModule />} />
            <Route path="/create-module/:id" element={<CreateModule />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/module/:id" element={<SingleModule />} />
            <Route path="/quiz/:id" element={<Quiz />} />
          </Route>
          <Route path="/landing" element={<Landing />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <ToastContainer position="top-center" />
      </BrowserRouter>
    </SkeletonTheme>
  );
};

export default App;

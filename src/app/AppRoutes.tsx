import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import { Endpoints } from "../models/routes";
import {
  AllModules,
  CreateModule,
  Profile,
  SharedLayout,
  SingleModule,
  MyModules,
  Quiz,
} from "../pages/dashboard";
import Landing from "../pages/Landing";
import Register from "../pages/Register";
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path={Endpoints.Home}
        element={
          <ProtectedRoute>
            <SharedLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<MyModules />} />
        <Route path={Endpoints.AllModules} element={<AllModules />} />
        <Route path={Endpoints.CreateModule} element={<CreateModule />} />
        <Route
          path={`${Endpoints.UpdateModule}/:id`}
          element={<CreateModule />}
        />
        <Route path={Endpoints.Profile} element={<Profile />} />
        <Route
          path={`${Endpoints.SingleModule}/:id`}
          element={<SingleModule />}
        />
        <Route path={`${Endpoints.Quiz}/:id`} element={<Quiz />} />
      </Route>
      <Route path={Endpoints.Landing} element={<Landing />} />
      <Route path={Endpoints.Register} element={<Register />} />
    </Routes>
  );
};

export default AppRoutes;

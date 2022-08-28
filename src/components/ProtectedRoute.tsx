import { Navigate } from "react-router-dom";
import { selectUserData } from "../redux/user/selectors";
import { useAppSelector } from "../redux/store";
import { Endpoints } from "../models/routes";

type TProtectedRouteProps = {
  children: JSX.Element;
};

const ProtectedRoute = ({ children }: TProtectedRouteProps) => {
  const { user } = useAppSelector(selectUserData);
  if (!user) {
    return <Navigate to={Endpoints.Landing} />;
  }
  return children;
};

export default ProtectedRoute;

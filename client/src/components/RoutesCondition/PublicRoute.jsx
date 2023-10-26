import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

const PublicRoute = () => {
  const { user } = useAuthContext();

  return user ? <Navigate to={"/"} /> : <Outlet />;
};

export default PublicRoute;

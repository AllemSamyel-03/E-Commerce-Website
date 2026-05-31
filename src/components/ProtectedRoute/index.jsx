import { use } from "react";
import { Navigate } from "react-router";
import AuthContext from "../../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = use(AuthContext);

  if (currentUser === null) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

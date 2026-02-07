import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    <div className="loading-screen">
      <ClipLoader size={20} />
    </div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;

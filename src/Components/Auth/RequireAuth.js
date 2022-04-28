import { auth } from "../../Firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);
  const location = useLocation();
  if (user) {
    return children;
  } else {
    return <Navigate to="/Login" state={{ from: location }} replace />;
  }
};

export default RequireAuth;

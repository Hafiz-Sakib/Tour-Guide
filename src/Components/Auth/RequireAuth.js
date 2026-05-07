import { auth } from "../../Firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f8f5ef]">
        <div className="flex flex-col items-center gap-5">
          <div className="relative w-14 h-14">
            <div className="absolute inset-0 rounded-full border-2 border-[#c9a84c]/20"></div>
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#c9a84c] animate-spin"></div>
          </div>
          <p className="text-xs text-[#0a1628]/40 tracking-[0.3em] uppercase font-semibold">
            Loading…
          </p>
        </div>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

  return children;
};

export default RequireAuth;

// src/Components/Auth/AuthRedirectHandler.js
// Handles getRedirectResult centrally (fallback path when popup is blocked).
// Place <AuthRedirectHandler /> once in App.js, above <Routes>.

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRedirectResult } from "firebase/auth";
import { auth } from "../../Firebase.init";
import toast from "react-hot-toast";

const AuthRedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (!result?.user) return;

        const savedFrom = sessionStorage.getItem("redirectFrom") || "/";
        sessionStorage.removeItem("redirectFrom");

        const isNewUser =
          result.user.metadata.creationTime ===
          result.user.metadata.lastSignInTime;

        toast.success(
          isNewUser ? "Account ready. Welcome!" : "Signed in successfully.",
        );
        navigate(savedFrom, { replace: true });
      })
      .catch((error) => {
        if (
          error.code === "auth/no-current-user" ||
          error.code === "auth/null-user"
        )
          return;
        console.error("Google redirect error:", error);
        toast.error("Google sign-in failed. Please try again.");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default AuthRedirectHandler;

import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import app from "../../Firebase.init";
import { GoogleAuthProvider } from "firebase/auth";
import toast from "react-hot-toast";
import { useState } from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";
const auth = getAuth(app);

const Registration = () => {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [passwordConfirmation, setPasswordConfirmation] = useState({
    value: "",
    error: "",
  });
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();
  const gitProvider = new GithubAuthProvider();
  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // const user = result.user;
        // console.log(user);
        navigate("/");
      })
      .catch((error) => {
        // console.log(error);
      });
  };
  const handleGitHubSignIn = () => {
    signInWithPopup(auth, gitProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEmail = (event) => {
    const emailInput = event.target.value;
    console.log(emailInput);
    if (/\S+@\S+\.\S+/.test(emailInput)) {
      setEmail({ value: emailInput, error: "" });
    } else {
      setEmail({ value: "", error: "Please Provide a Valid Email❗" });
    }
  };

  const handlePassword = (event) => {
    const passwordInput = event.target.value;

    if (passwordInput.length < 7) {
      setPassword({ value: "", error: "Password too short❗" });
    } else if (!/(?=.*[A-Z])/.test(passwordInput)) {
      setPassword({
        value: "",
        error: "Password must contain a capital letter❗",
      });
    } else {
      setPassword({ value: passwordInput, error: "" });
    }
  };

  const handleConfirmPassword = (event) => {
    const confirmationInput = event.target.value;

    if (confirmationInput !== password.value) {
      setPasswordConfirmation({ value: "", error: "Password Mismatched" });
    } else {
      setPasswordConfirmation({ value: confirmationInput, error: "" });
    }
  };

  const handleRegistration = (event) => {
    event.preventDefault();
    if (email.value === "") {
      setEmail({ value: "", error: "Email is required" });
    }
    if (password.value === "") {
      setPassword({ value: "", error: "Password is required" });
    }
    if (passwordConfirmation.value === "") {
      setPasswordConfirmation({
        value: "",
        error: "Password confirmation is required",
      });
    }
    if (email.value && password.value === passwordConfirmation.value) {
      createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
          const user = userCredential.user;
          toast.success("Account created", { id: "created" });
          navigate("/");
        })
        .catch((error) => {
          const errorMessage = error.message;
          if (errorMessage.includes("already-in-use")) {
            toast.error("Email already in use", { id: "error" });
          } else {
            toast.error(errorMessage, { id: "error" });
          }
        });
    }
  };

  return (
    <div className="mt-24">
      <div className="flex flex-wrap w-full">
        <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
          <img
            src="https://img.freepik.com/free-vector/authentication-concept-illustration_114360-2168.jpg?t=st=1650598443~exp=1650599043~hmac=0c5093a31665517e5f549ae5908a8155456477dc10596ed6dc8c43567210fc1d&w=740"
            className="w-full"
            alt=""
          />
        </div>
        <div className="flex flex-col w-full md:w-1/2">
          <div className="flex justify-center md:justify-start md:ml-52 md:pt-28 pb-4">
            <Link
              to={"/Registration"}
              className="p-4 text-xl font-bold text-white bg-blue-600 shadow-lg shadow-blue-500"
            >
              Register Now For Your Booking!
            </Link>
          </div>
          <div className="flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32">
            <p className="text-3xl text-center">Welcome.</p>
            <form
              className="flex flex-col pt-3 md:pt-8"
              onSubmit={handleRegistration}
            >
              <div className="flex flex-col pt-4"></div>
              <div className="flex flex-col pt-4">
                <div className="flex relative ">
                  <span className=" inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                    <svg
                      width="15"
                      height="15"
                      fill="currentColor"
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z"></path>
                    </svg>
                  </span>
                  <input
                    onBlur={handleEmail}
                    type="email"
                    name="email"
                    id="design-login-email"
                    className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Email"
                  />
                </div>
                <div className="mt-2">
                  {email?.error && (
                    <p className="error text-red-600">{email.error}</p>
                  )}
                </div>
              </div>
              <div className="flex flex-col pt-4 mb-12">
                <div className="flex relative mb-4">
                  <span className=" inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                    <svg
                      width="15"
                      height="15"
                      fill="currentColor"
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z"></path>
                    </svg>
                  </span>
                  <input
                    onBlur={handlePassword}
                    type="password"
                    name="password"
                    required
                    id="design-login-password"
                    className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Password"
                  />
                </div>
                <div className="mb-3">
                  {password.error && (
                    <p className="error text-red-600">{password.error}</p>
                  )}
                </div>
                <div className="flex relative">
                  <span className=" inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                    <svg
                      width="15"
                      height="15"
                      fill="currentColor"
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z"></path>
                    </svg>
                  </span>
                  <input
                    onBlur={handleConfirmPassword}
                    type="password"
                    name="password"
                    required
                    id="design-Confirm-password"
                    className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Confirm Password"
                  />
                </div>
                <div className="mt-2">
                  {passwordConfirmation.error && (
                    <p className="text-red-600">
                      <AiOutlineExclamationCircle />{" "}
                      {passwordConfirmation.error}
                    </p>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-blue-600 hover:text-black hover:bg-green-600 focus:outline-none focus:ring-2 shadow-lg shadow-blue-500"
              >
                <span className="w-full">Register Now</span>
              </button>
              <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                <p className="text-center font-semibold mx-4 mb-0">OR</p>
              </div>
              <div className="ml-16 md:ml-32">
                <button
                  onClick={handleGoogleLogin}
                  type="button"
                  id="button"
                  className="text-black bg-[#ffff] font-medium rounded-lg text-sm px-9 py-3 text-center inline-flex items-center border-2 bg-gray-200 mr-2 mb-2 hover:bg-gray-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="18.5"
                    height="18.5"
                    viewBox="0 0 48 48"
                    style={{ fill: "#000000" }}
                  >
                    <path
                      fill="#FFC107"
                      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                    <path
                      fill="#FF3D00"
                      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                    ></path>
                    <path
                      fill="#4CAF50"
                      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                    ></path>
                    <path
                      fill="#1976D2"
                      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                  </svg>
                  <span className="ml-2">Sign in with Google</span>
                </button>
                <button
                  type="button"
                  onClick={handleGitHubSignIn}
                  className="text-white bg-[#24292F] hover:bg-black focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-10 py-3.5 text-center inline-flex items-center dark:focus:ring-gray-800 dark:hover:bg-black mr-2 mb-2"
                >
                  <svg
                    className="w-4 h-4 mr-2 -ml-1"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="github"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 496 512"
                  >
                    <path
                      fill="currentColor"
                      d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                    ></path>
                  </svg>
                  Sign in with Github
                </button>
              </div>
              <div className="pt-12 pb-12 text-center">
                <p>
                  Already have an account?
                  <Link to={"/Login"} className="font-semibold underline">
                    Login here.
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;

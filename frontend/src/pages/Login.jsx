import React from "react";
import logo from "/src/assets/logotr.png";
import { logIn, checkUser } from "../util/log";
import { createLocalCred } from "../util/localDb";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const InputField = ({ id, name, type, placeholder, onChange }) => {
  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        name={name}
        className="w-full px-0 pb-2 mb-1 text-gray-100 bg-transparent border-b-2 border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-blue-700"
        placeholder={placeholder}
        required
        onChange={onChange}
      />
    </div>
  );
};

const handleLogin = async (email, password, navigate) => {
  const cred = await logIn(email, password);
  const user = await checkUser(cred);
  createLocalCred(user);
  console.log(user);
  if (user === "admin") {
    navigate("/admin");
  } else {
    navigate("/live-feed");
  }
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
      <div className="w-full max-w-md sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg">
        <div className="flex justify-center">
          <img
            src={logo}
            alt="HydroWatch Logo"
            className="mb-4 h-16 sm:h-16 md:h-16 lg:h-16 xl:h-20"
          />
        </div>

        <form className="mb-10 space-y-6">
          <InputField
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <InputField
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div>
            <button
              type="button"
              className={`w-full px-4 py-2 mt-8 mb-8 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 sm:px-6 md:px-8 lg:px-10 xl:px-12`}
              onClick={() => {
                handleLogin(email, password, navigate);
              }}
              disabled={!email || !password}
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;

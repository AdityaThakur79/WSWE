import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const { btnLoading, loginUser } = UserData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    await loginUser(email, password, navigate);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Login
        </h2>
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-600 font-medium">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-gray-600 font-medium"
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="w-full bg-[#FAA845] text-white py-2 rounded-md hover:bg-indigo-600 transition duration-200"
            >
              {btnLoading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-indigo-500 hover:underline">
            Register
          </Link>
          <br />
          Forgot Password?{" "}
          <Link
            to="/forgot-password"
            className="text-indigo-500 hover:underline"
          >
            Reset
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

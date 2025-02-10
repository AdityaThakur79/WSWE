import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext.js";

const Register = () => {
  const { registerUser, btnLoading } = UserData();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    answer: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, phone, answer } = formData;
    registerUser(name, email, password, answer, phone, navigate);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#FAA845]">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600"
            >
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-600"
            >
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              placeholder="Enter your phone number"
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="answer"
              className="block text-sm font-medium text-gray-600"
            >
              Security Answer
            </label>
            <input
              type="text"
              name="answer"
              placeholder="Your favorite sport"
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={btnLoading}
              className={`w-full bg-[#FAA845] text-white py-2 rounded-md hover:bg-[#FAA845] transition duration-200 ${
                btnLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {btnLoading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

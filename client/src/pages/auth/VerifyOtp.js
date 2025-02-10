import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext";

const VerifyOtp = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { btnLoading, verifyOTP } = UserData();

  const [otp, setOtp] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await verifyOTP(state.email, otp, navigate);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-sm bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Verify OTP
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Registered Email
            </label>
            <input
              type="text"
              value={state?.email}
              readOnly
              className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-600"
            >
              OTP
            </label>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={btnLoading}
            className={`w-full bg-[#FAA845] text-white py-2 rounded-md hover:bg-[#FAA845] transition duration-200 ${
              btnLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {btnLoading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-4">
          Didn't receive an OTP?{" "}
          <span className="text-indigo-500 cursor-pointer hover:underline">
            Resend
          </span>
        </p>
      </div>
    </div>
  );
};

export default VerifyOtp;

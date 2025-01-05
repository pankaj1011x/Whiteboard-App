import React, { useState } from "react";
import Button from "../components/Button";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (e) => {
    console.log(email);
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/forgot-password",
        {
          email,
        }
      );
      console.log(response.data);
    } catch (err) {
      console.log("reset-error", err);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Forgot Password
        </h2>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-4">
            <label
              for="email"
              className="block text-gray-700 text-sm font-medium mb-1"
            >
              Email
            </label>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 border rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>

          <Button inputText="Send Reset Link" />
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Remembered your password?
          <a href="/signin" className="text-blue-500 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;

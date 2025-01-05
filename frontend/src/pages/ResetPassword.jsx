import React, { useState } from "react";
import axios from "axios";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const token = new URLSearchParams(window.location.search).get("token");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/reset-password",
        {
          token,
          password,
        }
      );

      setSuccessMessage("Your password has been reset successfully.");
      setError("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(err);
      setError("Failed to reset password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Reset Password
        </h2>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-medium mb-1"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter new password"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 text-sm font-medium mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Confirm new password"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {successMessage && (
            <p className="text-green-500 text-sm mb-4">{successMessage}</p>
          )}

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Reset Password
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Back to
          <a href="/signin" className="text-blue-500 hover:underline ml-1">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;

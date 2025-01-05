import React, { useState } from "react";
import axios from "axios";
import Button from "../components/Button";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signup",
        {
          name,
          email,
          password,
        }
      );
      localStorage.setItem("Authorization", `Bearer ${response.data.token}`);
      console.log({ name, email, password });
    } catch (err) {
      console.log("error", err);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              for="name"
              className="block text-gray-700 text-sm font-medium mb-1"
            >
              Name
            </label>
            <input
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
              type="text"
              id="name"
              className="w-full px-4 py-2 border rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your name"
              required
            />
          </div>

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
              className="w-full px-4 py-2 border rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-6">
            <label
              for="password"
              className="block text-gray-700 text-sm font-medium mb-1"
            >
              Password
            </label>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              type="password"
              id="password"
              className="w-full px-4 py-2 border rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>
          <Button inputText="Sign Up" />
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?
          <a href="/signin" className="text-blue-500 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;

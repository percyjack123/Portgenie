import React, { useState } from "react";
import group from "../assets/Group 5.svg";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { logIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await logIn(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0A0502] items-center">
      <div className="font-bold text-[#F16001] m-5 text-[55px]">
        PortGenie
      </div>

      <div className="relative isolate w-96 h-auto">
        <img
          src={group}
          alt="bg"
          className="absolute left-1/2 top-40 -translate-x-1/2 -translate-y-1/2 max-w-[800px]"
        />

        <form
          onSubmit={handleLogin}
          className="relative bg-white/4 backdrop-blur-lg border border-[#E85102] rounded-[35px] px-8 py-6"
        >
          <div className="flex flex-col items-center text-white font-light">
            <h2 className="text-2xl font-bold mb-4">Login</h2>

            {/* Email */}
            <label className="text-center  text-sm">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="bg-white/20 mt-1 px-3 w-60 rounded-xl border border-[#E85102]"
            />

            {/* Password */}
            <label className=" text-sm mt-3">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="bg-white/20 mt-1 px-3 w-60 rounded-xl border border-[#E85102]"
            />

            {/* Error */}
            {error && (
              <p className="text-red-400 text-sm mt-2">
                {error}
              </p>
            )}

            {/* Forgot */}
            <div className="flex justify-end w-full mt-2">
              <span className="text-xs hover:text-[#F16001] cursor-pointer">
                Forgot password?
              </span>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="mt-4 bg-[#E85102] rounded-xl px-8 py-1 text-white hover:scale-105 transition"
            >
              Login
            </button>

            {/* Signup */}
            <p className="text-sm mt-4">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-[#E85102] hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

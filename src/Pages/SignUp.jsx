import React, { useState } from "react";
import group from "../assets/Group 5.svg";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      await signUp(email.trim(), password, username.trim());
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Failed to sign up.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0A0502] items-center">
      <div className="font-bold text-[#F16001] m-5 text-[55px]">PortGenie</div>
      <div className="relative isolate w-96">
        <img
          src={group}
          alt="image"
          className="absolute left-1/2 top-40 -translate-x-1/2 -translate-y-1/2 max-w-[800px]"
        />
        <div className="absolute inset-0 bg-white/4 backdrop-blur-lg border border-[#E85102] rounded-[35px] h-[435px] px-5">
          <form onSubmit={handleSignUp}>
            <div className="text-left mt-3 flex flex-col text-white font-light items-center justify-center">
              <div className="text-2xl font-bold text-center text-white">Sign Up</div>
              <div className="mt-3">Username</div>
              <input
                type="text"
                required
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="name"
                className="bg-white/20 mt-2 px-3 w-60 rounded-xl border border-[#E85102]"
              />

              <div className="mt-3">Email</div>
              <input
                type="email"
                required
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="bg-white/20 mt-2 px-3 w-60 rounded-xl border border-[#E85102]"
              />

              <div className="mt-3">Password</div>
              <input
                type="password"
                required
                id="pwd"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                className="bg-white/20 mt-2 w-60 px-3 rounded-xl border border-[#E85102]"
              />

              <div className="mt-3">Confirm Password</div>
              <input
                type="password"
                required
                id="confirm"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                className="bg-white/20 mt-2 px-3 w-60 rounded-xl border border-[#E85102]"
              />

              {errorMsg && <div className="text-red-400 text-sm mt-3">{errorMsg}</div>}

              <div className="flex justify-between items-center mt-3 w-full px-2">
                <div className="flex items-center">
                  <input id="remember" type="checkbox" className="bg-white/10 h-4 w-4 rounded border border-[#E85102] hover:cursor-pointer" />
                  <label htmlFor="remember" className="text-white text-sm ml-2">Remember me</label>
                </div>
                <Link to="/login" className="text-white text-[12px] hover:text-[#F16001]">Already have an account?</Link>
              </div>

              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="text-white font-light text-lg hover:cursor-pointer transition-all hover:scale-105 duration-300 bg-[#E85102] rounded-xl px-8 p-1 mt-3 disabled:opacity-60"
                >
                  {loading ? "Signing up..." : "SignUp"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

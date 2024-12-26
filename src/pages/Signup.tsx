import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate(); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post("https://discord-backend-hkbq.onrender.com/api/users/signup", {
        username,
        email,
        password,
      });

      if (response.status === 201) {
        console.log("Signup successful:", response.data);
        navigate("/login");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/login.webp')" }}
    >
      <div className="p-12 bg-[#313338] bg-opacity-90 rounded-lg w-90">
        <h2 className="text-2xl font-bold mb-4 text-white">Sign Up</h2>
        <p className="text-white p-2 pt-4">Join us and start your journey!</p>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label className="block text-sm text-white mb-1">
            Username <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Username"
            className="w-80 p-2 mb-4 rounded bg-gray-700 text-white"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label className="block text-sm text-white mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="block text-sm text-white mb-1">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-discord p-2 rounded text-white hover:opacity-80"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <div className="mt-4 text-sm text-gray-400 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;

import { useState } from "react";
import { Link } from "react-router-dom";

const Login = ({ onLogin }: { onLogin: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLoginClick = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        localStorage.setItem("token", data.token);
        onLogin();
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Login failed");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/login.webp')" }}
    >
      <div className="p-6 bg-[#313338] bg-opacity-90 rounded-lg w-100">
        <h2 className="text-2xl font-bold mb-4 text-white">Login</h2>
        <p className="text-white p-1">We are excited to see you!!</p>
        {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
        <div className="flex">
          <div className="w-2/3">
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
              className={`w-full bg-discord p-2 rounded text-white hover:opacity-80 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleLoginClick}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
          <div className="w-1/3 flex flex-col items-center ml-4">
            <img
              src="/images/qr.png" 
              alt="QR Code"
              className="w-24 h-24 mb-4"
            />
            <button className="text-white text-xl p-2 rounded">
              Login with QR Code
              <p className="p-1 text-sm">Scan this with discord Mobile app to login instantly!</p>
            </button>
          </div>
        </div>
        <div className="mt-4 text-sm text-gray-400 text-left">
          Need an account?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

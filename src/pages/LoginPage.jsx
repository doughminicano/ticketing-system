import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a GET request to filter users by email and password
      const response = await axios.get("http://localhost:3001/users", {
        params: { email, password },
      });

      if (response.data.length > 0) {
        // User exists, navigate to the dashboard
        navigate("/dashboard");
      } else {
        // User not found
        setError("Invalid email or password. Please try again.");
      }
    } catch (err) {
      console.error("Error connecting to the server:", err);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div
      className="flex items-center justify-center bg-cover bg-center h-screen w-full"
      style={{ backgroundImage: "url('/bg_fnx.jpeg')" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 250 }}
        animate={{ opacity: 1, y: 1 }}
        transition={{ duration: 2, delay: 1 }}
        className="w-full max-w-md bg-white p-8 shadow-md rounded-lg bg-opacity-25"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Login
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginPage;

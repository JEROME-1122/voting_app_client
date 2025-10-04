// header.js


import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-purple-600 text-white p-4 flex justify-between items-center">
      <div className="text-2xl font-bold">
        <Link to="/">VotingApp</Link>
      </div>
      <nav className="space-x-4">
        {user ? (
          <>
            <span>Hi, {user.name}</span>
            <Link to="/vote" className="hover:underline">Vote</Link>
            <Link to="/dashboard" className="hover:underline">Dashboard</Link>
            <button
              onClick={handleLogout}
              className="bg-white text-purple-600 px-3 py-1 rounded hover:bg-gray-100"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}




//context/ AuthContext.js


import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // page refresh aanaalum localStorage la irukkuradhu load pannum
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
 export default AuthProvider


//home.js

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-100 flex flex-col items-center">
      {/* Hero Section */}
      <section className="text-center py-16 px-6 max-w-3xl">
        <h1 className="text-5xl font-extrabold text-purple-700 mb-4">
          Welcome to Voting App
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Create polls, vote instantly, and see real-time results. 
          Join the community and make your opinion count!
        </p>

        {user ? (
          <div className="space-x-4">
            <Link
              to="/vote"
              className="bg-purple-600 text-white px-6 py-3 rounded-lg shadow hover:bg-purple-700 transition"
            >
              Start Voting
            </Link>
            <Link
              to="/dashboard"
              className="bg-white text-purple-600 px-6 py-3 rounded-lg border hover:bg-gray-100 transition"
            >
              Dashboard
            </Link>
          </div>
        ) : (
          <div className="space-x-4">
            <Link
              to="/register"
              className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
            >
              Login
            </Link>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8 px-6 py-12 max-w-5xl">
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
          <h3 className="text-xl font-bold text-purple-600 mb-2">Create Polls</h3>
          <p className="text-gray-600">
            Make your own polls in seconds with multiple options for others to vote on.
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
          <h3 className="text-xl font-bold text-purple-600 mb-2">Vote Instantly</h3>
          <p className="text-gray-600">
            Participate in polls and have your opinion counted in real-time.
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
          <h3 className="text-xl font-bold text-purple-600 mb-2">View Results</h3>
          <p className="text-gray-600">
            See live charts and results as people cast their votes.
          </p>
        </div>
      </section>
    </div>
  );
}



//login.jsx

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await API.post("/auth/login", form);
      login(res.data); // store token & user
      navigate("/vote");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          required
        />
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}



//Register.jsx

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await API.post("/auth/register", form);
      login(res.data); // store token & user in context
      navigate("/vote"); // redirect to voting page
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}



//Vote.jsx

import { useState } from "react";
import API from "../api/axios";

export default function Vote() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    place: "",
    candidate: ""
  });
  const [message, setMessage] = useState("");
  const [voterId, setVoterId] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await API.post("/votes", form);
      setMessage(res.data.message);
      setVoterId(res.data.vote.voterId);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to vote");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Cast Your Vote</h2>
      {message && <p className="mb-3 text-blue-600">{message}</p>}
      {voterId && <p className="mb-3 text-green-600">Your Voter ID: {voterId}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          required
        />
        <select
          name="gender"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="text"
          name="place"
          placeholder="Place"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          required
        />
        {/* Candidate Dropdown */}
        <select
          name="candidate"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          required
        >
          <option value="">Select Candidate</option>
          <option value="Candidate A">Candidate A</option>
          <option value="Candidate B">Candidate B</option>
          <option value="Candidate C">Candidate C</option>
        </select>
        <button type="submit" className="w-full bg-purple-600 text-white p-2 rounded">
          Submit Vote
        </button>
      </form>
    </div>
  );
}


//dashboard.js

import { useEffect, useState } from "react";
import API from "../api/axios";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/votes/stats", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchStats();
  }, []);

  if (!stats) return <p>Loading...</p>;

  const genderData = {
    labels: stats.genderStats.map(g => g._id),
    datasets: [
      {
        label: "Votes by Gender",
        data: stats.genderStats.map(g => g.count),
        backgroundColor: ["#4F46E5", "#EC4899", "#F59E0B"]
      }
    ]
  };

  const candidateData = {
    labels: stats.candidateStats.map(c => c._id),
    datasets: [
      {
        label: "Votes per Candidate",
        data: stats.candidateStats.map(c => c.count),
        backgroundColor: ["#3B82F6", "#10B981", "#F97316"]
      }
    ]
  };

  return (
    <div className="max-w-4xl mx-auto p-5 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Voting Dashboard</h2>

      <div className="p-4 border rounded shadow">
        <h3 className="text-xl font-semibold mb-2">Total Votes</h3>
        <p className="text-3xl font-bold">{stats.totalVotes}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        {/* {stats.genderStats.length > 0 && (
          <div className="p-4 border rounded shadow">
            <h3 className="text-xl font-semibold mb-2">Votes by Gender</h3>
            <Pie data={genderData} />
          </div>
        )} */}

        {stats.candidateStats.length > 0 && (
          <div className="p-4 border rounded shadow">
            <h3 className="text-xl font-semibold mb-2">Votes per Candidate</h3>
            <Bar key={JSON.stringify(candidateData)} data={candidateData} />
          </div>
        )}
      </div>

      <div className="p-4 border rounded shadow">
        <h3 className="text-xl font-semibold mb-2">Majority Candidate</h3>
        <p className="text-2xl font-bold">{stats.majority?._id || "No votes yet"}</p>
        <p className="text-lg">{stats.majority ? `${stats.majority.count} votes` : ""}</p>
      </div>
    </div>
  );
}


//app.js

import { Routes, Route, Link } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import VotingPage from "./pages/Vote";
import Dashboard from "./pages/Dashboard.jsx";
import Header from "./component/Header.jsx";

export default function App() {
  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/vote" element={<VotingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </>
  );
}


//main.jsx

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthProvider, { AuthContext } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </AuthProvider>
  </BrowserRouter>
);

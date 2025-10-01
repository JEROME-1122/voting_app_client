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

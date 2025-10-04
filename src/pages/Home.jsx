import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-100 flex flex-col items-center">
      <section className="text-center py-16 px-6 max-w-3xl">
        <h1 className="text-5xl font-extrabold text-purple-700 mb-4">
          Welcome to Voting App
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Create polls, vote instantly, and see real-time results. Join the community and make your opinion count!
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

      <section className="grid md:grid-cols-3 gap-8 px-6 py-12 max-w-5xl">
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
          <h3 className="text-xl font-bold text-purple-600 mb-2">Create Polls</h3>
          <p className="text-gray-600">Make your own polls in seconds with multiple options for others to vote on.</p>
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
          <h3 className="text-xl font-bold text-purple-600 mb-2">Vote Instantly</h3>
          <p className="text-gray-600">Participate in polls and have your opinion counted in real-time.</p>
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
          <h3 className="text-xl font-bold text-purple-600 mb-2">View Results</h3>
          <p className="text-gray-600">See live charts and results as people cast their votes.</p>
        </div>
      </section>
    </div>
  );
}

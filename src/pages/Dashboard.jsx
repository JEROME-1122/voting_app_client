import { useEffect, useState } from "react";
import API from "../api/axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/votes/stats");
        setStats(res.data);
      } catch (err) {
        console.error(err.response || err);
      }
    };
    fetchStats();
  }, []);

  if (!stats) return <p>Loading...</p>;

  const candidateData = {
    labels: stats.candidateStats.map(c => c._id),
    datasets: [
      { label: "Votes per Candidate", data: stats.candidateStats.map(c => c.count), backgroundColor: ["#3B82F6", "#10B981", "#F97316"] }
    ]
  };

  return (
    <div className="max-w-4xl mx-auto p-5 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Voting Dashboard</h2>
      <div className="p-4 border rounded shadow">
        <h3 className="text-xl font-semibold mb-2">Total Votes</h3>
        <p className="text-3xl font-bold">{stats.totalVotes}</p>
      </div>
      <div className="p-4 border rounded shadow">
        <h3 className="text-xl font-semibold mb-2">Votes per Candidate</h3>
        <Bar data={candidateData} />
      </div>
      <div className="p-4 border rounded shadow">
        <h3 className="text-xl font-semibold mb-2">Majority Candidate</h3>
        <p className="text-2xl font-bold">{stats.majority?._id || "No votes yet"}</p>
        <p className="text-lg">{stats.majority ? `${stats.majority.count} votes` : ""}</p>
      </div>
    </div>
  );
}

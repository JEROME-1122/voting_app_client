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

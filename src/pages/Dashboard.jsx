import { useEffect, useState } from "react";
import API from "../api/axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0, monthly: [] });

  const fetchStats = async () => {
    try {
      const res = await API.get("/todos/stats/summary");
      setStats(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-blue-100 rounded text-center">
          <h3 className="font-semibold">Total Tasks</h3>
          <p className="text-2xl">{stats.total}</p>
        </div>
        <div className="p-4 bg-green-100 rounded text-center">
          <h3 className="font-semibold">Completed</h3>
          <p className="text-2xl">{stats.completed}</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded text-center">
          <h3 className="font-semibold">Pending</h3>
          <p className="text-2xl">{stats.pending}</p>
        </div>
      </div>

      <h3 className="mb-2 font-semibold">Tasks per Month</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={stats.monthly.map((m) => ({ month: m._id, completed: m.completed, pending: m.pending }))}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="completed" fill="#22c55e" />
          <Bar dataKey="pending" fill="#facc15" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

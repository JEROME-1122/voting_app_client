import { useState } from "react";
import API from "../api/axios";

export default function Vote() {
  const [form, setForm] = useState({ name: "", age: "", gender: "", place: "", candidate: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await API.post("/votes", form);
      setMessage(res.data.message || "Vote submitted successfully!");
    } catch (err) {
      console.error(err.response || err);
      setMessage(err.response?.data?.message || "Unauthorized or Token missing!");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Cast Your Vote</h2>
      {message && <p className="mb-3 text-blue-600">{message}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="border p-2 rounded" required />
        <input name="age" placeholder="Age" type="number" value={form.age} onChange={handleChange} className="border p-2 rounded" required />
        <select name="gender" value={form.gender} onChange={handleChange} className="border p-2 rounded" required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input name="place" placeholder="Place" value={form.place} onChange={handleChange} className="border p-2 rounded" required />
        <select name="candidate" value={form.candidate} onChange={handleChange} className="border p-2 rounded" required>
          <option value="">Select Candidate</option>
          <option value="Candidate A">Candidate A</option>
          <option value="Candidate B">Candidate B</option>
          <option value="Candidate C">Candidate C</option>
        </select>
        <button type="submit" className="bg-purple-600 text-white p-2 rounded mt-2">Submit Vote</button>
      </form>
    </div>
  );
}

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

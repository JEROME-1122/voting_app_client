import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/auth/reset-password/${token}`, { password });
      alert("Password reset success");
      navigate("/login");
    } catch (err) {
      alert(err.response.data.message || "Error resetting password");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Reset Password</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Reset Password
        </button>
      </form>
    </div>
  );
}

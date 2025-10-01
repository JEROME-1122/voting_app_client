import { useState, useEffect } from "react";
import API from "../api/axios";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [editingId, setEditingId] = useState(null); // Track which todo is being edited

  // Fetch all todos
  const fetchTodos = async () => {
    try {
      const res = await API.get("/todos");
      setTodos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add or Update todo
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Update existing todo
        const res = await API.put(`/todos/${editingId}`, form);
        setTodos(todos.map((t) => (t._id === editingId ? res.data : t)));
        setEditingId(null);
      } else {
        // Add new todo
        const res = await API.post("/todos", form);
        setTodos([res.data, ...todos]);
      }
      setForm({ title: "", description: "" }); // Reset form
    } catch (err) {
      console.error(err);
    }
  };

  // Edit todo (populate form)
  const handleEdit = (todo) => {
    setForm({ title: todo.title, description: todo.description });
    setEditingId(todo._id);
  };

  // Delete todo
  const handleDelete = async (id) => {
    if (!confirm("Delete this task?")) return;
    try {
      await API.delete(`/todos/${id}`);
      setTodos(todos.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Toggle status
  const handleToggle = async (id) => {
    try {
      const res = await API.put(`/todos/${id}/toggle`);
      setTodos(todos.map((t) => (t._id === id ? res.data : t)));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">My Todos</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-4">
        <input
          type="text"
          placeholder="Task title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <textarea
          placeholder="Task description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {editingId ? "Update Todo" : "Add Todo"}
        </button>
      </form>

      <ul className="space-y-2">
        {todos.map((t) => (
          <li
            key={t._id}
            className={`flex justify-between items-center p-2 border rounded ${
              t.status === "completed" ? "bg-green-100" : "bg-white"
            }`}
          >
            <div>
              <h3 className="font-semibold">{t.title}</h3>
              <p className="text-sm">{t.description}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleToggle(t._id)}
                className={`p-1 rounded ${
                  t.status === "completed"
                    ? "bg-yellow-400"
                    : "bg-green-500 text-white"
                }`}
              >
                {t.status === "completed" ? "Pending" : "Complete"}
              </button>
              <button
                onClick={() => handleEdit(t)}
                className="bg-blue-500 text-white p-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(t._id)}
                className="bg-red-500 text-white p-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

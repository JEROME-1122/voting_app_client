import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const slides = [
    {
      id: 1,
      title: "Organize Your Tasks",
      subtitle: "Stay productive and never miss a task",
      image: "https://source.unsplash.com/1200x500/?productivity,work",
    },
    {
      id: 2,
      title: "Track Your Progress",
      subtitle: "Mark tasks completed and see your growth",
      image: "https://source.unsplash.com/1200x500/?success,goals",
    },
    {
      id: 3,
      title: "Achieve More",
      subtitle: "Prioritize, plan and accomplish daily goals",
      image: "https://source.unsplash.com/1200x500/?achievement,focus",
    },
  ];

  const [current, setCurrent] = useState(0);

  // Auto-slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Header / Slider */}
      <header className="relative h-96 w-full overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center text-center text-white px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{slide.title}</h1>
              <p className="text-xl md:text-2xl">{slide.subtitle}</p>
            </div>
          </div>
        ))}
      </header>

      {/* Features Section */}
      <section className="flex-1 bg-gray-50 py-20 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose TodoMaster?</h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-500">
            <div className="text-5xl mb-4">📝</div>
            <h3 className="text-2xl font-bold mb-3 text-blue-600">Organize Tasks</h3>
            <p className="text-gray-600">
              Quickly add your tasks and keep your day structured. No more forgotten chores or deadlines!
            </p>
          </div>
          <div className="bg-gradient-to-tr from-green-100 to-green-200 p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-500">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-2xl font-bold mb-3 text-green-700">Track Progress</h3>
            <p className="text-gray-700">
              Mark tasks as completed and monitor your productivity visually with simple indicators.
            </p>
          </div>
          <div className="bg-gradient-to-tr from-yellow-100 to-yellow-200 p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-500">
            <div className="text-5xl mb-4">🏆</div>
            <h3 className="text-2xl font-bold mb-3 text-yellow-700">Achieve Goals</h3>
            <p className="text-gray-700">
              Focus on daily, weekly, and monthly goals. Turn your plans into achievements effortlessly!
            </p>
          </div>
        </div>
      </section>

      {/* Additional Content Section */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <img
            src="https://media.istockphoto.com/id/1193476717/photo/male-hands-making-a-to-do-list-in-a-notebook-over-an-office-desk.jpg?s=612x612&w=0&k=20&c=8DNkIq4K2W-AmeWes4436EDbjRwltEOUt3FIjY4ubVw="
            alt="Plan"
            className="rounded-xl shadow-lg"
          />
          <div>
            <h2 className="text-3xl font-bold mb-4">Plan Smarter</h2>
            <p className="text-gray-700 mb-4">
              With TodoMaster, plan your tasks efficiently and get reminders so you stay on track.
            </p>
            <p className="text-gray-700">
              Organize your day into sections, prioritize important tasks, and enjoy a stress-free workflow.
            </p>
          </div>
        </div>
      </section>

      {/* Call To Action Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 py-20 px-4 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to Boost Your Productivity?</h2>
        <p className="mb-8 text-lg">Sign up now and start managing your tasks like a pro!</p>
        <Link to="/todos"
     
          className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-100 transition"
        >
          Get Started
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-6">
        <p>&copy; {new Date().getFullYear()} TodoMaster. All rights reserved.</p>
        <p className="text-gray-400 mt-2">Simple. Efficient. Productive.</p>
      </footer>
    </div>
  );
}
